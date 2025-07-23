import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-checkbox-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    CheckboxModule,
    ButtonModule
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Checkbox</h1>
        <p class="component-description">
          Binary selection component with PrimeNG styling and accessible design.
          Provides clear visual feedback for selected/unselected states with proper keyboard navigation.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic Checkbox</h3>
            <div class="example-container">
              <div class="checkbox-wrapper">
                <p-checkbox
                  inputId="basicCheckbox"
                  [(ngModel)]="basicChecked"
                  [binary]="true">
                </p-checkbox>
                <label for="basicCheckbox" class="checkbox-label">I agree to the terms and conditions</label>
              </div>
              <div class="example-output">
                <small>Checked: {{ basicChecked }}</small>
              </div>
            </div>

            <h3>Multiple Checkboxes</h3>
            <div class="example-container">
              <div class="checkbox-group">
                <div class="checkbox-wrapper">
                  <p-checkbox
                    inputId="notifications"
                    [(ngModel)]="preferences.notifications"
                    [binary]="true">
                  </p-checkbox>
                  <label for="notifications" class="checkbox-label">Email notifications</label>
                </div>
                
                <div class="checkbox-wrapper">
                  <p-checkbox
                    inputId="newsletter"
                    [(ngModel)]="preferences.newsletter"
                    [binary]="true">
                  </p-checkbox>
                  <label for="newsletter" class="checkbox-label">Newsletter subscription</label>
                </div>
                
                <div class="checkbox-wrapper">
                  <p-checkbox
                    inputId="marketing"
                    [(ngModel)]="preferences.marketing"
                    [binary]="true">
                  </p-checkbox>
                  <label for="marketing" class="checkbox-label">Marketing communications</label>
                </div>
              </div>
              <div class="example-output">
                <small>Notifications: {{ preferences.notifications }}</small><br>
                <small>Newsletter: {{ preferences.newsletter }}</small><br>
                <small>Marketing: {{ preferences.marketing }}</small>
              </div>
            </div>

            <h3>Checkbox with Categories</h3>
            <div class="example-container">
              <div class="checkbox-categories">
                <div class="checkbox-wrapper">
                  <p-checkbox
                    inputId="selectAll"
                    [(ngModel)]="selectAll"
                    [binary]="true"
                    (onChange)="onSelectAllChange()">
                  </p-checkbox>
                  <label for="selectAll" class="checkbox-label checkbox-label-bold">Select All</label>
                </div>
                
                <div class="checkbox-subcategory">
                  <div class="checkbox-wrapper">
                    <p-checkbox
                      inputId="item1"
                      [(ngModel)]="selectedItems.item1"
                      [binary]="true"
                      (onChange)="onItemChange()">
                    </p-checkbox>
                    <label for="item1" class="checkbox-label">Dashboard</label>
                  </div>
                  
                  <div class="checkbox-wrapper">
                    <p-checkbox
                      inputId="item2"
                      [(ngModel)]="selectedItems.item2"
                      [binary]="true"
                      (onChange)="onItemChange()">
                    </p-checkbox>
                    <label for="item2" class="checkbox-label">Analytics</label>
                  </div>
                  
                  <div class="checkbox-wrapper">
                    <p-checkbox
                      inputId="item3"
                      [(ngModel)]="selectedItems.item3"
                      [binary]="true"
                      (onChange)="onItemChange()">
                    </p-checkbox>
                    <label for="item3" class="checkbox-label">Reports</label>
                  </div>
                </div>
              </div>
              <div class="example-output">
                <small>Selected: {{ getSelectedItemsArray().join(', ') || 'None' }}</small>
              </div>
            </div>

            <h3>Disabled States</h3>
            <div class="example-container">
              <div class="checkbox-group">
                <div class="checkbox-wrapper">
                  <p-checkbox
                    inputId="disabledUnchecked"
                    [(ngModel)]="disabledUnchecked"
                    [binary]="true"
                    [disabled]="true">
                  </p-checkbox>
                  <label for="disabledUnchecked" class="checkbox-label">Disabled unchecked</label>
                </div>
                
                <div class="checkbox-wrapper">
                  <p-checkbox
                    inputId="disabledChecked"
                    [(ngModel)]="disabledChecked"
                    [binary]="true"
                    [disabled]="true">
                  </p-checkbox>
                  <label for="disabledChecked" class="checkbox-label">Disabled checked</label>
                </div>
              </div>
            </div>

            <h3>Form Integration</h3>
            <div class="example-container">
              <form class="form-example">
                <div class="form-field">
                  <div class="checkbox-wrapper">
                    <p-checkbox
                      inputId="termsAccepted"
                      [(ngModel)]="formData.termsAccepted"
                      name="termsAccepted"
                      [binary]="true">
                    </p-checkbox>
                    <label for="termsAccepted" class="checkbox-label">I have read and accept the terms of service *</label>
                  </div>
                </div>
                
                <div class="form-field">
                  <div class="checkbox-wrapper">
                    <p-checkbox
                      inputId="privacyAccepted"
                      [(ngModel)]="formData.privacyAccepted"
                      name="privacyAccepted"
                      [binary]="true">
                    </p-checkbox>
                    <label for="privacyAccepted" class="checkbox-label">I agree to the privacy policy *</label>
                  </div>
                </div>
                
                <div class="form-field">
                  <div class="checkbox-wrapper">
                    <p-checkbox
                      inputId="marketingOptIn"
                      [(ngModel)]="formData.marketingOptIn"
                      name="marketingOptIn"
                      [binary]="true">
                    </p-checkbox>
                    <label for="marketingOptIn" class="checkbox-label">Send me promotional emails (optional)</label>
                  </div>
                </div>

                <div class="form-actions">
                  <p-button
                    label="Submit"
                    [disabled]="!canSubmitForm()"
                    (click)="submitForm()">
                  </p-button>
                  <p-button
                    label="Clear"
                    severity="secondary"
                    (click)="clearForm()">
                  </p-button>
                </div>
              </form>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Code">
          <div class="code-section">
            <h3>Import Required Modules</h3>
            <pre><code>import &#123; CheckboxModule &#125; from 'primeng/checkbox';
import &#123; FormsModule &#125; from '&#64;angular/forms';

&#64;Component(&#123;
  imports: [CheckboxModule, FormsModule],
  // ...
&#125;)</code></pre>

            <h3>Basic Checkbox Usage</h3>
            <pre><code>&lt;div class="checkbox-wrapper"&gt;
  &lt;p-checkbox
    inputId="basicCheckbox"
    [(ngModel)]="checked"
    [binary]="true"&gt;
  &lt;/p-checkbox&gt;
  &lt;label for="basicCheckbox" class="checkbox-label"&gt;Label text&lt;/label&gt;
&lt;/div&gt;</code></pre>

            <h3>Multiple Checkboxes</h3>
            <pre><code>&lt;div class="checkbox-group"&gt;
  &lt;div class="checkbox-wrapper"&gt;
    &lt;p-checkbox
      inputId="option1"
      [(ngModel)]="options.option1"
      [binary]="true"&gt;
    &lt;/p-checkbox&gt;
    &lt;label for="option1" class="checkbox-label"&gt;Option 1&lt;/label&gt;
  &lt;/div&gt;
  
  &lt;div class="checkbox-wrapper"&gt;
    &lt;p-checkbox
      inputId="option2"
      [(ngModel)]="options.option2"
      [binary]="true"&gt;
    &lt;/p-checkbox&gt;
    &lt;label for="option2" class="checkbox-label"&gt;Option 2&lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

            <h3>Component Logic</h3>
            <pre><code>export class MyComponent &#123;
  checked = false;
  
  options = &#123;
    option1: false,
    option2: false
  &#125;;
  
  onCheckboxChange(): void &#123;
    console.log('Checkbox changed:', this.checked);
  &#125;
&#125;</code></pre>

            <h3>Form Usage</h3>
            <pre><code>&lt;form&gt;
  &lt;div class="form-field"&gt;
    &lt;div class="checkbox-wrapper"&gt;
      &lt;p-checkbox
        inputId="termsAccepted"
        [(ngModel)]="formData.termsAccepted"
        name="termsAccepted"
        [binary]="true"&gt;
      &lt;/p-checkbox&gt;
      &lt;label for="termsAccepted" class="checkbox-label"&gt;I accept the terms&lt;/label&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>Checkbox Properties</h3>
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
                    <td>inputId</td>
                    <td>string</td>
                    <td>-</td>
                    <td>Unique identifier for the checkbox input</td>
                  </tr>
                  <tr>
                    <td>ngModel</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Two-way data binding value</td>
                  </tr>
                  <tr>
                    <td>binary</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Allows to select a boolean value instead of multiple values</td>
                  </tr>
                  <tr>
                    <td>disabled</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether the checkbox is disabled</td>
                  </tr>
                  <tr>
                    <td>readonly</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether the checkbox is readonly</td>
                  </tr>
                  <tr>
                    <td>tabindex</td>
                    <td>number</td>
                    <td>0</td>
                    <td>Tab order for keyboard navigation</td>
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
                    <td>onChange</td>
                    <td>event: Checkbox change event</td>
                    <td>Callback to invoke when value changes</td>
                  </tr>
                  <tr>
                    <td>onFocus</td>
                    <td>event: Focus event</td>
                    <td>Callback to invoke when checkbox receives focus</td>
                  </tr>
                  <tr>
                    <td>onBlur</td>
                    <td>event: Blur event</td>
                    <td>Callback to invoke when checkbox loses focus</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Accessibility Features</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Implementation</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Label Association</td>
                    <td>inputId + for</td>
                    <td>Screen readers can associate label with checkbox</td>
                  </tr>
                  <tr>
                    <td>Keyboard Navigation</td>
                    <td>Space key</td>
                    <td>Toggle checkbox state with keyboard</td>
                  </tr>
                  <tr>
                    <td>ARIA Support</td>
                    <td>Built-in</td>
                    <td>Proper ARIA attributes for assistive technologies</td>
                  </tr>
                  <tr>
                    <td>Focus Management</td>
                    <td>tabindex</td>
                    <td>Proper tab order and focus indicators</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Checkbox States</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Visual States</strong>
                <ul>
                  <li>Unchecked: Empty checkbox with border</li>
                  <li>Checked: Checkbox with checkmark icon</li>
                  <li>Focused: Primary color outline</li>
                  <li>Disabled: Grayed out appearance</li>
                  <li>Hover: Subtle background color change</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Interaction</strong>
                <ul>
                  <li>Click on checkbox or label to toggle</li>
                  <li>Space key to toggle when focused</li>
                  <li>Tab navigation support</li>
                  <li>Smooth transition animations</li>
                </ul>
              </div>
            </div>

            <h3>Styling Guidelines</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Typography</strong>
                <ul>
                  <li>Font Family: Roboto, sans-serif</li>
                  <li>Label Text: 14px, normal weight</li>
                  <li>Consistent line height for alignment</li>
                  <li>Proper spacing between checkbox and label</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Colors</strong>
                <ul>
                  <li>Checkbox Border: var(--surface-border)</li>
                  <li>Checked State: var(--theme-primary-color)</li>
                  <li>Label Text: var(--text-color)</li>
                  <li>Focus Outline: var(--theme-primary-color)</li>
                  <li>Disabled: var(--text-color-secondary)</li>
                </ul>
              </div>
            </div>

            <h3>Best Practices</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Layout</strong>
                <ul>
                  <li>Group related checkboxes logically</li>
                  <li>Use consistent spacing between options</li>
                  <li>Align checkboxes and labels properly</li>
                  <li>Consider using fieldsets for groups</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Content</strong>
                <ul>
                  <li>Keep labels concise and clear</li>
                  <li>Use positive language when possible</li>
                  <li>Indicate required vs optional selections</li>
                  <li>Provide helper text when needed</li>
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

    .example-output {
      margin-top: 1rem;
      padding: 1rem;
      background: var(--surface-ground);
      border-radius: 4px;
      border-left: 3px solid var(--theme-primary-color);
    }

    .example-output small {
      color: var(--text-color-secondary);
      font-family: 'Courier New', monospace;
      display: block;
      margin: 0.25rem 0;
    }

    /* Checkbox Wrapper Styles */
    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0.75rem 0;
    }

    .checkbox-label {
      font-family: 'Roboto', sans-serif;
      font-size: 0.875rem;
      color: var(--text-color);
      cursor: pointer;
      user-select: none;
    }

    .checkbox-label-bold {
      font-weight: 600;
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .checkbox-categories {
      display: flex;
      flex-direction: column;
    }

    .checkbox-subcategory {
      margin-left: 2rem;
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .form-example {
      max-width: 500px;
    }

    .form-field {
      margin-bottom: 1.5rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
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
      border-left: 3px solid var(--theme-primary-color);
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

    /* Custom Checkbox Styling */
    :host ::ng-deep .p-checkbox {
      width: 1.125rem;
      height: 1.125rem;
    }

    :host ::ng-deep .p-checkbox .p-checkbox-box {
      border: 2px solid var(--surface-border);
      background: var(--surface-overlay);
      width: 1.125rem;
      height: 1.125rem;
      color: var(--text-color);
      border-radius: 3px;
      transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    }

    :host ::ng-deep .p-checkbox .p-checkbox-box.p-highlight {
      border-color: var(--theme-primary-color);
      background: var(--theme-primary-color);
    }

    :host ::ng-deep .p-checkbox .p-checkbox-box.p-focus {
      outline: 0 none;
      outline-offset: 0;
      box-shadow: 0 0 0 0.2rem rgba(36, 116, 187, 0.25);
      border-color: var(--theme-primary-color);
    }

    :host ::ng-deep .p-checkbox .p-checkbox-box .p-checkbox-icon {
      width: 0.75rem;
      height: 0.75rem;
      color: var(--surface-overlay);
      transition-duration: 0.2s;
    }

    :host ::ng-deep .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
      border-color: var(--theme-primary-color);
      background: var(--surface-hover);
    }

    :host ::ng-deep .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
      border-color: var(--blue-700);
      background: var(--blue-700);
    }

    :host ::ng-deep .p-checkbox.p-checkbox-disabled .p-checkbox-box {
      opacity: 0.6;
      background: var(--surface-disabled);
      border-color: var(--surface-border);
    }

    :host ::ng-deep .p-checkbox.p-checkbox-disabled .checkbox-label {
      opacity: 0.6;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .form-actions {
        flex-direction: column;
      }
      
      .design-specs {
        grid-template-columns: 1fr;
      }
      
      .checkbox-subcategory {
        margin-left: 1rem;
      }
    }
  `]
})
export class CheckboxDocComponent {
  // Basic checkbox
  basicChecked = false;
  
  // Preferences
  preferences = {
    notifications: false,
    newsletter: true,
    marketing: false
  };
  
  // Select all functionality
  selectAll = false;
  selectedItems = {
    item1: false,
    item2: false,
    item3: false
  };
  
  // Disabled states
  disabledUnchecked = false;
  disabledChecked = true;
  
  // Form data
  formData = {
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false
  };

  onSelectAllChange(): void {
    this.selectedItems.item1 = this.selectAll;
    this.selectedItems.item2 = this.selectAll;
    this.selectedItems.item3 = this.selectAll;
  }

  onItemChange(): void {
    const allSelected = this.selectedItems.item1 && this.selectedItems.item2 && this.selectedItems.item3;
    const noneSelected = !this.selectedItems.item1 && !this.selectedItems.item2 && !this.selectedItems.item3;
    
    if (allSelected) {
      this.selectAll = true;
    } else if (noneSelected) {
      this.selectAll = false;
    }
  }

  getSelectedItemsArray(): string[] {
    const selected: string[] = [];
    if (this.selectedItems.item1) selected.push('Dashboard');
    if (this.selectedItems.item2) selected.push('Analytics');
    if (this.selectedItems.item3) selected.push('Reports');
    return selected;
  }

  canSubmitForm(): boolean {
    return this.formData.termsAccepted && this.formData.privacyAccepted;
  }

  submitForm(): void {
    if (this.canSubmitForm()) {
      console.log('Form submitted:', this.formData);
      alert('Form submitted successfully!');
    }
  }

  clearForm(): void {
    this.formData = {
      termsAccepted: false,
      privacyAccepted: false,
      marketingOptIn: false
    };
  }
}
