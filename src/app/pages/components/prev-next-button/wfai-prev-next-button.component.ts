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
                    [style]="{ 'width': '168px' }"
                    [dismissable]="true">
      <div class="previous-dropdown">
        <div class="dropdown-header">RECENT LOADS</div>
        <div class="dropdown-items-container">
          <div *ngFor="let item of previousItems.slice(0, 10); trackBy: trackByItemId"
               class="dropdown-item"
               (click)="onPreviousItemSelect(item)">
            <i class="fas fa-arrow-right item-arrow"></i>
            <span class="item-text">{{ item.title || item.id }}</span>
          </div>
        </div>
      </div>
    </p-overlayPanel>

    <!-- Next Items Dropdown -->
    <p-overlayPanel #nextPanel
                    [style]="{ 'width': '136px' }"
                    [dismissable]="true">
      <div class="next-dropdown">
        <div class="next-dropdown-item" (click)="onNextItemSelect({ id: 'next-results', title: 'Next From Results' })">
          <span class="next-item-text">Next From Results</span>
          <i class="fas fa-arrow-right next-arrow"></i>
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
      background: var(--blue-700, #1D5D96);
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
      background: var(--surface-200, #F3F5F7);
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

    .previous-button .dropdown-trigger:hover:not(.disabled) {
      background: var(--blue-700, #1D5D96);
    }

    .next-button .dropdown-trigger:hover:not(.disabled) {
      background: var(--surface-200, #F3F5F7);
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
    .previous-dropdown {
      width: 168px;
      background: #FFF;
      border-radius: 4px;
      border: 1px solid var(--silver-100, #EFF2F4);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .dropdown-header {
      padding: 8px;
      border-bottom: 1px solid var(--silver-100, #EFF2F4);
      color: var(--support-colors-primary-grey-text, #8D9AAE);
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .dropdown-items-container {
      max-height: 135px;
      overflow-y: auto;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .dropdown-item:hover {
      background: var(--surface-hover, #f8f9fa);
    }

    .item-arrow {
      color: var(--grey-50, #C6CCD6);
      font-size: 12px;
      font-weight: 900;
    }

    .item-text {
      color: var(--med-black, rgba(58, 58, 58, 1));
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .next-dropdown {
      background: #FFF;
      border-radius: 4px;
      border: 1px solid var(--silver-100, #EFF2F4);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .next-dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .next-dropdown-item:hover {
      background: var(--surface-hover, #f8f9fa);
    }

    .next-item-text {
      color: var(--blue-500, #2474BB);
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
    }

    .next-arrow {
      color: var(--blue-500, #2474BB);
      font-size: 12px;
      font-weight: 900;
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

      .previous-dropdown {
        width: 140px;
      }

      .next-dropdown {
        width: 120px;
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
  @Input() showPreviousDropdown: boolean = true;

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
