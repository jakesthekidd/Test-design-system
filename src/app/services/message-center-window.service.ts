import { Injectable } from '@angular/core';
import { WindowLauncherService, AngularShellConfig, WindowConfig } from './window-launcher.service';

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

  constructor(private windowLauncher: WindowLauncherService) {}

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
      componentName: 'CommunicationPanel',
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
        // Send initial configuration to the window
        setTimeout(() => {
          this.sendConfigToWindow({
            initialFilter: config.initialFilter || 'all',
            unreadCount: config.unreadCount || 0,
            componentType: 'CommunicationPanel'
          });
        }, 3000); // Wait for Angular to be ready
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
}
