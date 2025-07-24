import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

export interface NotificationFabConfig {
  hasNotification: boolean;
  notificationCount?: number;
  icon?: string;
  ariaLabel?: string;
}

@Component({
  selector: 'app-notification-fab',
  standalone: true,
  imports: [CommonModule, ButtonModule, BadgeModule],
  template: `
    <div class="notification-fab-container">
      <button
        pButton
        type="button"
        [class]="getButtonClasses()"
        [attr.aria-label]="ariaLabel"
        (click)="onFabClick()"
        (mouseenter)="isHovered = true"
        (mouseleave)="isHovered = false"
      >
        <i [class]="icon" [class.icon-hover]="isHovered"></i>
        <span 
          *ngIf="hasNotification" 
          class="notification-badge"
          [class.badge-hover]="isHovered"
        >
          {{ notificationCount || '' }}
        </span>
      </button>
    </div>
  `,
  styles: [`
    .notification-fab-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .fab-button {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      background: var(--surface-0, #ffffff);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      position: relative;
    }

    .fab-button:hover,
    .fab-button.hover-state {
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);
    }

    .fab-button i {
      color: var(--blue-900, #0E2E4B);
      font-size: 24px;
      transition: font-size 0.2s ease-in-out;
    }

    .fab-button i.icon-hover {
      font-size: 30px;
    }

    .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--status-alert, #DA1F2C);
      color: var(--surface-0, #ffffff);
      border-radius: 10px;
      min-width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-weight: 500;
      padding: 2px 6px;
      transition: all 0.2s ease-in-out;
      z-index: 1;
    }

    .notification-badge.badge-hover {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .notification-badge:empty {
      min-width: 12px;
      width: 12px;
      height: 12px;
      padding: 0;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .fab-button {
        width: 48px;
        height: 48px;
      }

      .fab-button i {
        font-size: 20px;
      }

      .fab-button i.icon-hover {
        font-size: 24px;
      }

      .notification-badge {
        font-size: 11px;
        min-width: 18px;
        height: 18px;
        top: -6px;
        right: -6px;
      }
    }

    /* Focus styles for accessibility */
    .fab-button:focus {
      outline: 2px solid var(--primary-500, #3B82F6);
      outline-offset: 2px;
    }

    /* Ensure proper z-index for floating */
    .notification-fab-container {
      z-index: 1000;
    }
  `]
})
export class NotificationFabComponent {
  @Input() hasNotification: boolean = false;
  @Input() notificationCount?: number;
  @Input() icon: string = 'pi pi-comments';
  @Input() ariaLabel: string = 'Open Message Center';

  @Output() clicked = new EventEmitter<void>();

  isHovered: boolean = false;

  getButtonClasses(): string {
    return `fab-button ${this.isHovered ? 'hover-state' : ''}`;
  }

  onFabClick(): void {
    this.clicked.emit();
  }
}

// Documentation Component
@Component({
  selector: 'app-notification-fab-docs',
  standalone: true,
  imports: [CommonModule, NotificationFabComponent, ButtonModule],
  template: `
    <div class="docs-container">
      <h1>NotificationFab Component</h1>
      <p class="component-description">
        A floating action button that serves as the global entry point to the Message Center. 
        Supports notification badges and hover states for enhanced user interaction.
      </p>

      <div class="docs-section">
        <h2>Examples</h2>
        
        <div class="example-group">
          <h3>Default State</h3>
          <div class="example-container">
            <app-notification-fab
              [hasNotification]="false"
              (clicked)="onFabClick('Default')"
            />
          </div>
        </div>

        <div class="example-group">
          <h3>With Notification Count</h3>
          <div class="example-container">
            <app-notification-fab
              [hasNotification]="true"
              [notificationCount]="3"
              (clicked)="onFabClick('With Count')"
            />
          </div>
        </div>

        <div class="example-group">
          <h3>With Notification Dot (No Count)</h3>
          <div class="example-container">
            <app-notification-fab
              [hasNotification]="true"
              (clicked)="onFabClick('Notification Dot')"
            />
          </div>
        </div>

        <div class="example-group">
          <h3>Custom Icon</h3>
          <div class="example-container">
            <app-notification-fab
              [hasNotification]="true"
              [notificationCount]="12"
              icon="pi pi-bell"
              ariaLabel="Open Notifications"
              (clicked)="onFabClick('Custom Icon')"
            />
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>API Reference</h2>
        
        <div class="api-section">
          <h3>Inputs</h3>
          <div class="api-table">
            <div class="api-row api-header">
              <div class="api-cell">Property</div>
              <div class="api-cell">Type</div>
              <div class="api-cell">Default</div>
              <div class="api-cell">Description</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">hasNotification</div>
              <div class="api-cell">boolean</div>
              <div class="api-cell">false</div>
              <div class="api-cell">Whether to show notification badge</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">notificationCount</div>
              <div class="api-cell">number?</div>
              <div class="api-cell">undefined</div>
              <div class="api-cell">Number to display in badge. Shows dot if undefined</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">icon</div>
              <div class="api-cell">string</div>
              <div class="api-cell">'pi pi-comments'</div>
              <div class="api-cell">PrimeNG icon class for the button</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">ariaLabel</div>
              <div class="api-cell">string</div>
              <div class="api-cell">'Open Message Center'</div>
              <div class="api-cell">Accessibility label for screen readers</div>
            </div>
          </div>
        </div>

        <div class="api-section">
          <h3>Outputs</h3>
          <div class="api-table">
            <div class="api-row api-header">
              <div class="api-cell">Event</div>
              <div class="api-cell">Type</div>
              <div class="api-cell">Description</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">clicked</div>
              <div class="api-cell">EventEmitter&lt;void&gt;</div>
              <div class="api-cell">Emitted when FAB is clicked</div>
            </div>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Usage</h2>
        <div class="code-example">
          <pre><code>&lt;app-notification-fab
  [hasNotification]="true"
  [notificationCount]="3"
  icon="pi pi-comments"
  ariaLabel="Open Message Center"
  (clicked)="openMessageCenter()"
/&gt;</code></pre>
        </div>
      </div>

      <div class="docs-section">
        <h2>Design Guidelines</h2>
        <ul class="design-guidelines">
          <li>Use positioned floating placement via parent container styling</li>
          <li>Badge appears with red background and light text for high visibility</li>
          <li>Hover states include elevation changes and subtle animations</li>
          <li>Mobile-responsive with smaller sizing for touch targets</li>
          <li>Maintains accessibility with proper ARIA labels and focus states</li>
          <li>Integrates with design token system for consistent theming</li>
        </ul>
      </div>

      <div class="docs-section">
        <h2>States</h2>
        <div class="states-grid">
          <div class="state-item">
            <h4>Default</h4>
            <p>Clean button with message icon, no notification indicators</p>
          </div>
          <div class="state-item">
            <h4>Hover</h4>
            <p>Elevated with shadow and slightly larger icon</p>
          </div>
          <div class="state-item">
            <h4>With Notification</h4>
            <p>Red badge with count or dot in top-right corner</p>
          </div>
          <div class="state-item">
            <h4>Notification Hover</h4>
            <p>Combined hover effects with badge shadow enhancement</p>
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

    .example-group {
      margin-bottom: 2rem;
      padding: 1.5rem;
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      background: var(--surface-card);
    }

    .example-group h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: var(--text-color);
    }

    .example-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: var(--surface-ground);
      border-radius: 4px;
      min-height: 120px;
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
      grid-template-columns: 1fr 1fr 1fr 2fr;
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
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .design-guidelines {
      list-style-type: none;
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

    .states-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .state-item {
      padding: 1rem;
      border: 1px solid var(--surface-border);
      border-radius: 4px;
      background: var(--surface-card);
    }

    .state-item h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text-color);
    }

    .state-item p {
      margin: 0;
      color: var(--text-color-secondary);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .docs-container {
        padding: 1rem;
      }

      .api-table {
        grid-template-columns: 1fr;
      }

      .api-cell {
        padding: 0.5rem;
      }

      .states-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class NotificationFabDocsComponent {
  onFabClick(type: string): void {
    console.log(`${type} FAB clicked!`);
  }
}
