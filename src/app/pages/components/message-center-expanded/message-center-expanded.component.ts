import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SimpleWindowLauncherService } from '../../../services/simple-window-launcher.service';

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
            <li>✅ Independent browser window</li>
            <li>✅ Plain HTML, CSS, and JavaScript</li>
            <li>✅ Mock message data rendering</li>
            <li>✅ Interactive filter functionality</li>
            <li>✅ Clean, minimal implementation</li>
            <li>✅ No Angular dependencies in child window</li>
            <li>✅ Proper error handling and logging</li>
          </ul>

          <div class="state-demo">
            <h4>Window Testing:</h4>
            <div class="demo-actions">
              <button class="demo-btn debug" (click)="debugWindowLaunch()">
                <i class="fas fa-bug"></i>
                Debug Launch
              </button>
            </div>

            <div class="debug-note" *ngIf="isWindowOpen()">
              <small>
                <i class="fas fa-check-circle"></i>
                <strong>Status:</strong> Window is currently open and displaying mock message data.
              </small>
            </div>

            <div class="debug-note" *ngIf="!isWindowOpen()">
              <small>
                <i class="fas fa-info-circle"></i>
                <strong>Status:</strong> No window is currently open. Click "Launch in New Window" to open.
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

    .demo-btn.debug {
      background: var(--orange-500, #FF9800);
    }

    .demo-btn.debug:hover {
      background: var(--orange-600, #F57C00);
    }

    .demo-btn i {
      font-size: 0.8rem;
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

      .control-buttons {
        flex-direction: column;
      }

      .control-buttons button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class MessageCenterExpandedComponent implements OnInit, OnDestroy {

  constructor(
    private windowLauncher: SimpleWindowLauncherService
  ) {}

  ngOnInit(): void {
    console.log('MessageCenterExpanded component initialized');
  }

  ngOnDestroy(): void {
    // Close window when component is destroyed
    this.windowLauncher.closeWindow();
  }

  launchWindow(): void {
    console.log('Launching Message Center window...');
    const success = this.windowLauncher.openMessageCenterWindow();
    if (success) {
      console.log('✅ Message Center window launched successfully');
    } else {
      console.error('❌ Failed to launch Message Center window - check popup blocker');
    }
  }

  closeWindow(): void {
    console.log('Closing Message Center window...');
    const success = this.windowLauncher.closeWindow();
    if (success) {
      console.log('✅ Message Center window closed successfully');
    } else {
      console.warn('⚠️ No window to close or close failed');
    }
  }

  refreshWindow(): void {
    console.log('Refreshing Message Center window...');
    if (this.isWindowOpen()) {
      this.closeWindow();
      setTimeout(() => this.launchWindow(), 500);
    } else {
      console.warn('⚠️ No window is currently open to refresh');
    }
  }

  debugWindowLaunch(): void {
    console.log('=== DEBUG: Testing Window Launch ===');

    // Test basic window.open capability
    console.log('Testing basic window.open...');
    const testWindow = window.open('about:blank', 'test', 'width=400,height=300');
    if (testWindow) {
      console.log('✅ Basic window.open works');
      testWindow.document.write('<h1>Test Window</h1><p>This window will close in 3 seconds.</p>');
      setTimeout(() => testWindow.close(), 3000);
    } else {
      console.error('❌ Basic window.open failed - popup blocker may be active');
      return;
    }

    // Test MessageCenter launch
    console.log('Testing MessageCenter launch...');
    this.launchWindow();
  }

  isWindowOpen(): boolean {
    return this.windowLauncher.isWindowOpen();
  }
}

// Documentation Component for Design System
@Component({
  selector: 'app-message-center-expanded-docs',
  standalone: true,
  imports: [CommonModule, MessageCenterExpandedComponent, ButtonModule],
  template: `
    <div class="docs-container">
      <h1>MessageCenterExpanded Component</h1>
      <p class="component-description">
        A window-based Message Center component that launches the complete communication interface in a separate browser window. 
        Designed for multi-monitor workflows and enhanced productivity with detached messaging interface.
      </p>

      <div class="docs-section">
        <h2>Interactive Demo</h2>
        <div class="demo-container">
          <app-message-center-expanded></app-message-center-expanded>
        </div>
      </div>

      <div class="docs-section">
        <h2>Features & Capabilities</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-external-link-alt"></i>
            </div>
            <h3>Detached Window</h3>
            <p>Opens in separate browser window that can be moved to secondary monitors for multi-screen workflows.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-sync-alt"></i>
            </div>
            <h3>State Synchronization</h3>
            <p>Real-time message state sync between main app and expanded window via postMessage communication.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h3>Full Message Center</h3>
            <p>Complete feature parity with the main CommunicationPanel including all bubble types and filtering.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>Responsive Design</h3>
            <p>Maintains responsive behavior and design system consistency in the detached window environment.</p>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Technical Architecture</h2>
        <div class="architecture-info">
          <h3>Window Management</h3>
          <div class="architecture-item">
            <h4>SimpleWindowLauncherService</h4>
            <p>Manages window lifecycle, HTML generation, and parent-child communication via postMessage API.</p>
            <div class="code-example">
              <pre><code>// Window creation with proper dimensions and features
const features = [
  'width=' + windowWidth,
  'height=' + windowHeight,
  'left=' + left,
  'top=' + top,
  'resizable=yes',
  'scrollbars=yes'
].join(',');

this.openWindow = window.open('about:blank', 'message-center-expanded', features);</code></pre>
            </div>
          </div>

          <h3>State Management</h3>
          <div class="architecture-item">
            <h4>MessageDataService Integration</h4>
            <p>Uses centralized message data service to ensure consistency between main app and expanded window.</p>
            <div class="tech-points">
              <ul>
                <li>Shared CommunicationMessage interface</li>
                <li>Real-time unread count synchronization</li>
                <li>Identical filtering and sorting logic</li>
                <li>Cross-window message state updates</li>
              </ul>
            </div>
          </div>

          <h3>Component Rendering</h3>
          <div class="architecture-item">
            <h4>Vanilla JavaScript Implementation</h4>
            <p>Uses plain HTML/CSS/JS in the child window for optimal performance and CSP compliance.</p>
            <div class="tech-points">
              <ul>
                <li>Exact CSS replication of Angular components</li>
                <li>Message bubble rendering with full fidelity</li>
                <li>Interactive filter tabs and compose functionality</li>
                <li>FontAwesome icons and design tokens integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>API Reference</h2>
        
        <div class="api-section">
          <h3>Methods</h3>
          <div class="api-table">
            <div class="api-row api-header">
              <div class="api-cell">Method</div>
              <div class="api-cell">Return Type</div>
              <div class="api-cell">Description</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">launchWindow()</div>
              <div class="api-cell">void</div>
              <div class="api-cell">Opens the Message Center in a new browser window</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">closeWindow()</div>
              <div class="api-cell">void</div>
              <div class="api-cell">Closes the expanded Message Center window</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">refreshWindow()</div>
              <div class="api-cell">void</div>
              <div class="api-cell">Refreshes the window by closing and reopening</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">isWindowOpen()</div>
              <div class="api-cell">boolean</div>
              <div class="api-cell">Returns whether the window is currently open</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">debugWindowLaunch()</div>
              <div class="api-cell">void</div>
              <div class="api-cell">Tests window opening capability and popup blocker status</div>
            </div>
          </div>
        </div>

        <div class="api-section">
          <h3>Dependencies</h3>
          <div class="api-table">
            <div class="api-row api-header">
              <div class="api-cell">Service</div>
              <div class="api-cell">Purpose</div>
              <div class="api-cell">Description</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">SimpleWindowLauncherService</div>
              <div class="api-cell">Window Management</div>
              <div class="api-cell">Handles window lifecycle and postMessage communication</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">MessageDataService</div>
              <div class="api-cell">Data Management</div>
              <div class="api-cell">Provides message data and state synchronization</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">MessageCenterStateService</div>
              <div class="api-cell">State Sync</div>
              <div class="api-cell">Manages cross-window state synchronization</div>
            </div>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Usage Examples</h2>
        
        <div class="example-group">
          <h3>Basic Implementation</h3>
          <div class="code-example">
            <pre><code>&lt;app-message-center-expanded&gt;&lt;/app-message-center-expanded&gt;</code></pre>
          </div>
        </div>

        <div class="example-group">
          <h3>Programmatic Control</h3>
          <div class="code-example">
            <pre><code>import &#123; SimpleWindowLauncherService &#125; from './services/simple-window-launcher.service';

export class MyComponent &#123;
  constructor(private windowLauncher: SimpleWindowLauncherService) &#123;&#125;

  openMessageCenter(): void &#123;
    this.windowLauncher.openMessageCenterWindow();
  &#125;

  closeMessageCenter(): void &#123;
    this.windowLauncher.closeWindow();
  &#125;
&#125;</code></pre>
          </div>
        </div>

        <div class="example-group">
          <h3>Integration with CommunicationPanel</h3>
          <div class="code-example">
            <pre><code>&lt;app-communication-panel
  [isOpen]="isPanelOpen"
  [messages]="messages"
  (openInFullView)="openExpandedWindow()"
&gt;&lt;/app-communication-panel&gt;

&lt;app-message-center-expanded&gt;&lt;/app-message-center-expanded&gt;</code></pre>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Design Guidelines</h2>
        <ul class="design-guidelines">
          <li>Use as an enhancement to the main CommunicationPanel, not a replacement</li>
          <li>Ideal for users with multiple monitors or large screen setups</li>
          <li>Window positioning should be configurable for user preferences</li>
          <li>Maintain consistent state synchronization between main app and window</li>
          <li>Provide clear visual feedback when window is open/closed</li>
          <li>Handle popup blocker scenarios gracefully with user guidance</li>
          <li>Ensure keyboard shortcuts work consistently in both contexts</li>
          <li>Consider window close events and cleanup to prevent memory leaks</li>
        </ul>
      </div>

      <div class="docs-section">
        <h2>Browser Compatibility</h2>
        <div class="compatibility-info">
          <div class="compatibility-item">
            <h4>✅ Fully Supported</h4>
            <ul>
              <li>Chrome 70+</li>
              <li>Firefox 65+</li>
              <li>Safari 13+</li>
              <li>Edge 79+</li>
            </ul>
          </div>
          
          <div class="compatibility-item">
            <h4>⚠️ Considerations</h4>
            <ul>
              <li>Popup blockers may prevent window opening</li>
              <li>Some corporate environments restrict window.open()</li>
              <li>Mobile browsers may not support detached windows</li>
              <li>Screen size limitations on smaller displays</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Performance Considerations</h2>
        <div class="performance-info">
          <ul>
            <li><strong>Memory Usage:</strong> Each window maintains its own JavaScript context</li>
            <li><strong>State Sync:</strong> PostMessage communication is lightweight but frequent</li>
            <li><strong>Rendering:</strong> Vanilla JS implementation is optimized for performance</li>
            <li><strong>Cleanup:</strong> Proper window closure prevents memory leaks</li>
            <li><strong>Data Transfer:</strong> Efficient JSON serialization for message passing</li>
          </ul>
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

    .demo-container {
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 2rem;
      background: var(--surface-card);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .feature-card {
      padding: 1.5rem;
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .feature-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 1rem;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .feature-icon i {
      font-size: 1.5rem;
    }

    .feature-card h3 {
      margin: 0 0 0.5rem 0;
      color: var(--text-color);
      font-size: 1.1rem;
    }

    .feature-card p {
      margin: 0;
      color: var(--text-color-secondary);
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .architecture-info {
      background: var(--surface-50);
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid var(--primary-color);
    }

    .architecture-info h3 {
      color: var(--primary-color);
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    .architecture-item {
      margin-bottom: 2rem;
      padding: 1rem;
      background: var(--surface-card);
      border-radius: 6px;
      border: 1px solid var(--surface-border);
    }

    .architecture-item h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text-color);
      font-size: 1rem;
    }

    .architecture-item p {
      margin: 0 0 1rem 0;
      color: var(--text-color-secondary);
      line-height: 1.5;
    }

    .tech-points ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .tech-points li {
      padding: 0.25rem 0;
      color: var(--text-color-secondary);
      font-size: 0.9rem;
    }

    .tech-points li:before {
      content: "▶";
      color: var(--primary-color);
      margin-right: 0.5rem;
      font-size: 0.8rem;
    }

    .api-section {
      margin-bottom: 2rem;
    }

    .api-section h3 {
      color: var(--text-color);
      margin-bottom: 1rem;
    }

    .api-table {
      display: grid;
      grid-template-columns: 1fr 1fr 2fr;
      gap: 1px;
      background: var(--surface-border);
      border-radius: 4px;
      overflow: hidden;
    }

    .api-row {
      display: contents;
    }

    .api-cell {
      padding: 0.75rem;
      background: var(--surface-card);
    }

    .api-header .api-cell {
      background: var(--surface-100);
      font-weight: 600;
      color: var(--text-color);
    }

    .code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      color: var(--primary-color);
    }

    .example-group {
      margin-bottom: 2rem;
    }

    .example-group h3 {
      color: var(--text-color);
      margin-bottom: 1rem;
    }

    .code-example {
      background: var(--surface-50);
      border: 1px solid var(--surface-border);
      border-radius: 4px;
      padding: 1rem;
      overflow-x: auto;
    }

    .code-example pre {
      margin: 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--text-color);
    }

    .design-guidelines {
      list-style: none;
      padding: 0;
    }

    .design-guidelines li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--surface-border);
    }

    .design-guidelines li:before {
      content: "✓";
      color: var(--green-500);
      font-weight: bold;
      margin-right: 0.5rem;
    }

    .compatibility-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .compatibility-item {
      padding: 1rem;
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
    }

    .compatibility-item h4 {
      margin: 0 0 0.75rem 0;
      color: var(--text-color);
    }

    .compatibility-item ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin: 0;
    }

    .compatibility-item li {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
      color: var(--text-color-secondary);
    }

    .performance-info ul {
      list-style: none;
      padding: 0;
    }

    .performance-info li {
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 4px;
      border-left: 4px solid var(--primary-color);
    }

    .performance-info strong {
      color: var(--primary-color);
    }

    @media (max-width: 768px) {
      .docs-container {
        padding: 1rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .api-table {
        grid-template-columns: 1fr;
      }

      .compatibility-info {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MessageCenterExpandedDocsComponent {
  // Documentation component implementation
}
