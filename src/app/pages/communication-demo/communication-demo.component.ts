import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

// Import communication components
import { NotificationFabComponent } from '../components/notification-fab/notification-fab.component';
import { CommunicationPanelComponent, CommunicationMessage } from '../components/communication-panel/communication-panel.component';
import { MessageCenterExpandedComponent } from '../components/message-center-expanded/message-center-expanded.component';
import { FilterType } from '../components/message-center-header/message-center-header.component';

// Import services
import { MessageDataService } from '../../services/message-data.service';
import { MessageCenterStateService } from '../../services/message-center-state.service';
import { SimpleWindowLauncherService } from '../../services/simple-window-launcher.service';

@Component({
  selector: 'app-communication-demo',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NotificationFabComponent,
    CommunicationPanelComponent,
    MessageCenterExpandedComponent
  ],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h1>Communication Demo</h1>
        <p class="demo-description">
          This demo showcases the complete communication flow: FAB → Panel → Expanded Window with synchronized state management.
        </p>
      </div>

      <div class="demo-controls">
        <div class="control-section">
          <h3>Demo Controls</h3>
          <div class="button-group">
            <button pButton (click)="resetDemo()" class="control-button">
              Reset Demo
            </button>
            <button pButton (click)="addSampleMessage()" class="control-button secondary">
              Add Message
            </button>
            <button pButton (click)="markAllRead()" class="control-button secondary">
              Mark All Read
            </button>
          </div>
        </div>

        <div class="state-info">
          <h3>Current State</h3>
          <div class="state-grid">
            <div class="state-item">
              <label>Panel Open:</label>
              <span class="state-value">{{ isPanelOpen ? 'Yes' : 'No' }}</span>
            </div>
            <div class="state-item">
              <label>Active Filter:</label>
              <span class="state-value">{{ activeFilter | titlecase }}</span>
            </div>
            <div class="state-item">
              <label>Total Messages:</label>
              <span class="state-value">{{ messages.length }}</span>
            </div>
            <div class="state-item">
              <label>Unread Count:</label>
              <span class="state-value">{{ unreadCounts.all }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-flow">
        <div class="flow-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Notification FAB</h3>
            <p>Entry point showing unread count. Click to open the communication panel.</p>
            <div class="step-demo">
              <app-notification-fab
                [hasNotification]="unreadCounts.all > 0"
                [notificationCount]="unreadCounts.all"
                (clicked)="onFabClick()"
              />
            </div>
          </div>
        </div>

        <div class="flow-arrow" *ngIf="isPanelOpen">
          <i class="fas fa-arrow-down"></i>
        </div>

        <div class="flow-step" [class.active]="isPanelOpen">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Communication Panel</h3>
            <p>Slide-up panel with message filtering. Click "Open in Full View" to expand to new window.</p>
            <div class="step-demo panel-demo">
              <div class="panel-placeholder" *ngIf="!isPanelOpen">
                <i class="fas fa-window-restore"></i>
                <span>Panel will appear here when FAB is clicked</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flow-arrow" *ngIf="expandedWindowOpen">
          <i class="fas fa-external-link-alt"></i>
        </div>

        <div class="flow-step" [class.active]="expandedWindowOpen">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Expanded Window</h3>
            <p>Full-featured message center in a new browser window with synchronized state.</p>
            <div class="step-demo">
              <div class="window-placeholder" *ngIf="!expandedWindowOpen">
                <i class="fas fa-external-link-alt"></i>
                <span>Window opens separately</span>
              </div>
              <div class="window-status" *ngIf="expandedWindowOpen">
                <i class="fas fa-check-circle"></i>
                <span>Expanded window is open</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="feature-highlights">
        <h3>Key Features Demonstrated</h3>
        <div class="features-grid">
          <div class="feature-card">
            <i class="fas fa-sync-alt"></i>
            <h4>State Synchronization</h4>
            <p>Message read states sync across all views instantly</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-filter"></i>
            <h4>Smart Filtering</h4>
            <p>Filter by message type with live unread counts</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-window-restore"></i>
            <h4>Multi-View Support</h4>
            <p>Seamless transition from FAB to panel to expanded window</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-mobile-alt"></i>
            <h4>Responsive Design</h4>
            <p>Works perfectly on desktop and mobile devices</p>
          </div>
        </div>
      </div>

      <!-- Hidden component for expanded window management -->
      <app-message-center-expanded style="display: none;" />

      <!-- Communication Panel (appears when opened) -->
      <app-communication-panel
        [isOpen]="isPanelOpen"
        [messages]="messages"
        [activeFilter]="activeFilter"
        [unreadCounts]="unreadCounts"
        (panelClosed)="onPanelClosed()"
        (openInFullView)="onOpenInFullView()"
        (filterChanged)="onFilterChanged($event)"
        (composeEmail)="onComposeEmail()"
        (messageClicked)="onMessageClicked($event)"
        (filterClicked)="onFilterClicked()"
      />

      <div class="action-log" *ngIf="actionLog.length > 0">
        <h3>Action Log</h3>
        <div class="log-entries">
          <div *ngFor="let entry of actionLog" class="log-entry">
            {{ entry }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Inter', sans-serif;
    }

    .demo-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .demo-header h1 {
      color: var(--text-color);
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }

    .demo-description {
      font-size: 1.2rem;
      color: var(--text-color-secondary);
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .demo-controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
      padding: 1.5rem;
      background: var(--surface-card);
      border-radius: 8px;
      border: 1px solid var(--surface-border);
    }

    .control-section h3,
    .state-info h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: var(--text-color);
    }

    .button-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .control-button {
      background: var(--primary-color) !important;
      color: white !important;
      border: none !important;
      padding: 0.75rem 1.5rem !important;
      border-radius: 4px !important;
    }

    .control-button.secondary {
      background: var(--surface-600) !important;
    }

    .state-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .state-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: var(--surface-50);
      border-radius: 4px;
    }

    .state-item label {
      font-weight: 500;
      color: var(--text-color);
    }

    .state-value {
      font-weight: 600;
      color: var(--primary-color);
    }

    .demo-flow {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .flow-step {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      max-width: 600px;
      width: 100%;
      padding: 2rem;
      background: var(--surface-card);
      border-radius: 8px;
      border: 2px solid var(--surface-border);
      transition: all 0.3s ease;
    }

    .flow-step.active {
      border-color: var(--primary-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .flow-step.active .step-number {
      background: var(--primary-600);
      box-shadow: 0 0 0 4px rgba(var(--primary-color-rgb, 36, 116, 187), 0.2);
    }

    .step-content {
      flex: 1;
    }

    .step-content h3 {
      margin: 0 0 0.5rem 0;
      color: var(--text-color);
    }

    .step-content p {
      margin: 0 0 1rem 0;
      color: var(--text-color-secondary);
      line-height: 1.5;
    }

    .step-demo {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80px;
    }

    .panel-demo {
      min-height: 40px;
    }

    .panel-placeholder,
    .window-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-color-secondary);
      font-style: italic;
    }

    .panel-placeholder i,
    .window-placeholder i {
      font-size: 1.5rem;
      opacity: 0.6;
    }

    .window-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--green-600);
      font-weight: 500;
    }

    .window-status i {
      font-size: 1.2rem;
    }

    .flow-arrow {
      color: var(--primary-color);
      font-size: 1.5rem;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-5px); }
      60% { transform: translateY(-3px); }
    }

    .feature-highlights {
      margin-bottom: 3rem;
    }

    .feature-highlights h3 {
      text-align: center;
      margin-bottom: 2rem;
      color: var(--text-color);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .feature-card {
      text-align: center;
      padding: 1.5rem;
      background: var(--surface-card);
      border-radius: 8px;
      border: 1px solid var(--surface-border);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .feature-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .feature-card i {
      font-size: 2rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .feature-card h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text-color);
    }

    .feature-card p {
      margin: 0;
      color: var(--text-color-secondary);
      line-height: 1.5;
    }

    .action-log {
      margin-top: 2rem;
      padding: 1.5rem;
      background: var(--surface-card);
      border-radius: 8px;
      border: 1px solid var(--surface-border);
    }

    .action-log h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: var(--text-color);
    }

    .log-entries {
      max-height: 200px;
      overflow-y: auto;
    }

    .log-entry {
      padding: 0.25rem 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: var(--text-color-secondary);
    }

    @media (max-width: 768px) {
      .demo-container {
        padding: 1rem;
      }

      .demo-controls {
        grid-template-columns: 1fr;
      }

      .button-group {
        justify-content: center;
      }

      .state-grid {
        grid-template-columns: 1fr;
      }

      .flow-step {
        flex-direction: column;
        text-align: center;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CommunicationDemoComponent implements OnInit, OnDestroy {
  isPanelOpen = false;
  expandedWindowOpen = false;
  activeFilter: FilterType = 'all';
  messages: CommunicationMessage[] = [];
  unreadCounts: { [key in FilterType]: number } = {
    notes: 0,
    emails: 0,
    sms: 0,
    all: 0
  };
  actionLog: string[] = [];

  constructor(
    private messageDataService: MessageDataService,
    private stateService: MessageCenterStateService,
    private windowLauncher: SimpleWindowLauncherService
  ) {}

  ngOnInit(): void {
    // Subscribe to message data
    this.messageDataService.messages$.subscribe(messages => {
      this.messages = messages;
      this.logAction(`Loaded ${messages.length} messages`);
    });

    this.messageDataService.unreadCounts$.subscribe(counts => {
      this.unreadCounts = counts;
    });

    // Subscribe to state changes from the expanded window
    this.stateService.state$.subscribe(state => {
      if (state.messages) {
        // Update our local state when expanded window makes changes
        this.messages = state.messages;
      }
      if (state.unreadCounts) {
        this.unreadCounts = state.unreadCounts;
      }
    });

    // Initialize demo with some unread messages
    this.initializeDemoState();

    this.logAction('Communication demo initialized');
  }

  private initializeDemoState(): void {
    // Wait for initial data to load, then set some messages as unread for demo
    setTimeout(() => {
      if (this.messages.length > 0) {
        // Set some messages as unread for demonstration
        this.messageDataService.updateMessage(this.messages[0].id, { isRead: false });
        this.messageDataService.updateMessage(this.messages[1].id, { isRead: false });
        this.messageDataService.updateMessage(this.messages[2].id, { isRead: false });
        if (this.messages[8]) {
          this.messageDataService.updateMessage(this.messages[8].id, { isRead: false });
        }
        this.logAction('Demo initialized with unread messages');
      }
    }, 200);
  }

  ngOnDestroy(): void {
    // Clean up any open windows
    if (this.expandedWindowOpen) {
      this.windowLauncher.closeWindow();
    }
  }

  // FAB Actions
  onFabClick(): void {
    this.isPanelOpen = true;
    this.logAction('FAB clicked - Panel opened');
  }

  // Panel Actions
  onPanelClosed(): void {
    this.isPanelOpen = false;
    this.logAction('Panel closed');
  }

  onOpenInFullView(): void {
    this.expandedWindowOpen = true;
    this.windowLauncher.openMessageCenterWindow();
    this.logAction('Expanded window opened');

    // Listen for window close
    setTimeout(() => {
      const checkClosed = setInterval(() => {
        if (this.windowLauncher.isWindowClosed()) {
          this.expandedWindowOpen = false;
          this.logAction('Expanded window closed');
          clearInterval(checkClosed);
        }
      }, 1000);
    }, 1000);
  }

  onFilterChanged(filter: FilterType): void {
    this.activeFilter = filter;
    this.logAction(`Filter changed to: ${filter}`);
  }

  onMessageClicked(message: CommunicationMessage): void {
    // Update message through service to maintain sync
    this.messageDataService.updateMessage(message.id, { isRead: true });
    this.logAction(`Message ${message.id} clicked and marked as read`);
  }

  onComposeEmail(): void {
    this.logAction('Compose email clicked');
  }

  onFilterClicked(): void {
    this.logAction('Filter button clicked');
  }

  // Demo Controls
  resetDemo(): void {
    this.isPanelOpen = false;
    this.expandedWindowOpen = false;
    this.activeFilter = 'all';

    if (!this.windowLauncher.isWindowClosed()) {
      this.windowLauncher.closeWindow();
    }

    // Reset messages to initial state
    this.messageDataService.markAllAsRead();

    // Reinitialize demo state
    this.initializeDemoState();

    this.actionLog = [];
    this.logAction('Demo reset to initial state');
  }

  addSampleMessage(): void {
    const newMessage: CommunicationMessage = {
      id: `demo-${Date.now()}`,
      type: 'note',
      timestamp: new Date(),
      isRead: false,
      data: {
        author: 'Demo User',
        content: `New demo message added at ${new Date().toLocaleTimeString()}. This message demonstrates real-time state synchronization across all views.`,
        timestamp: new Date().toISOString(),
        isOwnMessage: Math.random() > 0.5,
        authorInitials: 'DU',
        authorName: 'Demo User'
      }
    };

    this.messageDataService.addMessage(newMessage);
    this.logAction(`Added new demo message: ${newMessage.id}`);
  }

  markAllRead(): void {
    this.messageDataService.markAllAsRead();
    this.logAction('All messages marked as read');
  }

  private logAction(action: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.actionLog.unshift(`[${timestamp}] ${action}`);
    if (this.actionLog.length > 15) {
      this.actionLog = this.actionLog.slice(0, 15);
    }
  }
}
