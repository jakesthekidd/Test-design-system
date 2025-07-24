import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuButtonComponent } from '../status-badges/status-badges.component';

export type ManualEmailStatusType = 'sent' | 'failed';

export interface ManualEmailData {
  authorName: string;
  fromAddress: string;
  toRecipients: string[];
  subjectLine: string;
  messageBody: string;
  status: ManualEmailStatusType;
  timestamp: string;
  errorDetails?: string;
}

// User Badge Component
@Component({
  selector: 'app-user-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-badge" [ngClass]="{'failed-state': isFailed}">
      <i class="fa-solid fa-user"></i>
      <span>{{ userName }}</span>
    </div>
  `,
  styles: [`
    .user-badge {
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 27px;
      background: var(--cyan-200, #C7EBFB);
      color: var(--blue-900, #0E2E4B);
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
      width: fit-content;
    }
    
    .user-badge.failed-state {
      background: var(--red-100, #F8D2D5);
      color: var(--red-900, #570C12);
    }
    
    .user-badge i {
      font-size: 12px;
      font-weight: 900;
    }
  `]
})
export class UserBadgeComponent {
  @Input() userName: string = 'User Name';
  @Input() isFailed: boolean = false;
}

// Manual Email Status Badge Component
@Component({
  selector: 'app-manual-email-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="status-badge" [ngClass]="statusClass">
      <div class="status-content">
        <i [class]="iconClass"></i>
        <span class="status-label">{{ label }}:</span>
        <span class="status-value">{{ value }}</span>
      </div>
    </div>
  `,
  styles: [`
    .status-badge {
      display: flex;
      padding: 4px 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 4px;
      width: fit-content;
      font-family: 'Roboto', sans-serif;
    }
    
    .status-content {
      display: flex;
      align-items: center;
      gap: 5px;
      align-self: stretch;
    }
    
    .status-label {
      font-size: 13px;
      font-weight: 500;
      line-height: normal;
    }
    
    .status-value {
      font-size: 13px;
      font-weight: 300;
      line-height: normal;
    }
    
    .status-badge.sent {
      background: var(--green-100, #CCF2D6);
      color: var(--green-900, #004C13);
    }
    
    .status-badge.failed {
      background: var(--red-100, #F8D2D5);
      color: var(--red-900, #570C12);
    }
    
    .status-badge i {
      font-size: 13px;
    }
  `]
})
export class ManualEmailStatusBadgeComponent {
  @Input() type: ManualEmailStatusType = 'sent';
  @Input() value: string = '';

  get statusClass(): string {
    return this.type;
  }

  get iconClass(): string {
    switch (this.type) {
      case 'sent':
        return 'fa-solid fa-check';
      case 'failed':
        return 'fa-solid fa-triangle-exclamation';
      default:
        return '';
    }
  }

  get label(): string {
    switch (this.type) {
      case 'sent':
        return 'Sent';
      case 'failed':
        return 'Failed';
      default:
        return '';
    }
  }
}

// Manual Email Icon Component
@Component({
  selector: 'app-manual-email-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="email-icon" [ngClass]="{'failed-state': isFailed}">
      <i class="fa-solid fa-envelope"></i>
    </div>
  `,
  styles: [`
    .email-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      background: var(--cyan-200, #C7EBFB);
      color: var(--blue-900, #0E2E4B);
    }
    
    .email-icon.failed-state {
      background: var(--red-100, #F8D2D5);
      color: var(--red-900, #570C12);
    }
    
    .email-icon i {
      font-size: 12px;
      font-weight: 900;
    }
  `]
})
export class ManualEmailIconComponent {
  @Input() isFailed: boolean = false;
}

// Standalone reusable component
@Component({
  selector: 'app-manual-email-bubble',
  standalone: true,
  imports: [
    CommonModule, 
    UserBadgeComponent, 
    ManualEmailStatusBadgeComponent, 
    ManualEmailIconComponent, 
    MenuButtonComponent,
    TooltipModule
  ],
  template: `
    <div class="email-bubble-container" [ngClass]="{'failed-state': emailData.status === 'failed'}">
      <div class="email-bubble-content">
        <div class="bubble-header">
          <app-manual-email-icon [isFailed]="emailData.status === 'failed'"></app-manual-email-icon>
          <div class="message-details">
            <div class="header-row">
              <div class="badge-section">
                <app-user-badge 
                  [userName]="emailData.authorName"
                  [isFailed]="emailData.status === 'failed'">
                </app-user-badge>
              </div>
              <div class="status-and-menu">
                <app-manual-email-status-badge 
                  [type]="emailData.status" 
                  [value]="emailData.timestamp">
                </app-manual-email-status-badge>
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

    .email-bubble-container.failed-state {
      background: var(--red-50, #FBE9EA);
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
      color: var(--primary-dark-alt, #174A78);
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
export class ManualEmailBubbleComponent {
  @Input() emailData!: ManualEmailData;
  @Output() menuClick = new EventEmitter<ManualEmailData>();
  @Output() emailClick = new EventEmitter<ManualEmailData>();

  getRecipientsString(): string {
    return this.emailData.toRecipients.join(', ');
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
  selector: 'app-manual-email-bubble-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    TooltipModule,
    ManualEmailBubbleComponent,
    UserBadgeComponent,
    ManualEmailStatusBadgeComponent,
    ManualEmailIconComponent
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Manual Email Bubble</h1>
        <p class="component-description">
          Represents a user-composed email that was manually sent through the platform. Features a user badge 
          instead of automated badge and supports sent/failed status states with appropriate visual feedback. 
          Failed emails use red styling throughout to clearly indicate delivery issues.
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
                  <app-manual-email-bubble 
                    [emailData]="sentEmail"
                    (menuClick)="onMenuClick($event)">
                  </app-manual-email-bubble>
                </div>

                <div class="email-wrapper">
                  <h4>Failed Status</h4>
                  <app-manual-email-bubble 
                    [emailData]="failedEmail"
                    (menuClick)="onMenuClick($event)">
                  </app-manual-email-bubble>
                </div>
              </div>
            </div>

            <h3>Manual Email Components</h3>
            <div class="example-container">
              <div class="status-examples">
                <div class="status-group">
                  <h4>User Badges</h4>
                  <div class="status-list">
                    <app-user-badge userName="Jake Cummings" [isFailed]="false"></app-user-badge>
                    <app-user-badge userName="Jake Cummings" [isFailed]="true"></app-user-badge>
                  </div>
                </div>
                
                <div class="status-group">
                  <h4>Email Icons</h4>
                  <div class="status-list">
                    <app-manual-email-icon [isFailed]="false"></app-manual-email-icon>
                    <app-manual-email-icon [isFailed]="true"></app-manual-email-icon>
                  </div>
                </div>
                
                <div class="status-group">
                  <h4>Status Badges</h4>
                  <div class="status-list">
                    <app-manual-email-status-badge type="sent" value="Aug 2, 2024 | 10:32 AM"></app-manual-email-status-badge>
                    <app-manual-email-status-badge type="failed" value="Aug 2, 2024 | 10:32 AM"></app-manual-email-status-badge>
                  </div>
                </div>
              </div>
            </div>

            <h3>Interactive Controls</h3>
            <div class="example-container">
              <div class="controls-section">
                <p-button label="Toggle Status" (click)="toggleStatus()" severity="primary" size="small"></p-button>
                <p-button label="Change Author" (click)="changeAuthor()" severity="secondary" size="small"></p-button>
                <p-button label="Update Timestamp" (click)="updateTimestamp()" severity="warning" size="small"></p-button>
              </div>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Usage">
          <div class="usage-section">
            <h3>Manual vs Automated Emails</h3>
            <p>Manual emails display the author's name in a user badge instead of "Automated", indicating human authorship.</p>
            
            <h3>Status States</h3>
            <p>Supports "sent" (green) and "failed" (red) states. Failed emails use red styling throughout for clear error indication.</p>
            
            <h3>Error Handling</h3>
            <p>Failed emails can include optional error details for tooltips or diagnostic information.</p>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>ManualEmailBubbleComponent Properties</h3>
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
                    <td>ManualEmailData</td>
                    <td>required</td>
                    <td>Complete email information including author, status, and content</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>ManualEmailData Interface</h3>
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
                    <td>authorName</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Name of the person who composed the email</td>
                  </tr>
                  <tr>
                    <td>fromAddress</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Sender email address</td>
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
                    <td>Email subject line (displayed in darker blue)</td>
                  </tr>
                  <tr>
                    <td>messageBody</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Email message content</td>
                  </tr>
                  <tr>
                    <td>status</td>
                    <td>'sent' | 'failed'</td>
                    <td>Yes</td>
                    <td>Email delivery status</td>
                  </tr>
                  <tr>
                    <td>timestamp</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>When the email was sent or failed</td>
                  </tr>
                  <tr>
                    <td>errorDetails</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Error information for failed emails</td>
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
                    <td>emailData: ManualEmailData</td>
                    <td>Emitted when the three-dot menu is clicked</td>
                  </tr>
                  <tr>
                    <td>emailClick</td>
                    <td>emailData: ManualEmailData</td>
                    <td>Emitted when the email bubble is clicked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Visual Differentiation</h3>
            <p>Uses user badge with person icon to distinguish from automated messages. Failed state applies red styling consistently.</p>
            
            <h3>Color System</h3>
            <p>Sent: Cyan background, blue accents. Failed: Red background (#FBE9EA), red accents, red icons and badges.</p>
            
            <h3>Status Indicators</h3>
            <p>Green check for sent, red triangle-exclamation for failed. Subject line uses darker blue (#174A78) for emphasis.</p>
            
            <h3>Error Handling</h3>
            <p>Failed emails get comprehensive red treatment including icon, badge, and background colors for immediate recognition.</p>
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
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
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

      .status-list {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class ManualEmailBubbleDocComponent {
  sentEmail: ManualEmailData = {
    authorName: 'Jake Cummings',
    fromAddress: 'system@docprocessing.com',
    toRecipients: ['client@company.com', 'shipper@logistics.com'],
    subjectLine: 'Document Upload Required - Shipment #SP-2024-1205',
    messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
    status: 'sent',
    timestamp: 'Aug 2, 2024 | 10:32 AM'
  };

  failedEmail: ManualEmailData = {
    authorName: 'Jake Cummings',
    fromAddress: 'system@docprocessing.com',
    toRecipients: ['client@company.com'],
    subjectLine: 'Document Upload Required - Shipment #SP-2024-1205',
    messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
    status: 'failed',
    timestamp: 'Aug 2, 2024 | 10:32 AM',
    errorDetails: 'SMTP server connection timeout'
  };

  toggleStatus(): void {
    this.sentEmail.status = this.sentEmail.status === 'sent' ? 'failed' : 'sent';
  }

  changeAuthor(): void {
    const authors = ['Jake Cummings', 'Sarah Johnson', 'Mike Chen', 'Emily Davis'];
    const currentIndex = authors.indexOf(this.sentEmail.authorName);
    const nextIndex = (currentIndex + 1) % authors.length;
    
    this.sentEmail.authorName = authors[nextIndex];
    this.failedEmail.authorName = authors[nextIndex];
  }

  updateTimestamp(): void {
    const newTimestamp = new Date().toLocaleString();
    this.sentEmail.timestamp = newTimestamp;
    this.failedEmail.timestamp = newTimestamp;
  }

  onMenuClick(emailData: ManualEmailData): void {
    console.log('Menu clicked for manual email:', emailData);
  }
}
