import { Injectable } from '@angular/core';

export interface WindowConfig {
  width?: number;
  height?: number;
  title?: string;
  centered?: boolean;
}

export interface AngularShellConfig {
  componentName: string;
  modulePath?: string;
  additionalScripts?: string[];
  additionalStyles?: string[];
  windowTitle?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WindowLauncherService {
  private openWindows: Map<string, Window> = new Map();
  private baseUrl: string;

  constructor() {
    this.baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  }

  /**
   * Opens a new browser window with Angular application shell
   */
  async openAngularWindow(
    windowId: string, 
    shellConfig: AngularShellConfig,
    windowConfig: WindowConfig = {}
  ): Promise<Window | null> {
    if (typeof window === 'undefined') {
      console.warn('Window object not available');
      return null;
    }

    // Close existing window with same ID
    this.closeWindow(windowId);

    // Calculate window dimensions and position
    const config = this.calculateWindowConfig(windowConfig);
    
    // Create window features string
    const features = this.buildWindowFeatures(config);

    try {
      // Open new window
      const newWindow = window.open('about:blank', windowId, features);
      
      if (!newWindow) {
        console.error('Failed to open window. Check popup blocker settings.');
        return null;
      }

      // Store window reference
      this.openWindows.set(windowId, newWindow);

      // Generate and inject HTML content
      const htmlContent = this.generateAngularShell(shellConfig);
      newWindow.document.write(htmlContent);
      newWindow.document.close();

      // Set up event handlers
      this.setupWindowEventHandlers(windowId, newWindow);

      // Focus the new window
      newWindow.focus();

      console.log(`Angular window '${windowId}' opened successfully`);
      return newWindow;

    } catch (error) {
      console.error('Error opening Angular window:', error);
      this.openWindows.delete(windowId);
      return null;
    }
  }

  /**
   * Closes a specific window by ID
   */
  closeWindow(windowId: string): boolean {
    const window = this.openWindows.get(windowId);
    if (window && !window.closed) {
      try {
        window.close();
        this.openWindows.delete(windowId);
        console.log(`Window '${windowId}' closed`);
        return true;
      } catch (error) {
        console.error(`Error closing window '${windowId}':`, error);
        return false;
      }
    }
    this.openWindows.delete(windowId);
    return false;
  }

  /**
   * Closes all open windows
   */
  closeAllWindows(): void {
    this.openWindows.forEach((window, windowId) => {
      this.closeWindow(windowId);
    });
  }

  /**
   * Checks if a window is open and accessible
   */
  isWindowOpen(windowId: string): boolean {
    const window = this.openWindows.get(windowId);
    return window !== undefined && !window.closed;
  }

  /**
   * Gets a window reference by ID
   */
  getWindow(windowId: string): Window | null {
    const window = this.openWindows.get(windowId);
    return window && !window.closed ? window : null;
  }

  /**
   * Posts a message to a specific window
   */
  postMessage(windowId: string, data: any): boolean {
    const window = this.getWindow(windowId);
    if (window) {
      try {
        window.postMessage(data, '*');
        return true;
      } catch (error) {
        console.error(`Error posting message to window '${windowId}':`, error);
        return false;
      }
    }
    return false;
  }

  private calculateWindowConfig(config: WindowConfig) {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    
    const width = config.width || Math.floor(screenWidth * 0.6);
    const height = config.height || Math.floor(screenHeight * 0.7);
    
    let left = 0;
    let top = 0;
    
    if (config.centered !== false) {
      left = Math.floor((screenWidth - width) / 2);
      top = Math.floor((screenHeight - height) / 2);
    }

    return { width, height, left, top };
  }

  private buildWindowFeatures(config: any): string {
    return [
      `width=${config.width}`,
      `height=${config.height}`,
      `left=${config.left}`,
      `top=${config.top}`,
      'resizable=yes',
      'scrollbars=yes',
      'toolbar=no',
      'menubar=no',
      'location=no',
      'status=no',
      'directories=no'
    ].join(',');
  }

  private setupWindowEventHandlers(windowId: string, targetWindow: Window): void {
    // Handle window close
    targetWindow.addEventListener('beforeunload', () => {
      console.log(`Window '${windowId}' is closing`);
      this.openWindows.delete(windowId);
    });

    // Handle messages from the window
    window.addEventListener('message', (event) => {
      if (event.source === targetWindow) {
        this.handleWindowMessage(windowId, event.data);
      }
    });
  }

  private handleWindowMessage(windowId: string, data: any): void {
    console.log(`Message from window '${windowId}':`, data);
    
    // Handle specific message types
    switch (data.type) {
      case 'ANGULAR_READY':
        console.log(`Angular application ready in window '${windowId}'`);
        break;
      case 'COMPONENT_LOADED':
        console.log(`Component loaded in window '${windowId}':`, data.componentName);
        break;
      case 'ERROR':
        console.error(`Error in window '${windowId}':`, data.error);
        break;
      default:
        console.log(`Unknown message type from window '${windowId}':`, data.type);
    }
  }

  private generateAngularShell(config: AngularShellConfig): string {
    const title = config.windowTitle || 'Angular Application';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="icon" type="image/x-icon" href="${this.baseUrl}/favicon.ico">

  <!-- FontAwesome -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    rel="stylesheet"
  >

  <!-- Design System Styles -->
  <link href="${this.baseUrl}/styles.css" rel="stylesheet">
  <link href="${this.baseUrl}/design-system.css" rel="stylesheet">
  <link href="${this.baseUrl}/design-tokens.css" rel="stylesheet">
  <link href="${this.baseUrl}/lara-light-tokens.css" rel="stylesheet">
  <link href="${this.baseUrl}/lara-light-overrides.css" rel="stylesheet">

  <!-- PrimeNG Theme -->
  <link href="https://cdn.jsdelivr.net/npm/primeng@17.3.0/resources/themes/lara-light-blue/theme.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/primeng@17.3.0/resources/primeng.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/primeicons@6.0.1/primeicons.css" rel="stylesheet">

  ${this.generateAdditionalStyles(config.additionalStyles)}

  <!-- Loading Styles -->
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #ffffff;
      overflow: hidden;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 16px;
      background: #ffffff;
    }

    .loading-spinner {
      font-size: 24px;
      color: #2474BB;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .loading-text {
      font-size: 16px;
      color: #8D9AAE;
      font-weight: 500;
    }

    .loading-subtitle {
      font-size: 14px;
      color: #A9B3C2;
      text-align: center;
      max-width: 300px;
      line-height: 1.4;
    }

    #angular-app {
      display: none;
      height: 100vh;
      width: 100vw;
    }

    .error-container {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 16px;
      padding: 2rem;
      text-align: center;
      background: #ffffff;
    }

    .error-icon {
      font-size: 48px;
      color: #DA1F2C;
    }

    .error-title {
      font-size: 20px;
      font-weight: 500;
      color: #3D3D3D;
    }

    .error-message {
      font-size: 14px;
      color: #8D9AAE;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <!-- Loading State -->
  <div class="loading-container" id="loading">
    <i class="fas fa-spinner loading-spinner"></i>
    <div class="loading-text">Loading ${config.componentName}...</div>
    <div class="loading-subtitle">
      Bootstrapping independent Angular application
    </div>
  </div>

  <!-- Angular Application Container -->
  <div id="angular-app">
    <div id="component-root"></div>
  </div>

  <!-- Error State -->
  <div class="error-container" id="error">
    <i class="fas fa-exclamation-triangle error-icon"></i>
    <div class="error-title">Failed to Load Application</div>
    <div class="error-message">
      The Angular application could not be initialized. Please try again.
    </div>
  </div>

  <!-- No additional bundle loading needed for simple implementation -->

  <!-- Window Configuration -->
  <script>
    // Configuration for the component
    window.messageCenterConfig = {
      componentName: '${config.componentName}',
      baseUrl: '${this.baseUrl}',
      ready: false
    };

    // Function to show error state
    window.showError = function(message) {
      console.error('Showing error state:', message);

      const loading = document.getElementById('loading');
      const app = document.getElementById('angular-app');
      const error = document.getElementById('error');

      if (loading) loading.style.display = 'none';
      if (app) app.style.display = 'none';
      if (error) error.style.display = 'flex';

      const errorMsg = document.querySelector('.error-message');
      if (errorMsg && message) {
        errorMsg.textContent = message;
      }
    };

    // Function to show application
    window.showApp = function() {
      console.log('Showing application');

      const loading = document.getElementById('loading');
      const error = document.getElementById('error');
      const app = document.getElementById('angular-app');

      if (loading) loading.style.display = 'none';
      if (error) error.style.display = 'none';
      if (app) app.style.display = 'block';

      window.messageCenterConfig.ready = true;

      // Notify parent window
      if (window.opener) {
        window.opener.postMessage({
          type: 'ANGULAR_READY',
          componentName: '${config.componentName}',
          timestamp: Date.now()
        }, '*');
      }
    };

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      // ESC to close
      if (event.key === 'Escape') {
        console.log('ESC pressed - closing window');
        window.close();
      }
      // Ctrl/Cmd + W to close
      if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
        console.log('Ctrl/Cmd+W pressed - closing window');
        event.preventDefault();
        window.close();
      }
    });

    // Log that configuration is ready
    console.log('Window configuration loaded:', window.messageCenterConfig);

    // Fallback timeout to show app if initialization takes too long
    setTimeout(function() {
      if (!window.messageCenterConfig.ready) {
        console.warn('Application taking too long to load, showing fallback...');
        if (window.showApp) {
          window.showApp();
        }
      }
    }, 5000); // 5 second timeout
  </script>

  <!-- MessageCenter Application Script -->
  <script>
    console.log('Starting MessageCenter application for ${config.componentName}...');

    // Simple initialization without external dependencies

    // Render the CommunicationPanel structure
    function renderCommunicationPanel() {
      return \`
        <div class="communication-panel-container">
          <!-- Message Center Header -->
          <div class="message-center-header">
            <div class="header-section">
              <div class="header-title">
                <i class="fas fa-comment header-icon"></i>
                <h3 class="title-text">Message Center</h3>
              </div>
              <div class="header-actions">
                <button class="action-button close-button" onclick="window.close()">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div class="filter-tabs-section">
              <div class="filter-tabs">
                <button class="filter-tab active" data-filter="all" onclick="setActiveFilter('all')">
                  <i class="fas fa-layer-group tab-icon"></i>
                  <span class="tab-label">All</span>
                  <span class="tab-badge">5</span>
                </button>
                <button class="filter-tab" data-filter="notes" onclick="setActiveFilter('notes')">
                  <i class="fas fa-sticky-note tab-icon"></i>
                  <span class="tab-label">Notes</span>
                  <span class="tab-badge">2</span>
                </button>
                <button class="filter-tab" data-filter="emails" onclick="setActiveFilter('emails')">
                  <i class="fas fa-envelope tab-icon"></i>
                  <span class="tab-label">Emails</span>
                  <span class="tab-badge">2</span>
                </button>
                <button class="filter-tab" data-filter="sms" onclick="setActiveFilter('sms')">
                  <i class="fas fa-comment tab-icon"></i>
                  <span class="tab-label">SMS</span>
                  <span class="tab-badge">1</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Secondary Header -->
          <div class="secondary-header">
            <button class="filter-button">
              <i class="fas fa-filter"></i>
            </button>
            <button class="compose-button" style="display: none;" id="composeBtn">
              <i class="fas fa-pen"></i>
              <span>Compose</span>
            </button>
          </div>

          <!-- Message Feed -->
          <div class="message-feed">
            <div class="message-list" id="messageList">
              <!-- Sample messages will be populated here -->
              <div class="message-item note-message note-other">
                <div class="note-bubble">
                  <div class="note-header">
                    <div class="note-author-info">
                      <div class="author-avatar">JC</div>
                      <div class="author-details">
                        <span class="author-name">Jake Cummings</span>
                        <span class="note-timestamp">9:00 AM</span>
                      </div>
                    </div>
                  </div>
                  <div class="note-content">
                    A BOL document is like the passport for a shipment; it tells you everything you need to know about where it's coming from, where it's going, and what's inside.
                  </div>
                </div>
              </div>

              <div class="message-item outbound-message">
                <div class="sms-bubble">
                  <div class="sms-header">
                    <div class="sms-icon">
                      <i class="fas fa-comment"></i>
                    </div>
                    <div class="sms-details">
                      <span class="sms-recipient">+1 (999) 999-9999</span>
                      <span class="sms-timestamp">11:00 AM</span>
                    </div>
                    <div class="sms-status sent">
                      <i class="fas fa-check-circle"></i>
                    </div>
                  </div>
                  <div class="sms-content">
                    Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.
                  </div>
                </div>
              </div>

              <div class="message-item outbound-message">
                <div class="email-bubble automated">
                  <div class="email-header">
                    <div class="email-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="email-details">
                      <span class="email-subject">Document Upload Required - Shipment #SP-2024-1205</span>
                      <span class="email-timestamp">10:32 AM</span>
                    </div>
                    <div class="email-status sent">
                      <i class="fas fa-paper-plane"></i>
                    </div>
                  </div>
                  <div class="email-recipients">
                    <span class="email-to">To: client@company.com, shipper@logistics.com</span>
                  </div>
                  <div class="email-content">
                    Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.
                  </div>
                </div>
              </div>

              <div class="message-item note-message note-own">
                <div class="note-bubble own">
                  <div class="note-header">
                    <div class="note-author-info">
                      <div class="author-avatar">SM</div>
                      <div class="author-details">
                        <span class="author-name">Sarah Mitchell</span>
                        <span class="note-timestamp">11:15 AM</span>
                      </div>
                    </div>
                  </div>
                  <div class="note-content">
                    I've reviewed the documentation and everything looks good to proceed. The carrier has confirmed pickup for tomorrow morning.
                  </div>
                </div>
              </div>

              <div class="message-item outbound-message">
                <div class="upload-bubble">
                  <div class="upload-header">
                    <div class="upload-icon">
                      <i class="fas fa-upload"></i>
                    </div>
                    <div class="upload-details">
                      <span class="upload-filename">BOL_12345.pdf</span>
                      <span class="upload-timestamp">11:23 AM</span>
                    </div>
                    <div class="upload-status uploaded">
                      <i class="fas fa-check-circle"></i>
                    </div>
                  </div>
                  <div class="upload-meta">
                    <span class="upload-method">Uploaded via secure link by driver@carrier.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // Global functions for interaction
    window.setActiveFilter = function(filter) {
      console.log('Filter changed to:', filter);

      // Update local state
      if (window.messageCenterState) {
        window.messageCenterState.activeFilter = filter;
        window.messageCenterState.lastUpdated = Date.now();
      }

      // Update active tab
      document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      document.querySelector(\`[data-filter="\${filter}"]\`).classList.add('active');

      // Show/hide compose button for emails
      const composeBtn = document.getElementById('composeBtn');
      if (filter === 'emails') {
        composeBtn.style.display = 'flex';
      } else {
        composeBtn.style.display = 'none';
      }

      // Notify parent of state change
      if (window.opener) {
        window.opener.postMessage({
          type: 'FILTER_CHANGED',
          payload: {
            filter,
            activeFilter: filter
          },
          timestamp: Date.now()
        }, '*');
      }
    };

    // Initialize the application
    function initializeApp() {
      console.log('Initializing CommunicationPanel in window...');
      console.log('Document ready state:', document.readyState);
      console.log('Available elements:', {
        loading: !!document.getElementById('loading'),
        app: !!document.getElementById('angular-app'),
        error: !!document.getElementById('error'),
        componentRoot: !!document.getElementById('component-root')
      });

      try {
        const container = document.getElementById('component-root');
        if (!container) {
          throw new Error('Component root container not found');
        }

        console.log('Rendering CommunicationPanel...');
        container.innerHTML = renderCommunicationPanel();

      // Setup styles for the CommunicationPanel
      const style = document.createElement('style');
      style.textContent = \`
        .communication-panel-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--surface-0, #ffffff);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Message Center Header Styles */
        .message-center-header {
          background: var(--surface-0, #ffffff);
          border-radius: 8px 8px 0 0;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: var(--surface-100, #F7F8F9);
          border-radius: 8px 8px 0 0;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .header-icon {
          color: var(--blue-900, #0E2E4B);
          font-size: 21px;
        }

        .title-text {
          color: var(--blue-900, #0E2E4B);
          font-size: 16px;
          font-weight: 500;
          margin: 0;
        }

        .action-button {
          background: transparent;
          border: none;
          color: var(--blue-900, #0E2E4B);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s ease;
        }

        .action-button:hover {
          color: var(--primary-color, #2474BB);
        }

        .action-button i {
          font-size: 21px;
        }

        .filter-tabs-section {
          padding: 16px 24px;
          background: var(--surface-0, #ffffff);
          border-bottom: 1px solid var(--surface-border, #C6CCD6);
        }

        .filter-tabs {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .filter-tab {
          display: flex;
          padding: 4px 8px;
          align-items: center;
          gap: 10px;
          border-radius: 6px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-tab:hover {
          background: var(--surface-hover, #F6F9FC);
        }

        .filter-tab.active {
          background: var(--surface-ground, #EFF2F4);
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.10);
        }

        .tab-icon {
          font-size: 12px;
          color: var(--surface-700, #8D9AAE);
          transition: color 0.2s ease;
        }

        .filter-tab.active .tab-icon {
          color: var(--text-color, #3D3D3D);
        }

        .tab-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--surface-700, #8D9AAE);
          transition: color 0.2s ease;
        }

        .filter-tab.active .tab-label {
          color: var(--text-color, #3D3D3D);
        }

        .tab-badge {
          width: 12px;
          height: 12px;
          background: var(--status-alert, #DA1F2C);
          color: white;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Secondary Header */
        .secondary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid var(--surface-border, #E2E6EB);
          background: var(--surface-0, #ffffff);
        }

        .filter-button {
          background: transparent;
          border: none;
          color: var(--of-black-70, #777);
          font-size: 24px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s ease;
        }

        .filter-button:hover {
          color: var(--primary-color, #2474BB);
        }

        .compose-button {
          background: var(--primary-color, #2474BB);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .compose-button:hover {
          background: var(--primary-dark, #1D5D96);
        }

        /* Message Feed */
        .message-feed {
          flex: 1;
          overflow: hidden;
        }

        .message-list {
          height: 100%;
          padding: 12px 0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: var(--surface-0, #ffffff);
        }

        .message-item {
          flex-shrink: 0;
          width: 100%;
          box-sizing: border-box;
        }

        .message-item.note-message {
          padding: 0 16px;
        }

        .message-item.note-own {
          display: flex;
          justify-content: flex-end;
        }

        .message-item.note-other {
          display: flex;
          justify-content: flex-start;
        }

        .message-item.outbound-message {
          display: flex;
          justify-content: flex-end;
          padding-left: 48px;
          padding-right: 16px;
        }

        /* Message Bubble Styles */
        .note-bubble, .sms-bubble, .email-bubble, .upload-bubble {
          background: var(--surface-card, #ffffff);
          border: 1px solid var(--surface-border, #E2E6EB);
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          max-width: 400px;
        }

        .note-bubble.own {
          background: var(--primary-50, #E3F2FD);
          border-color: var(--primary-200, #90CAF9);
        }

        .note-header, .sms-header, .email-header, .upload-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .author-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary-color, #2474BB);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .author-details, .sms-details, .email-details, .upload-details {
          flex: 1;
        }

        .author-name, .sms-recipient, .email-subject, .upload-filename {
          display: block;
          font-weight: 600;
          color: var(--text-color, #3D3D3D);
          font-size: 13px;
        }

        .note-timestamp, .sms-timestamp, .email-timestamp, .upload-timestamp {
          display: block;
          font-size: 11px;
          color: var(--text-color-secondary, #8D9AAE);
        }

        .note-content, .sms-content, .email-content {
          color: var(--text-color, #3D3D3D);
          font-size: 14px;
          line-height: 1.4;
        }

        .sms-icon, .email-icon, .upload-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .sms-icon {
          background: var(--indigo-100, #E8EAF6);
          color: var(--indigo-600, #3F51B5);
        }

        .email-icon {
          background: var(--blue-100, #E3F2FD);
          color: var(--blue-600, #1976D2);
        }

        .upload-icon {
          background: var(--green-100, #E8F5E8);
          color: var(--green-600, #4CAF50);
        }

        .sms-status, .email-status, .upload-status {
          font-size: 16px;
        }

        .sms-status.sent, .email-status.sent, .upload-status.uploaded {
          color: var(--green-500, #4CAF50);
        }

        .email-recipients, .upload-meta {
          font-size: 12px;
          color: var(--text-color-secondary, #8D9AAE);
          margin-bottom: 8px;
        }
      \`;
      document.head.appendChild(style);

      // Setup communication
      setupCommunication();

      console.log('CommunicationPanel initialized successfully');
    }

    function setupCommunication() {
      // Store current state
      window.messageCenterState = {
        activeFilter: 'all',
        messages: [],
        unreadCounts: { notes: 0, emails: 0, sms: 0, all: 0 },
        isOpen: true,
        lastUpdated: Date.now()
      };

      // Listen for messages from parent
      window.addEventListener('message', (event) => {
        console.log('Message received from parent:', event.data);

        switch (event.data.type) {
          case 'STATE_UPDATE':
            if (event.data.payload) {
              window.messageCenterState = { ...window.messageCenterState, ...event.data.payload };
              updateUIFromState();
            }
            break;
          case 'UPDATE_CONFIG':
            console.log('Config update received:', event.data.payload);
            break;
          case 'UPDATE_FILTER':
            setActiveFilter(event.data.payload.filter);
            break;
          default:
            console.log('Unknown message from parent:', event.data.type);
        }
      });

      // Function to update UI based on current state
      window.updateUIFromState = function() {
        const state = window.messageCenterState;
        if (state.activeFilter) {
          setActiveFilter(state.activeFilter);
        }
        // Update unread counts in UI
        updateUnreadCounts(state.unreadCounts || { notes: 0, emails: 0, sms: 0, all: 0 });
      };

      // Function to update unread count displays
      window.updateUnreadCounts = function(counts) {
        const badges = {
          'all': document.querySelector('[data-filter="all"] .tab-badge'),
          'notes': document.querySelector('[data-filter="notes"] .tab-badge'),
          'emails': document.querySelector('[data-filter="emails"] .tab-badge'),
          'sms': document.querySelector('[data-filter="sms"] .tab-badge')
        };

        Object.keys(badges).forEach(filter => {
          const badge = badges[filter];
          if (badge && counts[filter]) {
            badge.textContent = counts[filter].toString();
            badge.style.display = counts[filter] > 0 ? 'flex' : 'none';
          }
        });
      };

      // Notify parent that Angular is ready
      setTimeout(() => {
        if (window.opener) {
          window.opener.postMessage({
            type: 'ANGULAR_READY',
            componentName: '${config.componentName}',
            activeFilter: 'all',
            timestamp: new Date().toISOString()
          }, '*');
        }
      }, 100);
    }

        // Setup communication after successful initialization
        setupCommunication();

        console.log('CommunicationPanel initialized successfully');

        // Show the application immediately
        console.log('Showing application...');
        if (window.showApp) {
          window.showApp();
        } else {
          // Fallback: manually show the app if showApp function not available
          const loading = document.getElementById('loading');
          const error = document.getElementById('error');
          const app = document.getElementById('angular-app');

          if (loading) loading.style.display = 'none';
          if (error) error.style.display = 'none';
          if (app) app.style.display = 'block';
        }

        // Notify parent of successful initialization
        if (window.opener) {
          window.opener.postMessage({
            type: 'COMPONENT_LOADED',
            componentName: '${config.componentName}',
            timestamp: Date.now()
          }, '*');
        }

      } catch (error) {
        console.error('Error initializing MessageCenter window:', error);

        // Show error state
        if (window.showError) {
          window.showError('Failed to initialize: ' + error.message);
        }

        // Notify parent of error
        if (window.opener) {
          window.opener.postMessage({
            type: 'ERROR',
            error: error.message,
            timestamp: Date.now()
          }, '*');
        }
      }
    }

    // Initialize immediately when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing...');
        setTimeout(initializeApp, 100); // Small delay to ensure DOM is fully ready
      });
    } else {
      console.log('DOM already ready, initializing immediately...');
      setTimeout(initializeApp, 100); // Small delay to ensure everything is loaded
    }

    // Also try immediate initialization as backup
    setTimeout(function() {
      console.log('Backup initialization attempt...');
      if (!window.messageCenterConfig.ready) {
        initializeApp();
      }
    }, 1000);

    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('Uncaught error in MessageCenter window:', event.error);

      if (window.showError) {
        window.showError('Application error: ' + (event.error?.message || 'Unknown error'));
      }

      if (window.opener) {
        window.opener.postMessage({
          type: 'ERROR',
          error: event.error?.message || 'Unknown error',
          timestamp: Date.now()
        }, '*');
      }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection in MessageCenter window:', event.reason);

      if (window.showError) {
        window.showError('Promise error: ' + (event.reason?.message || 'Unknown promise error'));
      }

      if (window.opener) {
        window.opener.postMessage({
          type: 'ERROR',
          error: event.reason?.message || 'Unknown promise error',
          timestamp: Date.now()
        }, '*');
      }

      // Prevent the default browser error handling
      event.preventDefault();
    });


  </script>

  <!-- Handle window close -->
  <script>
    window.addEventListener('beforeunload', () => {
      if (window.opener) {
        window.opener.postMessage({
          type: 'WINDOW_CLOSING',
          componentName: '${config.componentName}',
          timestamp: Date.now()
        }, '*');
      }
    });

    // Cleanup on window close
    window.addEventListener('unload', () => {
      if (window.messageCenterState) {
        window.messageCenterState.isOpen = false;
        window.messageCenterState.lastUpdated = Date.now();
      }
    });
  </script>
</body>
</html>`;
  }

  private generateAdditionalStyles(styles: string[] = []): string {
    return styles.map(style => `<link href="${style}" rel="stylesheet">`).join('\n  ');
  }

  private generateAdditionalScripts(scripts: string[] = []): string {
    return scripts.map(script => `<script src="${script}"></script>`).join('\n  ');
  }
}
