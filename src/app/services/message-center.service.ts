import { Injectable } from '@angular/core';
import { CommunicationMessage } from '../pages/components/communication-panel/communication-panel.component';
import { FilterType } from '../pages/components/message-center-header/message-center-header.component';

export interface MessageCenterExpandedConfig {
  messages: CommunicationMessage[];
  activeFilter: FilterType;
  unreadCounts: { [key in FilterType]: number };
}

@Injectable({
  providedIn: 'root'
})
export class MessageCenterService {
  private expandedWindow: Window | null = null;

  /**
   * Opens the Message Center in an expanded window
   * @param config Configuration for the expanded view
   * @returns Promise resolving to the opened window or null
   */
  async openExpandedView(config: MessageCenterExpandedConfig): Promise<Window | null> {
    if (typeof window === 'undefined') {
      console.warn('Window object not available. Cannot open expanded view.');
      return null;
    }

    // Close existing window if open
    this.closeExpandedView();

    // Calculate window dimensions (70% height, 40% width)
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const windowWidth = Math.floor(screenWidth * 0.4);
    const windowHeight = Math.floor(screenHeight * 0.7);

    // Center the window on screen
    const left = Math.floor((screenWidth - windowWidth) / 2);
    const top = Math.floor((screenHeight - windowHeight) / 2);

    const windowFeatures = [
      `width=${windowWidth}`,
      `height=${windowHeight}`,
      `left=${left}`,
      `top=${top}`,
      'resizable=yes',
      'scrollbars=no',
      'toolbar=no',
      'menubar=no',
      'location=no',
      'status=no',
      'directories=no'
    ].join(',');

    try {
      // Open new window with about:blank initially
      this.expandedWindow = window.open('about:blank', 'MessageCenterExpanded', windowFeatures);

      if (!this.expandedWindow) {
        console.error('Failed to open expanded window. Check if popup blocker is enabled.');
        return null;
      }

      // Generate and write the window content
      const windowContent = this.generateWindowContent(config);
      this.expandedWindow.document.write(windowContent);
      this.expandedWindow.document.close();

      // Set up window event handlers
      this.setupWindowEventHandlers();

      // Focus the new window
      this.expandedWindow.focus();

      console.log('Message Center expanded view opened successfully');
      return this.expandedWindow;

    } catch (error) {
      console.error('Error opening expanded view:', error);
      this.expandedWindow = null;
      return null;
    }
  }

  /**
   * Closes the expanded window if open
   */
  closeExpandedView(): void {
    if (this.expandedWindow && !this.expandedWindow.closed) {
      try {
        this.expandedWindow.close();
        console.log('Message Center expanded view closed');
      } catch (error) {
        console.error('Error closing expanded view:', error);
      }
    }
    this.expandedWindow = null;
  }

  /**
   * Checks if expanded window is currently open and accessible
   */
  isExpandedViewOpen(): boolean {
    return this.expandedWindow !== null && !this.expandedWindow.closed;
  }

  /**
   * Posts a message to the expanded window
   * @param data Data to send to the expanded window
   */
  postMessageToExpanded(data: any): boolean {
    if (this.isExpandedViewOpen() && this.expandedWindow) {
      try {
        this.expandedWindow.postMessage(data, '*');
        return true;
      } catch (error) {
        console.error('Error posting message to expanded window:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Updates the configuration in the expanded window
   * @param config New configuration
   */
  updateExpandedConfig(config: Partial<MessageCenterExpandedConfig>): boolean {
    return this.postMessageToExpanded({
      type: 'CONFIG_UPDATE',
      payload: config
    });
  }

  private setupWindowEventHandlers(): void {
    if (!this.expandedWindow) return;

    // Handle window close
    this.expandedWindow.addEventListener('beforeunload', () => {
      console.log('Expanded window is closing');
      this.expandedWindow = null;
    });

    // Handle communication from expanded window
    window.addEventListener('message', (event) => {
      if (event.source === this.expandedWindow) {
        this.handleExpandedWindowMessage(event.data);
      }
    });
  }

  private handleExpandedWindowMessage(data: any): void {
    console.log('Message received from expanded window:', data);
    
    switch (data.type) {
      case 'WINDOW_READY':
        console.log('Expanded window is ready');
        break;
      case 'FILTER_CHANGED':
        console.log('Filter changed in expanded window:', data.payload);
        break;
      case 'MESSAGE_CLICKED':
        console.log('Message clicked in expanded window:', data.payload);
        break;
      case 'COMPOSE_REQUESTED':
        console.log('Compose requested in expanded window');
        break;
      default:
        console.log('Unknown message type from expanded window:', data.type);
    }
  }

  private generateWindowContent(config: MessageCenterExpandedConfig): string {
    // Get current origin for resource loading
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Center</title>
  <link rel="icon" type="image/x-icon" href="${origin}/favicon.ico">
  
  <!-- Load FontAwesome -->
  <link 
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
    rel="stylesheet"
  >
  
  <!-- Load CSS Design Tokens -->
  <style>
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #ffffff;
      color: #3d3d3d;
      overflow: hidden;
      height: 100vh;
    }
    
    /* Design Tokens */
    :root {
      --Grey-50: #C6CCD6;
      --Primary-Dark: #174A78;
      --root-surface-ground: #EFF2F4;
      --global-textColor: #3D3D3D;
      --surface-700: #8D9AAE;
      --Red-100: #DA1F2C;
      --Light-Blue-15: #EAF8FD;
      --Support-Colors-White: #FFF;
      --surface-400: #E2E6EB;
      --of-black-70: #777;
      --Blue-primary-100: #2474BB;
      --Quick-Color-White: #FFF;
      --surface-600: #A9B3C2;
      --med-black: rgba(58, 58, 58, 1);
      --blue-600: #2068A8;
      --surface-300: #EFF2F4;
      --blue-100: #D3E3F1;
      --root-surface-section: #FFF;
      --blue-500: #2474BB;
      --blue-50: #E9F1F8;
      --surface-100: #F7F8F9;
      --Secondary-Blue-25: #DCF2FC;
      --Primary-Blue-100: #2474BB;
      --Primary-Blue-50: #91B9DD;
      --surface-0: #FFF;
    }
    
    /* Loading State */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 16px;
    }
    
    .loading-spinner {
      font-size: 24px;
      color: var(--Blue-primary-100);
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .loading-text {
      font-size: 16px;
      color: var(--surface-700);
    }
    
    .loading-subtitle {
      font-size: 14px;
      color: var(--surface-600);
      text-align: center;
      max-width: 300px;
      line-height: 1.4;
    }
    
    /* Expanded View Container */
    #message-center-expanded {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    /* Error State */
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 16px;
      padding: 2rem;
      text-align: center;
    }
    
    .error-icon {
      font-size: 48px;
      color: var(--Red-100);
    }
    
    .error-title {
      font-size: 20px;
      font-weight: 500;
      color: var(--global-textColor);
    }
    
    .error-message {
      font-size: 14px;
      color: var(--surface-700);
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="loading-container" id="loading">
    <i class="fas fa-spinner loading-spinner"></i>
    <div class="loading-text">Loading Message Center...</div>
    <div class="loading-subtitle">
      Setting up expanded view with ${config.messages.length} messages
    </div>
  </div>
  
  <div id="message-center-expanded" style="display: none;">
    <!-- Angular component will be bootstrapped here -->
  </div>
  
  <div class="error-container" id="error" style="display: none;">
    <i class="fas fa-exclamation-triangle error-icon"></i>
    <div class="error-title">Failed to Load Message Center</div>
    <div class="error-message">
      The expanded view could not be initialized. Please try again or use the default panel view.
    </div>
  </div>
  
  <script>
    // Window configuration
    window.messageCenterConfig = ${JSON.stringify(config)};
    
    // Communication with parent window
    function postToParent(type, payload) {
      if (window.opener) {
        window.opener.postMessage({ type, payload }, '*');
      }
    }
    
    // Notify parent that window is ready
    window.addEventListener('load', () => {
      console.log('Message Center expanded window loaded');
      postToParent('WINDOW_READY', { config: window.messageCenterConfig });
    });
    
    // Handle messages from parent
    window.addEventListener('message', (event) => {
      console.log('Message received from parent:', event.data);
      
      if (event.data.type === 'CONFIG_UPDATE') {
        window.messageCenterConfig = { ...window.messageCenterConfig, ...event.data.payload };
        // Trigger re-render if component is loaded
        if (window.updateConfig) {
          window.updateConfig(window.messageCenterConfig);
        }
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      // ESC to close
      if (event.key === 'Escape') {
        window.close();
      }
      // Ctrl/Cmd + W to close
      if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
        event.preventDefault();
        window.close();
      }
    });
    
    // Simulate loading complete (in production, this would be handled by Angular)
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('message-center-expanded').style.display = 'flex';
      
      // Simulate component initialization
      const container = document.getElementById('message-center-expanded');
      container.innerHTML = \`
        <div style="display: flex; flex-direction: column; height: 100%; background: var(--surface-0);">
          <!-- Browser Controls Simulation -->
          <div style="height: 42px; background: #202124; display: flex; align-items: center; padding: 0 8px; gap: 16px;">
            <div style="display: flex; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #FF6058; cursor: pointer;" onclick="window.close()"></div>
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #FFC130;"></div>
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #27CA40;"></div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; background: #35363A; padding: 8px 12px; border-radius: 8px 8px 0 0;">
              <img src="${origin}/favicon.ico" alt="Favicon" style="width: 16px; height: 16px;" />
              <span style="color: white; font-size: 12px;">Message Center</span>
              <button onclick="window.close()" style="background: none; border: none; color: white; cursor: pointer; padding: 2px;">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid var(--Grey-50); background: var(--surface-0); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-comment" style="color: var(--Primary-Dark); font-size: 21px;"></i>
              <h1 style="color: var(--Primary-Dark); font-size: 16px; font-weight: 500; margin: 0;">Message Center</h1>
            </div>
            <div style="display: flex; gap: 16px;">
              <button style="background: none; border: none; color: var(--surface-700); padding: 4px 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-sticky-note" style="font-size: 12px;"></i>
                <span style="font-size: 14px;">Notes</span>
              </button>
              <button style="background: none; border: none; color: var(--surface-700); padding: 4px 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-envelope" style="font-size: 12px;"></i>
                <span style="font-size: 14px;">Emails</span>
              </button>
              <button style="background: var(--root-surface-ground); border: none; color: var(--global-textColor); padding: 4px 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.10);">
                <i class="fas fa-layer-group" style="font-size: 12px;"></i>
                <span style="font-size: 14px;">All</span>
              </button>
            </div>
          </div>
          
          <!-- Content Area -->
          <div style="flex: 1; display: flex; flex-direction: column; background: var(--surface-0);">
            <!-- Secondary Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid var(--surface-400);">
              <button style="background: none; border: none; color: var(--of-black-70); font-size: 24px; cursor: pointer;">
                <i class="fas fa-filter"></i>
              </button>
              <button style="background: var(--Blue-primary-100); color: white; border: none; padding: 10px 16px; border-radius: 4px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <i class="fas fa-pen" style="font-size: 14px;"></i>
                <span>Compose</span>
              </button>
            </div>
            
            <!-- Messages Area -->
            <div style="flex: 1; display: flex;">
              <!-- Message Feed -->
              <div style="flex: 1; padding: 16px; overflow-y: auto; background: var(--surface-0); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15) inset;">
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  <div style="text-align: center; color: var(--surface-600); padding: 2rem;">
                    <i class="fas fa-comment" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>Expanded Message Center View</p>
                    <small style="color: var(--surface-700);">
                      Active Filter: ${config.activeFilter} • 
                      ${config.messages.length} messages • 
                      ${config.unreadCounts.all} unread
                    </small>
                  </div>
                </div>
              </div>
              
              <!-- Scroll Indicator -->
              <div style="width: 16px; background: var(--surface-100); padding: 16px 0; display: flex; align-items: center; justify-content: center;">
                <div style="width: 4px; height: 100px; background: var(--Secondary-Blue-25); border-radius: 16px; position: relative;">
                  <div style="width: 4px; height: 60px; background: var(--Blue-primary-100); border-radius: 16px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
      
      console.log('Message Center expanded view initialized');
    }, 1500);
    
    // Handle window close
    window.addEventListener('beforeunload', () => {
      postToParent('WINDOW_CLOSING', {});
    });
  </script>
</body>
</html>
    `;
  }
}
