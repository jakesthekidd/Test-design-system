import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { 
  AutomatedBadgeComponent, 
  StatusBadgeComponent, 
  MenuButtonComponent,
  StatusType 
} from '../status-badges/status-badges.component';

export interface SmsData {
  toNumber: string;
  messageBody: string;
  status: StatusType;
  timestamp?: string;
  timeOffset?: string;
  workflowId?: string;
  workflowName?: string;
  retryCount?: number;
}

// SMS Icon Component
@Component({
  selector: 'app-sms-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sms-icon">
      <i class="fa-solid fa-message"></i>
    </div>
  `,
  styles: [`
    .sms-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      background: var(--indigo-100, #DADAFC);
      color: var(--indigo-500, #6366F1);
    }
    
    .sms-icon i {
      font-size: 12px;
      font-weight: 400;
    }
  `]
})
export class SmsIconComponent {}

// SMS Automated Badge Component  
@Component({
  selector: 'app-sms-automated-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sms-automated-badge">
      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.75 0.5C9.23398 0.5 9.625 0.891016 9.625 1.375V3.125H12.9062C13.9945 3.125 14.875 4.00547 14.875 5.09375V12.5312C14.875 13.6195 13.9945 14.5 12.9062 14.5H4.59375C3.50547 14.5 2.625 13.6195 2.625 12.5312V5.09375C2.625 4.00547 3.50547 3.125 4.59375 3.125H7.875V1.375C7.875 0.891016 8.26602 0.5 8.75 0.5ZM5.6875 11C5.44688 11 5.25 11.1969 5.25 11.4375C5.25 11.6781 5.44688 11.875 5.6875 11.875H6.5625C6.80312 11.875 7 11.6781 7 11.4375C7 11.1969 6.80312 11 6.5625 11H5.6875ZM8.3125 11C8.07187 11 7.875 11.1969 7.875 11.4375C7.875 11.6781 8.07187 11.875 8.3125 11.875H9.1875C9.42813 11.875 9.625 11.6781 9.625 11.4375C9.625 11.1969 9.42813 11 9.1875 11H8.3125ZM10.9375 11C10.6969 11 10.5 11.1969 10.5 11.4375C10.5 11.6781 10.6969 11.875 10.9375 11.875H11.8125C12.0531 11.875 12.25 11.6781 12.25 11.4375C12.25 11.1969 12.0531 11 11.8125 11H10.9375ZM7.21875 7.5C7.21875 7.20992 7.10352 6.93172 6.8984 6.7266C6.69328 6.52148 6.41508 6.40625 6.125 6.40625C5.83492 6.40625 5.55672 6.52148 5.3516 6.7266C5.14648 6.93172 5.03125 7.20992 5.03125 7.5C5.03125 7.79008 5.14648 8.06828 5.3516 8.2734C5.55672 8.47852 5.83492 8.59375 6.125 8.59375C6.41508 8.59375 6.69328 8.47852 6.8984 8.2734C7.10352 8.06828 7.21875 7.79008 7.21875 7.5ZM11.375 8.59375C11.6651 8.59375 11.9433 8.47852 12.1484 8.2734C12.3535 8.06828 12.4688 7.79008 12.4688 7.5C12.4688 7.20992 12.3535 6.93172 12.1484 6.7266C11.9433 6.52148 11.6651 6.40625 11.375 6.40625C11.0849 6.40625 10.8067 6.52148 10.6016 6.7266C10.3965 6.93172 10.2812 7.20992 10.2812 7.5C10.2812 7.79008 10.3965 8.06828 10.6016 8.2734C10.8067 8.47852 11.0849 8.59375 11.375 8.59375ZM1.3125 6.625H1.75V11.875H1.3125C0.587891 11.875 0 11.2871 0 10.5625V7.9375C0 7.21289 0.587891 6.625 1.3125 6.625ZM16.1875 6.625C16.9121 6.625 17.5 7.21289 17.5 7.9375V10.5625C17.5 11.2871 16.9121 11.875 16.1875 11.875H15.75V6.625H16.1875Z" fill="currentColor"/>
      </svg>
      <span>Automated</span>
    </div>
  `,
  styles: [`
    .sms-automated-badge {
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 27px;
      background: var(--indigo-100, #DADAFC);
      color: var(--indigo-900, #282960);
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
      width: fit-content;
    }
    
    .sms-automated-badge svg {
      width: 17.5px;
      height: 14px;
      fill: currentColor;
    }
  `]
})
export class SmsAutomatedBadgeComponent {}

// Standalone reusable component
@Component({
  selector: 'app-sms-bubble',
  standalone: true,
  imports: [
    CommonModule, 
    SmsAutomatedBadgeComponent, 
    StatusBadgeComponent, 
    SmsIconComponent, 
    MenuButtonComponent,
    TooltipModule
  ],
  template: `
    <div class="sms-bubble-container">
      <div class="sms-bubble-content">
        <div class="bubble-header">
          <app-sms-icon></app-sms-icon>
          <div class="message-details">
            <div class="header-row">
              <div class="badge-section">
                <app-sms-automated-badge></app-sms-automated-badge>
              </div>
              <div class="status-and-menu">
                <app-status-badge 
                  [type]="smsData.status" 
                  [value]="getStatusValue()">
                </app-status-badge>
                <app-menu-button 
                  pTooltip="SMS options" 
                  (click)="onMenuClick()">
                </app-menu-button>
              </div>
            </div>
            
            <div class="sms-field">
              <span class="field-label">To:</span>
              <span class="field-value phone-number">{{ smsData.toNumber }}</span>
            </div>
            
            <div class="message-body">
              {{ smsData.messageBody }}
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

    .sms-bubble-container {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-radius: 8px 8px 0px 8px;
      border: 1px solid var(--indigo-200, #BCBDF9);
      background: var(--indigo-50, #F7F7FE);
      font-family: 'Roboto', sans-serif;
      max-width: 600px;
      width: 100%;
    }

    .sms-bubble-content {
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

    .sms-field {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .field-label {
      color: var(--surface-900, #5A626F);
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      min-width: fit-content;
    }

    .field-value {
      color: var(--surface-900, #5A626F);
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
    }

    .phone-number {
      font-weight: 700;
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
      .sms-bubble-container {
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
export class SmsBubbleComponent {
  @Input() smsData!: SmsData;
  @Output() menuClick = new EventEmitter<SmsData>();
  @Output() smsClick = new EventEmitter<SmsData>();

  getStatusValue(): string {
    switch (this.smsData.status) {
      case 'sent':
        return this.smsData.timestamp || '';
      case 'scheduled':
        return this.smsData.timeOffset || '';
      case 'workflow-stopped':
        return '';
      default:
        return '';
    }
  }

  onMenuClick(): void {
    this.menuClick.emit(this.smsData);
  }

  onSmsClick(): void {
    this.smsClick.emit(this.smsData);
  }
}

// Documentation Component
@Component({
  selector: 'app-sms-bubble-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    TooltipModule,
    SmsBubbleComponent,
    SmsAutomatedBadgeComponent,
    StatusBadgeComponent,
    SmsIconComponent
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>SMS Bubble</h1>
        <p class="component-description">
          Reusable communication component that displays outbound SMS messages sent through automated workflows. 
          Mirrors the AutomatedEmailBubbleComponent but is adapted for the SMS channel with SMS-specific icons, 
          indigo color scheme, and phone number emphasis.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>SMS Status Variants</h3>
            <div class="example-container">
              <div class="sms-thread">
                
                <div class="sms-wrapper">
                  <h4>Sent Status</h4>
                  <app-sms-bubble 
                    [smsData]="sentSms"
                    (menuClick)="onMenuClick($event)">
                  </app-sms-bubble>
                </div>

                <div class="sms-wrapper">
                  <h4>Scheduled Status</h4>
                  <app-sms-bubble 
                    [smsData]="scheduledSms"
                    (menuClick)="onMenuClick($event)">
                  </app-sms-bubble>
                </div>

                <div class="sms-wrapper">
                  <h4>Workflow Stopped Status</h4>
                  <app-sms-bubble 
                    [smsData]="workflowStoppedSms"
                    (menuClick)="onMenuClick($event)">
                  </app-sms-bubble>
                </div>
              </div>
            </div>

            <h3>SMS-Specific Components</h3>
            <div class="example-container">
              <div class="status-examples">
                <div class="status-group">
                  <h4>SMS Icon</h4>
                  <app-sms-icon></app-sms-icon>
                </div>
                
                <div class="status-group">
                  <h4>SMS Automated Badge</h4>
                  <app-sms-automated-badge></app-sms-automated-badge>
                </div>
                
                <div class="status-group">
                  <h4>Status Badges (Shared)</h4>
                  <div class="status-list">
                    <app-status-badge type="sent" value="Aug 1, 2024 | 11:00 AM"></app-status-badge>
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
                <p-button label="Change Phone Number" (click)="changePhoneNumber()" severity="warning" size="small"></p-button>
              </div>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Usage">
          <div class="usage-section">
            <h3>Basic Component Usage</h3>
            <p>This component displays automated SMS messages with delivery status tracking.</p>
            
            <h3>SMS vs Email Differences</h3>
            <p>Uses indigo color scheme, message icon, and emphasizes phone numbers with bold font weight.</p>
            
            <h3>Shared Components</h3>
            <p>Reuses StatusBadgeComponent and MenuButtonComponent for consistency across communication types.</p>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>SmsBubbleComponent Properties</h3>
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
                    <td>smsData</td>
                    <td>SmsData</td>
                    <td>required</td>
                    <td>Complete SMS information including status, recipient, and content</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>SmsData Interface</h3>
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
                    <td>toNumber</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Recipient phone number (displayed with bold emphasis)</td>
                  </tr>
                  <tr>
                    <td>messageBody</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>SMS message content</td>
                  </tr>
                  <tr>
                    <td>status</td>
                    <td>'sent' | 'scheduled' | 'workflow-stopped'</td>
                    <td>Yes</td>
                    <td>Current delivery status of the SMS</td>
                  </tr>
                  <tr>
                    <td>timestamp</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Timestamp when SMS was sent (for sent status)</td>
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
                    <td>workflowName</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Human-readable workflow name</td>
                  </tr>
                  <tr>
                    <td>retryCount</td>
                    <td>number</td>
                    <td>No</td>
                    <td>Number of delivery retry attempts</td>
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
                    <td>smsData: SmsData</td>
                    <td>Emitted when the three-dot menu is clicked</td>
                  </tr>
                  <tr>
                    <td>smsClick</td>
                    <td>smsData: SmsData</td>
                    <td>Emitted when the SMS bubble is clicked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Design Specifications</h3>
            <p>SMS bubble uses indigo color palette to differentiate from email communication while maintaining consistency.</p>
            
            <h3>Color System</h3>
            <p>Indigo-50 background, Indigo-200 border, Indigo-100 icon background, and Indigo-500/900 for text and icons.</p>
            
            <h3>Typography Emphasis</h3>
            <p>Phone numbers use font-weight: 700 to provide strong visual emphasis and differentiate from other text.</p>
            
            <h3>Icon Usage</h3>
            <p>Message/chat bubble icon distinguishes SMS from email communication while maintaining consistent sizing and placement.</p>
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

    .sms-thread {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 700px;
      margin: 0 auto;
    }

    .sms-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .sms-wrapper h4 {
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
      .sms-thread {
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
export class SmsBubbleDocComponent {
  sentSms: SmsData = {
    toNumber: '+1 (999) 999-9999',
    messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
    status: 'sent',
    timestamp: 'Aug 1, 2024 | 11:00 AM',
    workflowId: 'WF-SMS-2024-1205'
  };

  scheduledSms: SmsData = {
    toNumber: '+1 (999) 999-9999',
    messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
    status: 'scheduled',
    timeOffset: '3 Hours out',
    workflowId: 'WF-SMS-2024-1205'
  };

  workflowStoppedSms: SmsData = {
    toNumber: '+1 (999) 999-9999',
    messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
    status: 'workflow-stopped',
    workflowId: 'WF-SMS-2024-1205'
  };

  toggleStatus(): void {
    const statuses: StatusType[] = ['sent', 'scheduled', 'workflow-stopped'];
    const currentIndex = statuses.indexOf(this.sentSms.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    this.sentSms.status = statuses[nextIndex];
    if (this.sentSms.status === 'sent') {
      this.sentSms.timestamp = new Date().toLocaleString();
      this.sentSms.timeOffset = undefined;
    } else if (this.sentSms.status === 'scheduled') {
      this.sentSms.timeOffset = '2 Hours out';
      this.sentSms.timestamp = undefined;
    } else {
      this.sentSms.timestamp = undefined;
      this.sentSms.timeOffset = undefined;
    }
  }

  updateTimestamp(): void {
    this.sentSms.timestamp = new Date().toLocaleString();
    this.scheduledSms.timeOffset = Math.floor(Math.random() * 5 + 1) + ' Hours out';
  }

  changePhoneNumber(): void {
    const phoneNumbers = ['+1 (999) 999-9999', '+1 (555) 123-4567', '+1 (888) 777-6666'];
    const currentIndex = phoneNumbers.indexOf(this.sentSms.toNumber);
    const nextIndex = (currentIndex + 1) % phoneNumbers.length;
    
    this.sentSms.toNumber = phoneNumbers[nextIndex];
    this.scheduledSms.toNumber = phoneNumbers[nextIndex];
    this.workflowStoppedSms.toNumber = phoneNumbers[nextIndex];
  }

  onMenuClick(smsData: SmsData): void {
    console.log('Menu clicked for SMS:', smsData);
  }
}
