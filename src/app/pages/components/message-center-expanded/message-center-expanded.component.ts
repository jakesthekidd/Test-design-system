import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageCenterWindowService } from '../../../services/message-center-window.service';
import { MessageCenterStateService } from '../../../services/message-center-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-center-expanded',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-center-expanded">
      <div class="window-controls">
        <h3>Message Center Window Controls</h3>
        <div class="control-buttons">
          <button
            class="launch-btn"
            (click)="launchWindow()"
            [disabled]="isWindowOpen()">
            <i class="fas fa-external-link-alt"></i>
            Launch in New Window
          </button>

          <button
            class="close-btn"
            (click)="closeWindow()"
            [disabled]="!isWindowOpen()">
            <i class="fas fa-times"></i>
            Close Window
          </button>

          <button
            class="refresh-btn"
            (click)="refreshWindow()"
            [disabled]="!isWindowOpen()">
            <i class="fas fa-sync-alt"></i>
            Refresh
          </button>
        </div>
      </div>

      <div class="preset-controls">
        <h4>Quick Launch Presets</h4>
        <div class="preset-buttons">
          <button class="preset-btn" (click)="launchPreset('default')">
            <i class="fas fa-comment"></i>
            Default View
          </button>
          <button class="preset-btn" (click)="launchPreset('compose')">
            <i class="fas fa-pen"></i>
            Compose Mode
          </button>
          <button class="preset-btn" (click)="launchPreset('notifications')">
            <i class="fas fa-bell"></i>
            Notifications
          </button>
        </div>
      </div>

      <div class="window-status">
        <div class="status-indicator">
          <span class="status-dot" [class.active]="isWindowOpen()"></span>
          <span class="status-text">
            {{ isWindowOpen() ? 'Window is open' : 'Window is closed' }}
          </span>
        </div>

        <div class="status-details" *ngIf="isWindowOpen()">
          <p class="status-note">
            <i class="fas fa-info-circle"></i>
            The CommunicationPanel is now running in a separate window with:
          </p>
          <ul class="status-features">
            <li>✅ Independent Angular application instance</li>
            <li>✅ Separate Zone.js context</li>
            <li>✅ Identical message data and state</li>
            <li>✅ Full filter functionality</li>
            <li>✅ Cross-window communication</li>
            <li>✅ Real-time state synchronization</li>
            <li>✅ Persistent state across browser sessions</li>
          </ul>

          <div class="state-demo">
            <h4>State Management Demo:</h4>
            <div class="demo-actions">
              <button class="demo-btn" (click)="demonstrateStateSync()">
                <i class="fas fa-sync-alt"></i>
                Test State Sync
              </button>
              <button class="demo-btn" (click)="markAllMessagesRead()">
                <i class="fas fa-check-double"></i>
                Mark All Read
              </button>
            </div>
            <div class="state-info" *ngIf="currentState">
              <small>
                <strong>Current State:</strong>
                Filter: {{currentState.activeFilter}} |
                Unread: {{currentState.unreadCounts?.all || 0}} |
                Messages: {{currentState.messages?.length || 0}} |
                Window Open: {{currentState.isOpen}} |
                Last Updated: {{formatTimestamp(currentState.lastUpdated)}}
              </small>
            </div>

            <div class="debug-note" *ngIf="isWindowOpen()">
              <small>
                <i class="fas fa-bug"></i>
                <strong>Debug:</strong> Check browser console for window initialization logs and error details.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .message-center-expanded {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .window-controls {
      margin-bottom: 2rem;
      padding: 1.5rem;
      border: 1px solid var(--surface-border, #E2E6EB);
      border-radius: 8px;
      background: var(--surface-card, #ffffff);
    }

    .window-controls h3 {
      margin: 0 0 1rem 0;
      color: var(--text-color, #3D3D3D);
      font-size: 1.2rem;
      font-weight: 500;
    }

    .control-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .control-buttons button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .launch-btn {
      background: var(--primary-color, #2474BB);
      color: white;
    }

    .launch-btn:hover:not(:disabled) {
      background: var(--primary-600, #2068A8);
    }

    .close-btn {
      background: var(--red-500, #DA1F2C);
      color: white;
    }

    .close-btn:hover:not(:disabled) {
      background: var(--red-600, #C41E3A);
    }

    .refresh-btn {
      background: var(--surface-400, #E2E6EB);
      color: var(--text-color, #3D3D3D);
    }

    .refresh-btn:hover:not(:disabled) {
      background: var(--surface-500, #C6CCD6);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .preset-controls {
      margin-bottom: 2rem;
      padding: 1.5rem;
      border: 1px solid var(--surface-border, #E2E6EB);
      border-radius: 8px;
      background: var(--surface-50, #F7F8F9);
    }

    .preset-controls h4 {
      margin: 0 0 1rem 0;
      color: var(--text-color, #3D3D3D);
      font-size: 1rem;
      font-weight: 500;
    }

    .preset-buttons {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .preset-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid var(--surface-border, #E2E6EB);
      border-radius: 6px;
      background: white;
      color: var(--text-color, #3D3D3D);
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .preset-btn:hover {
      background: var(--surface-100, #F7F8F9);
      border-color: var(--primary-color, #2474BB);
    }

    .window-status {
      padding: 1rem;
      border-radius: 6px;
      background: var(--surface-100, #F7F8F9);
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--surface-400, #E2E6EB);
      transition: background-color 0.2s ease;
    }

    .status-dot.active {
      background: var(--green-500, #22C55E);
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
    }

    .status-text {
      font-size: 0.9rem;
      color: var(--text-color-secondary, #8D9AAE);
      font-weight: 500;
    }

    .status-details {
      margin-top: 1rem;
      padding: 1rem;
      background: var(--surface-50, #F7F8F9);
      border-radius: 6px;
      border-left: 4px solid var(--green-500, #22C55E);
    }

    .status-note {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 1rem 0;
      font-size: 0.9rem;
      color: var(--text-color, #3D3D3D);
      font-weight: 500;
    }

    .status-note i {
      color: var(--green-500, #22C55E);
    }

    .status-features {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .status-features li {
      padding: 0.25rem 0;
      font-size: 0.85rem;
      color: var(--text-color-secondary, #8D9AAE);
    }

    .state-demo {
      margin-top: 1.5rem;
      padding: 1rem;
      background: var(--surface-100, #F0F0F0);
      border-radius: 6px;
      border: 1px solid var(--surface-border, #E2E6EB);
    }

    .state-demo h4 {
      margin: 0 0 1rem 0;
      color: var(--text-color, #3D3D3D);
      font-size: 0.9rem;
      font-weight: 600;
    }

    .demo-actions {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .demo-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--primary-color, #2474BB);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .demo-btn:hover {
      background: var(--primary-600, #2068A8);
    }

    .demo-btn i {
      font-size: 0.8rem;
    }

    .state-info {
      padding: 0.75rem;
      background: var(--surface-0, #ffffff);
      border-radius: 4px;
      border: 1px solid var(--surface-border, #E2E6EB);
      font-family: monospace;
    }

    .state-info small {
      font-size: 0.75rem;
      color: var(--text-color-secondary, #8D9AAE);
      line-height: 1.4;
    }

    .debug-note {
      margin-top: 0.75rem;
      padding: 0.5rem;
      background: var(--surface-200, #E8E8E8);
      border-radius: 4px;
      border-left: 3px solid var(--orange-500, #FF9800);
    }

    .debug-note small {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: var(--text-color, #3D3D3D);
      font-family: monospace;
    }

    .debug-note i {
      color: var(--orange-600, #F57C00);
    }

    @media (max-width: 768px) {
      .message-center-expanded {
        padding: 1rem;
      }

      .control-buttons, .preset-buttons {
        flex-direction: column;
      }

      .control-buttons button, .preset-btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class MessageCenterExpandedComponent implements OnInit, OnDestroy {
  private stateSubscription: Subscription = new Subscription();
  currentState: any = null;

  constructor(
    private messageWindowService: MessageCenterWindowService,
    private stateService: MessageCenterStateService
  ) {}

  ngOnInit(): void {
    // Subscribe to state changes to update UI
    this.stateSubscription = this.stateService.state$.subscribe(state => {
      console.log('MessageCenter state updated:', state);
      this.currentState = state;
    });

    // Initialize current state
    this.currentState = this.stateService.getCurrentState();
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  demonstrateStateSync(): void {
    // Change filter to demonstrate state sync
    const filters = ['all', 'notes', 'emails', 'sms'] as const;
    const currentIndex = filters.indexOf(this.currentState?.activeFilter || 'all');
    const nextFilter = filters[(currentIndex + 1) % filters.length];

    this.stateService.changeFilter(nextFilter);
    console.log('Filter changed to demonstrate state sync:', nextFilter);
  }

  markAllMessagesRead(): void {
    this.stateService.getCurrentState().messages.forEach(message => {
      if (!message.isRead) {
        this.stateService.markMessageAsRead(message.id);
      }
    });
    console.log('All messages marked as read');
  }

  formatTimestamp(timestamp: number): string {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleTimeString();
  }

  async launchWindow(): Promise<void> {
    try {
      const window = await this.messageWindowService.openMessageCenter();
      if (window) {
        console.log('Message Center window launched successfully');
      } else {
        console.error('Failed to launch Message Center window');
      }
    } catch (error) {
      console.error('Error launching Message Center window:', error);
    }
  }

  closeWindow(): void {
    const success = this.messageWindowService.closeMessageCenter();
    if (success) {
      console.log('Message Center window closed successfully');
    } else {
      console.warn('No Message Center window to close or close failed');
    }
  }

  refreshWindow(): void {
    const success = this.messageWindowService.refreshMessageFeed();
    if (success) {
      console.log('Message Center window refreshed');
    } else {
      console.warn('Failed to refresh Message Center window');
    }
  }

  async launchPreset(preset: 'default' | 'compose' | 'notifications'): Promise<void> {
    try {
      const window = await this.messageWindowService.openWithPreset(preset);
      if (window) {
        console.log(`Message Center window launched with preset: ${preset}`);
      } else {
        console.error(`Failed to launch Message Center window with preset: ${preset}`);
      }
    } catch (error) {
      console.error(`Error launching Message Center window with preset ${preset}:`, error);
    }
  }

  isWindowOpen(): boolean {
    return this.messageWindowService.isMessageCenterOpen();
  }
}

// Documentation Component for Design System
@Component({
  selector: 'app-message-center-expanded-docs',
  standalone: true,
  imports: [CommonModule, MessageCenterExpandedComponent],
  template: `
    <div class="docs-container">
      <h1>MessageCenterExpanded Component</h1>
      <p class="component-description">
        A component that launches the Message Center in a separate browser window for multi-monitor workflows.
      </p>

      <div class="docs-section">
        <h2>Component Preview</h2>
        <div class="preview-container">
          <app-message-center-expanded></app-message-center-expanded>
        </div>
      </div>

      <div class="docs-section">
        <h2>CommunicationPanel Integration</h2>
        <div class="integration-info">
          <p><strong>The MessageCenterExpanded component renders the existing CommunicationPanel inside a new browser window without any modifications to the original component.</strong></p>

          <h3>Integration Features:</h3>
          <ul class="feature-list">
            <li>✅ <strong>Unmodified CommunicationPanel</strong> - Uses the exact same component from the main app</li>
            <li>✅ <strong>Identical State & Data</strong> - Same message data, filters, and behavior as main app</li>
            <li>✅ <strong>Independent Angular Instance</strong> - Separate Zone.js context and change detection</li>
            <li>✅ <strong>Cross-Window Communication</strong> - Parent-child messaging for state sync</li>
            <li>✅ <strong>Complete Message Feed</strong> - All bubble components render identically</li>
            <li>✅ <strong>Filter Functionality</strong> - Notes, Emails, SMS, All filters work as expected</li>
            <li>✅ <strong>Compose Architecture</strong> - Ready for email composition features</li>
            <li>✅ <strong>Multi-Monitor Support</strong> - Draggable to secondary screens</li>
          </ul>

          <h3>Technical Implementation:</h3>
          <ul class="tech-details">
            <li><strong>Dynamic HTML Generation:</strong> WindowLauncherService creates complete application shell</li>
            <li><strong>Bundle Loading:</strong> Main app JavaScript bundles loaded in separate window context</li>
            <li><strong>Style Injection:</strong> All design tokens and component styles automatically loaded</li>
            <li><strong>Error Handling:</strong> Comprehensive error catching with fallback states</li>
            <li><strong>Message Data:</strong> MessageDataService provides identical sample data to both contexts</li>
            <li><strong>Event Handling:</strong> Filter changes, message clicks, and compose actions work normally</li>
            <li><strong>State Synchronization:</strong> Real-time state sync via postMessage + BroadcastChannel</li>
            <li><strong>Responsive Design:</strong> Window resizing and mobile breakpoints maintained</li>
          </ul>
        </div>
      </div>

      <div class="docs-section">
        <h2>Window Management Features</h2>
        <ul class="feature-list">
          <li>Opens in separate browser window using window.open()</li>
          <li>Reuses existing CommunicationPanel component without modification</li>
          <li>Draggable to secondary monitors for multi-screen workflows</li>
          <li>Independent messaging experience with cross-window state sync</li>
          <li>Keyboard shortcuts (ESC, Ctrl/Cmd+W) to close window</li>
          <li>Preset configurations (Default, Compose, Notifications)</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .docs-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Inter', sans-serif;
    }

    .component-description {
      font-size: 1.1rem;
      color: var(--text-color-secondary);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .docs-section {
      margin-bottom: 3rem;
    }

    .docs-section h2 {
      color: var(--text-color);
      border-bottom: 2px solid var(--surface-border);
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .preview-container {
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 2rem;
      background: var(--surface-card);
    }

    .integration-info {
      background: var(--surface-50, #F7F8F9);
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid var(--primary-color, #2474BB);
      margin-bottom: 2rem;
    }

    .integration-info h3 {
      color: var(--primary-color, #2474BB);
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }

    .integration-info h3:first-of-type {
      margin-top: 1rem;
    }

    .feature-list {
      list-style: none;
      padding: 0;
    }

    .feature-list li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--surface-border, #E2E6EB);
      font-size: 0.95rem;
    }

    .tech-details {
      list-style-type: disc;
      padding-left: 1.5rem;
    }

    .tech-details li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
      font-size: 0.9rem;
      color: var(--text-color-secondary, #8D9AAE);
    }

    ul {
      list-style-type: disc;
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  `]
})
export class MessageCenterExpandedDocsComponent {
  // Documentation component implementation
}
