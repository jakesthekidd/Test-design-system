import { Injectable } from '@angular/core';
import { WindowLauncherService, AngularShellConfig, WindowConfig } from './window-launcher.service';
import { MessageCenterStateService } from './message-center-state.service';
import { MessageDataService } from './message-data.service';

export interface MessageCenterWindowConfig {
  width?: number;
  height?: number;
  title?: string;
  // Add any specific configuration for the CommunicationPanel
  initialFilter?: string;
  unreadCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageCenterWindowService {
  private readonly WINDOW_ID = 'message-center-expanded';

  constructor(
    private windowLauncher: WindowLauncherService,
    private stateService: MessageCenterStateService,
    private messageDataService: MessageDataService
  ) {
    this.setupMessageHandling();
  }

  /**
   * Opens the Message Center in a new window with CommunicationPanel
   */
  async openMessageCenter(config: MessageCenterWindowConfig = {}): Promise<Window | null> {
    const windowConfig: WindowConfig = {
      width: config.width || Math.floor(window.screen.width * 0.4),
      height: config.height || Math.floor(window.screen.height * 0.7),
      title: config.title || 'Message Center',
      centered: true
    };

    const shellConfig: AngularShellConfig = {
      componentName: 'MessageCenterExpanded',
      windowTitle: 'Message Center - Expanded View',
      additionalStyles: [],
      additionalScripts: []
    };

    try {
      const windowRef = await this.windowLauncher.openAngularWindow(
        this.WINDOW_ID,
        shellConfig,
        windowConfig
      );

      if (windowRef) {
        // Send initial configuration and actual message data to the window
        setTimeout(() => {
          const currentMessages = this.messageDataService.getMessages();
          const currentCounts = this.messageDataService.getUnreadCounts();

          this.sendConfigToWindow({
            initialFilter: config.initialFilter || 'all',
            unreadCount: config.unreadCount || currentCounts.all,
            componentType: 'MessageCenterExpanded',
            messages: currentMessages, // Send actual mock data
            unreadCounts: currentCounts,
            title: config.title || 'Message Center'
          });

          console.log('Sent message data to window:', {
            messagesCount: currentMessages.length,
            unreadCounts: currentCounts
          });
        }, 2000); // Wait for window to be ready
      }

      return windowRef;
    } catch (error) {
      console.error('Failed to open Message Center window:', error);
      return null;
    }
  }

  /**
   * Closes the Message Center window
   */
  closeMessageCenter(): boolean {
    return this.windowLauncher.closeWindow(this.WINDOW_ID);
  }

  /**
   * Checks if Message Center window is open
   */
  isMessageCenterOpen(): boolean {
    return this.windowLauncher.isWindowOpen(this.WINDOW_ID);
  }

  /**
   * Gets the Message Center window reference
   */
  getMessageCenterWindow(): Window | null {
    return this.windowLauncher.getWindow(this.WINDOW_ID);
  }

  /**
   * Sends configuration data to the Message Center window
   */
  sendConfigToWindow(config: any): boolean {
    return this.windowLauncher.postMessage(this.WINDOW_ID, {
      type: 'UPDATE_CONFIG',
      payload: config
    });
  }

  /**
   * Updates the filter in the Message Center window
   */
  updateFilter(filter: string): boolean {
    return this.windowLauncher.postMessage(this.WINDOW_ID, {
      type: 'UPDATE_FILTER',
      payload: { filter }
    });
  }

  /**
   * Updates the unread count in the Message Center window
   */
  updateUnreadCount(count: number): boolean {
    return this.windowLauncher.postMessage(this.WINDOW_ID, {
      type: 'UPDATE_UNREAD_COUNT',
      payload: { count }
    });
  }

  /**
   * Refreshes the message feed in the window
   */
  refreshMessageFeed(): boolean {
    return this.windowLauncher.postMessage(this.WINDOW_ID, {
      type: 'REFRESH_MESSAGES',
      payload: {}
    });
  }

  /**
   * Sends a new message to be displayed in the window
   */
  addMessage(message: any): boolean {
    return this.windowLauncher.postMessage(this.WINDOW_ID, {
      type: 'ADD_MESSAGE',
      payload: { message }
    });
  }

  /**
   * Opens Message Center with specific configuration for different use cases
   */
  async openWithPreset(preset: 'default' | 'compose' | 'notifications'): Promise<Window | null> {
    let config: MessageCenterWindowConfig;

    switch (preset) {
      case 'compose':
        config = {
          title: 'Message Center - Compose',
          initialFilter: 'emails',
          width: Math.floor(window.screen.width * 0.5),
          height: Math.floor(window.screen.height * 0.8)
        };
        break;

      case 'notifications':
        config = {
          title: 'Message Center - Notifications',
          initialFilter: 'all',
          width: Math.floor(window.screen.width * 0.35),
          height: Math.floor(window.screen.height * 0.6)
        };
        break;

      default: // 'default'
        config = {
          title: 'Message Center',
          initialFilter: 'all'
        };
    }

    return this.openMessageCenter(config);
  }

  /**
   * Setup message handling between parent and child windows
   */
  private setupMessageHandling(): void {
    // Listen for messages from any MessageCenter windows
    window.addEventListener('message', (event) => {
      // Only handle messages from our windows
      if (event.origin === window.location.origin) {
        this.handleWindowMessage(event);
      }
    });
  }

  /**
   * Handle messages from MessageCenter windows
   */
  private handleWindowMessage(event: MessageEvent): void {
    const data = event.data;

    if (!data || typeof data !== 'object') {
      return;
    }

    console.log('Message from MessageCenter window:', data);

    try {
      switch (data.type) {
        case 'ANGULAR_READY':
        case 'COMPONENT_LOADED':
          this.handleWindowReady(event.source as Window);
          break;

        case 'FILTER_CHANGED':
          if (data.payload && data.payload.filter) {
            this.stateService.changeFilter(data.payload.filter);
          }
          break;

        case 'MESSAGE_CLICKED':
          if (data.payload && data.payload.message) {
            this.stateService.markMessageAsRead(data.payload.message.id);
          }
          break;

        case 'WINDOW_CLOSING':
          this.handleWindowClosing(event.source as Window);
          break;

        case 'ERROR':
          console.error('Error from MessageCenter window:', data.error);
          // You could show a notification to the user here
          break;

        default:
          // Forward unknown messages to state service
          this.stateService.handleWindowMessage(event);
      }
    } catch (error) {
      console.error('Error handling window message:', error, data);
    }
  }

  /**
   * Handle when a window is ready to receive state
   */
  private handleWindowReady(windowRef: Window): void {
    // Register the window with state service
    const windowId = this.WINDOW_ID;
    this.stateService.registerWindow(windowId, windowRef);

    console.log('MessageCenter window ready and registered');
  }

  /**
   * Handle when a window is closing
   */
  private handleWindowClosing(windowRef: Window): void {
    const windowId = this.WINDOW_ID;
    this.stateService.unregisterWindow(windowId);

    console.log('MessageCenter window closing and unregistered');
  }

  /**
   * Get current state for external access
   */
  getCurrentState() {
    return this.stateService.getCurrentState();
  }

  /**
   * Get state observable for external subscriptions
   */
  getState$() {
    return this.stateService.state$;
  }
}
