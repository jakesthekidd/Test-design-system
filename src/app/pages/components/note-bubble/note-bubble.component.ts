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
      </div>

      <p-tabView>
        <p-tabPanel header="Documentation">
          <div class="documentation-section">

            <h2>🔧 Component Overview</h2>
            <p>
              The Note Bubble component displays internal notes within threaded message views for communication workflows.
              It visually distinguishes between messages from the current user and other users with different alignments, colors, and avatar treatments.
              Use this component when you need to show conversational messages with clear authorship and timestamp information.
            </p>

            <h2>📋 Usage Example</h2>
            <pre><code>&lt;app-note-bubble
  [noteData]="myNoteData"
  (menuClick)="handleMenuClick($event)"
  (noteClick)="handleNoteClick($event)"&gt;
&lt;/app-note-bubble&gt;</code></pre>

            <h2>⚙️ Input/Output API</h2>
            <div class="api-table">
              <h3>@Input Properties</h3>
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
                    <td><code>noteData</code></td>
                    <td>NoteBubbleData</td>
                    <td><em>required</em></td>
                    <td>Complete note information including author, content, and timestamp</td>
                  </tr>
                </tbody>
              </table>

              <h3>@Output Events</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>menuClick</code></td>
                    <td>EventEmitter&lt;NoteBubbleData&gt;</td>
                    <td>Emitted when the three-dot menu button is clicked</td>
                  </tr>
                  <tr>
                    <td><code>noteClick</code></td>
                    <td>EventEmitter&lt;NoteBubbleData&gt;</td>
                    <td>Emitted when the note bubble itself is clicked</td>
                  </tr>
                </tbody>
              </table>

              <h3>NoteBubbleData Interface</h3>
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
                    <td><code>authorInitials</code></td>
                    <td>string</td>
                    <td>User initials to display in avatar (e.g., "JK")</td>
                  </tr>
                  <tr>
                    <td><code>authorName</code></td>
                    <td>string</td>
                    <td>Full name of the message author</td>
                  </tr>
                  <tr>
                    <td><code>timestamp</code></td>
                    <td>string</td>
                    <td>Formatted timestamp for display (e.g., "Aug 2, 2024 | 9:00 AM")</td>
                  </tr>
                  <tr>
                    <td><code>content</code></td>
                    <td>string</td>
                    <td>The note message content</td>
                  </tr>
                  <tr>
                    <td><code>isOwnMessage</code></td>
                    <td>boolean</td>
                    <td>Whether this note was authored by the current user</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>🔗 Dependencies / Related Components</h2>
            <ul>
              <li><strong>PrimeNG Modules:</strong> AvatarModule, TooltipModule</li>
              <li><strong>Angular Modules:</strong> CommonModule</li>
              <li><strong>Icons:</strong> FontAwesome (fa-ellipsis-vertical)</li>
              <li><strong>Design Tokens:</strong> Uses CSS custom properties for colors and spacing</li>
            </ul>

            <h2>🎨 Styling Notes</h2>
            <ul>
              <li><strong>Layout:</strong> Uses flexbox with <code>align-items: flex-start</code> for proper avatar alignment</li>
              <li><strong>Avatar:</strong> 24px circular avatar with 1px margin-top for name alignment</li>
              <li><strong>Colors:</strong> Own messages use blue theme (#2474BB), others use gray theme (#A9B3C2)</li>
              <li><strong>Border Radius:</strong> Speech bubble effect with cut corners (8px 8px 0px 8px for own, 8px 8px 8px 0px for others)</li>
              <li><strong>Responsive:</strong> Padding adjusts on mobile, maintains readability at all screen sizes</li>
              <li><strong>Typography:</strong> Roboto font family, 14px content, 13px timestamp</li>
            </ul>

            <h2>🧪 Testing Instructions</h2>
            <ul>
              <li><strong>Manual Testing:</strong> Test with both <code>isOwnMessage: true</code> and <code>false</code> to verify alignment</li>
              <li><strong>Event Testing:</strong> Click menu button and note content to verify events are emitted</li>
              <li><strong>Accessibility:</strong> Ensure tooltip appears on menu button hover</li>
              <li><strong>Visual Testing:</strong> Verify avatar alignment with author name, proper speech bubble styling</li>
            </ul>

          </div>
        </p-tabPanel>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic Note Bubbles</h3>
            <div class="example-container">
              <div class="message-thread">
                <div class="note-bubble"
                     [class.own-message]="basicNotes[0].isOwnMessage">
                  <app-note-bubble [noteData]="basicNotes[0]" (menuClick)="onMenuClick($event)"></app-note-bubble>
                </div>
                <div class="note-bubble"
                     [class.own-message]="basicNotes[1].isOwnMessage">
                  <app-note-bubble [noteData]="basicNotes[1]" (menuClick)="onMenuClick($event)"></app-note-bubble>
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
      align-items: flex-start;
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
  basicNotes: NoteBubbleData[] = [
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
