import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatusType = 'sent' | 'scheduled' | 'workflow-stopped';
export type BadgeType = 'automated' | 'manual';

// Automated Badge Component
@Component({
  selector: 'app-automated-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="automated-badge">
      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.75 0.5C9.23398 0.5 9.625 0.891016 9.625 1.375V3.125H12.9062C13.9945 3.125 14.875 4.00547 14.875 5.09375V12.5312C14.875 13.6195 13.9945 14.5 12.9062 14.5H4.59375C3.50547 14.5 2.625 13.6195 2.625 12.5312V5.09375C2.625 4.00547 3.50547 3.125 4.59375 3.125H7.875V1.375C7.875 0.891016 8.26602 0.5 8.75 0.5ZM5.6875 11C5.44688 11 5.25 11.1969 5.25 11.4375C5.25 11.6781 5.44688 11.875 5.6875 11.875H6.5625C6.80312 11.875 7 11.6781 7 11.4375C7 11.1969 6.80312 11 6.5625 11H5.6875ZM8.3125 11C8.07187 11 7.875 11.1969 7.875 11.4375C7.875 11.6781 8.07187 11.875 8.3125 11.875H9.1875C9.42813 11.875 9.625 11.6781 9.625 11.4375C9.625 11.1969 9.42813 11 9.1875 11H8.3125ZM10.9375 11C10.6969 11 10.5 11.1969 10.5 11.4375C10.5 11.6781 10.6969 11.875 10.9375 11.875H11.8125C12.0531 11.875 12.25 11.6781 12.25 11.4375C12.25 11.1969 12.0531 11 11.8125 11H10.9375ZM7.21875 7.5C7.21875 7.20992 7.10352 6.93172 6.8984 6.7266C6.69328 6.52148 6.41508 6.40625 6.125 6.40625C5.83492 6.40625 5.55672 6.52148 5.3516 6.7266C5.14648 6.93172 5.03125 7.20992 5.03125 7.5C5.03125 7.79008 5.14648 8.06828 5.3516 8.2734C5.55672 8.47852 5.83492 8.59375 6.125 8.59375C6.41508 8.59375 6.69328 8.47852 6.8984 8.2734C7.10352 8.06828 7.21875 7.79008 7.21875 7.5ZM11.375 8.59375C11.6651 8.59375 11.9433 8.47852 12.1484 8.2734C12.3535 8.06828 12.4688 7.79008 12.4688 7.5C12.4688 7.20992 12.3535 6.93172 12.1484 6.7266C11.9433 6.52148 11.6651 6.40625 11.375 6.40625C11.0849 6.40625 10.8067 6.52148 10.6016 6.7266C10.3965 6.93172 10.2812 7.20992 10.2812 7.5C10.2812 7.79008 10.3965 8.06828 10.6016 8.2734C10.8067 8.47852 11.0849 8.59375 11.375 8.59375ZM1.3125 6.625H1.75V11.875H1.3125C0.587891 11.875 0 11.2871 0 10.5625V7.9375C0 7.21289 0.587891 6.625 1.3125 6.625ZM16.1875 6.625C16.9121 6.625 17.5 7.21289 17.5 7.9375V10.5625C17.5 11.2871 16.9121 11.875 16.1875 11.875H15.75V6.625H16.1875Z" fill="currentColor"/>
      </svg>
      <span>Automated</span>
    </div>
  `,
  styles: [`
    .automated-badge {
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
    
    .automated-badge svg {
      width: 17.5px;
      height: 14px;
      fill: currentColor;
    }
  `]
})
export class AutomatedBadgeComponent {}

// Status Badge Component
@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="status-badge" [ngClass]="statusClass">
      <div class="status-content">
        <i [class]="iconClass" *ngIf="iconClass"></i>
        <span class="status-label">{{ label }}{{ labelSuffix ? ':' : '' }}</span>
        <span class="status-value" *ngIf="value">{{ value }}</span>
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
    
    .status-badge.scheduled {
      background: var(--yellow-200, #FCF5A4);
      color: var(--yellow-900, #635C0B);
    }
    
    .status-badge.workflow-stopped {
      background: var(--cyan-50, #F1FAFE);
      color: var(--red-700, #AE1923);
    }
    
    .status-badge i {
      font-size: 13px;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() type: StatusType = 'sent';
  @Input() value: string = '';
  @Input() customLabel: string = '';

  get statusClass(): string {
    return this.type;
  }

  get iconClass(): string {
    switch (this.type) {
      case 'sent':
        return 'fa-solid fa-check';
      case 'scheduled':
        return 'fa-solid fa-clock';
      case 'workflow-stopped':
        return 'fa-solid fa-clipboard-check';
      default:
        return '';
    }
  }

  get label(): string {
    if (this.customLabel) {
      return this.customLabel;
    }
    
    switch (this.type) {
      case 'sent':
        return 'Sent';
      case 'scheduled':
        return 'Scheduled';
      case 'workflow-stopped':
        return 'Workflow Stopped';
      default:
        return '';
    }
  }

  get labelSuffix(): boolean {
    return this.value !== '';
  }
}

// Email Icon Component
@Component({
  selector: 'app-email-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="email-icon">
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
    
    .email-icon i {
      font-size: 12px;
      font-weight: 900;
    }
  `]
})
export class EmailIconComponent {}

// Menu Button Component
@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="menu-button" type="button" (click)="onClick()">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>
  `,
  styles: [`
    .menu-button {
      display: flex;
      padding: 2px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 2px;
      background: none;
      border: none;
      color: var(--blue-600, #2068A8);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .menu-button:hover {
      background-color: var(--surface-hover);
    }
    
    .menu-button i {
      font-size: 16px;
      font-weight: 900;
    }
  `]
})
export class MenuButtonComponent {
  onClick(): void {
    // Emit click event or handle menu action
  }
}
