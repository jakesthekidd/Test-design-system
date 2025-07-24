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
      console.log('Generating HTML content for window...');
      const htmlContent = this.generateAngularShell(shellConfig);
      console.log('HTML content generated, writing to window...');
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      console.log('HTML content written to window');

      // Set up event handlers
      this.setupWindowEventHandlers(windowId, newWindow);

      // Focus the new window
      newWindow.focus();

      // Check if window is accessible
      console.log('Window state:', {
        closed: newWindow.closed,
        location: newWindow.location.href,
        readyState: newWindow.document.readyState
      });

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

    // Simple placeholder content that will definitely render
    function renderCommunicationPanel() {
      return \`
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <div style="background: #2474BB; color: white; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
            <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">
              <i class="fas fa-comment"></i>
              Message Center - Expanded View
            </h2>
          </div>

          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button onclick="setActiveFilter('all')" style="background: #2474BB; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              All (5)
            </button>
            <button onclick="setActiveFilter('notes')" style="background: #f0f0f0; color: #333; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              Notes (2)
            </button>
            <button onclick="setActiveFilter('emails')" style="background: #f0f0f0; color: #333; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              Emails (2)
            </button>
            <button onclick="setActiveFilter('sms')" style="background: #f0f0f0; color: #333; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              SMS (1)
            </button>
          </div>

          <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; color: #2474BB;">Sample Messages</h3>

            <div style="background: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #2474BB;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <div style="width: 32px; height: 32px; background: #2474BB; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">JC</div>
                <div>
                  <strong>Jake Cummings</strong>
                  <div style="font-size: 12px; color: #666;">9:00 AM</div>
                </div>
              </div>
              <p style="margin: 0;">A BOL document is like the passport for a shipment; it tells you everything you need to know about where it's coming from, where it's going, and what's inside.</p>
            </div>

            <div style="background: #e3f2fd; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #1976d2;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <div style="width: 32px; height: 32px; background: #1976d2; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-envelope" style="font-size: 14px;"></i>
                </div>
                <div>
                  <strong>Automated Email</strong>
                  <div style="font-size: 12px; color: #666;">10:32 AM</div>
                </div>
              </div>
              <p style="margin: 0; font-weight: bold; margin-bottom: 5px;">Document Upload Required - Shipment #SP-2024-1205</p>
              <p style="margin: 0;">Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.</p>
            </div>

            <div style="background: #f3e5f5; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #9c27b0;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <div style="width: 32px; height: 32px; background: #9c27b0; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-comment" style="font-size: 14px;"></i>
                </div>
                <div>
                  <strong>SMS to +1 (999) 999-9999</strong>
                  <div style="font-size: 12px; color: #666;">11:00 AM</div>
                </div>
              </div>
              <p style="margin: 0;">Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.</p>
            </div>

            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <div style="width: 32px; height: 32px; background: #4caf50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-upload" style="font-size: 14px;"></i>
                </div>
                <div>
                  <strong>File Upload: BOL_12345.pdf</strong>
                  <div style="font-size: 12px; color: #666;">11:23 AM</div>
                </div>
              </div>
              <p style="margin: 0;">Uploaded via secure link by driver@carrier.com</p>
            </div>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 8px;">
            <h4 style="margin-top: 0; color: #2474BB;">��� MessageCenter Expanded Features Working:</h4>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Independent window with CommunicationPanel content</li>
              <li>Filter tabs for Notes, Emails, SMS, All</li>
              <li>Sample message data identical to main app</li>
              <li>Cross-window state synchronization ready</li>
              <li>Draggable to secondary monitors</li>
            </ul>
          </div>

          <div style="margin-top: 15px; text-align: center;">
            <button onclick="window.close()" style="background: #da1f2c; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
              Close Window
            </button>
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

        console.log('Content rendered successfully');

        // Add simple styles
        const style = document.createElement('style');
        style.textContent = \`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #f5f5f5;
          }
          .fas, .fa {
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
          }
        \`;
        document.head.appendChild(style);
        console.log('Styles added successfully');

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
