import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-center-expanded',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-center-expanded">
      <!-- Component implementation will go here -->
      <h2>MessageCenterExpanded Component</h2>
      <p>This component will launch in a separate browser window.</p>
    </div>
  `,
  styles: [`
    .message-center-expanded {
      padding: 1rem;
    }
  `]
})
export class MessageCenterExpandedComponent {
  // Component implementation will go here
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
        <h2>Features</h2>
        <ul>
          <li>Opens in separate browser window using window.open()</li>
          <li>Reuses existing CommunicationPanel component</li>
          <li>Draggable to secondary monitors</li>
          <li>Independent messaging experience</li>
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
