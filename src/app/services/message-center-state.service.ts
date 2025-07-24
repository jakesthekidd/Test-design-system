import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { CommunicationMessage } from '../pages/components/communication-panel/communication-panel.component';
import { FilterType } from '../pages/components/message-center-header/message-center-header.component';

export interface MessageCenterState {
  messages: CommunicationMessage[];
  activeFilter: FilterType;
  unreadCounts: { [key in FilterType]: number };
  isOpen: boolean;
  lastUpdated: number;
}

export interface StateUpdateMessage {
  type: 'STATE_UPDATE' | 'MESSAGE_READ' | 'FILTER_CHANGED' | 'MESSAGE_ADDED' | 'WINDOW_OPENED' | 'WINDOW_CLOSED';
  payload: Partial<MessageCenterState>;
  timestamp: number;
  windowId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageCenterStateService {
  private readonly STORAGE_KEY = 'message-center-state';
  private readonly BROADCAST_CHANNEL_NAME = 'message-center-sync';
  
  private stateSubject = new BehaviorSubject<MessageCenterState>(this.getInitialState());
  private broadcastChannel: BroadcastChannel | null = null;
  private openWindows = new Map<string, Window>();
  
  public state$ = this.stateSubject.asObservable();

  constructor() {
    this.initializeBroadcastChannel();
    this.initializeStorageListener();
    this.loadPersistedState();
  }

  /**
   * Get current state
   */
  getCurrentState(): MessageCenterState {
    return this.stateSubject.value;
  }

  /**
   * Update state and broadcast to all windows
   */
  updateState(update: Partial<MessageCenterState>, source: 'main' | 'window' = 'main'): void {
    const currentState = this.stateSubject.value;
    const newState: MessageCenterState = {
      ...currentState,
      ...update,
      lastUpdated: Date.now()
    };

    // Update local state
    this.stateSubject.next(newState);
    
    // Persist to localStorage
    this.persistState(newState);
    
    // Broadcast to other contexts
    this.broadcastStateUpdate({
      type: 'STATE_UPDATE',
      payload: update,
      timestamp: Date.now()
    }, source);
  }

  /**
   * Register a new window for communication
   */
  registerWindow(windowId: string, windowRef: Window): void {
    this.openWindows.set(windowId, windowRef);
    
    // Send current state to the new window
    this.sendToWindow(windowId, {
      type: 'STATE_UPDATE',
      payload: this.getCurrentState(),
      timestamp: Date.now(),
      windowId
    });

    // Update state to reflect window is open
    this.updateState({ isOpen: true });
  }

  /**
   * Unregister a window
   */
  unregisterWindow(windowId: string): void {
    this.openWindows.delete(windowId);
    
    // Update state if no windows are open
    if (this.openWindows.size === 0) {
      this.updateState({ isOpen: false });
    }
  }

  /**
   * Send message to specific window
   */
  sendToWindow(windowId: string, message: StateUpdateMessage): boolean {
    const windowRef = this.openWindows.get(windowId);
    if (windowRef && !windowRef.closed) {
      try {
        windowRef.postMessage(message, '*');
        return true;
      } catch (error) {
        console.error(`Failed to send message to window ${windowId}:`, error);
        this.unregisterWindow(windowId);
        return false;
      }
    }
    return false;
  }

  /**
   * Send message to all registered windows
   */
  sendToAllWindows(message: StateUpdateMessage): void {
    const windowIds = Array.from(this.openWindows.keys());
    windowIds.forEach(windowId => {
      if (!this.sendToWindow(windowId, message)) {
        this.unregisterWindow(windowId);
      }
    });
  }

  /**
   * Handle incoming messages from windows
   */
  handleWindowMessage(event: MessageEvent, sourceWindowId?: string): void {
    if (!this.isValidStateMessage(event.data)) {
      return;
    }

    const message: StateUpdateMessage = event.data;
    console.log('Received state message:', message);

    switch (message.type) {
      case 'FILTER_CHANGED':
        this.updateState({ 
          activeFilter: message.payload.activeFilter 
        }, 'window');
        break;

      case 'MESSAGE_READ':
        this.handleMessageRead(message.payload);
        break;

      case 'MESSAGE_ADDED':
        this.handleMessageAdded(message.payload);
        break;

      case 'STATE_UPDATE':
        // Apply remote state updates
        this.applyRemoteStateUpdate(message.payload);
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  }

  /**
   * Mark message as read and sync across windows
   */
  markMessageAsRead(messageId: string): void {
    const currentState = this.getCurrentState();
    const updatedMessages = currentState.messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    );

    const unreadCounts = this.calculateUnreadCounts(updatedMessages);

    this.updateState({
      messages: updatedMessages,
      unreadCounts
    });
  }

  /**
   * Change active filter and sync across windows
   */
  changeFilter(filter: FilterType): void {
    this.updateState({ activeFilter: filter });
  }

  /**
   * Add new message and sync across windows
   */
  addMessage(message: CommunicationMessage): void {
    const currentState = this.getCurrentState();
    const updatedMessages = [...currentState.messages, message];
    const unreadCounts = this.calculateUnreadCounts(updatedMessages);

    this.updateState({
      messages: updatedMessages,
      unreadCounts
    });
  }

  private initializeBroadcastChannel(): void {
    if (typeof BroadcastChannel !== 'undefined') {
      this.broadcastChannel = new BroadcastChannel(this.BROADCAST_CHANNEL_NAME);
      
      this.broadcastChannel.addEventListener('message', (event) => {
        this.handleBroadcastMessage(event.data);
      });
    }
  }

  private initializeStorageListener(): void {
    if (typeof window !== 'undefined') {
      fromEvent(window, 'storage').subscribe((event: any) => {
        if (event.key === this.STORAGE_KEY && event.newValue) {
          try {
            const newState: MessageCenterState = JSON.parse(event.newValue);
            // Only update if this is a newer state
            if (newState.lastUpdated > this.stateSubject.value.lastUpdated) {
              this.stateSubject.next(newState);
            }
          } catch (error) {
            console.error('Failed to parse storage state:', error);
          }
        }
      });
    }
  }

  private broadcastStateUpdate(message: StateUpdateMessage, source: 'main' | 'window'): void {
    // Send via postMessage to all registered windows
    if (source === 'main') {
      this.sendToAllWindows(message);
    }

    // Send via BroadcastChannel for cross-tab sync
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(message);
      } catch (error) {
        console.error('Failed to broadcast message:', error);
      }
    }
  }

  private handleBroadcastMessage(message: StateUpdateMessage): void {
    if (this.isValidStateMessage(message)) {
      // Apply updates from other tabs/windows
      this.applyRemoteStateUpdate(message.payload);
    }
  }

  private applyRemoteStateUpdate(update: Partial<MessageCenterState>): void {
    const currentState = this.stateSubject.value;
    const newState = { ...currentState, ...update };
    
    // Only update if this is newer
    if (!update.lastUpdated || update.lastUpdated > currentState.lastUpdated) {
      this.stateSubject.next(newState);
    }
  }

  private handleMessageRead(payload: Partial<MessageCenterState>): void {
    if (payload.messages) {
      this.updateState({
        messages: payload.messages,
        unreadCounts: this.calculateUnreadCounts(payload.messages)
      }, 'window');
    }
  }

  private handleMessageAdded(payload: Partial<MessageCenterState>): void {
    if (payload.messages) {
      this.updateState({
        messages: payload.messages,
        unreadCounts: this.calculateUnreadCounts(payload.messages)
      }, 'window');
    }
  }

  private calculateUnreadCounts(messages: CommunicationMessage[]): { [key in FilterType]: number } {
    const counts = { notes: 0, emails: 0, sms: 0, all: 0 };

    messages.forEach(message => {
      if (!message.isRead) {
        counts.all++;
        switch (message.type) {
          case 'note':
            counts.notes++;
            break;
          case 'automated-email':
          case 'manual-email':
            counts.emails++;
            break;
          case 'sms':
            counts.sms++;
            break;
        }
      }
    });

    return counts;
  }

  private persistState(state: MessageCenterState): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to persist state:', error);
      }
    }
  }

  private loadPersistedState(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
          const persistedState: MessageCenterState = JSON.parse(saved);
          // Merge with current state, keeping newer data
          const currentState = this.stateSubject.value;
          if (persistedState.lastUpdated > currentState.lastUpdated) {
            this.stateSubject.next({
              ...persistedState,
              isOpen: false // Reset window state on load
            });
          }
        }
      } catch (error) {
        console.error('Failed to load persisted state:', error);
      }
    }
  }

  private getInitialState(): MessageCenterState {
    return {
      messages: [],
      activeFilter: 'all',
      unreadCounts: { notes: 0, emails: 0, sms: 0, all: 0 },
      isOpen: false,
      lastUpdated: Date.now()
    };
  }

  private isValidStateMessage(data: any): data is StateUpdateMessage {
    return data && 
           typeof data === 'object' && 
           typeof data.type === 'string' && 
           typeof data.timestamp === 'number' &&
           data.payload;
  }
}
