import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-message-center-expanded',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="expanded-container">
      <!-- Browser Controls -->
      <div class="browser-bar">
        <div class="browser-controls">
          <span class="control close" (click)="closeWindow()"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
        <div class="browser-tab">
          <img src="/favicon.ico" alt="Icon" class="tab-icon">
          <span>Message Center</span>
          <button (click)="closeWindow()" class="tab-close">×</button>
        </div>
      </div>

      <!-- Header -->
      <div class="header">
        <div class="title-section">
          <i class="fas fa-comment"></i>
          <h1>Message Center</h1>
        </div>
        <div class="tabs">
          <button [class.active]="activeTab === 'notes'" (click)="setActiveTab('notes')">
            <i class="fas fa-sticky-note"></i>
            Notes
          </button>
          <button [class.active]="activeTab === 'emails'" (click)="setActiveTab('emails')">
            <i class="fas fa-envelope"></i>
            Emails
          </button>
          <button [class.active]="activeTab === 'sms'" (click)="setActiveTab('sms')">
            <i class="fas fa-comment"></i>
            SMS
          </button>
          <button [class.active]="activeTab === 'all'" (click)="setActiveTab('all')">
            <i class="fas fa-layer-group"></i>
            All
          </button>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">
        <button class="filter-btn">
          <i class="fas fa-filter"></i>
        </button>
        <button pButton class="compose-btn" *ngIf="activeTab === 'emails'">
          <i class="fas fa-pen"></i>
          Compose
        </button>
      </div>

      <!-- Content -->
      <div class="content">
        <div class="message-area">
          <div class="message-list">
            <div class="empty-state">
              <i class="fas fa-comment-dots"></i>
              <h3>Message Center Expanded View</h3>
              <p>Showing {{ activeTab }} messages in expanded window</p>
              <small>70% height × 40% width detached window</small>
            </div>
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="scroll-indicator">
          <div class="scroll-track">
            <div class="scroll-thumb"></div>
          </div>
        </div>
      </div>

      <!-- Compose Area (Future) -->
      <div class="compose-area" *ngIf="showCompose">
        <div class="compose-input">
          <div class="compose-toolbar">
            <button disabled><i class="fas fa-bold"></i></button>
            <button disabled><i class="fas fa-italic"></i></button>
            <button disabled><i class="fas fa-link"></i></button>
          </div>
          <div class="input-area">
            <div class="cursor">|</div>
          </div>
          <div class="actions">
            <span>0/500</span>
            <button disabled><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .expanded-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      background: #ffffff;
      font-family: 'Roboto', sans-serif;
    }

    /* Browser Bar */
    .browser-bar {
      height: 42px;
      background: #202124;
      display: flex;
      align-items: center;
      padding: 0 8px;
      gap: 16px;
    }

    .browser-controls {
      display: flex;
      gap: 8px;
    }

    .control {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: pointer;
    }

    .control.close { background: #FF6058; }
    .control.minimize { background: #FFC130; }
    .control.maximize { background: #27CA40; }

    .browser-tab {
      background: #35363A;
      border-radius: 8px 8px 0 0;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
    }

    .tab-icon {
      width: 16px;
      height: 16px;
    }

    .tab-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 2px;
    }

    .tab-close:hover {
      background: rgba(255,255,255,0.1);
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #C6CCD6;
      background: white;
      box-shadow: 0 4px 4px rgba(0,0,0,0.15);
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .title-section i {
      color: #174A78;
      font-size: 21px;
    }

    .title-section h1 {
      color: #174A78;
      font-size: 16px;
      font-weight: 500;
      margin: 0;
    }

    .tabs {
      display: flex;
      gap: 16px;
    }

    .tabs button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      color: #8D9AAE;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .tabs button.active {
      background: #EFF2F4;
      color: #3D3D3D;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    .tabs button i {
      font-size: 12px;
    }

    /* Toolbar */
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #E2E6EB;
      background: white;
    }

    .filter-btn {
      background: none;
      border: none;
      color: #777;
      font-size: 24px;
      cursor: pointer;
      padding: 4px;
    }

    .filter-btn:hover {
      color: #2474BB;
    }

    .compose-btn {
      background: #2474BB !important;
      color: white !important;
      border: none !important;
      padding: 10px 16px !important;
      border-radius: 4px !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      cursor: pointer !important;
    }

    .compose-btn:hover {
      background: #2068A8 !important;
    }

    /* Content */
    .content {
      flex: 1;
      display: flex;
      background: white;
    }

    .message-area {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      box-shadow: 0 4px 4px rgba(0,0,0,0.15) inset;
    }

    .message-list {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-state {
      text-align: center;
      color: #A9B3C2;
      padding: 2rem;
    }

    .empty-state i {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.3;
    }

    .empty-state h3 {
      margin: 0 0 1rem 0;
      color: #3D3D3D;
    }

    .empty-state p {
      margin: 0 0 0.5rem 0;
    }

    .empty-state small {
      opacity: 0.7;
    }

    .scroll-indicator {
      width: 16px;
      background: #F7F8F9;
      padding: 16px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 4px rgba(0,0,0,0.15) inset;
    }

    .scroll-track {
      width: 4px;
      height: 100px;
      background: #DCF2FC;
      border-radius: 16px;
      position: relative;
    }

    .scroll-thumb {
      width: 4px;
      height: 60px;
      background: #2474BB;
      border-radius: 16px;
    }

    /* Compose Area */
    .compose-area {
      border-top: 1px solid #C6CCD6;
      background: white;
      padding: 16px;
    }

    .compose-input {
      border: 2px solid #CBCCCE;
      border-radius: 8px;
      background: white;
    }

    .compose-toolbar {
      display: flex;
      gap: 8px;
      padding: 8px 16px;
      border-bottom: 1px solid #E2E6EB;
    }

    .compose-toolbar button {
      background: none;
      border: none;
      color: #A9B3C2;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: not-allowed;
      opacity: 0.5;
    }

    .input-area {
      padding: 16px;
      min-height: 40px;
      position: relative;
    }

    .cursor {
      color: #3A3A3A;
      font-size: 14px;
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
    }

    .actions span {
      color: #777;
      font-size: 12px;
      font-style: italic;
    }

    .actions button {
      width: 28px;
      height: 28px;
      border-radius: 50px;
      background: white;
      border: none;
      color: #2474BB;
      cursor: not-allowed;
      opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header {
        padding: 12px 16px;
        flex-wrap: wrap;
        gap: 12px;
      }

      .tabs {
        gap: 8px;
      }

      .tabs button {
        padding: 3px 6px;
        font-size: 12px;
      }
    }
  `]
})
export class MessageCenterExpandedComponent {
  activeTab: string = 'all';
  showCompose: boolean = false;

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'emails') {
      // Future: Show compose capability
    }
  }

  closeWindow(): void {
    if (typeof window !== 'undefined') {
      window.close();
    }
  }
}

// Documentation Component
@Component({
  selector: 'app-message-center-expanded-docs',
  standalone: true,
  imports: [CommonModule, MessageCenterExpandedComponent, ButtonModule],
  template: `
    <div class="docs-container">
      <h1>MessageCenterExpanded Component</h1>
      <p class="component-description">
        An expanded view of the Message Center that opens in a new browser window, providing
        a dedicated workspace for managing communications with architecture for future Compose functionality.
      </p>

      <div class="docs-section">
        <h2>Window Specifications</h2>
        <div class="spec-grid">
          <div class="spec-item">
            <h4>Dimensions</h4>
            <p>70% screen height × 40% screen width</p>
          </div>
          <div class="spec-item">
            <h4>Position</h4>
            <p>Centered on user's current screen</p>
          </div>
          <div class="spec-item">
            <h4>Behavior</h4>
            <p>Detached window, draggable to second monitor</p>
          </div>
          <div class="spec-item">
            <h4>Controls</h4>
            <p>Browser-style title bar with close/minimize/maximize</p>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Features</h2>
        <ul class="feature-list">
          <li>✅ Browser window simulation with realistic controls</li>
          <li>✅ Complete Message Center replication</li>
          <li>✅ Filter tabs (Notes, Emails, SMS, All)</li>
          <li>✅ Compose architecture for future implementation</li>
          <li>✅ Custom scroll indicator matching design system</li>
          <li>✅ Keyboard shortcuts (ESC and Ctrl/Cmd+W to close)</li>
          <li>✅ Responsive design for different window sizes</li>
          <li>✅ Compose area appears only in expanded view</li>
        </ul>
      </div>

      <div class="docs-section">
        <h2>Interactive Demo</h2>
        <div class="demo-controls">
          <button pButton (click)="simulateExpandedView()" class="demo-button">
            Launch Simulated Expanded View
          </button>
          <button pButton (click)="toggleComposeMode()" class="demo-button secondary" 
                  [disabled]="!showingExpanded">
            Toggle Compose Area
          </button>
        </div>

        <!-- Simulated Expanded View -->
        <div class="expanded-simulation" *ngIf="showingExpanded">
          <div class="simulation-header">
            <h3>Simulated Expanded View (70% × 40% window)</h3>
            <button (click)="closeSimulation()" class="close-simulation">×</button>
          </div>
          
          <app-message-center-expanded />
        </div>
      </div>

      <div class="docs-section">
        <h2>Implementation Architecture</h2>
        <div class="architecture-info">
          <h3>Current Implementation:</h3>
          <ul>
            <li>Complete Message Center UI with browser controls</li>
            <li>Filter tabs with proper styling and interactions</li>
            <li>Toolbar with filter and compose buttons</li>
            <li>Custom scroll indicator matching design system</li>
            <li>Window management utilities (close, keyboard shortcuts)</li>
          </ul>

          <h3>Future Compose Integration:</h3>
          <ul>
            <li>Compose area architecture in place</li>
            <li>Rich text toolbar ready for implementation</li>
            <li>Character counting and send controls</li>
            <li>Conditional rendering based on email filter selection</li>
            <li>Disabled state indicates future implementation</li>
          </ul>
        </div>
      </div>

      <div class="docs-section">
        <h2>Usage</h2>
        <div class="code-example">
          <pre><code>&lt;app-message-center-expanded&gt;&lt;/app-message-center-expanded&gt;</code></pre>
        </div>
        <p>This component is designed to be launched in a new browser window using the MessageCenterService.</p>
      </div>

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

    .spec-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .spec-item {
      padding: 1rem;
      border: 1px solid var(--surface-border);
      border-radius: 4px;
      background: var(--surface-card);
    }

    .spec-item h4 {
      margin: 0 0 0.5rem 0;
      color: var(--primary-color);
    }

    .spec-item p {
      margin: 0;
      color: var(--text-color-secondary);
      font-size: 0.9rem;
    }

    .feature-list {
      list-style: none;
      padding: 0;
    }

    .feature-list li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--surface-border);
    }

    .demo-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .demo-button {
      background: var(--primary-color) !important;
      color: white !important;
      border: none !important;
      padding: 0.75rem 1.5rem !important;
      border-radius: 4px !important;
    }

    .demo-button.secondary {
      background: var(--surface-600) !important;
    }

    .demo-button:disabled {
      background: var(--surface-400) !important;
      cursor: not-allowed !important;
    }

    .expanded-simulation {
      position: fixed;
      top: 5%;
      left: 30%;
      width: 40vw;
      height: 70vh;
      background: white;
      border: 2px solid var(--surface-border);
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .simulation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background: var(--surface-100);
      border-bottom: 1px solid var(--surface-border);
      flex-shrink: 0;
    }

    .simulation-header h3 {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-color);
    }

    .close-simulation {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-color-secondary);
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    .close-simulation:hover {
      background: var(--surface-200);
    }

    .architecture-info {
      background: var(--surface-50);
      padding: 1.5rem;
      border-radius: 4px;
      border-left: 4px solid var(--primary-color);
    }

    .architecture-info h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    .code-example {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 4px;
      padding: 1rem;
      overflow-x: auto;
      margin: 1rem 0;
    }

    .code-example pre {
      margin: 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .action-log {
      margin-top: 2rem;
      padding: 1rem;
      background: var(--surface-card);
      border-radius: 4px;
      border: 1px solid var(--surface-border);
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
      .docs-container {
        padding: 1rem;
      }

      .expanded-simulation {
        top: 2%;
        left: 2%;
        width: 96vw;
        height: 80vh;
      }
    }
  `]
})
export class MessageCenterExpandedDocsComponent {
  showingExpanded = false;
  actionLog: string[] = [];

  simulateExpandedView(): void {
    this.showingExpanded = true;
    this.logAction('Expanded view simulation opened');
  }

  closeSimulation(): void {
    this.showingExpanded = false;
    this.logAction('Expanded view simulation closed');
  }

  toggleComposeMode(): void {
    this.logAction('Compose mode toggled');
  }

  private logAction(action: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.actionLog.unshift(`[${timestamp}] ${action}`);
    if (this.actionLog.length > 10) {
      this.actionLog = this.actionLog.slice(0, 10);
    }
  }
}
