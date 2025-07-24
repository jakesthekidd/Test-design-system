import { bootstrapApplication } from '@angular/platform-browser';
import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

// Import the actual components we need
import { CommunicationPanelComponent } from '../pages/components/communication-panel/communication-panel.component';
import { MessageCenterHeaderComponent } from '../pages/components/message-center-header/message-center-header.component';

@Component({
  selector: 'app-window-root',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule,
    CommunicationPanelComponent,
    MessageCenterHeaderComponent
  ],
  template: `
    <div class="window-app-container">
      <!-- MessageCenter Expanded Window View -->
      <div class="expanded-message-center">
        <!-- Header Section -->
        <div class="header-section">
          <app-message-center-header 
            [unreadCounts]="unreadCounts"
            [activeFilter]="activeFilter"
            (filterChanged)="onFilterChange($event)"
            (actionsRequested)="onActionsRequested()">
          </app-message-center-header>
        </div>
        
        <!-- Main Content Area -->
        <div class="content-section">
          <app-communication-panel
            [isExpanded]="true"
            [activeFilter]="activeFilter"
            (filterChange)="onFilterChange($event)"
            (messageClick)="onMessageClick($event)">
          </app-communication-panel>
        </div>
        
        <!-- Window Controls -->
        <div class="window-controls">
          <button 
            pButton 
            type="button" 
            icon="pi pi-times" 
            class="p-button-text p-button-rounded close-btn"
            (click)="closeWindow()"
            title="Close Window (ESC)">
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .window-app-container {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      background: var(--surface-ground, #ffffff);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      overflow: hidden;
    }
    
    .expanded-message-center {
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    .header-section {
      flex-shrink: 0;
      border-bottom: 1px solid var(--surface-border, #E2E6EB);
      background: var(--surface-card, #ffffff);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }
    
    .content-section {
      flex: 1;
      overflow: hidden;
      background: var(--surface-ground, #F7F8F9);
    }
    
    .window-controls {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 100;
    }
    
    .close-btn {
      width: 32px !important;
      height: 32px !important;
      background: rgba(255, 255, 255, 0.9) !important;
      border: 1px solid var(--surface-border, #E2E6EB) !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
    }
    
    .close-btn:hover {
      background: var(--red-500, #DA1F2C) !important;
      color: white !important;
    }
    
    /* Responsive adjustments for smaller windows */
    @media (max-width: 600px) {
      .window-controls {
        top: 4px;
        right: 4px;
      }
      
      .close-btn {
        width: 28px !important;
        height: 28px !important;
      }
    }
  `]
})
export class WindowRootComponent implements OnInit {
  activeFilter: string = 'all';
  unreadCounts = {
    all: 0,
    notes: 0,
    emails: 0,
    sms: 0
  };

  ngOnInit() {
    // Set up window-specific initialization
    this.setupWindowCommunication();
    this.setupKeyboardShortcuts();
    
    // Get initial configuration from window
    if ((window as any).messageCenterConfig) {
      this.loadConfiguration((window as any).messageCenterConfig);
    }
    
    // Notify parent that Angular is ready
    this.notifyParentReady();
  }

  onFilterChange(filter: string): void {
    this.activeFilter = filter;
    this.notifyParent('FILTER_CHANGED', { filter });
  }

  onActionsRequested(): void {
    this.notifyParent('ACTIONS_REQUESTED', {});
  }

  onMessageClick(message: any): void {
    this.notifyParent('MESSAGE_CLICKED', { message });
  }

  closeWindow(): void {
    window.close();
  }

  private setupWindowCommunication(): void {
    // Listen for messages from parent window
    window.addEventListener('message', (event) => {
      this.handleParentMessage(event.data);
    });
  }

  private setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', (event) => {
      // ESC to close
      if (event.key === 'Escape') {
        this.closeWindow();
      }
      // Ctrl/Cmd + W to close
      if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
        event.preventDefault();
        this.closeWindow();
      }
    });
  }

  private loadConfiguration(config: any): void {
    if (config.activeFilter) {
      this.activeFilter = config.activeFilter;
    }
    if (config.unreadCounts) {
      this.unreadCounts = { ...this.unreadCounts, ...config.unreadCounts };
    }
  }

  private handleParentMessage(data: any): void {
    switch (data.type) {
      case 'UPDATE_CONFIG':
        this.loadConfiguration(data.payload);
        break;
      case 'UPDATE_FILTER':
        this.activeFilter = data.payload.filter;
        break;
      case 'UPDATE_UNREAD_COUNT':
        this.unreadCounts = { ...this.unreadCounts, ...data.payload };
        break;
      case 'REFRESH_MESSAGES':
        // Trigger refresh in communication panel
        break;
      default:
        console.log('Unknown message from parent:', data.type);
    }
  }

  private notifyParent(type: string, payload: any = {}): void {
    if (window.opener) {
      window.opener.postMessage({ type, payload }, '*');
    }
  }

  private notifyParentReady(): void {
    setTimeout(() => {
      this.notifyParent('ANGULAR_READY', {
        componentName: 'MessageCenterExpanded',
        activeFilter: this.activeFilter,
        unreadCounts: this.unreadCounts
      });
    }, 100);
  }
}

// Bootstrap function that will be called from the window
export function bootstrapMessageCenterWindow() {
  console.log('Bootstrapping Message Center Window...');
  
  return bootstrapApplication(WindowRootComponent, {
    providers: [
      importProvidersFrom(BrowserAnimationsModule),
      // Add any other providers needed
    ]
  }).then(appRef => {
    console.log('Message Center Window bootstrapped successfully');
    
    // Notify that Angular is ready
    if (window.opener) {
      window.opener.postMessage({
        type: 'COMPONENT_LOADED',
        componentName: 'MessageCenterExpanded'
      }, '*');
    }
    
    return appRef;
  }).catch(error => {
    console.error('Error bootstrapping Message Center Window:', error);
    
    // Show error state
    if ((window as any).showError) {
      (window as any).showError('Failed to bootstrap Angular application: ' + error.message);
    }
    
    // Notify parent of error
    if (window.opener) {
      window.opener.postMessage({
        type: 'ERROR',
        error: error.message
      }, '*');
    }
    
    throw error;
  });
}

// Make bootstrap function globally available
(window as any).bootstrapMessageCenterWindow = bootstrapMessageCenterWindow;
