import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { 
  AutomatedBadgeComponent, 
  StatusBadgeComponent, 
  EmailIconComponent, 
  MenuButtonComponent,
  StatusType 
} from '../status-badges/status-badges.component';

export interface AutomatedEmailData {
  fromAddress: string;
  toRecipients: string[];
  subjectLine: string;
  messageBody: string;
  status: StatusType;
  timestamp?: string;
  timeOffset?: string;
  workflowId?: string;
  templateName?: string;
}

// Standalone reusable component
@Component({
  selector: 'app-automated-email-bubble',
  standalone: true,
  imports: [
    CommonModule, 
    AutomatedBadgeComponent, 
    StatusBadgeComponent, 
    EmailIconComponent, 
    MenuButtonComponent,
    TooltipModule
  ],
  template: `
    <div class="email-bubble-container">
      <div class="email-bubble-content">
        <div class="bubble-header">
          <app-email-icon></app-email-icon>
          <div class="message-details">
            <div class="header-row">
              <div class="badge-section">
                <app-automated-badge></app-automated-badge>
              </div>
              <div class="status-and-menu">
                <app-status-badge 
                  [type]="emailData.status" 
                  [value]="getStatusValue()">
                </app-status-badge>
                <app-menu-button 
                  pTooltip="Email options" 
                  (click)="onMenuClick()">
                </app-menu-button>
              </div>
            </div>
            
            <div class="email-field">
              <span class="field-label">From:</span>
              <span class="field-value">{{ emailData.fromAddress }}</span>
            </div>
            
            <div class="email-field">
              <span class="field-label">To:</span>
              <span class="field-value">{{ getRecipientsString() }}</span>
            </div>
            
            <div class="subject-line">
              {{ emailData.subjectLine }}
            </div>
            
            <div class="message-body">
              {{ emailData.messageBody }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
      justify-content: flex-start;
    }

    .email-bubble-container {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-radius: 8px 8px 0px 8px;
      border: 1px solid var(--primary-blue-50, #91B9DD);
      background: var(--cyan-50, #F1FAFE);
      font-family: 'Roboto', sans-serif;
      max-width: 600px;
      width: 100%;
    }

    .email-bubble-content {
      flex: 1;
    }

    .bubble-header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      width: 100%;
    }

    .message-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .badge-section {
      display: flex;
    }

    .status-and-menu {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .email-field {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .field-label {
      color: var(--surface-900, #5A626F);
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      min-width: fit-content;
    }

    .field-value {
      color: var(--surface-900, #5A626F);
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
    }

    .subject-line {
      color: var(--blue-900, #0E2E4B);
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      margin-top: 4px;
    }

    .message-body {
      align-self: stretch;
      color: var(--med-black, rgba(58, 58, 58, 1));
      font-size: 14px;
      font-weight: 300;
      line-height: normal;
      margin-top: 4px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .email-bubble-container {
        padding: 12px;
        max-width: 100%;
      }
      
      .header-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      
      .status-and-menu {
        align-self: flex-end;
        width: 100%;
        justify-content: flex-end;
      }
      
      .message-details {
        gap: 6px;
      }
    }
  `]
})
export class AutomatedEmailBubbleComponent {
  @Input() emailData!: AutomatedEmailData;
  @Output() menuClick = new EventEmitter<AutomatedEmailData>();
  @Output() emailClick = new EventEmitter<AutomatedEmailData>();

  getRecipientsString(): string {
    return this.emailData.toRecipients.join(', ');
  }

  getStatusValue(): string {
    switch (this.emailData.status) {
      case 'sent':
        return this.emailData.timestamp || '';
      case 'scheduled':
        return this.emailData.timeOffset || '';
      case 'workflow-stopped':
        return '';
      default:
        return '';
    }
  }

  onMenuClick(): void {
    this.menuClick.emit(this.emailData);
  }

  onEmailClick(): void {
    this.emailClick.emit(this.emailData);
  }
}

// Documentation Component
@Component({
  selector: 'app-automated-email-bubble-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    TooltipModule,
    AutomatedEmailBubbleComponent,
    AutomatedBadgeComponent,
    StatusBadgeComponent
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Automated Email Bubble</h1>
        <p class="component-description">
          Message display element used to represent system-triggered email communications within the Message Center. 
          This component surfaces key delivery details including automation source, recipient list, subject line, 
          message body, and current delivery status with three key visual states: Sent, Scheduled, and Workflow Stopped.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Email Status Variants</h3>
            <div class="example-container">
              <div class="email-thread">
                
                <!-- Sent Email -->
                <div class="email-wrapper">
                  <h4>Sent Status</h4>
                  <app-automated-email-bubble 
                    [emailData]="sentEmail"
                    (menuClick)="onMenuClick($event)">
                  </app-automated-email-bubble>
                </div>

                <!-- Scheduled Email -->
                <div class="email-wrapper">
                  <h4>Scheduled Status</h4>
                  <app-automated-email-bubble 
                    [emailData]="scheduledEmail"
                    (menuClick)="onMenuClick($event)">
                  </app-automated-email-bubble>
                </div>

                <!-- Workflow Stopped Email -->
                <div class="email-wrapper">
                  <h4>Workflow Stopped Status</h4>
                  <app-automated-email-bubble 
                    [emailData]="workflowStoppedEmail"
                    (menuClick)="onMenuClick($event)">
                  </app-automated-email-bubble>
                </div>
              </div>
            </div>

            <h3>Individual Status Indicators</h3>
            <div class="example-container">
              <div class="status-examples">
                <div class="status-group">
                  <h4>Automated Badge</h4>
                  <app-automated-badge></app-automated-badge>
                </div>
                
                <div class="status-group">
                  <h4>Status Badges</h4>
                  <div class="status-list">
                    <app-status-badge type="sent" value="Aug 2, 2024 | 10:32 AM"></app-status-badge>
                    <app-status-badge type="scheduled" value="3 Hours out"></app-status-badge>
                    <app-status-badge type="workflow-stopped"></app-status-badge>
                  </div>
                </div>
              </div>
            </div>

            <h3>Interactive Controls</h3>
            <div class="example-container">
              <div class="controls-section">
                <p-button label="Toggle Status" (click)="toggleStatus()" severity="primary" size="small"></p-button>
                <p-button label="Update Timestamp" (click)="updateTimestamp()" severity="secondary" size="small"></p-button>
                <p-button label="Clear Content" (click)="resetEmails()" severity="warning" size="small"></p-button>
              </div>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Code">
          <div class="code-section">
            <h3>Import Required Modules</h3>
            <pre ngNonBindable><code>import { AutomatedEmailBubbleComponent, AutomatedEmailData } from './automated-email-bubble.component';
import { AutomatedBadgeComponent, StatusBadgeComponent } from '../status-badges/status-badges.component';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  imports: [
    CommonModule,
    TooltipModule,
    AutomatedEmailBubbleComponent,
    AutomatedBadgeComponent,
    StatusBadgeComponent
  ],
  // ...
})</code></pre>

            <h3>Basic Email Bubble Structure</h3>
            <pre><code>&lt;app-automated-email-bubble 
  [emailData]="emailData"
  (menuClick)="onMenuClick($event)"
  (emailClick)="onEmailClick($event)"&gt;
&lt;/app-automated-email-bubble&gt;</code></pre>

            <h3>Email Data Interface</h3>
            <pre ngNonBindable><code>export interface AutomatedEmailData {
  fromAddress: string;
  toRecipients: string[];
  subjectLine: string;
  messageBody: string;
  status: 'sent' | 'scheduled' | 'workflow-stopped';
  timestamp?: string;
  timeOffset?: string;
  workflowId?: string;
  templateName?: string;
}
            </code></pre>

            <h3>Component Usage Example</h3>
            <pre ngNonBindable><code>export class EmailMessageComponent {
  emailData: AutomatedEmailData = {
    fromAddress: 'system@docprocessing.com',
    toRecipients: ['client@company.com', 'shipper@logistics.com'],
    subjectLine: 'Document Upload Required - Shipment #SP-2024-1205',
    messageBody: 'Your shipment requires additional documentation...',
    status: 'sent',
    timestamp: 'Aug 2, 2024 | 10:32 AM',
    workflowId: 'WF-2024-1205',
    templateName: 'Document Upload Notification'
  };

  onMenuClick(email: AutomatedEmailData): void {
    console.log('Menu clicked for email:', email);
  }
}</code></pre>

            <h3>Individual Status Components</h3>
            <pre><code>// Automated Badge
&lt;app-automated-badge&gt;&lt;/app-automated-badge&gt;

// Status Badges
&lt;app-status-badge type="sent" value="Aug 2, 2024 | 10:32 AM"&gt;&lt;/app-status-badge&gt;
&lt;app-status-badge type="scheduled" value="3 Hours out"&gt;&lt;/app-status-badge&gt;
&lt;app-status-badge type="workflow-stopped"&gt;&lt;/app-status-badge&gt;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>AutomatedEmailBubbleComponent Properties</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>emailData</td>
                    <td>AutomatedEmailData</td>
                    <td>required</td>
                    <td>Complete email information including status, recipients, and content</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>AutomatedEmailData Interface</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>fromAddress</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Email sender address (typically system email)</td>
                  </tr>
                  <tr>
                    <td>toRecipients</td>
                    <td>string[]</td>
                    <td>Yes</td>
                    <td>Array of recipient email addresses</td>
                  </tr>
                  <tr>
                    <td>subjectLine</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Email subject line content</td>
                  </tr>
                  <tr>
                    <td>messageBody</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Email message body content</td>
                  </tr>
                  <tr>
                    <td>status</td>
                    <td>'sent' | 'scheduled' | 'workflow-stopped'</td>
                    <td>Yes</td>
                    <td>Current delivery status of the email</td>
                  </tr>
                  <tr>
                    <td>timestamp</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Timestamp when email was sent (for sent status)</td>
                  </tr>
                  <tr>
                    <td>timeOffset</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Time until scheduled send (for scheduled status)</td>
                  </tr>
                  <tr>
                    <td>workflowId</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Associated workflow identifier for traceability</td>
                  </tr>
                  <tr>
                    <td>templateName</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Email template name for developer-facing tooling</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Events</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Parameters</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>menuClick</td>
                    <td>emailData: AutomatedEmailData</td>
                    <td>Emitted when the three-dot menu is clicked</td>
                  </tr>
                  <tr>
                    <td>emailClick</td>
                    <td>emailData: AutomatedEmailData</td>
                    <td>Emitted when the email bubble is clicked</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Status Badge Component</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>type</td>
                    <td>'sent' | 'scheduled' | 'workflow-stopped'</td>
                    <td>Status type determining color and icon</td>
                  </tr>
                  <tr>
                    <td>value</td>
                    <td>string</td>
                    <td>Optional value text (timestamp, time offset, etc.)</td>
                  </tr>
                  <tr>
                    <td>customLabel</td>
                    <td>string</td>
                    <td>Optional custom label override</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Design Specifications</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Email Bubble Layout</strong>
                <ul>
                  <li>Left-aligned with email icon and content sections</li>
                  <li>Cyan background (#F1FAFE) with blue border (#91B9DD)</li>
                  <li>Rounded corners (8px) with cut corner (bottom-left: 0px)</li>
                  <li>Consistent 16px padding with 8px gaps between elements</li>
                  <li>Maximum width constraint for readability</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Status Indicators</strong>
                <ul>
                  <li>Sent: Green background (#CCF2D6) with check icon</li>
                  <li>Scheduled: Yellow background (#FCF5A4) with clock icon</li>
                  <li>Workflow Stopped: Light cyan (#F1FAFE) with red text (#AE1923)</li>
                  <li>Automated badge: Cyan background (#C7EBFB) with automation icon</li>
                </ul>
              </div>
            </div>

            <h3>Typography & Colors</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Design Tokens Used</strong>
                <ul>
                  <li>Cyan-50: #F1FAFE (bubble background)</li>
                  <li>Primary-Blue-50: #91B9DD (border color)</li>
                  <li>Cyan-200: #C7EBFB (icon and badge backgrounds)</li>
                  <li>Blue-900: #0E2E4B (primary text and icons)</li>
                  <li>Surface-900: #5A626F (field labels and values)</li>
                  <li>Med-black: rgba(58, 58, 58, 1) (message body text)</li>
                  <li>Blue-600: #2068A8 (menu button color)</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Typography Hierarchy</strong>
                <ul>
                  <li>Font Family: Roboto, sans-serif</li>
                  <li>Field Labels: 14px, medium weight (500)</li>
                  <li>Field Values: 14px, normal weight (400)</li>
                  <li>Subject Line: 14px, medium weight (500)</li>
                  <li>Message Body: 14px, light weight (300)</li>
                  <li>Status Text: 13px, medium/light weight</li>
                  <li>Badge Text: 12px, medium weight (500)</li>
                </ul>
              </div>
            </div>

            <h3>Status Color System</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Semantic Color Mapping</strong>
                <ul>
                  <li>Success (Sent): Green-100 background, Green-900 text</li>
                  <li>Warning (Scheduled): Yellow-200 background, Yellow-900 text</li>
                  <li>Error (Stopped): Cyan-50 background, Red-700 text</li>
                  <li>Info (Automated): Cyan-200 background, Blue-900 text</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Interactive Elements</strong>
                <ul>
                  <li>Menu Button: Blue-600 color with hover state</li>
                  <li>Icon containers: Consistent 24px circular design</li>
                  <li>Status badges: 4px padding with rounded corners</li>
                  <li>Responsive behavior for mobile layouts</li>
                </ul>
              </div>
            </div>

            <h3>Layout Guidelines</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Spacing & Structure</strong>
                <ul>
                  <li>Email icon: 24px diameter with cyan background</li>
                  <li>Content padding: 16px on all sides</li>
                  <li>Header row: Space-between alignment for badges and menu</li>
                  <li>Field spacing: 8px gap between label and value</li>
                  <li>Vertical rhythm: 8px gaps between content sections</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Responsive Behavior</strong>
                <ul>
                  <li>Desktop: Horizontal layout with side-by-side elements</li>
                  <li>Mobile: Stack header elements vertically when needed</li>
                  <li>Maintain readability and touch targets on all devices</li>
                  <li>Preserve visual hierarchy and status indication</li>
                </ul>
              </div>
            </div>
          </div>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: [`
    .component-doc {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .component-header {
      margin-bottom: 2rem;
    }

    .component-header h1 {
      color: var(--text-color);
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
      font-weight: 600;
    }

    .component-description {
      color: var(--text-color-secondary);
      font-size: 1.1rem;
      line-height: 1.5;
      margin: 0;
    }

    .examples-section,
    .code-section,
    .api-section,
    .design-section {
      padding: 1rem 0;
    }

    .example-container {
      background: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      padding: 2rem;
      margin: 1rem 0;
    }

    /* Email Thread Styling */
    .email-thread {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 700px;
      margin: 0 auto;
    }

    .email-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .email-wrapper h4 {
      color: var(--text-color);
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 500;
    }

    /* Status Examples */
    .status-examples {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .status-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .status-group h4 {
      color: var(--text-color);
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
    }

    .status-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }

    /* Controls */
    .controls-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 1rem 0;
    }

    /* API Tables */
    .api-table table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }

    .api-table th,
    .api-table td {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 1px solid var(--surface-border);
    }

    .api-table th {
      background: var(--surface-section);
      font-weight: 600;
      color: var(--text-color);
    }

    .api-table td {
      color: var(--text-color-secondary);
    }

    .design-specs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 1rem 0;
    }

    .spec-item {
      background: var(--surface-section);
      padding: 1rem;
      border-radius: 6px;
      border-left: 3px solid var(--primary-color);
    }

    .spec-item strong {
      color: var(--text-color);
      display: block;
      margin-bottom: 0.5rem;
    }

    .spec-item ul {
      margin: 0;
      padding-left: 1rem;
    }

    .spec-item li {
      color: var(--text-color-secondary);
      margin: 0.25rem 0;
    }

    pre {
      background: var(--surface-ground);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      margin: 1rem 0;
    }

    code {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.875rem;
      color: var(--text-color);
    }

    h3 {
      color: var(--text-color);
      margin: 1.5rem 0 0.5rem 0;
      font-weight: 600;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .email-thread {
        max-width: 100%;
      }
      
      .controls-section {
        flex-direction: column;
      }
      
      .design-specs {
        grid-template-columns: 1fr;
      }

      .status-examples {
        gap: 1rem;
      }
    }
  `]
})
export class AutomatedEmailBubbleDocComponent {
  sentEmail: AutomatedEmailData = {
    fromAddress: 'system@docprocessing.com',
    toRecipients: ['client@company.com', 'shipper@logistics.com'],
    subjectLine: 'Document Upload Required - Shipment #SP-2024-1205',
    messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
    status: 'sent',
    timestamp: 'Aug 2, 2024 | 10:32 AM',
    workflowId: 'WF-2024-1205'
  };

  scheduledEmail: AutomatedEmailData = {
    fromAddress: 'system@docprocessing.com',
    toRecipients: ['client@company.com', 'shipper@logistics.com'],
    subjectLine: 'Document Upload Required - Shipment #SP-2024-1205',
    messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
    status: 'scheduled',
    timeOffset: '3 Hours out',
    workflowId: 'WF-2024-1205'
  };

  workflowStoppedEmail: AutomatedEmailData = {
    fromAddress: 'system@docprocessing.com',
    toRecipients: ['client@company.com', 'shipper@logistics.com'],
    subjectLine: 'Document Upload Required - Shipment #SP-2024-1205',
    messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
    status: 'workflow-stopped',
    workflowId: 'WF-2024-1205'
  };

  toggleStatus(): void {
    const statuses: StatusType[] = ['sent', 'scheduled', 'workflow-stopped'];
    const currentIndex = statuses.indexOf(this.sentEmail.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    this.sentEmail.status = statuses[nextIndex];
    if (this.sentEmail.status === 'sent') {
      this.sentEmail.timestamp = new Date().toLocaleString();
      this.sentEmail.timeOffset = undefined;
    } else if (this.sentEmail.status === 'scheduled') {
      this.sentEmail.timeOffset = '2 Hours out';
      this.sentEmail.timestamp = undefined;
    } else {
      this.sentEmail.timestamp = undefined;
      this.sentEmail.timeOffset = undefined;
    }
  }

  updateTimestamp(): void {
    this.sentEmail.timestamp = new Date().toLocaleString();
    this.scheduledEmail.timeOffset = Math.floor(Math.random() * 5 + 1) + ' Hours out';
  }

  resetEmails(): void {
    this.sentEmail = { ...this.sentEmail };
    this.scheduledEmail = { ...this.scheduledEmail };
    this.workflowStoppedEmail = { ...this.workflowStoppedEmail };
  }

  onMenuClick(emailData: AutomatedEmailData): void {
    console.log('Menu clicked for email:', emailData);
  }
}
