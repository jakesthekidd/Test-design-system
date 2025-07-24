import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export type FilterType = 'notes' | 'emails' | 'sms' | 'all';

export interface FilterTab {
  id: FilterType;
  label: string;
  icon: string;
  notificationCount?: number;
}

export interface MessageCenterHeaderConfig {
  title?: string;
  showOpenInTab?: boolean;
  activeFilter?: FilterType;
  filterTabs?: FilterTab[];
}

@Component({
  selector: 'app-message-center-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="message-center-header">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-title">
          <i class="fas fa-comment header-icon"></i>
          <h3 class="title-text">{{ title }}</h3>
        </div>
        
        <div class="header-actions">
          <button
            *ngIf="showOpenInTab"
            pButton
            type="button"
            class="action-button open-tab-button"
            [class.mobile-hidden]="true"
            aria-label="Open in new tab"
            (click)="onOpenInTab()"
          >
            <i class="fas fa-window-restore"></i>
          </button>
          
          <button
            pButton
            type="button"
            class="action-button close-button"
            aria-label="Close message center"
            (click)="onClose()"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Filter Tabs Section -->
      <div class="filter-tabs-section">
        <div class="filter-tabs">
          <button
            *ngFor="let tab of filterTabs"
            type="button"
            class="filter-tab"
            [class.active]="activeFilter === tab.id"
            (click)="onFilterChange(tab.id)"
            [attr.aria-label]="'Filter by ' + tab.label"
          >
            <i [class]="tab.icon" class="tab-icon"></i>
            <span class="tab-label">{{ tab.label }}</span>
            <span 
              *ngIf="tab.notificationCount && tab.notificationCount > 0" 
              class="tab-badge"
            >
              {{ tab.notificationCount }}
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .message-center-header {
      width: 100%;
      background: var(--surface-0, #ffffff);
      border-radius: 8px 8px 0 0;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    /* Header Section */
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
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      line-height: normal;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .action-button {
      background: transparent !important;
      border: none !important;
      color: var(--blue-900, #0E2E4B) !important;
      padding: 0 !important;
      width: auto !important;
      height: auto !important;
      min-width: auto !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    .action-button i {
      font-size: 21px;
      color: var(--blue-900, #0E2E4B);
    }

    .action-button:hover {
      background: transparent !important;
      color: var(--primary-color, #2474BB) !important;
    }

    .action-button:hover i {
      color: var(--primary-color, #2474BB);
    }

    /* Filter Tabs Section */
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
      transition: all 0.2s ease-in-out;
      position: relative;
    }

    .filter-tab:hover {
      background: var(--surface-hover, #F6F9FC);
    }

    .filter-tab.active {
      background: var(--surface-ground, #EFF2F4);
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.10), 0px 1px 3px rgba(0, 0, 0, 0.10);
    }

    .tab-icon {
      font-size: 12px;
      color: var(--surface-700, #8D9AAE);
      transition: color 0.2s ease-in-out;
    }

    .filter-tab.active .tab-icon {
      color: var(--text-color, #3D3D3D);
    }

    .tab-label {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: var(--surface-700, #8D9AAE);
      transition: color 0.2s ease-in-out;
    }

    .filter-tab.active .tab-label {
      color: var(--text-color, #3D3D3D);
    }

    .tab-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      background: var(--status-alert, #DA1F2C);
      color: var(--surface-0, #ffffff);
      border-radius: 50%;
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 500;
      line-height: 1;
      margin-left: 2px;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .mobile-hidden {
        display: none !important;
      }

      .header-section {
        padding: 12px 16px;
      }

      .filter-tabs-section {
        padding: 12px 16px;
      }

      .filter-tabs {
        gap: 12px;
      }

      .header-actions {
        gap: 16px;
      }

      .action-button i {
        font-size: 18px;
      }

      .header-icon {
        font-size: 18px;
      }

      .title-text {
        font-size: 14px;
      }
    }

    /* Focus states for accessibility */
    .action-button:focus,
    .filter-tab:focus {
      outline: 2px solid var(--primary-500, #3B82F6);
      outline-offset: 2px;
    }
  `]
})
export class MessageCenterHeaderComponent {
  @Input() title: string = 'Message Center';
  @Input() showOpenInTab: boolean = true;
  @Input() activeFilter: FilterType = 'notes';
  @Input() filterTabs: FilterTab[] = [
    { id: 'notes', label: 'Notes', icon: 'fas fa-sticky-note' },
    { id: 'emails', label: 'Emails', icon: 'fas fa-envelope', notificationCount: 1 },
    { id: 'sms', label: 'SMS', icon: 'fas fa-comment' },
    { id: 'all', label: 'All', icon: 'fas fa-layer-group' }
  ];

  @Output() closePanel = new EventEmitter<void>();
  @Output() openInFullView = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<FilterType>();

  onClose(): void {
    this.closePanel.emit();
  }

  onOpenInTab(): void {
    this.openInFullView.emit();
  }

  onFilterChange(filter: FilterType): void {
    this.activeFilter = filter;
    this.filterChanged.emit(filter);
  }
}

// Documentation Component
@Component({
  selector: 'app-message-center-header-docs',
  standalone: true,
  imports: [CommonModule, MessageCenterHeaderComponent, ButtonModule],
  template: `
    <div class="docs-container">
      <h1>MessageCenterHeader Component</h1>
      <p class="component-description">
        A sticky header component for the Message Center bottom panel with filter tabs and action buttons.
        Includes responsive behavior and notification badges.
      </p>

      <div class="docs-section">
        <h2>Examples</h2>
        
        <div class="example-group">
          <h3>Default Header</h3>
          <div class="example-container">
            <app-message-center-header
              (closePanel)="onAction('Close Panel')"
              (openInFullView)="onAction('Open in Full View')"
              (filterChanged)="onFilterChange($event)"
            />
          </div>
        </div>

        <div class="example-group">
          <h3>Mobile View (No Open in Tab)</h3>
          <div class="example-container mobile-simulation">
            <app-message-center-header
              [showOpenInTab]="false"
              (closePanel)="onAction('Close Panel')"
              (filterChanged)="onFilterChange($event)"
            />
          </div>
        </div>

        <div class="example-group">
          <h3>Custom Filter Configuration</h3>
          <div class="example-container">
            <app-message-center-header
              title="Custom Message Center"
              [filterTabs]="customTabs"
              activeFilter="emails"
              (closePanel)="onAction('Close Panel')"
              (openInFullView)="onAction('Open in Full View')"
              (filterChanged)="onFilterChange($event)"
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
              <div class="api-cell code">title</div>
              <div class="api-cell">string</div>
              <div class="api-cell">'Message Center'</div>
              <div class="api-cell">Header title text</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">showOpenInTab</div>
              <div class="api-cell">boolean</div>
              <div class="api-cell">true</div>
              <div class="api-cell">Whether to show the open in tab button</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">activeFilter</div>
              <div class="api-cell">FilterType</div>
              <div class="api-cell">'notes'</div>
              <div class="api-cell">Currently active filter tab</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">filterTabs</div>
              <div class="api-cell">FilterTab[]</div>
              <div class="api-cell">Default tabs</div>
              <div class="api-cell">Array of filter tab configurations</div>
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
              <div class="api-cell code">closePanel</div>
              <div class="api-cell">EventEmitter&lt;void&gt;</div>
              <div class="api-cell">Emitted when close button is clicked</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">openInFullView</div>
              <div class="api-cell">EventEmitter&lt;void&gt;</div>
              <div class="api-cell">Emitted when open in tab button is clicked</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">filterChanged</div>
              <div class="api-cell">EventEmitter&lt;FilterType&gt;</div>
              <div class="api-cell">Emitted when filter tab is selected</div>
            </div>
          </div>
        </div>

        <div class="api-section">
          <h3>Types</h3>
          <div class="code-example">
            <pre><code>type FilterType = 'notes' | 'emails' | 'sms' | 'all';

interface FilterTab {
  id: FilterType;
  label: string;
  icon: string;
  notificationCount?: number;
}</code></pre>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Usage</h2>
        <div class="code-example">
          <pre><code>&lt;app-message-center-header
  title="Message Center"
  [showOpenInTab]="true"
  [activeFilter]="currentFilter"
  [filterTabs]="tabs"
  (closePanel)="handleClose()"
  (openInFullView)="handleOpenInTab()"
  (filterChanged)="handleFilterChange($event)"
/&gt;</code></pre>
        </div>
      </div>

      <div class="docs-section">
        <h2>Features</h2>
        <ul class="design-guidelines">
          <li>Sticky positioning that stays at top during scroll</li>
          <li>Responsive design with mobile-specific behavior</li>
          <li>Filter tabs with active states and notification badges</li>
          <li>Icon-based navigation with FontAwesome integration</li>
          <li>Accessibility support with proper ARIA labels</li>
          <li>Clean PrimeNG integration for consistent styling</li>
        </ul>
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
      background: var(--surface-ground);
      border-radius: 4px;
      overflow: hidden;
    }

    .mobile-simulation {
      max-width: 375px;
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

      .api-table {
        grid-template-columns: 1fr;
      }

      .api-cell {
        padding: 0.5rem;
      }
    }
  `]
})
export class MessageCenterHeaderDocsComponent {
  actionLog: string[] = [];

  customTabs: FilterTab[] = [
    { id: 'notes', label: 'Notes', icon: 'fas fa-sticky-note', notificationCount: 2 },
    { id: 'emails', label: 'Emails', icon: 'fas fa-envelope', notificationCount: 5 },
    { id: 'sms', label: 'SMS', icon: 'fas fa-comment', notificationCount: 1 },
    { id: 'all', label: 'All', icon: 'fas fa-layer-group', notificationCount: 8 }
  ];

  onAction(action: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.actionLog.unshift(`[${timestamp}] ${action}`);
    console.log(`Header Action: ${action}`);
  }

  onFilterChange(filter: FilterType): void {
    const timestamp = new Date().toLocaleTimeString();
    this.actionLog.unshift(`[${timestamp}] Filter changed to: ${filter}`);
    console.log(`Filter changed to: ${filter}`);
  }
}
