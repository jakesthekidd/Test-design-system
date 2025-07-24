import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

// Import existing components and types
import { FilterType, FilterTab } from '../message-center-header/message-center-header.component';
import { CommunicationMessage } from '../communication-panel/communication-panel.component';
import { NoteBubbleComponent } from '../note-bubble/note-bubble.component';
import { AutomatedEmailBubbleComponent } from '../automated-email-bubble/automated-email-bubble.component';
import { SmsBubbleComponent } from '../sms-bubble/sms-bubble.component';
import { ManualEmailBubbleComponent } from '../manual-email-bubble/manual-email-bubble.component';
import { UploadBubbleComponent } from '../upload-bubble/upload-bubble.component';

export interface MessageCenterExpandedConfig {
  messages: CommunicationMessage[];
  activeFilter: FilterType;
  unreadCounts: { [key in FilterType]: number };
}

@Component({
  selector: 'app-message-center-expanded',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NoteBubbleComponent,
    AutomatedEmailBubbleComponent,
    SmsBubbleComponent,
    ManualEmailBubbleComponent,
    UploadBubbleComponent
  ],
  template: `
    <!-- Browser Control Bar -->
    <div class="browser-control-bar">
      <div class="browser-controls">
        <div class="control-buttons">
          <span class="control-button close" (click)="closeWindow()"></span>
          <span class="control-button minimize"></span>
          <span class="control-button maximize"></span>
        </div>
      </div>
      
      <div class="browser-tab">
        <div class="tab-content">
          <img class="favicon" src="/favicon.ico" alt="Favicon" />
          <span class="tab-title">Message Center</span>
          <button class="tab-close" (click)="closeWindow()" aria-label="Close window">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Message Center Header -->
    <div class="header-section">
      <div class="title-section">
        <i class="fas fa-comment title-icon"></i>
        <h1 class="title">Message Center</h1>
      </div>
      
      <div class="filter-tabs">
        <button
          *ngFor="let tab of filterTabs"
          [class]="getTabClasses(tab.id as FilterType)"
          (click)="onFilterChanged(tab.id as FilterType)"
          [attr.aria-label]="'Filter by ' + tab.label"
        >
          <i [class]="tab.icon"></i>
          <span class="tab-label">{{ tab.label }}</span>
          <span *ngIf="tab.notificationCount" class="notification-badge">
            {{ tab.notificationCount }}
          </span>
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Secondary Header with Filter and Compose -->
      <div class="secondary-header">
        <button 
          class="filter-button"
          aria-label="Filter messages"
          (click)="onFilterClick()"
        >
          <i class="fas fa-filter"></i>
        </button>

        <button
          *ngIf="shouldShowComposeButton"
          pButton
          type="button"
          class="compose-button"
          (click)="onComposeClick()"
        >
          <i class="fas fa-pen"></i>
          <span>Compose</span>
        </button>
      </div>

      <!-- Messages Container -->
      <div class="messages-container">
        <!-- Message Feed -->
        <div class="message-feed">
          <div
            class="message-list"
            #messageFeed
            (wheel)="onMessageListScroll($event)"
            (touchmove)="onMessageListTouch($event)"
          >
            <ng-container *ngFor="let message of filteredMessages; trackBy: trackMessage">
              <!-- Note Bubble -->
              <div
                *ngIf="message.type === 'note'"
                class="message-item note-message"
                [class.note-own]="message.data.isOwnMessage"
                [class.note-other]="!message.data.isOwnMessage"
                [attr.data-message-id]="message.id"
              >
                <app-note-bubble
                  [noteData]="message.data"
                  (noteClick)="onMessageClick(message)"
                />
              </div>

              <!-- Automated Email Bubble -->
              <div
                *ngIf="message.type === 'automated-email'"
                class="message-item outbound-message"
                [attr.data-message-id]="message.id"
              >
                <app-automated-email-bubble
                  [emailData]="message.data"
                  (emailClick)="onMessageClick(message)"
                />
              </div>

              <!-- SMS Bubble -->
              <div
                *ngIf="message.type === 'sms'"
                class="message-item outbound-message"
                [attr.data-message-id]="message.id"
              >
                <app-sms-bubble
                  [smsData]="message.data"
                  (smsClick)="onMessageClick(message)"
                />
              </div>

              <!-- Manual Email Bubble -->
              <div
                *ngIf="message.type === 'manual-email'"
                class="message-item outbound-message"
                [attr.data-message-id]="message.id"
              >
                <app-manual-email-bubble
                  [emailData]="message.data"
                  (emailClick)="onMessageClick(message)"
                />
              </div>

              <!-- Upload Bubble -->
              <div
                *ngIf="message.type === 'upload'"
                class="message-item outbound-message"
                [attr.data-message-id]="message.id"
              >
                <app-upload-bubble
                  [uploadData]="message.data"
                  (uploadClick)="onMessageClick(message)"
                />
              </div>
            </ng-container>

            <!-- Empty State -->
            <div *ngIf="filteredMessages.length === 0" class="empty-state">
              <i class="fas fa-inbox empty-icon"></i>
              <p class="empty-text">No {{ getFilterDisplayName(activeFilter).toLowerCase() }} messages</p>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-indicator" #scrollIndicator>
          <div class="scroll-track">
            <div class="scroll-thumb" [style.height.%]="scrollThumbHeight" [style.top.%]="scrollThumbPosition"></div>
          </div>
        </div>
      </div>

      <!-- Compose Area (Architecture for future implementation) -->
      <div class="compose-area" *ngIf="shouldShowComposeArea">
        <!-- Placeholder for future Compose functionality -->
        <div class="compose-placeholder">
          <div class="compose-input-area">
            <div class="compose-toolbar">
              <button class="compose-tool-button" disabled>
                <i class="fas fa-bold"></i>
              </button>
              <button class="compose-tool-button" disabled>
                <i class="fas fa-italic"></i>
              </button>
              <button class="compose-tool-button" disabled>
                <i class="fas fa-link"></i>
              </button>
            </div>
            <div class="compose-input">
              <div class="cursor-placeholder">|</div>
            </div>
            <div class="compose-actions">
              <div class="character-count">0/500</div>
              <button class="send-button" disabled>
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      background: var(--surface-0, #ffffff);
      font-family: 'Roboto', -apple-system, sans-serif;
      overflow: hidden;
    }

    /* Browser Control Bar */
    .browser-control-bar {
      height: 42px;
      background: #202124;
      display: flex;
      align-items: center;
      padding: 0 8px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      position: relative;
      z-index: 100;
    }

    .browser-controls {
      display: flex;
      align-items: center;
      margin-right: 16px;
    }

    .control-buttons {
      display: flex;
      gap: 8px;
    }

    .control-button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: pointer;
      transition: opacity 0.2s ease;
    }

    .control-button.close {
      background: #FF6058;
      border: 0.5px solid #E14942;
    }

    .control-button.minimize {
      background: #FFC130;
      border: 0.5px solid #E1A325;
    }

    .control-button.maximize {
      background: #27CA40;
      border: 0.5px solid #3EAF3F;
    }

    .control-button:hover {
      opacity: 0.8;
    }

    .browser-tab {
      display: flex;
      align-items: center;
      height: 34px;
      background: #35363A;
      border-radius: 8px 8px 0 0;
      padding: 8px 12px;
      color: #fff;
      position: relative;
    }

    .tab-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .favicon {
      width: 16px;
      height: 16px;
    }

    .tab-title {
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.2px;
    }

    .tab-close {
      background: none;
      border: none;
      color: #fff;
      padding: 2px;
      border-radius: 2px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .tab-close:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Header Section */
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid var(--Grey-50, #C6CCD6);
      background: var(--surface-0, #ffffff);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .title-icon {
      color: var(--Primary-Dark, #174A78);
      font-size: 21px;
      font-weight: 900;
    }

    .title {
      color: var(--Primary-Dark, #174A78);
      font-size: 16px;
      font-weight: 500;
      margin: 0;
    }

    .filter-tabs {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .filter-tab {
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 6px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .filter-tab.active {
      background: var(--root-surface-ground, #EFF2F4);
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.10), 0px 1px 3px rgba(0, 0, 0, 0.10);
    }

    .filter-tab i {
      font-size: 12px;
      transition: color 0.2s ease;
    }

    .filter-tab.active i {
      color: var(--global-textColor, #3D3D3D);
    }

    .filter-tab:not(.active) i {
      color: var(--surface-700, #8D9AAE);
    }

    .tab-label {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .filter-tab.active .tab-label {
      color: var(--global-textColor, #3D3D3D);
    }

    .filter-tab:not(.active) .tab-label {
      color: var(--surface-700, #8D9AAE);
    }

    .notification-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 12px;
      height: 12px;
      padding: 2px;
      border-radius: 20px;
      background: var(--Red-100, #DA1F2C);
      color: var(--Light-Blue-15, #EAF8FD);
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 500;
    }

    /* Main Content */
    .main-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      background: var(--surface-0, #ffffff);
    }

    /* Secondary Header */
    .secondary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--surface-400, #E2E6EB);
      background: var(--surface-0, #ffffff);
      flex-shrink: 0;
    }

    .filter-button {
      background: transparent;
      border: none;
      color: var(--of-black-70, #777);
      font-size: 24px;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.2s ease;
    }

    .filter-button:hover {
      color: var(--Blue-primary-100, #2474BB);
    }

    .compose-button {
      background: var(--Blue-primary-100, #2474BB) !important;
      color: var(--Support-Colors-White, #FFF) !important;
      border: none !important;
      padding: 10px 16px !important;
      border-radius: 4px !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      font-size: 14px !important;
      font-weight: 400 !important;
      cursor: pointer !important;
      transition: background-color 0.2s ease !important;
    }

    .compose-button:hover {
      background: var(--blue-600, #2068A8) !important;
    }

    .compose-button i {
      font-size: 14px;
    }

    /* Messages Container */
    .messages-container {
      display: flex;
      flex: 1;
      min-height: 0;
      position: relative;
    }

    .message-feed {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      background: var(--surface-0, #ffffff);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15) inset;
    }

    .message-list {
      height: 100%;
      padding: 16px 0;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overscroll-behavior: contain;
      touch-action: pan-y;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }

    .message-item {
      flex-shrink: 0;
      width: 100%;
      box-sizing: border-box;
    }

    /* Note Messages - Full width with directional alignment */
    .message-item.note-message {
      padding: 0 16px;
      width: 100%;
      box-sizing: border-box;
    }

    .message-item.note-own {
      display: flex;
      justify-content: flex-end;
      text-align: right;
    }

    .message-item.note-other {
      display: flex;
      justify-content: flex-start;
      text-align: left;
    }

    /* Outbound Messages (SMS, Emails) - Right aligned */
    .message-item.outbound-message {
      display: flex;
      justify-content: flex-end;
      padding-left: 48px;
      padding-right: 16px;
      text-align: right;
    }

    /* Empty State */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: var(--surface-600, #A9B3C2);
      text-align: center;
      min-height: 200px;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-text {
      font-size: 1.1rem;
      margin: 0;
    }

    /* Scroll Indicator */
    .scroll-indicator {
      width: 16px;
      padding: 16px 0;
      background: var(--surface-100, #F7F8F9);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15) inset;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }

    .scroll-track {
      width: 4px;
      flex: 1;
      background: var(--Secondary-Blue-25, #DCF2FC);
      border-radius: 16px;
      position: relative;
    }

    .scroll-thumb {
      width: 4px;
      background: var(--Blue-primary-100, #2474BB);
      border-radius: 16px;
      position: absolute;
      left: 0;
      transition: height 0.1s ease, top 0.1s ease;
    }

    /* Compose Area (Future Implementation) */
    .compose-area {
      border-top: 1px solid var(--Grey-50, #C6CCD6);
      background: var(--surface-0, #ffffff);
      flex-shrink: 0;
    }

    .compose-placeholder {
      padding: 16px;
    }

    .compose-input-area {
      border-radius: 8px;
      border: 2px solid #CBCCCE;
      background: var(--surface-0, #ffffff);
      display: flex;
      flex-direction: column;
    }

    .compose-toolbar {
      display: flex;
      gap: 8px;
      padding: 8px 16px;
      border-bottom: 1px solid var(--surface-border, #E2E6EB);
    }

    .compose-tool-button {
      background: none;
      border: none;
      color: var(--surface-600, #A9B3C2);
      padding: 4px 8px;
      border-radius: 4px;
      cursor: not-allowed;
      opacity: 0.5;
    }

    .compose-input {
      padding: 16px;
      min-height: 40px;
      position: relative;
      color: var(--med-black, rgba(58, 58, 58, 1));
    }

    .cursor-placeholder {
      color: var(--med-black, rgba(58, 58, 58, 1));
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      font-weight: 300;
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .compose-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
    }

    .character-count {
      color: var(--of-black-70, #777);
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-style: italic;
    }

    .send-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50px;
      background: var(--surface-0, #ffffff);
      border: none;
      color: var(--Blue-primary-100, #2474BB);
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-section {
        padding: 12px 16px;
        flex-wrap: wrap;
        gap: 12px;
      }

      .filter-tabs {
        gap: 8px;
      }

      .filter-tab {
        padding: 3px 6px;
      }

      .tab-label {
        font-size: 12px;
      }

      .secondary-header {
        padding: 12px 16px;
      }

      .message-item.note-message {
        padding: 0 12px;
      }

      .message-item.outbound-message {
        padding-left: 36px;
        padding-right: 12px;
      }
    }

    /* Focus states for accessibility */
    .filter-button:focus,
    .compose-button:focus,
    .filter-tab:focus {
      outline: 2px solid var(--primary-500, #3B82F6);
      outline-offset: 2px;
    }
  `]
})
export class MessageCenterExpandedComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messageFeed', { static: false }) messageFeedRef!: ElementRef;
  @ViewChild('scrollIndicator', { static: false }) scrollIndicatorRef!: ElementRef;

  @Input() messages: CommunicationMessage[] = [];
  @Input() activeFilter: FilterType = 'all';
  @Input() unreadCounts: { [key in FilterType]: number } = {
    notes: 0,
    emails: 0,
    sms: 0,
    all: 0
  };

  @Output() filterChanged = new EventEmitter<FilterType>();
  @Output() composeEmail = new EventEmitter<void>();
  @Output() messageClicked = new EventEmitter<CommunicationMessage>();
  @Output() filterClicked = new EventEmitter<void>();
  @Output() windowClosed = new EventEmitter<void>();

  filteredMessages: CommunicationMessage[] = [];
  filterTabs: FilterTab[] = [];
  scrollThumbHeight: number = 100;
  scrollThumbPosition: number = 0;
  shouldShowComposeArea: boolean = false; // Architecture for future compose

  private intersectionObserver?: IntersectionObserver;

  ngOnInit(): void {
    this.updateFilterTabs();
    this.updateFilteredMessages();
    this.setupWindowEventListeners();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
    this.setupScrollIndicator();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.removeWindowEventListeners();
  }

  get shouldShowComposeButton(): boolean {
    return this.activeFilter === 'emails';
  }

  closeWindow(): void {
    this.windowClosed.emit();
    if (typeof window !== 'undefined') {
      window.close();
    }
  }

  onFilterChanged(filter: FilterType): void {
    this.activeFilter = filter;
    this.updateFilteredMessages();
    this.filterChanged.emit(filter);
  }

  onComposeClick(): void {
    // Future: Show compose area
    this.shouldShowComposeArea = true;
    this.composeEmail.emit();
  }

  onFilterClick(): void {
    this.filterClicked.emit();
  }

  onMessageClick(message: CommunicationMessage): void {
    if (!message.isRead) {
      message.isRead = true;
      this.updateUnreadCounts();
      this.updateFilterTabs();
      console.log(`Message ${message.id} marked as read. Type: ${message.type}`);
    }
    this.messageClicked.emit(message);
  }

  onMessageListScroll(event: WheelEvent): void {
    const element = event.currentTarget as HTMLElement;
    const atTop = element.scrollTop === 0;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

    event.stopPropagation();

    if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
      event.preventDefault();
    }

    this.updateScrollIndicator();
  }

  onMessageListTouch(event: TouchEvent): void {
    event.stopPropagation();
    this.updateScrollIndicator();
  }

  trackMessage(index: number, message: CommunicationMessage): string {
    return message.id;
  }

  getFilterDisplayName(filter: FilterType): string {
    const names = {
      notes: 'Notes',
      emails: 'Emails',
      sms: 'SMS',
      all: 'All'
    };
    return names[filter];
  }

  getTabClasses(filter: FilterType): string {
    return `filter-tab ${this.activeFilter === filter ? 'active' : ''}`;
  }

  private updateFilterTabs(): void {
    this.filterTabs = [
      {
        id: 'notes',
        label: 'Notes',
        icon: 'fas fa-sticky-note',
        notificationCount: this.unreadCounts.notes || undefined
      },
      {
        id: 'emails',
        label: 'Emails',
        icon: 'fas fa-envelope',
        notificationCount: this.unreadCounts.emails || undefined
      },
      {
        id: 'sms',
        label: 'SMS',
        icon: 'fas fa-comment',
        notificationCount: this.unreadCounts.sms || undefined
      },
      {
        id: 'all',
        label: 'All',
        icon: 'fas fa-layer-group',
        notificationCount: this.unreadCounts.all || undefined
      }
    ];

    this.filterTabs = [...this.filterTabs];
  }

  private updateFilteredMessages(): void {
    if (this.activeFilter === 'all') {
      this.filteredMessages = [...this.messages];
    } else {
      this.filteredMessages = this.messages.filter(message => {
        switch (this.activeFilter) {
          case 'notes':
            return message.type === 'note';
          case 'emails':
            return message.type === 'automated-email' || message.type === 'manual-email';
          case 'sms':
            return message.type === 'sms';
          default:
            return true;
        }
      });
    }

    this.filteredMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    setTimeout(() => this.updateScrollIndicator(), 100);
  }

  private updateUnreadCounts(): void {
    const counts = { notes: 0, emails: 0, sms: 0, all: 0 };

    this.messages.forEach(message => {
      if (!message.isRead) {
        counts.all++;
        switch (message.type) {
          case 'note':
            counts.notes++;
            break;
          case 'automated-email':
          case 'manual-email':
            counts.emails++;
            break;
          case 'sms':
            counts.sms++;
            break;
        }
      }
    });

    const hasChanged = Object.keys(counts).some(key =>
      this.unreadCounts[key as FilterType] !== counts[key as FilterType]
    );

    if (hasChanged) {
      this.unreadCounts = { ...counts };
      this.updateFilterTabs();
    }
  }

  private setupIntersectionObserver(): void {
    if (!this.messageFeedRef || typeof window === 'undefined') return;

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const messageElement = entry.target as HTMLElement;
          const messageId = messageElement.dataset['messageId'];
          if (messageId) {
            setTimeout(() => {
              this.markMessageAsViewed(messageId);
            }, 1500);
          }
        }
      });
    }, {
      root: this.messageFeedRef.nativeElement,
      rootMargin: '0px',
      threshold: 0.8
    });

    setTimeout(() => {
      if (this.messageFeedRef?.nativeElement) {
        const messageElements = this.messageFeedRef.nativeElement.querySelectorAll('.message-item');
        messageElements.forEach((element: Element) => this.intersectionObserver!.observe(element));
      }
    }, 200);
  }

  private markMessageAsViewed(messageId: string): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message && !message.isRead) {
      message.isRead = true;
      this.updateUnreadCounts();
      this.updateFilterTabs();
      console.log(`Message ${messageId} auto-marked as viewed`);
    }
  }

  private setupScrollIndicator(): void {
    if (!this.messageFeedRef) return;

    const messageList = this.messageFeedRef.nativeElement;
    if (messageList) {
      messageList.addEventListener('scroll', () => this.updateScrollIndicator());
      this.updateScrollIndicator();
    }
  }

  private updateScrollIndicator(): void {
    if (!this.messageFeedRef?.nativeElement) return;

    const messageList = this.messageFeedRef.nativeElement;
    const scrollHeight = messageList.scrollHeight;
    const clientHeight = messageList.clientHeight;
    const scrollTop = messageList.scrollTop;

    if (scrollHeight <= clientHeight) {
      this.scrollThumbHeight = 100;
      this.scrollThumbPosition = 0;
      return;
    }

    // Calculate thumb height as percentage of visible area
    this.scrollThumbHeight = Math.max((clientHeight / scrollHeight) * 100, 10);

    // Calculate thumb position
    const maxScrollTop = scrollHeight - clientHeight;
    const scrollPercentage = scrollTop / maxScrollTop;
    const maxThumbPosition = 100 - this.scrollThumbHeight;
    this.scrollThumbPosition = scrollPercentage * maxThumbPosition;
  }

  private setupWindowEventListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', this.handleBeforeUnload);
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }

  private removeWindowEventListeners(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', this.handleBeforeUnload);
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  private handleBeforeUnload = (event: BeforeUnloadEvent): void => {
    this.windowClosed.emit();
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    // ESC to close window
    if (event.key === 'Escape') {
      this.closeWindow();
    }
    // Ctrl/Cmd + W to close window
    if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
      this.closeWindow();
    }
  };
}

// Documentation Component
@Component({
  selector: 'app-message-center-expanded-docs',
  standalone: true,
  imports: [CommonModule, MessageCenterExpandedComponent, ButtonModule],
  template: `
    <div class="docs-container">
      <h1>MessageCenterExpanded Component</h1>
      <p class="component-description">
        An expanded view of the Message Center that opens in a new browser window, providing
        a dedicated workspace for managing communications with architecture for future Compose functionality.
      </p>

      <div class="docs-section">
        <h2>Window Specifications</h2>
        <div class="spec-grid">
          <div class="spec-item">
            <h4>Dimensions</h4>
            <p>70% screen height × 40% screen width</p>
          </div>
          <div class="spec-item">
            <h4>Position</h4>
            <p>Centered on user's current screen</p>
          </div>
          <div class="spec-item">
            <h4>Behavior</h4>
            <p>Detached window, draggable to second monitor</p>
          </div>
          <div class="spec-item">
            <h4>Controls</h4>
            <p>Browser-style title bar with close/minimize/maximize</p>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Interactive Demo</h2>
        <div class="demo-controls">
          <button pButton (click)="simulateExpandedView()" class="demo-button">
            Launch Simulated Expanded View
          </button>
          <button pButton (click)="toggleComposeArea()" class="demo-button secondary">
            Show Compose Architecture
          </button>
        </div>

        <!-- Simulated Expanded View -->
        <div class="expanded-simulation" *ngIf="showingExpanded">
          <div class="simulation-header">
            <h3>Simulated Expanded View (70% × 40% window)</h3>
            <button (click)="closeSimulation()" class="close-simulation">×</button>
          </div>
          
          <app-message-center-expanded
            [messages]="sampleMessages"
            [activeFilter]="currentFilter"
            [unreadCounts]="sampleUnreadCounts"
            (filterChanged)="onFilterChanged($event)"
            (composeEmail)="onAction('Compose Email')"
            (messageClicked)="onMessageClicked($event)"
            (filterClicked)="onAction('Filter Clicked')"
            (windowClosed)="closeSimulation()"
          />
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
              <div class="api-cell code">messages</div>
              <div class="api-cell">CommunicationMessage[]</div>
              <div class="api-cell">[]</div>
              <div class="api-cell">Array of messages to display</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">activeFilter</div>
              <div class="api-cell">FilterType</div>
              <div class="api-cell">'all'</div>
              <div class="api-cell">Current filter selection</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">unreadCounts</div>
              <div class="api-cell">Object</div>
              <div class="api-cell">notes: 0, emails: 0, sms: 0, all: 0</div>
              <div class="api-cell">Unread message counts per filter</div>
            </div>
          </div>
        </div>
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

    .spec-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .spec-item {
      padding: 1rem;
      border: 1px solid var(--surface-border);
      border-radius: 4px;
      background: var(--surface-card);
    }

    .spec-item h4 {
      margin: 0 0 0.5rem 0;
      color: var(--primary-color);
    }

    .spec-item p {
      margin: 0;
      color: var(--text-color-secondary);
      font-size: 0.9rem;
    }

    .demo-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .demo-button {
      background: var(--primary-color) !important;
      color: white !important;
      border: none !important;
      padding: 0.75rem 1.5rem !important;
      border-radius: 4px !important;
    }

    .demo-button.secondary {
      background: var(--surface-600) !important;
    }

    .expanded-simulation {
      position: fixed;
      top: 5%;
      left: 30%;
      width: 40vw;
      height: 70vh;
      background: white;
      border: 2px solid var(--surface-border);
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .simulation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background: var(--surface-100);
      border-bottom: 1px solid var(--surface-border);
      flex-shrink: 0;
    }

    .simulation-header h3 {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-color);
    }

    .close-simulation {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-color-secondary);
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    .close-simulation:hover {
      background: var(--surface-200);
    }

    .api-section {
      margin-bottom: 2rem;
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

      .expanded-simulation {
        top: 2%;
        left: 2%;
        width: 96vw;
        height: 80vh;
      }
    }
  `]
})
export class MessageCenterExpandedDocsComponent {
  showingExpanded = false;
  showingCompose = false;
  currentFilter: FilterType = 'all';
  actionLog: string[] = [];
  sampleUnreadCounts = { notes: 2, emails: 2, sms: 1, all: 5 };

  sampleMessages: CommunicationMessage[] = [
    {
      id: '1',
      type: 'note',
      timestamp: new Date('2024-08-01T09:00:00'),
      isRead: false,
      data: {
        author: 'Jake Cummings',
        content: 'A BOL document is like the passport for a shipment; it tells you everything you need to know about where it\'s coming from, where it\'s going, and what\'s inside.',
        timestamp: '2024-08-02T09:00:00',
        isOwnMessage: false
      }
    },
    {
      id: '2',
      type: 'automated-email',
      timestamp: new Date('2024-08-02T10:32:00'),
      isRead: false,
      data: {
        fromAddress: 'system@docprocessing.com',
        toRecipients: ['client@company.com', 'shipper@logistics.com'],
        subjectLine: 'Document Upload Required - Shipment #SP-2024-1205',
        messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
        status: 'sent',
        timestamp: '2024-08-02T10:32:00'
      }
    },
    {
      id: '3',
      type: 'sms',
      timestamp: new Date('2024-08-01T11:00:00'),
      isRead: true,
      data: {
        toRecipients: ['+1 (999) 999-9999'],
        messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
        status: 'sent',
        timestamp: '2024-08-01T11:00:00'
      }
    }
  ];

  simulateExpandedView(): void {
    this.showingExpanded = true;
    this.logAction('Expanded view simulation opened');
  }

  closeSimulation(): void {
    this.showingExpanded = false;
    this.logAction('Expanded view simulation closed');
  }

  toggleComposeArea(): void {
    this.showingCompose = !this.showingCompose;
    this.logAction(`Compose area ${this.showingCompose ? 'shown' : 'hidden'}`);
  }

  onFilterChanged(filter: FilterType): void {
    this.currentFilter = filter;
    this.logAction(`Filter changed to: ${filter}`);
  }

  onMessageClicked(message: CommunicationMessage): void {
    this.logAction(`Message clicked: ${message.type} - ${message.id}`);
  }

  onAction(action: string): void {
    this.logAction(action);
  }

  private logAction(action: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.actionLog.unshift(`[${timestamp}] ${action}`);
    if (this.actionLog.length > 10) {
      this.actionLog = this.actionLog.slice(0, 10);
    }
  }
}
