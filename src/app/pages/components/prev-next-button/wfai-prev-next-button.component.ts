import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OverlayPanel } from 'primeng/overlaypanel';

export interface WorkItem {
  id: string;
  title: string;
  type?: string;
  description?: string;
  timestamp?: Date;
}

@Component({
  selector: 'wfai-prev-next-button',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule],
  template: `
    <div class="wfai-prev-next-button" 
         [style.width]="width" 
         [style.height]="height"
         [class.disabled]="disabled">
      
      <!-- Previous Button -->
      <div class="previous-button" 
           [class.disabled]="disabled || previousItems.length === 0"
           (click)="onPreviousClick()">
        <div class="button-content">
          <i class="fas fa-arrow-left previous-icon"></i>
          <span class="button-text">{{ previousLabel }}</span>
          <span class="divider">|</span>
          <div class="dropdown-trigger" 
               (click)="onPreviousDropdownClick($event)"
               [class.disabled]="disabled || previousItems.length === 0">
            <i class="fas fa-angle-down dropdown-icon"></i>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <div class="next-button" 
           [class.disabled]="disabled || nextItems.length === 0"
           (click)="onNextClick()">
        <div class="button-content">
          <div class="dropdown-trigger" 
               (click)="onNextDropdownClick($event)"
               [class.disabled]="disabled || nextItems.length === 0">
            <i class="fas fa-angle-down dropdown-icon"></i>
          </div>
          <span class="divider">|</span>
          <span class="button-text">{{ nextLabel }}</span>
          <i class="fas fa-arrow-right next-icon"></i>
        </div>
      </div>
    </div>

    <!-- Previous Items Dropdown -->
    <p-overlayPanel #previousPanel 
                    [style]="{ 'max-width': '300px' }"
                    [dismissable]="true">
      <div class="dropdown-content">
        <div class="dropdown-header">Recent Items</div>
        <div class="dropdown-items" [style.max-height]="'120px'" [style.overflow-y]="'auto'">
          <div *ngFor="let item of previousItems.slice(0, 10); trackBy: trackByItemId" 
               class="dropdown-item"
               (click)="onPreviousItemSelect(item)">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-description" *ngIf="item.description">{{ item.description }}</div>
            <div class="item-type" *ngIf="item.type">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </p-overlayPanel>

    <!-- Next Items Dropdown -->
    <p-overlayPanel #nextPanel 
                    [style]="{ 'max-width': '300px' }"
                    [dismissable]="true">
      <div class="dropdown-content">
        <div class="dropdown-header">Next Items</div>
        <div class="dropdown-items" [style.max-height]="'120px'" [style.overflow-y]="'auto'">
          <div *ngFor="let item of nextItems; trackBy: trackByItemId" 
               class="dropdown-item"
               (click)="onNextItemSelect(item)">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-description" *ngIf="item.description">{{ item.description }}</div>
            <div class="item-type" *ngIf="item.type">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </p-overlayPanel>
  `,
  styles: [`
    .wfai-prev-next-button {
      display: flex;
      align-items: center;
      border-radius: 4px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
      font-family: 'Roboto', sans-serif;
      position: relative;
      transition: all 0.2s ease;
    }

    .wfai-prev-next-button.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .previous-button {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 10px;
      background: var(--blue-500, #2474BB);
      border-radius: 4px 0px 0px 4px;
      border: 1px solid #FFF;
      border-right: none;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
    }

    .previous-button:hover:not(.disabled) {
      background: rgba(36, 116, 187, 0.9);
    }

    .previous-button:active:not(.disabled) {
      transform: scale(0.98);
    }

    .previous-button.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .next-button {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 10px;
      background: #FFF;
      border-radius: 0px 4px 4px 0px;
      border: 1px solid var(--surface-border, #dee2e6);
      border-left: none;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
    }

    .next-button:hover:not(.disabled) {
      background: rgba(36, 116, 187, 0.05);
    }

    .next-button:active:not(.disabled) {
      transform: scale(0.98);
    }

    .next-button.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .button-content {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      font-size: 12px;
      font-weight: 700;
      line-height: normal;
    }

    .previous-button .button-content {
      color: #FFF;
    }

    .next-button .button-content {
      color: var(--blue-500, #2474BB);
      justify-content: flex-end;
    }

    .button-text {
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }

    .previous-icon,
    .next-icon {
      font-size: 14px;
      font-weight: 900;
    }

    .divider {
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 700;
    }

    .previous-button .divider {
      color: #FFF;
    }

    .next-button .divider {
      color: var(--grey-50, #C6CCD6);
    }

    .dropdown-trigger {
      display: flex;
      align-items: center;
      padding: 4px 2px;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .dropdown-trigger:hover:not(.disabled) {
      opacity: 0.8;
    }

    .dropdown-trigger.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .dropdown-icon {
      font-size: 14px;
      font-weight: 900;
    }

    .previous-button .dropdown-icon {
      color: #FFF;
    }

    .next-button .dropdown-icon {
      color: var(--blue-500, #2474BB);
    }

    /* Dropdown Styles */
    .dropdown-content {
      min-width: 250px;
    }

    .dropdown-header {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-color);
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--surface-border);
      margin-bottom: 0.5rem;
    }

    .dropdown-items {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .dropdown-item {
      padding: 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      border: 1px solid transparent;
    }

    .dropdown-item:hover {
      background: var(--surface-hover, #f8f9fa);
      border-color: var(--surface-border);
    }

    .item-title {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-color);
      margin-bottom: 0.25rem;
    }

    .item-description {
      font-size: 0.75rem;
      color: var(--text-color-secondary);
      margin-bottom: 0.25rem;
      line-height: 1.3;
    }

    .item-type {
      font-size: 0.625rem;
      padding: 0.125rem 0.375rem;
      background: var(--blue-500, #2474BB);
      color: white;
      border-radius: 12px;
      display: inline-block;
      text-transform: uppercase;
      font-weight: 600;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .button-text {
        display: none;
      }
      
      .wfai-prev-next-button {
        width: auto !important;
        min-width: 80px;
      }
      
      .button-content {
        gap: 4px;
      }
    }

    @media (max-width: 480px) {
      .divider {
        display: none;
      }
      
      .dropdown-content {
        min-width: 200px;
      }
    }
  `]
})
export class WfaiPrevNextButtonComponent {
  @Input() previousItems: WorkItem[] = [];
  @Input() nextItems: WorkItem[] = [];
  @Input() previousLabel: string = 'Previous';
  @Input() nextLabel: string = 'Next';
  @Input() disabled: boolean = false;
  @Input() width: string = '226px';
  @Input() height: string = '32px';

  @Output() previousClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();
  @Output() previousItemSelect = new EventEmitter<WorkItem>();
  @Output() nextItemSelect = new EventEmitter<WorkItem>();

  @ViewChild('previousPanel') previousPanel!: OverlayPanel;
  @ViewChild('nextPanel') nextPanel!: OverlayPanel;

  trackByItemId(index: number, item: WorkItem): string {
    return item.id;
  }

  onPreviousClick(): void {
    if (!this.disabled && this.previousItems.length > 0) {
      this.previousClick.emit();
    }
  }

  onNextClick(): void {
    if (!this.disabled && this.nextItems.length > 0) {
      this.nextClick.emit();
    }
  }

  onPreviousDropdownClick(event: Event): void {
    event.stopPropagation();
    if (!this.disabled && this.previousItems.length > 0) {
      this.previousPanel.toggle(event);
    }
  }

  onNextDropdownClick(event: Event): void {
    event.stopPropagation();
    if (!this.disabled && this.nextItems.length > 0) {
      this.nextPanel.toggle(event);
    }
  }

  onPreviousItemSelect(item: WorkItem): void {
    this.previousItemSelect.emit(item);
    this.previousPanel.hide();
  }

  onNextItemSelect(item: WorkItem): void {
    this.nextItemSelect.emit(item);
    this.nextPanel.hide();
  }
}
