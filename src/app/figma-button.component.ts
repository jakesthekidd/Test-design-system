import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-figma-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClasses"
      [disabled]="disabled"
      (click)="handleClick($event)">
      <i *ngIf="leftIcon" [class]="'fas fa-' + leftIcon" class="button-icon"></i>
      <span class="button-text">{{ label }}</span>
      <i *ngIf="rightIcon" [class]="'fas fa-' + rightIcon" class="button-icon"></i>
    </button>
  `,
  styles: [`
    .figma-button {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10.5px 17.5px;
      border-radius: 6px;
      border: 1px solid;
      font-family: Inter, Roboto, -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 700;
      line-height: normal;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .figma-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Primary Button - Figma Design */
    .figma-button.primary {
      background-color: var(--theme-primary-color);
      border-color: var(--theme-primary-color);
      color: var(--theme-primary-contrast-color);
    }

    .figma-button.primary:hover:not(:disabled) {
      background-color: var(--theme-primary-dark-color);
      border-color: var(--theme-primary-dark-color);
    }

    .figma-button.primary:active:not(:disabled) {
      background-color: var(--theme-primary-darker-color);
      border-color: var(--theme-primary-darker-color);
    }

    /* Secondary Button */
    .figma-button.secondary {
      background-color: var(--button-secondary-background);
      border-color: var(--button-secondary-border-color);
      color: var(--button-secondary-color);
    }

    .figma-button.secondary:hover:not(:disabled) {
      background-color: #b3e0f2;
      border-color: var(--blue-600);
    }

    /* Success Button */
    .figma-button.success {
      background-color: var(--button-success-background);
      border-color: var(--button-success-background);
      color: white;
    }

    .figma-button.success:hover:not(:disabled) {
      background-color: var(--button-success-hover-background);
      border-color: var(--button-success-hover-background);
    }

    /* Info Button */
    .figma-button.info {
      background-color: var(--button-info-background);
      border-color: var(--button-info-background);
      color: white;
    }

    .figma-button.info:hover:not(:disabled) {
      background-color: var(--button-info-hover-background);
      border-color: var(--button-info-hover-background);
    }

    /* Warning Button */
    .figma-button.warning {
      background-color: var(--button-warning-background);
      border-color: var(--button-warning-background);
      color: white;
    }

    .figma-button.warning:hover:not(:disabled) {
      background-color: var(--button-warning-hover-background);
      border-color: var(--button-warning-hover-background);
    }

    /* Danger Button */
    .figma-button.danger {
      background-color: var(--button-danger-background);
      border-color: var(--button-danger-background);
      color: white;
    }

    .figma-button.danger:hover:not(:disabled) {
      background-color: var(--button-danger-hover-background);
      border-color: var(--button-danger-hover-background);
    }

    .button-icon {
      font-size: 13px;
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .button-text {
      font-weight: 700;
      font-size: 14px;
      line-height: normal;
    }

    /* Ripple effect for click feedback */
    .figma-button::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s;
    }

    .figma-button:active::after {
      width: 200px;
      height: 200px;
    }
  `]
})
export class FigmaButtonComponent {
  @Input() label: string = 'Button';
  @Input() severity: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;
  @Input() disabled: boolean = false;

  get buttonClasses(): string {
    return `figma-button ${this.severity}`;
  }

  handleClick(event: Event): void {
    if (!this.disabled) {
      // Handle click logic here
      console.log('Figma button clicked:', this.label);
    }
  }
}
