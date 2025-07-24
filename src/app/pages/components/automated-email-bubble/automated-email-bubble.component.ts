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
                
                <div class="email-wrapper">
                  <h4>Sent Status</h4>
                  <app-automated-email-bubble 
                    [emailData]="sentEmail"
                    (menuClick)="onMenuClick($event)">
                  </app-automated-email-bubble>
                </div>

                <div class="email-wrapper">
                  <h4>Scheduled Status</h4>
                  <app-automated-email-bubble 
                    [emailData]="scheduledEmail"
                    (menuClick)="onMenuClick($event)">
                  </app-automated-email-bubble>
                </div>

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

        <p-tabPanel header="Usage">
          <div class="usage-section">
            <h3>Basic Component Usage</h3>
            <p>This component displays automated email messages with status indicators.</p>
            
            <h3>Import Statement</h3>
            <p>Import the component and related types for use in your application.</p>
            
            <h3>Example Implementation</h3>
            <p>Create email data objects and bind them to the component for display.</p>
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
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Design Specifications</h3>
            <p>This component follows the design system tokens and maintains consistency with the overall visual language.</p>
            
            <h3>Color Usage</h3>
            <p>Uses semantic colors for different status states: green for sent, yellow for scheduled, and red for stopped workflows.</p>
            
            <h3>Typography</h3>
            <p>Follows Roboto font family with appropriate weights and sizes for different content types.</p>
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
    .usage-section,
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

    .controls-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 1rem 0;
    }

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

    h3 {
      color: var(--text-color);
      margin: 1.5rem 0 0.5rem 0;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .email-thread {
        max-width: 100%;
      }
      
      .controls-section {
        flex-direction: column;
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
