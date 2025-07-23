import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { WfaiPrevNextButtonComponent } from './wfai-prev-next-button.component';

@Component({
  selector: 'app-prev-next-button-doc',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    WfaiPrevNextButtonComponent
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>WFAI Previous/Next Button</h1>
        <p class="component-description">
          Navigation component for moving between work items with dropdown history functionality. 
          Provides quick access to recently viewed items and next available items in sequence.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            <h3>Basic Usage</h3>
            <div class="example-container">
              <wfai-prev-next-button
                [previousItems]="mockPreviousItems"
                [nextItems]="mockNextItems"
                (previousClick)="onPreviousClick()"
                (nextClick)="onNextClick()"
                (previousItemSelect)="onPreviousItemSelect($event)"
                (nextItemSelect)="onNextItemSelect($event)">
              </wfai-prev-next-button>
            </div>

            <h3>With Custom Labels</h3>
            <div class="example-container">
              <wfai-prev-next-button
                [previousItems]="mockPreviousItems"
                [nextItems]="mockNextItems"
                previousLabel="Back"
                nextLabel="Forward"
                (previousClick)="onPreviousClick()"
                (nextClick)="onNextClick()">
              </wfai-prev-next-button>
            </div>

            <h3>No Previous Dropdown Variant</h3>
            <div class="example-container">
              <wfai-prev-next-button
                [previousItems]="mockPreviousItems"
                [nextItems]="mockNextItems"
                [showPreviousDropdown]="false"
                (previousClick)="onPreviousClick()"
                (nextClick)="onNextClick()">
              </wfai-prev-next-button>
            </div>

            <h3>Disabled States</h3>
            <div class="example-container">
              <wfai-prev-next-button
                [previousItems]="[]"
                [nextItems]="[]"
                [disabled]="true">
              </wfai-prev-next-button>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Code">
          <div class="code-section">
            <h3>Import</h3>
            <pre><code>import &#123; WfaiPrevNextButtonComponent &#125; from './wfai-prev-next-button.component';

&#64;Component(&#123;
  imports: [WfaiPrevNextButtonComponent],
  // ...
&#125;)</code></pre>

            <h3>Basic Template</h3>
            <pre><code>&lt;wfai-prev-next-button
  [previousItems]="previousItems"
  [nextItems]="nextItems"
  (previousClick)="onPreviousClick()"
  (nextClick)="onNextClick()"
  (previousItemSelect)="onPreviousItemSelect($event)"
  (nextItemSelect)="onNextItemSelect($event)"&gt;
&lt;/wfai-prev-next-button&gt;</code></pre>

            <h3>Component Usage</h3>
            <pre><code>export class MyComponent &#123;
  previousItems: WorkItem[] = [
    &#123; id: '1', title: 'Task 1', type: 'feature' &#125;,
    &#123; id: '2', title: 'Bug Fix', type: 'bug' &#125;,
    // ...
  ];

  nextItems: WorkItem[] = [
    &#123; id: '3', title: 'Next Task', type: 'feature' &#125;
  ];

  onPreviousClick() &#123;
    // Handle previous navigation
  &#125;

  onNextClick() &#123;
    // Handle next navigation
  &#125;

  onPreviousItemSelect(item: WorkItem) &#123;
    // Handle specific previous item selection
  &#125;

  onNextItemSelect(item: WorkItem) &#123;
    // Handle specific next item selection
  &#125;
&#125;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>Properties</h3>
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
                    <td>previousItems</td>
                    <td>WorkItem[]</td>
                    <td>[]</td>
                    <td>Array of previous work items (max 10, shows 3 with scroll). Simple list format.</td>
                  </tr>
                  <tr>
                    <td>nextItems</td>
                    <td>WorkItem[]</td>
                    <td>[]</td>
                    <td>Typically single item: "Next From Results". Shows in minimal dropdown.</td>
                  </tr>
                  <tr>
                    <td>previousLabel</td>
                    <td>string</td>
                    <td>'Previous'</td>
                    <td>Label for the previous button</td>
                  </tr>
                  <tr>
                    <td>nextLabel</td>
                    <td>string</td>
                    <td>'Next'</td>
                    <td>Label for the next button</td>
                  </tr>
                  <tr>
                    <td>disabled</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether the entire component is disabled</td>
                  </tr>
                  <tr>
                    <td>width</td>
                    <td>string</td>
                    <td>'226px'</td>
                    <td>Fixed width of the button component</td>
                  </tr>
                  <tr>
                    <td>height</td>
                    <td>string</td>
                    <td>'32px'</td>
                    <td>Fixed height of the button component</td>
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
                    <td>previousClick</td>
                    <td>-</td>
                    <td>Emitted when the previous button is clicked</td>
                  </tr>
                  <tr>
                    <td>nextClick</td>
                    <td>-</td>
                    <td>Emitted when the next button is clicked</td>
                  </tr>
                  <tr>
                    <td>previousItemSelect</td>
                    <td>WorkItem</td>
                    <td>Emitted when a specific previous item is selected from dropdown</td>
                  </tr>
                  <tr>
                    <td>nextItemSelect</td>
                    <td>WorkItem</td>
                    <td>Emitted when a specific next item is selected from dropdown</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Interfaces</h3>
            <pre><code>interface WorkItem &#123;
  id: string;
  title: string;
  type?: string;        // Not used in simplified dropdown
  description?: string; // Not used in simplified dropdown
  timestamp?: Date;     // Not used in simplified dropdown
&#125;

// Simplified usage for WFAI:
// Previous items: &#123; id: 'LD-34521', title: 'LD-34521' &#125;
// Next item: &#123; id: 'next-results', title: 'Next From Results' &#125;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Design Specifications</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Dimensions:</strong>
                <ul>
                  <li>Total Width: 226px (fixed)</li>
                  <li>Height: 32px (fixed)</li>
                  <li>Border Radius: 4px</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Previous Button:</strong>
                <ul>
                  <li>Background: var(--blue-500) #2474BB</li>
                  <li>Hover: var(--blue-700) #1D5D96</li>
                  <li>Text Color: #FFFFFF</li>
                  <li>Border Radius: 4px 0px 0px 4px</li>
                  <li>Padding: 10px</li>
                  <li>Font: Roboto, 12px, Bold</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Next Button:</strong>
                <ul>
                  <li>Background: #FFFFFF</li>
                  <li>Hover: var(--surface-200) #F3F5F7</li>
                  <li>Text Color: var(--blue-500) #2474BB</li>
                  <li>Border Radius: 0px 4px 4px 0px</li>
                  <li>Padding: 10px</li>
                  <li>Font: Roboto, 12px, Bold</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Icons:</strong>
                <ul>
                  <li>Font Awesome 6 Free</li>
                  <li>Size: 14px</li>
                  <li>Previous: fa-arrow-left</li>
                  <li>Next: fa-arrow-right</li>
                  <li>Dropdown: fa-angle-down</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Shadow:</strong>
                <ul>
                  <li>Box Shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15)</li>
                </ul>
              </div>
            </div>

            <h3>Dropdown Specifications</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Previous Dropdown:</strong>
                <ul>
                  <li>Width: 168px, Max Height: 135px</li>
                  <li>Header: "RECENT LOADS" (uppercase)</li>
                  <li>Shows 10 items max, 3 visible with scroll</li>
                  <li>Item format: Arrow icon + ID/Title</li>
                  <li>Clean minimal list design</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Next Dropdown:</strong>
                <ul>
                  <li>Width: 136px</li>
                  <li>Single item: "Next From Results"</li>
                  <li>Blue text with arrow icon</li>
                  <li>Minimal single-option design</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Interaction States:</strong>
                <ul>
                  <li>Previous Hover: Background #1D5D96</li>
                  <li>Next Hover: Background #F3F5F7</li>
                  <li>Active: Scale transform (0.98)</li>
                  <li>Disabled: Opacity 0.6</li>
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
      background: var(--surface-ground);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      padding: 2rem;
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
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
      border-left: 3px solid var(--blue-500);
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
  `]
})
export class PrevNextButtonDocComponent {
  mockPreviousItems = [
    { id: 'LD-34521', title: 'LD-34521' },
    { id: 'LD-34522', title: 'LD-34522' },
    { id: 'LD-34523', title: 'LD-34523' },
    { id: 'LD-34524', title: 'LD-34524' },
    { id: 'LD-34525', title: 'LD-34525' },
    { id: 'LD-34526', title: 'LD-34526' },
    { id: 'LD-34527', title: 'LD-34527' },
    { id: 'LD-34528', title: 'LD-34528' },
    { id: 'LD-34529', title: 'LD-34529' },
    { id: 'LD-34530', title: 'LD-34530' }
  ];

  mockNextItems = [
    { id: 'next-results', title: 'Next From Results' }
  ];

  onPreviousClick() {
    console.log('Previous button clicked');
  }

  onNextClick() {
    console.log('Next button clicked');
  }

  onPreviousItemSelect(item: any) {
    console.log('Previous item selected:', item);
  }

  onNextItemSelect(item: any) {
    console.log('Next item selected:', item);
  }
}
