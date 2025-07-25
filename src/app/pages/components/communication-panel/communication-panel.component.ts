import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TabAcknowledgmentService } from '../../../services/tab-acknowledgment.service';

// Import existing components
import { MessageCenterHeaderComponent, FilterType, FilterTab } from '../message-center-header/message-center-header.component';
import { NoteBubbleComponent } from '../note-bubble/note-bubble.component';
import { AutomatedEmailBubbleComponent } from '../automated-email-bubble/automated-email-bubble.component';
import { SmsBubbleComponent } from '../sms-bubble/sms-bubble.component';
import { ManualEmailBubbleComponent } from '../manual-email-bubble/manual-email-bubble.component';
import { UploadBubbleComponent } from '../upload-bubble/upload-bubble.component';

export interface CommunicationMessage {
  id: string;
  type: 'note' | 'automated-email' | 'sms' | 'manual-email' | 'upload';
  timestamp: Date;
  isRead: boolean;
  data: any; // Message-specific data
}

export interface CommunicationPanelConfig {
  isOpen: boolean;
  messages: CommunicationMessage[];
  unreadCounts: { [key in FilterType]: number };
}

@Component({
  selector: 'app-communication-panel',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule,
    MessageCenterHeaderComponent,
    NoteBubbleComponent,
    AutomatedEmailBubbleComponent,
    SmsBubbleComponent,
    ManualEmailBubbleComponent,
    UploadBubbleComponent
  ],
  animations: [
    trigger('slideUp', [
      state('closed', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('closed => open', [
        animate('300ms ease-out')
      ]),
      transition('open => closed', [
        animate('300ms ease-in')
      ])
    ])
  ],
  template: `
    <div 
      class="communication-panel-overlay" 
      [class.panel-open]="isOpen"
      *ngIf="isOpen"
    >
      <div 
        class="communication-panel"
        [@slideUp]="isOpen ? 'open' : 'closed'"
        (@slideUp.done)="onAnimationDone($event)"
      >
        <!-- Header Section -->
        <app-message-center-header
          [activeFilter]="activeFilter"
          [filterTabs]="filterTabs"
          (closePanel)="onClosePanel()"
          (openInFullView)="onOpenInFullView()"
          (filterChanged)="onFilterChanged($event)"
        />

        <!-- Panel Content -->
        <div class="panel-content">
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
        </div>
      </div>
    </div>
  `,
  styles: [`
    .communication-panel-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      pointer-events: none;
    }

    .communication-panel-overlay.panel-open {
      pointer-events: auto;
      overflow: hidden;
    }

    .communication-panel {
      position: fixed;
      bottom: 0;
      right: 24px;
      width: 538px;
      height: 747px;
      background: var(--surface-0, #ffffff);
      border-radius: 8px 8px 0 0;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      z-index: 1001;
      overflow: hidden;
    }

    .panel-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    /* Secondary Header */
    .secondary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--surface-border, #E2E6EB);
      background: var(--surface-0, #ffffff);
      flex-shrink: 0;
      min-height: 56px;
      box-sizing: border-box;
    }

    .filter-button {
      background: transparent;
      border: none;
      color: var(--of-black-70, #777);
      font-size: 24px;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.2s ease-in-out;
    }

    .filter-button:hover {
      color: var(--primary-color, #2474BB);
    }

    .compose-button {
      background: var(--primary-color, #2474BB) !important;
      color: var(--surface-0, #ffffff) !important;
      border: none !important;
      padding: 10px 16px !important;
      border-radius: 4px !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      font-size: 14px !important;
      font-weight: 400 !important;
      cursor: pointer !important;
      transition: background-color 0.2s ease-in-out !important;
    }

    .compose-button:hover {
      background: var(--primary-dark, #1D5D96) !important;
    }

    .compose-button i {
      font-size: 14px;
    }

    /* Message Feed */
    .message-feed {
      flex: 1;
      position: relative;
      min-height: 0;
      overflow: hidden;
    }

    .message-list {
      flex: 1;
      padding: 12px 0;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--surface-0, #ffffff);
      min-height: 0;
      max-height: 100%;
      overscroll-behavior: contain;
      touch-action: pan-y;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      position: relative;
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
      padding: 2rem 1rem;
      color: var(--text-color-secondary, #6B7280);
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



    /* Mobile Responsive */
    @media (max-width: 768px) {
      .communication-panel {
        right: 12px;
        left: 12px;
        width: auto;
        height: 80vh;
        max-height: 600px;
      }

      .secondary-header {
        padding: 8px 12px;
        min-height: 48px;
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
    .compose-button:focus {
      outline: 2px solid var(--primary-500, #3B82F6);
      outline-offset: 2px;
    }
  `]
})
export class CommunicationPanelComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @ViewChild('messageFeed', { static: false }) messageFeedRef!: ElementRef;

  constructor(private tabAcknowledgmentService: TabAcknowledgmentService) {}
  @Input() isOpen: boolean = false;
  @Input() messages: CommunicationMessage[] = [];
  @Input() activeFilter: FilterType = 'all';
  @Input() unreadCounts: { [key in FilterType]: number } = {
    notes: 0,
    emails: 0,
    sms: 0,
    all: 0
  };

  @Output() panelClosed = new EventEmitter<void>();
  @Output() openInFullView = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<FilterType>();
  @Output() composeEmail = new EventEmitter<void>();
  @Output() messageClicked = new EventEmitter<CommunicationMessage>();
  @Output() filterClicked = new EventEmitter<void>();
  @Output() filterTabClicked = new EventEmitter<{ filter: FilterType, messages: CommunicationMessage[] }>();

  filteredMessages: CommunicationMessage[] = [];
  filterTabs: FilterTab[] = [];

  ngOnInit(): void {
    this.updateFilterTabs();
    this.updateFilteredMessages();
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      this.lockBodyScroll();
    } else {
      this.unlockBodyScroll();
    }
    this.updateFilteredMessages();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  get shouldShowComposeButton(): boolean {
    return this.activeFilter === 'emails';
  }

  onClosePanel(): void {
    this.panelClosed.emit();
  }

  onOpenInFullView(): void {
    this.openInFullView.emit();
  }

  onFilterChanged(filter: FilterType): void {
    this.activeFilter = filter;
    this.updateFilteredMessages();
    this.filterChanged.emit(filter);

    // Emit messages that should be marked as read for this filter
    const unreadMessagesInFilter = this.messages.filter(message => {
      if (!message.isRead) {
        switch (filter) {
          case 'notes':
            return message.type === 'note';
          case 'emails':
            return message.type === 'automated-email' || message.type === 'manual-email';
          case 'sms':
            return message.type === 'sms';
          case 'all':
            return true;
          default:
            return false;
        }
      }
      return false;
    });

    if (unreadMessagesInFilter.length > 0) {
      this.filterTabClicked.emit({ filter, messages: unreadMessagesInFilter });
    }
  }

  onComposeClick(): void {
    this.composeEmail.emit();
  }

  onFilterClick(): void {
    this.filterClicked.emit();
  }

  onMessageClick(message: CommunicationMessage): void {
    // Always emit the click event
    this.messageClicked.emit(message);
  }

  onAnimationDone(event: any): void {
    if (event.toState === 'open') {
      this.scrollToBottom();
    }
  }

  onMessageListScroll(event: WheelEvent): void {
    const element = event.currentTarget as HTMLElement;
    const atTop = element.scrollTop === 0;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

    // Always prevent background scroll when scrolling within the message list
    event.stopPropagation();

    // Prevent background scroll when at scroll boundaries
    if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
      event.preventDefault();
    }
  }

  onMessageListTouch(event: TouchEvent): void {
    // Prevent touch events from bubbling to background
    event.stopPropagation();
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

    // Force change detection
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

    // Sort by timestamp (oldest to newest)
    this.filteredMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }



  private scrollToBottom(): void {
    // Check if there are unread messages
    const hasUnreadMessages = this.messages.some(m => !m.isRead);

    if (!hasUnreadMessages) {
      // Scroll to bottom if all messages are read
      setTimeout(() => {
        if (this.messageFeedRef?.nativeElement) {
          const messageList = this.messageFeedRef.nativeElement;
          messageList.scrollTop = messageList.scrollHeight;
        }
      }, 100);
    } else {
      // Scroll to last seen message (first unread)
      setTimeout(() => {
        const firstUnreadIndex = this.filteredMessages.findIndex(m => !m.isRead);
        if (firstUnreadIndex > 0) {
          const messageElements = document.querySelectorAll('.message-item');
          const targetElement = messageElements[firstUnreadIndex - 1] as HTMLElement;
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
  }

  private lockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift
    }
  }

  private unlockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }

  private setupIntersectionObserver(): void {
    if (!this.messageFeedRef || typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const messageElement = entry.target as HTMLElement;
          const messageId = messageElement.dataset['messageId'];
          if (messageId) {
            // Add delay to simulate reading time (longer delay to allow tab-based clearing)
            setTimeout(() => {
              this.markMessageAsViewed(messageId);
            }, 5000);
          }
        }
      });
    }, {
      root: this.messageFeedRef.nativeElement,
      rootMargin: '0px',
      threshold: 0.8 // Message is 80% visible
    });

    // Observe all message items with better timing
    setTimeout(() => {
      if (this.messageFeedRef?.nativeElement) {
        const messageElements = this.messageFeedRef.nativeElement.querySelectorAll('.message-item');
        messageElements.forEach((element: Element) => observer.observe(element));
      }
    }, 200);
  }

  private markMessageAsViewed(messageId: string): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message && !message.isRead) {
      // Emit the message click event to let parent handle state update
      this.messageClicked.emit(message);
      console.log(`Message ${messageId} auto-marked as viewed`);
    }
  }
}

// Documentation Component  
@Component({
  selector: 'app-communication-panel-docs',
  standalone: true,
  imports: [CommonModule, CommunicationPanelComponent, ButtonModule],
  template: `
    <div class="docs-container">
      <h1>CommunicationPanel Component</h1>
      <p class="component-description">
        A slide-up drawer panel that displays a filtered feed of communication messages.
        Integrates with the NotificationFAB and provides full message center functionality with proper scroll containment and message alignment.
      </p>

      <div class="docs-section">
        <h2>PrimeNG Components Used</h2>
        <ul class="primeng-components">
          <li><strong>ButtonModule</strong> - Used for compose button and filter button</li>
          <li><strong>OverlayPanelModule</strong> - Panel overlay structure</li>
          <li><strong>BadgeModule</strong> - Tab notification badges (via MessageCenterHeader)</li>
          <li><strong>ScrollPanelModule</strong> - Custom scroll behavior with containment</li>
        </ul>
      </div>

      <div class="docs-section">
        <h2>Component Composition</h2>
        <div class="composition-info">
          <h3>Integrated Components:</h3>
          <ul>
            <li><strong>MessageCenterHeaderComponent</strong> - Sticky header with tabs and actions</li>
            <li><strong>NotificationFABComponent</strong> - Entry point floating action button (external integration)</li>
            <li><strong>NoteBubbleComponent</strong> - Internal notes with sender-based alignment
              <ul>
                <li><em>Modified:</em> Enhanced width constraints to 100% for panel integration</li>
                <li><em>Modified:</em> Improved flexbox alignment for left/right positioning</li>
              </ul>
            </li>
            <li><strong>AutomatedEmailBubbleComponent</strong> - System-generated email messages</li>
            <li><strong>SmsBubbleComponent</strong> - SMS communication bubbles</li>
            <li><strong>ManualEmailBubbleComponent</strong> - User-composed email messages</li>
            <li><strong>UploadBubbleComponent</strong> - Document upload confirmations</li>
          </ul>

          <h3>Component Modifications Made:</h3>
          <ul>
            <li><strong>NoteBubbleComponent Layout:</strong>
              <ul>
                <li>Changed <code>max-width</code> from 85% to 100% for full container usage</li>
                <li>Added <code>width: 100%</code> and proper <code>box-sizing: border-box</code></li>
                <li>Enhanced <code>flex: 1 1 auto</code> for better responsive behavior</li>
                <li>Maintained external API - no input/output changes</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="docs-section">
        <h2>Implementation Notes</h2>
        <div class="implementation-notes">
          <h3>Scroll Behavior Fixes:</h3>
          <ul>
            <li>Enhanced <code>overscroll-behavior: contain</code> with proper event handling</li>
            <li>Added <code>scroll-behavior: smooth</code> and <code>position: relative</code></li>
            <li>Improved wheel and touch event propagation to prevent background scroll</li>
            <li>Body scroll is locked when panel is open using <code>overflow: hidden</code></li>
            <li>Touch-friendly scrolling with <code>-webkit-overflow-scrolling: touch</code></li>
          </ul>

          <h3>Message Alignment Logic:</h3>
          <ul>
            <li><strong>Notes:</strong> Left-aligned for other users, right-aligned for current user</li>
            <li><strong>SMS/Emails:</strong> Right-aligned (outbound messages only)</li>
            <li><strong>Full Width:</strong> Notes take 100% available width with <code>box-sizing: border-box</code></li>
            <li><strong>Text Alignment:</strong> Added <code>text-align: left/right</code> for proper content flow</li>
          </ul>

          <h3>Unread State Management:</h3>
          <ul>
            <li>Messages marked as read when clicked with immediate UI updates</li>
            <li>Badge counts automatically update with forced change detection</li>
            <li>Intersection Observer with 80% visibility threshold and 1.5s delay</li>
            <li>Supports both manual click and automatic visibility tracking</li>
            <li>Debug logging for tracking read state changes</li>
          </ul>

          <h3>PrimeNG Modules Required:</h3>
          <ul>
            <li><strong>ButtonModule</strong> - Compose and action buttons</li>
            <li><strong>AvatarModule</strong> - User initials in NoteBubbleComponent</li>
            <li><strong>TooltipModule</strong> - Menu button tooltips in messages</li>
            <li><strong>CommonModule</strong> - Structural directives (*ngFor, *ngIf)</li>
            <li><strong>OverlayPanelModule</strong> - Panel overlay architecture</li>
          </ul>
        </div>
      </div>

      <div class="docs-section">
        <h2>Interactive Demo</h2>
        
        <div class="demo-controls">
          <button pButton (click)="togglePanel()" class="demo-button">
            {{ samplePanelOpen ? 'Close Panel' : 'Open Panel' }}
          </button>
          <button pButton (click)="addSampleMessage()" class="demo-button secondary">
            Add Sample Message
          </button>
          <button pButton (click)="markAllRead()" class="demo-button secondary">
            Mark All Read
          </button>
        </div>

        <app-communication-panel
          [isOpen]="samplePanelOpen"
          [messages]="sampleMessages"
          [activeFilter]="currentFilter"
          [unreadCounts]="sampleUnreadCounts"
          (panelClosed)="onPanelClosed()"
          (openInFullView)="onAction('Open in Full View')"
          (filterChanged)="onFilterChanged($event)"
          (composeEmail)="onAction('Compose Email')"
          (messageClicked)="onMessageClicked($event)"
          (filterClicked)="onAction('Filter Clicked')"
        />
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
              <div class="api-cell code">isOpen</div>
              <div class="api-cell">boolean</div>
              <div class="api-cell">false</div>
              <div class="api-cell">Whether the panel is visible</div>
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
              <div class="api-cell">{{ '{' }} notes: 0, emails: 0, sms: 0, all: 0 {{ '}' }}</div>
              <div class="api-cell">Unread message counts per filter</div>
            </div>
          </div>
        </div>

        <div class="api-section">
          <h3>Outputs</h3>
          <div class="api-table">
            <div class="api-row api-header">
              <div class="api-cell">Event</div>
              <div class="api-cell">Type</div>
              <div class="api-cell">Description</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">panelClosed</div>
              <div class="api-cell">EventEmitter&lt;void&gt;</div>
              <div class="api-cell">Emitted when panel is closed</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">filterChanged</div>
              <div class="api-cell">EventEmitter&lt;FilterType&gt;</div>
              <div class="api-cell">Emitted when filter is changed</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">composeEmail</div>
              <div class="api-cell">EventEmitter&lt;void&gt;</div>
              <div class="api-cell">Emitted when compose button is clicked</div>
            </div>
            <div class="api-row">
              <div class="api-cell code">messageClicked</div>
              <div class="api-cell">EventEmitter&lt;CommunicationMessage&gt;</div>
              <div class="api-cell">Emitted when a message is clicked</div>
            </div>
          </div>
        </div>
      </div>

      <div class="docs-section">
        <h2>Features</h2>
        <ul class="design-guidelines">
          <li>300ms slide-up animation from bottom-right</li>
          <li>Filter tabs with unread badge counts</li>
          <li>Compose button that appears only for Emails filter</li>
          <li>Smart scroll positioning based on read/unread status</li>
          <li>Integration with all existing message bubble components</li>
          <li>Custom scroll indicator matching design system</li>
          <li>Mobile responsive with proper touch targets</li>
          <li>Accessibility support with keyboard navigation</li>
        </ul>
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

    .design-guidelines {
      list-style-type: none;
      padding: 0;
    }

    .design-guidelines li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--surface-border);
    }

    .design-guidelines li:before {
      content: "✓";
      color: var(--green-500);
      font-weight: bold;
      margin-right: 0.5rem;
    }

    .primeng-components {
      list-style-type: none;
      padding: 0;
    }

    .primeng-components li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--surface-border);
    }

    .composition-info, .implementation-notes {
      background: var(--surface-50);
      padding: 1rem;
      border-radius: 4px;
      border-left: 4px solid var(--primary-color);
    }

    .composition-info h3, .implementation-notes h3 {
      margin-top: 0;
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
    }
  `]
})
export class CommunicationPanelDocsComponent {
  samplePanelOpen = false;
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
      type: 'sms',
      timestamp: new Date('2024-08-01T11:00:00'),
      isRead: false,
      data: {
        toRecipients: ['+1 (999) 999-9999'],
        messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
        status: 'sent',
        timestamp: '2024-08-01T11:00:00'
      }
    },
    {
      id: '3',
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
      id: '4',
      type: 'note',
      timestamp: new Date('2024-08-02T11:15:00'),
      isRead: true,
      data: {
        author: 'Sarah Mitchell',
        content: 'I\'ve reviewed the documentation and everything looks good to proceed. The carrier has confirmed pickup for tomorrow morning.',
        timestamp: '2024-08-02T11:15:00',
        isOwnMessage: true
      }
    },
    {
      id: '5',
      type: 'upload',
      timestamp: new Date('2024-08-02T11:23:00'),
      isRead: false,
      data: {
        uploader: 'driver@carrier.com',
        filename: 'BOL_12345.pdf',
        uploadMethod: 'upload-link',
        status: 'uploaded',
        timestamp: '2024-08-02T11:23:00'
      }
    },
    {
      id: '6',
      type: 'manual-email',
      timestamp: new Date('2024-08-02T12:30:00'),
      isRead: false,
      data: {
        fromUser: 'operations@company.com',
        toRecipients: ['client@business.com'],
        subjectLine: 'Shipment Update - Delivery Confirmed',
        messageBody: 'Your shipment has been successfully delivered. Thank you for choosing our services!',
        status: 'sent',
        timestamp: '2024-08-02T12:30:00'
      }
    },
    {
      id: '7',
      type: 'automated-email',
      timestamp: new Date('2024-08-02T13:45:00'),
      isRead: true,
      data: {
        fromAddress: 'notifications@logistics.com',
        toRecipients: ['warehouse@company.com'],
        subjectLine: 'Workflow Stopped - Manual Review Required',
        messageBody: 'The automated processing workflow has been stopped due to missing documentation. Please review and take appropriate action.',
        status: 'workflow-stopped',
        timestamp: '2024-08-02T13:45:00'
      }
    },
    {
      id: '8',
      type: 'sms',
      timestamp: new Date('2024-08-02T14:20:00'),
      isRead: true,
      data: {
        toRecipients: ['+1 (555) 123-4567'],
        messageBody: 'Delivery attempt failed. Customer not available. Will retry tomorrow between 9 AM - 5 PM.',
        status: 'workflow-stopped',
        timestamp: '2024-08-02T14:20:00'
      }
    },
    {
      id: '9',
      type: 'note',
      timestamp: new Date('2024-08-02T15:10:00'),
      isRead: false,
      data: {
        author: 'Mike Chen',
        content: 'Customer called to reschedule delivery. Updated delivery window to Aug 3rd, 10 AM - 2 PM. Driver has been notified.',
        timestamp: '2024-08-02T15:10:00',
        isOwnMessage: false
      }
    },
    {
      id: '10',
      type: 'upload',
      timestamp: new Date('2024-08-02T16:00:00'),
      isRead: true,
      data: {
        uploader: 'client@business.com',
        filename: 'Delivery_Authorization.pdf',
        uploadMethod: 'platform',
        status: 'uploaded',
        timestamp: '2024-08-02T16:00:00'
      }
    }
  ];

  togglePanel(): void {
    this.samplePanelOpen = !this.samplePanelOpen;
    this.logAction(`Panel ${this.samplePanelOpen ? 'opened' : 'closed'}`);
  }

  onPanelClosed(): void {
    this.samplePanelOpen = false;
    this.logAction('Panel closed');
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

  addSampleMessage(): void {
    const newMessage: CommunicationMessage = {
      id: Date.now().toString(),
      type: 'note',
      timestamp: new Date(),
      isRead: false,
      data: {
        author: 'System User',
        content: 'This is a new sample message added dynamically.',
        timestamp: new Date().toISOString(),
        isOwnMessage: Math.random() > 0.5
      }
    };
    this.sampleMessages.push(newMessage);
    this.sampleUnreadCounts.notes++;
    this.sampleUnreadCounts.all++;
    this.logAction('Sample message added');
  }

  markAllRead(): void {
    this.sampleMessages.forEach(msg => msg.isRead = true);
    this.sampleUnreadCounts = { notes: 0, emails: 0, sms: 0, all: 0 };
    this.logAction('All messages marked as read');
  }

  private logAction(action: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.actionLog.unshift(`[${timestamp}] ${action}`);
    if (this.actionLog.length > 10) {
      this.actionLog = this.actionLog.slice(0, 10);
    }
  }
}
