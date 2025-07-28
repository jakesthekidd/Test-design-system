import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

export interface NoteBubbleData {
  authorInitials: string;
  authorName: string;
  timestamp: string;
  content: string;
  isOwnMessage: boolean;
}

// Standalone reusable component
@Component({
  selector: 'app-note-bubble',
  standalone: true,
  imports: [CommonModule, AvatarModule, TooltipModule],
  template: `
    <div class="bubble-container"
         [class.own-message]="noteData.isOwnMessage"
         [class.other-message]="!noteData.isOwnMessage"
         [attr.data-own]="noteData.isOwnMessage">
      <div class="bubble-content">
        <div class="bubble-header">
          <p-avatar 
            [label]="noteData.authorInitials" 
            [styleClass]="noteData.isOwnMessage ? 'bubble-avatar own-avatar' : 'bubble-avatar other-avatar'">
          </p-avatar>
          <div class="message-details">
            <div class="header-row">
              <span class="author-name">{{ noteData.authorName }}</span>
              <button class="menu-button" pTooltip="Message options" (click)="onMenuClick()">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </div>
            <div class="message-text">{{ noteData.content }}</div>
            <div class="timestamp-container" 
                 [class.own-timestamp]="noteData.isOwnMessage"
                 [class.other-timestamp]="!noteData.isOwnMessage">
              <span class="timestamp">{{ noteData.timestamp }}</span>
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
      max-width: 100%;
    }

    :host(:not([data-own="true"])) {
      justify-content: flex-start;
    }

    :host([data-own="true"]) {
      justify-content: flex-end;
    }

    .bubble-container {
      display: flex;
      padding: 16px;
      align-items: flex-start;
      gap: 8px;
      border-radius: 8px;
      border: 3px solid;
      background: var(--surface-overlay);
      font-family: 'Roboto', sans-serif;
      width: 100%;
      max-width: 100%;
      min-width: 280px;
      flex: 1 1 auto;
      box-sizing: border-box;
    }

    .bubble-container.other-message {
      border-color: #EFF2F4;
      border-radius: 8px 8px 8px 0px;
    }

    .bubble-container.own-message {
      border-color: #D3E3F1;
      border-radius: 8px 8px 0px 8px;
    }

    .bubble-content {
      flex: 1;
    }

    .bubble-header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      width: 100%;
    }

    :host ::ng-deep .bubble-avatar {
      width: 24px !important;
      height: 24px !important;
      border: 1px solid #FFF;
      font-size: 10px !important;
      font-weight: 500 !important;
      margin-top: 1px;
    }

    :host ::ng-deep .other-avatar {
      background-color: #A9B3C2 !important;
      color: #FFF !important;
    }

    :host ::ng-deep .own-avatar {
      background-color: #2474BB !important;
      color: #FFF !important;
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

    .author-name {
      color: rgba(58, 58, 58, 1);
      font-size: 14px;
      font-weight: 500;
    }

    .menu-button {
      background: none;
      border: none;
      color: #2068A8;
      font-size: 16px;
      cursor: pointer;
      padding: 2px;
      border-radius: 2px;
      transition: background-color 0.2s ease;
    }

    .menu-button:hover {
      background-color: var(--surface-hover);
    }

    .message-text {
      color: rgba(58, 58, 58, 1);
      font-size: 14px;
      font-weight: 300;
      line-height: 1.4;
    }

    .timestamp-container {
      display: flex;
      padding: 4px 8px;
      border-radius: 4px;
      width: fit-content;
    }

    .timestamp-container.other-timestamp {
      background: #EFF2F4;
    }

    .timestamp-container.own-timestamp {
      background: #E9F1F8;
    }

    .timestamp {
      color: rgba(58, 58, 58, 1);
      font-size: 13px;
      font-weight: 300;
    }
  `]
})
export class NoteBubbleComponent {
  @Input() noteData!: NoteBubbleData;
  @Output() menuClick = new EventEmitter<NoteBubbleData>();
  @Output() noteClick = new EventEmitter<NoteBubbleData>();

  onMenuClick(): void {
    this.menuClick.emit(this.noteData);
  }

  onNoteClick(): void {
    this.noteClick.emit(this.noteData);
  }
}

@Component({
  selector: 'app-note-bubble-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    AvatarModule,
    ButtonModule,
    TooltipModule,
    NoteBubbleComponent
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Note Bubble</h1>
        <p class="component-description">
          Communication UI element for displaying internal notes within threaded message views. 
          Visually distinguishes between messages from the current user and other users with different
          alignments, colors, and avatar treatments.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic Note Bubbles</h3>
            <div class="example-container">
              <div class="message-thread">
                <!-- Message from other user -->
                <div class="note-bubble" [class.own-message]="false">
                  <div class="bubble-container other-message">
                    <div class="bubble-content">
                      <div class="bubble-header">
                        <p-avatar 
                          label="JK" 
                          styleClass="bubble-avatar other-avatar">
                        </p-avatar>
                        <div class="message-details">
                          <div class="header-row">
                            <span class="author-name">John Doe</span>
                            <button class="menu-button" pTooltip="Message options">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                          </div>
                          <div class="message-text">
                            A BOL document is like the passport for a shipment; it tells you everything you need to know about where it's coming from, where it's going, and what's inside.
                          </div>
                          <div class="timestamp-container other-timestamp">
                            <span class="timestamp">Aug 2, 2024 | 9:00 AM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Message from current user -->
                <div class="note-bubble" [class.own-message]="true">
                  <div class="bubble-container own-message">
                    <div class="bubble-content">
                      <div class="bubble-header">
                        <p-avatar 
                          label="JK" 
                          styleClass="bubble-avatar own-avatar">
                        </p-avatar>
                        <div class="message-details">
                          <div class="header-row">
                            <span class="author-name">Jake Cummings</span>
                            <button class="menu-button" pTooltip="Message options">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                          </div>
                          <div class="message-text">
                            A BOL document is like the passport for a shipment; it tells you
                          </div>
                          <div class="timestamp-container own-timestamp">
                            <span class="timestamp">Aug 2, 2024 | 1:50 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3>Dynamic Note Bubbles</h3>
            <div class="example-container">
              <div class="message-thread">
                <div class="note-bubble" 
                     *ngFor="let note of sampleNotes; let i = index"
                     [class.own-message]="note.isOwnMessage">
                  <app-note-bubble [noteData]="note" (menuClick)="onMenuClick($event)"></app-note-bubble>
                </div>
              </div>
            </div>

            <h3>Interactive Controls</h3>
            <div class="example-container">
              <div class="controls-section">
                <p-button label="Add My Note" (click)="addMyNote()" severity="primary" size="small"></p-button>
                <p-button label="Add Other Note" (click)="addOtherNote()" severity="secondary" size="small"></p-button>
                <p-button label="Clear All" (click)="clearNotes()" severity="warning" size="small"></p-button>
              </div>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Code">
          <div class="code-section">
            <h3>Import Required Modules</h3>
            <pre><code>import &#123; AvatarModule &#125; from 'primeng/avatar';
import &#123; TooltipModule &#125; from 'primeng/tooltip';
import &#123; CommonModule &#125; from '&#64;angular/common';

&#64;Component(&#123;
  imports: [AvatarModule, TooltipModule, CommonModule],
  // ...
&#125;)</code></pre>

            <h3>Basic Note Bubble Structure</h3>
            <pre><code>&lt;div class="note-bubble" [class.own-message]="isOwnMessage"&gt;
  &lt;div class="bubble-container" 
       [class.own-message]="isOwnMessage" 
       [class.other-message]="!isOwnMessage"&gt;
    &lt;div class="bubble-content"&gt;
      &lt;div class="bubble-header"&gt;
        &lt;p-avatar 
          [label]="authorInitials" 
          [styleClass]="isOwnMessage ? 'bubble-avatar own-avatar' : 'bubble-avatar other-avatar'"&gt;
        &lt;/p-avatar&gt;
        &lt;div class="message-details"&gt;
          &lt;div class="header-row"&gt;
            &lt;span class="author-name"&gt;Author Name&lt;/span&gt;
            &lt;button class="menu-button" pTooltip="Message options"&gt;
              &lt;i class="fa-solid fa-ellipsis-vertical"&gt;&lt;/i&gt;
            &lt;/button&gt;
          &lt;/div&gt;
          &lt;div class="message-text"&gt;Message content goes here&lt;/div&gt;
          &lt;div class="timestamp-container" 
               [class.own-timestamp]="isOwnMessage"
               [class.other-timestamp]="!isOwnMessage"&gt;
            &lt;span class="timestamp"&gt;Timestamp&lt;/span&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

            <h3>Note Bubble Interface</h3>
            <pre><code>export interface NoteBubbleData &#123;
  authorInitials: string;
  authorName: string;
  timestamp: string;
  content: string;
  isOwnMessage: boolean;
&#125;

&#64;Component(&#123;
  selector: 'app-note-bubble',
  // ...
&#125;)
export class NoteBubbleComponent &#123;
  &#64;Input() noteData!: NoteBubbleData;
  
  get isOwnMessage(): boolean &#123;
    return this.noteData.isOwnMessage;
  &#125;
&#125;</code></pre>

            <h3>Component Logic</h3>
            <pre><code>export class MessageThreadComponent &#123;
  notes: NoteBubbleData[] = [];
  
  addNote(content: string, isOwnMessage: boolean): void &#123;
    const newNote: NoteBubbleData = &#123;
      authorInitials: isOwnMessage ? 'JK' : 'JD',
      authorName: isOwnMessage ? 'Jake Cummings' : 'John Doe',
      timestamp: new Date().toLocaleString(),
      content,
      isOwnMessage
    &#125;;
    this.notes.push(newNote);
  &#125;
&#125;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>NoteBubbleComponent Properties</h3>
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
                    <td>noteData</td>
                    <td>NoteBubbleData</td>
                    <td>required</td>
                    <td>Complete note information including author, content, and timestamp</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>NoteBubbleData Interface</h3>
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
                    <td>authorInitials</td>
                    <td>string</td>
                    <td>User initials to display in avatar (e.g., "JK")</td>
                  </tr>
                  <tr>
                    <td>authorName</td>
                    <td>string</td>
                    <td>Full name of the message author</td>
                  </tr>
                  <tr>
                    <td>timestamp</td>
                    <td>string</td>
                    <td>Formatted timestamp for when the note was created</td>
                  </tr>
                  <tr>
                    <td>content</td>
                    <td>string</td>
                    <td>The note message content</td>
                  </tr>
                  <tr>
                    <td>isOwnMessage</td>
                    <td>boolean</td>
                    <td>Whether this note was authored by the current user</td>
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
                    <td>noteData: NoteBubbleData</td>
                    <td>Emitted when the three-dot menu is clicked</td>
                  </tr>
                  <tr>
                    <td>noteClick</td>
                    <td>noteData: NoteBubbleData</td>
                    <td>Emitted when the note bubble is clicked (for future expand functionality)</td>
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
                <strong>Message Layout</strong>
                <ul>
                  <li>Other messages: Left-aligned with gray avatar</li>
                  <li>Own messages: Right-aligned with blue avatar</li>
                  <li>Responsive design with mobile stacking</li>
                  <li>Consistent 16px padding throughout</li>
                  <li>8px gaps between elements</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Visual States</strong>
                <ul>
                  <li>Other message: Gray border (#EFF2F4) and avatar (#A9B3C2)</li>
                  <li>Own message: Blue border (#D3E3F1) and avatar (#2474BB)</li>
                  <li>Different border radius patterns for speech bubble effect</li>
                  <li>Timestamp backgrounds match message type</li>
                </ul>
              </div>
            </div>

            <h3>Typography & Colors</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Design Tokens Used</strong>
                <ul>
                  <li>Surface-300: #EFF2F4 (other message border/timestamp)</li>
                  <li>Blue-100: #D3E3F1 (own message border)</li>
                  <li>Surface-600: #A9B3C2 (other user avatar)</li>
                  <li>Blue-500: #2474BB (own message avatar)</li>
                  <li>Blue-50: #E9F1F8 (own message timestamp background)</li>
                  <li>Text colors: rgba(58, 58, 58, 1) for content</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Typography</strong>
                <ul>
                  <li>Font Family: Roboto, sans-serif</li>
                  <li>Author Name: 14px, medium weight</li>
                  <li>Message Content: 14px, light weight</li>
                  <li>Timestamp: 13px, light weight</li>
                  <li>Avatar Initials: 10px, medium weight</li>
                </ul>
              </div>
            </div>

            <h3>Layout Guidelines</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Spacing & Structure</strong>
                <ul>
                  <li>Border radius: 8px with corner cut for speech bubble effect</li>
                  <li>Avatar size: 24px diameter with 1px border</li>
                  <li>Content padding: 16px on all sides</li>
                  <li>Timestamp padding: 4px horizontal, 8px vertical</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Responsive Behavior</strong>
                <ul>
                  <li>Desktop: Side-by-side avatar and content</li>
                  <li>Mobile: Stack avatar below content when needed</li>
                  <li>Maintain readability at all screen sizes</li>
                  <li>Preserve speech bubble visual effect</li>
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

    /* Message Thread Styling */
    .message-thread {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .note-bubble {
      width: 100%;
      display: flex;
    }

    /* Left align other users' messages */
    .note-bubble:not(.own-message) {
      justify-content: flex-start;
    }

    /* Right align own messages */
    .note-bubble.own-message {
      justify-content: flex-end;
    }

    /* Bubble Container */
    .bubble-container {
      display: flex;
      padding: 16px;
      align-items: flex-start;
      gap: 8px;
      border-radius: 8px;
      border: 3px solid;
      background: var(--surface-overlay);
      font-family: 'Roboto', sans-serif;
      max-width: 70%;
    }

    .bubble-container.other-message {
      border-color: #EFF2F4;
      border-radius: 8px 8px 8px 0px;
    }

    .bubble-container.own-message {
      border-color: #D3E3F1;
      border-radius: 8px 8px 0px 8px;
    }

    /* Bubble Content */
    .bubble-content {
      flex: 1;
    }

    .bubble-header {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    /* Avatar Styling */
    :host ::ng-deep .bubble-avatar {
      width: 24px !important;
      height: 24px !important;
      border: 1px solid #FFF;
      font-size: 10px !important;
      font-weight: 500 !important;
    }

    :host ::ng-deep .other-avatar {
      background-color: #A9B3C2 !important;
      color: #FFF !important;
    }

    :host ::ng-deep .own-avatar {
      background-color: #2474BB !important;
      color: #FFF !important;
    }

    /* Message Details */
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

    .author-name {
      color: rgba(58, 58, 58, 1);
      font-size: 14px;
      font-weight: 500;
    }

    .menu-button {
      background: none;
      border: none;
      color: #2068A8;
      font-size: 16px;
      cursor: pointer;
      padding: 2px;
      border-radius: 2px;
      transition: background-color 0.2s ease;
    }

    .menu-button:hover {
      background-color: var(--surface-hover);
    }

    .message-text {
      color: rgba(58, 58, 58, 1);
      font-size: 14px;
      font-weight: 300;
      line-height: 1.4;
    }

    /* Timestamp Styling */
    .timestamp-container {
      display: flex;
      padding: 4px 8px;
      border-radius: 4px;
      width: fit-content;
    }

    .timestamp-container.other-timestamp {
      background: #EFF2F4;
    }

    .timestamp-container.own-timestamp {
      background: #E9F1F8;
    }

    .timestamp {
      color: rgba(58, 58, 58, 1);
      font-size: 13px;
      font-weight: 300;
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
      .bubble-container {
        padding: 12px;
      }
      
      .message-details {
        gap: 6px;
      }
      
      .controls-section {
        flex-direction: column;
      }
      
      .design-specs {
        grid-template-columns: 1fr;
      }

      .message-thread {
        max-width: 100%;
      }
    }
  `]
})
export class NoteBubbleDocComponent {
  sampleNotes: NoteBubbleData[] = [
    {
      authorInitials: 'JD',
      authorName: 'John Doe',
      timestamp: 'Aug 2, 2024 | 9:00 AM',
      content: 'A BOL document is like the passport for a shipment; it tells you everything you need to know about where it\'s coming from, where it\'s going, and what\'s inside.',
      isOwnMessage: false
    },
    {
      authorInitials: 'JK',
      authorName: 'Jake Cummings',
      timestamp: 'Aug 2, 2024 | 1:50 PM',
      content: 'A BOL document is like the passport for a shipment; it tells you',
      isOwnMessage: true
    }
  ];

  addMyNote(): void {
    const newNote: NoteBubbleData = {
      authorInitials: 'JK',
      authorName: 'Jake Cummings',
      timestamp: new Date().toLocaleString(),
      content: 'This is a new note I just added to test the functionality.',
      isOwnMessage: true
    };
    this.sampleNotes.push(newNote);
  }

  addOtherNote(): void {
    const newNote: NoteBubbleData = {
      authorInitials: 'JD',
      authorName: 'John Doe',
      timestamp: new Date().toLocaleString(),
      content: 'This is a response from another user to demonstrate the conversation flow.',
      isOwnMessage: false
    };
    this.sampleNotes.push(newNote);
  }

  clearNotes(): void {
    this.sampleNotes = [];
  }

  onMenuClick(noteData: NoteBubbleData): void {
    console.log('Menu clicked for note:', noteData);
    // Future: Show context menu with edit/delete options
  }
}
