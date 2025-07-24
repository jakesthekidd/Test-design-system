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

  <!-- Zone.js (Independent instance) -->
  <script src="https://cdn.jsdelivr.net/npm/zone.js@0.14.0/dist/zone.min.js"></script>

  <!-- RxJS -->
  <script src="https://cdn.jsdelivr.net/npm/rxjs@7.8.0/dist/bundles/rxjs.umd.min.js"></script>

  <!-- Angular Core Libraries -->
  <script type="importmap">
  {
    "imports": {
      "@angular/core": "https://cdn.jsdelivr.net/npm/@angular/core@17.3.0/+esm",
      "@angular/common": "https://cdn.jsdelivr.net/npm/@angular/common@17.3.0/+esm",
      "@angular/platform-browser": "https://cdn.jsdelivr.net/npm/@angular/platform-browser@17.3.0/+esm",
      "@angular/platform-browser/animations": "https://cdn.jsdelivr.net/npm/@angular/platform-browser@17.3.0/animations/+esm",
      "rxjs": "https://cdn.jsdelivr.net/npm/rxjs@7.8.0/+esm",
      "rxjs/operators": "https://cdn.jsdelivr.net/npm/rxjs@7.8.0/operators/+esm"
    }
  }
  </script>

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
      document.getElementById('loading').style.display = 'none';
      document.getElementById('angular-app').style.display = 'none';
      document.getElementById('error').style.display = 'flex';

      const errorMsg = document.querySelector('.error-message');
      if (errorMsg && message) {
        errorMsg.textContent = message;
      }
    };

    // Function to show application
    window.showApp = function() {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('error').style.display = 'none';
      document.getElementById('angular-app').style.display = 'block';

      window.messageCenterConfig.ready = true;

      // Notify parent window
      if (window.opener) {
        window.opener.postMessage({
          type: 'ANGULAR_READY',
          componentName: '${config.componentName}'
        }, '*');
      }
    };

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
  </script>

  <!-- Angular Bootstrap Script -->
  <script type="module">
    import { bootstrapApplication } from '@angular/platform-browser';
    import { Component, importProvidersFrom } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

    console.log('Starting Angular bootstrap for ${config.componentName}...');

    @Component({
      selector: 'app-window-root',
      standalone: true,
      imports: [CommonModule],
      template: \`
        <div class="message-center-window">
          <div class="window-header">
            <div class="header-content">
              <div class="title-section">
                <i class="fas fa-comment"></i>
                <h1>Message Center Expanded</h1>
              </div>
              <button class="close-btn" (click)="closeWindow()">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div class="window-content">
            <div class="filter-tabs">
              <button
                class="tab"
                [class.active]="activeFilter === 'all'"
                (click)="setFilter('all')">
                <i class="fas fa-layer-group"></i>
                All
              </button>
              <button
                class="tab"
                [class.active]="activeFilter === 'notes'"
                (click)="setFilter('notes')">
                <i class="fas fa-sticky-note"></i>
                Notes
              </button>
              <button
                class="tab"
                [class.active]="activeFilter === 'emails'"
                (click)="setFilter('emails')">
                <i class="fas fa-envelope"></i>
                Emails
              </button>
              <button
                class="tab"
                [class.active]="activeFilter === 'sms'"
                (click)="setFilter('sms')">
                <i class="fas fa-comment"></i>
                SMS
              </button>
            </div>

            <div class="message-area">
              <div class="empty-state">
                <i class="fas fa-comment-dots"></i>
                <h3>MessageCenter Expanded</h3>
                <p>Independent Angular application running in separate window</p>
                <div class="features">
                  <div class="feature">
                    <i class="fas fa-check text-success"></i>
                    <span>Independent Zone.js Context</span>
                  </div>
                  <div class="feature">
                    <i class="fas fa-check text-success"></i>
                    <span>Dynamic Angular Bootstrap</span>
                  </div>
                  <div class="feature">
                    <i class="fas fa-check text-success"></i>
                    <span>Cross-Window Communication</span>
                  </div>
                  <div class="feature">
                    <i class="fas fa-check text-success"></i>
                    <span>Active Filter: {{activeFilter}}</span>
                  </div>
                </div>
                <div class="window-info">
                  <small>Window ID: message-center-expanded</small><br>
                  <small>Bootstrap Time: {{bootstrapTime}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`,
      styles: [\`
        .message-center-window {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--surface-ground, #ffffff);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .window-header {
          background: var(--surface-card, #ffffff);
          border-bottom: 1px solid var(--surface-border, #E2E6EB);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
        }

        .title-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .title-section i {
          color: var(--primary-color, #2474BB);
          font-size: 20px;
        }

        .title-section h1 {
          color: var(--text-color, #3D3D3D);
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: 1px solid var(--surface-border, #E2E6EB);
          border-radius: 4px;
          color: var(--text-color-secondary, #8D9AAE);
          cursor: pointer;
          padding: 8px 12px;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: var(--red-500, #DA1F2C);
          color: white;
          border-color: var(--red-500, #DA1F2C);
        }

        .window-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .filter-tabs {
          display: flex;
          gap: 16px;
          padding: 16px 24px;
          background: var(--surface-50, #F7F8F9);
          border-bottom: 1px solid var(--surface-border, #E2E6EB);
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          color: var(--text-color-secondary, #8D9AAE);
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .tab:hover {
          background: var(--surface-100, #F0F0F0);
        }

        .tab.active {
          background: var(--primary-color, #2474BB);
          color: white;
        }

        .tab i {
          font-size: 12px;
        }

        .message-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--surface-ground, #ffffff);
        }

        .empty-state {
          text-align: center;
          max-width: 500px;
        }

        .empty-state > i {
          font-size: 4rem;
          color: var(--primary-color, #2474BB);
          opacity: 0.3;
          margin-bottom: 1.5rem;
        }

        .empty-state h3 {
          color: var(--text-color, #3D3D3D);
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .empty-state p {
          color: var(--text-color-secondary, #8D9AAE);
          font-size: 1rem;
          margin: 0 0 2rem 0;
          line-height: 1.6;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          text-align: left;
          margin-bottom: 2rem;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
        }

        .feature i {
          font-size: 16px;
          width: 20px;
        }

        .text-success {
          color: var(--green-500, #22C55E);
        }

        .feature span {
          color: var(--text-color, #3D3D3D);
          font-size: 14px;
          font-weight: 500;
        }

        .window-info {
          padding: 1rem;
          background: var(--surface-50, #F7F8F9);
          border-radius: 6px;
          font-family: monospace;
          font-size: 12px;
          color: var(--text-color-secondary, #8D9AAE);
        }

        @media (max-width: 600px) {
          .header-content {
            padding: 12px 16px;
          }

          .filter-tabs {
            flex-wrap: wrap;
            gap: 8px;
            padding: 12px 16px;
          }

          .empty-state {
            padding: 1rem;
          }
        }
      \`]
    })
    class WindowRootComponent {
      activeFilter = 'all';
      bootstrapTime = new Date().toLocaleTimeString();

      ngOnInit() {
        console.log('MessageCenter Window Component initialized');
        this.setupCommunication();
        this.loadConfiguration();
      }

      setFilter(filter) {
        this.activeFilter = filter;
        this.notifyParent('FILTER_CHANGED', { filter });
      }

      closeWindow() {
        window.close();
      }

      setupCommunication() {
        // Listen for messages from parent
        window.addEventListener('message', (event) => {
          this.handleParentMessage(event.data);
        });

        // Notify parent that Angular is ready
        setTimeout(() => {
          this.notifyParent('ANGULAR_READY', {
            componentName: '${config.componentName}',
            activeFilter: this.activeFilter,
            bootstrapTime: this.bootstrapTime
          });
        }, 100);
      }

      loadConfiguration() {
        if (window.messageCenterConfig) {
          // Load any initial configuration
          console.log('Loaded config:', window.messageCenterConfig);
        }
      }

      handleParentMessage(data) {
        switch (data.type) {
          case 'UPDATE_CONFIG':
            console.log('Config update received:', data.payload);
            break;
          case 'UPDATE_FILTER':
            this.activeFilter = data.payload.filter;
            break;
          default:
            console.log('Unknown message from parent:', data.type);
        }
      }

      notifyParent(type, payload = {}) {
        if (window.opener) {
          window.opener.postMessage({ type, payload }, '*');
        }
      }
    }

    // Bootstrap the application
    bootstrapApplication(WindowRootComponent, {
      providers: [
        importProvidersFrom(BrowserAnimationsModule)
      ]
    }).then(appRef => {
      console.log('Message Center Window Angular app bootstrapped successfully');

      // Hide loading, show app
      if (window.showApp) {
        window.showApp();
      }

      // Notify parent
      if (window.opener) {
        window.opener.postMessage({
          type: 'COMPONENT_LOADED',
          componentName: '${config.componentName}'
        }, '*');
      }

    }).catch(error => {
      console.error('Error bootstrapping Message Center Window:', error);
      if (window.showError) {
        window.showError('Failed to bootstrap Angular: ' + error.message);
      }

      if (window.opener) {
        window.opener.postMessage({
          type: 'ERROR',
          error: error.message
        }, '*');
      }
    });
  </script>

  <!-- Handle window close -->
  <script>
    window.addEventListener('beforeunload', () => {
      if (window.opener) {
        window.opener.postMessage({
          type: 'WINDOW_CLOSING',
          componentName: '${config.componentName}'
        }, '*');
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
