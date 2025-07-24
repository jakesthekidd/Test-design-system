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
      Initializing Angular application in separate window
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
  
  <!-- Angular Scripts -->
  <script src="${this.baseUrl}/polyfills.js"></script>
  <script src="${this.baseUrl}/main.js"></script>
  
  ${this.generateAdditionalScripts(config.additionalScripts)}
  
  <!-- Window Initialization Script -->
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      console.log('Angular window DOM loaded');
      
      // Configuration for the component
      window.angularConfig = {
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
        
        window.angularConfig.ready = true;
        
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
      
      // Simulate Angular bootstrap (will be replaced by actual Angular bootstrap)
      setTimeout(() => {
        try {
          // This will be replaced by actual component loading
          window.showApp();
          console.log('Angular application initialized');
        } catch (error) {
          console.error('Error initializing Angular:', error);
          window.showError('Failed to initialize Angular application: ' + error.message);
        }
      }, 2000);
    });
    
    // Handle window close
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
