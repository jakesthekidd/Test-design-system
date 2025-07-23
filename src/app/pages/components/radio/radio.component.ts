import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-radio-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    RadioButtonModule,
    ButtonModule
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Radio Button</h1>
        <p class="component-description">
          Single selection component with PrimeNG styling and accessible design.
          Allows users to select one option from a group with clear visual feedback and keyboard navigation.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic Radio Group</h3>
            <div class="example-container">
              <div class="radio-group">
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="size-small"
                    name="size"
                    value="small"
                    [(ngModel)]="selectedSize">
                  </p-radioButton>
                  <label for="size-small" class="radio-label">Small</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="size-medium"
                    name="size"
                    value="medium"
                    [(ngModel)]="selectedSize">
                  </p-radioButton>
                  <label for="size-medium" class="radio-label">Medium</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="size-large"
                    name="size"
                    value="large"
                    [(ngModel)]="selectedSize">
                  </p-radioButton>
                  <label for="size-large" class="radio-label">Large</label>
                </div>
              </div>
              <div class="example-output">
                <small>Selected Size: {{ selectedSize || 'None' }}</small>
              </div>
            </div>

            <h3>Theme Selection</h3>
            <div class="example-container">
              <div class="radio-group">
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="theme-light"
                    name="theme"
                    value="light"
                    [(ngModel)]="selectedTheme">
                  </p-radioButton>
                  <label for="theme-light" class="radio-label">Light Theme</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="theme-dark"
                    name="theme"
                    value="dark"
                    [(ngModel)]="selectedTheme">
                  </p-radioButton>
                  <label for="theme-dark" class="radio-label">Dark Theme</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="theme-auto"
                    name="theme"
                    value="auto"
                    [(ngModel)]="selectedTheme">
                  </p-radioButton>
                  <label for="theme-auto" class="radio-label">Auto (System)</label>
                </div>
              </div>
              <div class="example-output">
                <small>Selected Theme: {{ selectedTheme || 'None' }}</small>
              </div>
            </div>

            <h3>Payment Method Selection</h3>
            <div class="example-container">
              <div class="radio-group">
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="payment-card"
                    name="payment"
                    value="credit-card"
                    [(ngModel)]="selectedPayment">
                  </p-radioButton>
                  <label for="payment-card" class="radio-label">
                    <strong>Credit Card</strong>
                    <span class="radio-description">Visa, MasterCard, American Express</span>
                  </label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="payment-paypal"
                    name="payment"
                    value="paypal"
                    [(ngModel)]="selectedPayment">
                  </p-radioButton>
                  <label for="payment-paypal" class="radio-label">
                    <strong>PayPal</strong>
                    <span class="radio-description">Pay with your PayPal account</span>
                  </label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="payment-bank"
                    name="payment"
                    value="bank-transfer"
                    [(ngModel)]="selectedPayment">
                  </p-radioButton>
                  <label for="payment-bank" class="radio-label">
                    <strong>Bank Transfer</strong>
                    <span class="radio-description">Direct bank account transfer</span>
                  </label>
                </div>
              </div>
              <div class="example-output">
                <small>Selected Payment: {{ getPaymentDescription() }}</small>
              </div>
            </div>

            <h3>Horizontal Layout</h3>
            <div class="example-container">
              <div class="radio-group-horizontal">
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="priority-low"
                    name="priority"
                    value="low"
                    [(ngModel)]="selectedPriority">
                  </p-radioButton>
                  <label for="priority-low" class="radio-label">Low</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="priority-medium"
                    name="priority"
                    value="medium"
                    [(ngModel)]="selectedPriority">
                  </p-radioButton>
                  <label for="priority-medium" class="radio-label">Medium</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="priority-high"
                    name="priority"
                    value="high"
                    [(ngModel)]="selectedPriority">
                  </p-radioButton>
                  <label for="priority-high" class="radio-label">High</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="priority-urgent"
                    name="priority"
                    value="urgent"
                    [(ngModel)]="selectedPriority">
                  </p-radioButton>
                  <label for="priority-urgent" class="radio-label">Urgent</label>
                </div>
              </div>
              <div class="example-output">
                <small>Selected Priority: {{ selectedPriority || 'None' }}</small>
              </div>
            </div>

            <h3>Disabled States</h3>
            <div class="example-container">
              <div class="radio-group">
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="status-active"
                    name="status"
                    value="active"
                    [(ngModel)]="selectedStatus">
                  </p-radioButton>
                  <label for="status-active" class="radio-label">Active</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="status-inactive"
                    name="status"
                    value="inactive"
                    [(ngModel)]="selectedStatus">
                  </p-radioButton>
                  <label for="status-inactive" class="radio-label">Inactive</label>
                </div>
                
                <div class="radio-wrapper">
                  <p-radioButton
                    inputId="status-disabled"
                    name="status"
                    value="disabled"
                    [(ngModel)]="selectedStatus"
                    [disabled]="true">
                  </p-radioButton>
                  <label for="status-disabled" class="radio-label">Disabled Option</label>
                </div>
              </div>
              <div class="example-output">
                <small>Selected Status: {{ selectedStatus || 'None' }}</small>
              </div>
            </div>

            <h3>Form Integration</h3>
            <div class="example-container">
              <form class="form-example">
                <div class="form-section">
                  <h4>Account Type</h4>
                  <div class="radio-group">
                    <div class="radio-wrapper">
                      <p-radioButton
                        inputId="account-personal"
                        name="accountType"
                        value="personal"
                        [(ngModel)]="formData.accountType">
                      </p-radioButton>
                      <label for="account-personal" class="radio-label">Personal Account</label>
                    </div>
                    
                    <div class="radio-wrapper">
                      <p-radioButton
                        inputId="account-business"
                        name="accountType"
                        value="business"
                        [(ngModel)]="formData.accountType">
                      </p-radioButton>
                      <label for="account-business" class="radio-label">Business Account</label>
                    </div>
                  </div>
                </div>
                
                <div class="form-section">
                  <h4>Billing Frequency</h4>
                  <div class="radio-group">
                    <div class="radio-wrapper">
                      <p-radioButton
                        inputId="billing-monthly"
                        name="billingFrequency"
                        value="monthly"
                        [(ngModel)]="formData.billingFrequency">
                      </p-radioButton>
                      <label for="billing-monthly" class="radio-label">Monthly ($9.99/month)</label>
                    </div>
                    
                    <div class="radio-wrapper">
                      <p-radioButton
                        inputId="billing-yearly"
                        name="billingFrequency"
                        value="yearly"
                        [(ngModel)]="formData.billingFrequency">
                      </p-radioButton>
                      <label for="billing-yearly" class="radio-label">Yearly ($99.99/year - Save 17%)</label>
                    </div>
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
            <pre><code>import &#123; RadioButtonModule &#125; from 'primeng/radiobutton';
import &#123; FormsModule &#125; from '&#64;angular/forms';

&#64;Component(&#123;
  imports: [RadioButtonModule, FormsModule],
  // ...
&#125;)</code></pre>

            <h3>Basic Radio Group Usage</h3>
            <pre><code>&lt;div class="radio-group"&gt;
  &lt;div class="radio-wrapper"&gt;
    &lt;p-radioButton
      inputId="option1"
      name="group"
      value="option1"
      [(ngModel)]="selectedValue"&gt;
    &lt;/p-radioButton&gt;
    &lt;label for="option1" class="radio-label"&gt;Option 1&lt;/label&gt;
  &lt;/div&gt;
  
  &lt;div class="radio-wrapper"&gt;
    &lt;p-radioButton
      inputId="option2"
      name="group"
      value="option2"
      [(ngModel)]="selectedValue"&gt;
    &lt;/p-radioButton&gt;
    &lt;label for="option2" class="radio-label"&gt;Option 2&lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

            <h3>Horizontal Layout</h3>
            <pre><code>&lt;div class="radio-group-horizontal"&gt;
  &lt;div class="radio-wrapper"&gt;
    &lt;p-radioButton
      inputId="small"
      name="size"
      value="small"
      [(ngModel)]="selectedSize"&gt;
    &lt;/p-radioButton&gt;
    &lt;label for="small" class="radio-label"&gt;Small&lt;/label&gt;
  &lt;/div&gt;
  
  &lt;div class="radio-wrapper"&gt;
    &lt;p-radioButton
      inputId="large"
      name="size"
      value="large"
      [(ngModel)]="selectedSize"&gt;
    &lt;/p-radioButton&gt;
    &lt;label for="large" class="radio-label"&gt;Large&lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

            <h3>Component Logic</h3>
            <pre><code>export class MyComponent &#123;
  selectedValue = '';
  selectedSize = 'medium';
  
  onRadioChange(): void &#123;
    console.log('Radio changed:', this.selectedValue);
  &#125;
&#125;</code></pre>

            <h3>Form Usage</h3>
            <pre><code>&lt;form&gt;
  &lt;div class="form-section"&gt;
    &lt;h4&gt;Account Type&lt;/h4&gt;
    &lt;div class="radio-group"&gt;
      &lt;div class="radio-wrapper"&gt;
        &lt;p-radioButton
          inputId="personal"
          name="accountType"
          value="personal"
          [(ngModel)]="formData.accountType"&gt;
        &lt;/p-radioButton&gt;
        &lt;label for="personal" class="radio-label"&gt;Personal&lt;/label&gt;
      &lt;/div&gt;
      
      &lt;div class="radio-wrapper"&gt;
        &lt;p-radioButton
          inputId="business"
          name="accountType"
          value="business"
          [(ngModel)]="formData.accountType"&gt;
        &lt;/p-radioButton&gt;
        &lt;label for="business" class="radio-label"&gt;Business&lt;/label&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>RadioButton Properties</h3>
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
                    <td>Unique identifier for the radio button input</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>-</td>
                    <td>Name of the radio button group</td>
                  </tr>
                  <tr>
                    <td>value</td>
                    <td>any</td>
                    <td>-</td>
                    <td>Value of the radio button option</td>
                  </tr>
                  <tr>
                    <td>ngModel</td>
                    <td>any</td>
                    <td>-</td>
                    <td>Two-way data binding value</td>
                  </tr>
                  <tr>
                    <td>disabled</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether the radio button is disabled</td>
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
                    <td>onClick</td>
                    <td>event: Click event</td>
                    <td>Callback to invoke when radio button is clicked</td>
                  </tr>
                  <tr>
                    <td>onFocus</td>
                    <td>event: Focus event</td>
                    <td>Callback to invoke when radio button receives focus</td>
                  </tr>
                  <tr>
                    <td>onBlur</td>
                    <td>event: Blur event</td>
                    <td>Callback to invoke when radio button loses focus</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Required Attributes</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Purpose</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>name</td>
                    <td>Groups radio buttons together</td>
                    <td>name="size"</td>
                  </tr>
                  <tr>
                    <td>value</td>
                    <td>Unique value for each option</td>
                    <td>value="small"</td>
                  </tr>
                  <tr>
                    <td>inputId</td>
                    <td>Associates with label</td>
                    <td>inputId="size-small"</td>
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
                    <td>Screen readers can associate label with radio button</td>
                  </tr>
                  <tr>
                    <td>Keyboard Navigation</td>
                    <td>Arrow keys</td>
                    <td>Navigate between radio buttons in group</td>
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
            <h3>Radio Button States</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Visual States</strong>
                <ul>
                  <li>Unselected: Empty circle with border</li>
                  <li>Selected: Circle with center dot</li>
                  <li>Focused: Primary color outline</li>
                  <li>Disabled: Grayed out appearance</li>
                  <li>Hover: Subtle background color change</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Group Behavior</strong>
                <ul>
                  <li>Only one option can be selected per group</li>
                  <li>All options share the same name attribute</li>
                  <li>Arrow keys navigate within group</li>
                  <li>Consistent spacing and alignment</li>
                </ul>
              </div>
            </div>

            <h3>Layout Options</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Vertical Layout</strong>
                <ul>
                  <li>Stack options vertically</li>
                  <li>Better for longer lists</li>
                  <li>Easier to scan and read</li>
                  <li>Default layout option</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Horizontal Layout</strong>
                <ul>
                  <li>Display options side by side</li>
                  <li>Good for short lists</li>
                  <li>Space-efficient design</li>
                  <li>Consider mobile wrapping</li>
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
                  <li>Proper spacing between radio and label</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Colors</strong>
                <ul>
                  <li>Radio Border: var(--surface-border)</li>
                  <li>Selected State: var(--theme-primary-color)</li>
                  <li>Label Text: var(--text-color)</li>
                  <li>Focus Outline: var(--theme-primary-color)</li>
                  <li>Disabled: var(--text-color-secondary)</li>
                </ul>
              </div>
            </div>

            <h3>Best Practices</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Content</strong>
                <ul>
                  <li>Use radio buttons for mutually exclusive options</li>
                  <li>Provide clear, concise labels</li>
                  <li>Consider default selection for common cases</li>
                  <li>Group related options logically</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>UX Guidelines</strong>
                <ul>
                  <li>Limit options to 2-7 choices when possible</li>
                  <li>Use consistent spacing between options</li>
                  <li>Consider using fieldsets for complex forms</li>
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

    /* Radio Button Wrapper Styles */
    .radio-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0.75rem 0;
    }

    .radio-label {
      font-family: 'Roboto', sans-serif;
      font-size: 0.875rem;
      color: var(--text-color);
      cursor: pointer;
      user-select: none;
      display: flex;
      flex-direction: column;
    }

    .radio-description {
      font-size: 0.75rem;
      color: var(--text-color-secondary);
      margin-top: 0.25rem;
      font-weight: normal;
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .radio-group-horizontal {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .form-example {
      max-width: 600px;
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section h4 {
      color: var(--text-color);
      margin-bottom: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
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

    /* Custom Radio Button Styling */
    :host ::ng-deep .p-radiobutton {
      width: 1.125rem;
      height: 1.125rem;
    }

    :host ::ng-deep .p-radiobutton .p-radiobutton-box {
      border: 2px solid var(--surface-border);
      background: var(--surface-overlay);
      width: 1.125rem;
      height: 1.125rem;
      color: var(--text-color);
      border-radius: 50%;
      transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    }

    :host ::ng-deep .p-radiobutton .p-radiobutton-box.p-highlight {
      border-color: var(--theme-primary-color);
      background: var(--theme-primary-color);
    }

    :host ::ng-deep .p-radiobutton .p-radiobutton-box.p-focus {
      outline: 0 none;
      outline-offset: 0;
      box-shadow: 0 0 0 0.2rem rgba(36, 116, 187, 0.25);
      border-color: var(--theme-primary-color);
    }

    :host ::ng-deep .p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
      width: 0.5rem;
      height: 0.5rem;
      background: var(--surface-overlay);
      border-radius: 50%;
      transition-duration: 0.2s;
    }

    :host ::ng-deep .p-radiobutton:not(.p-radiobutton-disabled) .p-radiobutton-box:hover {
      border-color: var(--theme-primary-color);
      background: var(--surface-hover);
    }

    :host ::ng-deep .p-radiobutton:not(.p-radiobutton-disabled) .p-radiobutton-box.p-highlight:hover {
      border-color: var(--blue-700);
      background: var(--blue-700);
    }

    :host ::ng-deep .p-radiobutton.p-radiobutton-disabled .p-radiobutton-box {
      opacity: 0.6;
      background: var(--surface-disabled);
      border-color: var(--surface-border);
    }

    :host ::ng-deep .p-radiobutton.p-radiobutton-disabled .radio-label {
      opacity: 0.6;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .radio-group-horizontal {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .design-specs {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RadioDocComponent {
  // Basic examples
  selectedSize = 'medium';
  selectedTheme = 'light';
  selectedPayment = '';
  selectedPriority = '';
  selectedStatus = 'active';
  
  // Form data
  formData = {
    accountType: '',
    billingFrequency: ''
  };

  getPaymentDescription(): string {
    const paymentMap: { [key: string]: string } = {
      'credit-card': 'Credit Card',
      'paypal': 'PayPal',
      'bank-transfer': 'Bank Transfer'
    };
    return paymentMap[this.selectedPayment] || 'None';
  }

  canSubmitForm(): boolean {
    return this.formData.accountType !== '' && this.formData.billingFrequency !== '';
  }

  submitForm(): void {
    if (this.canSubmitForm()) {
      console.log('Form submitted:', this.formData);
      alert('Form submitted successfully!');
    }
  }

  clearForm(): void {
    this.formData = {
      accountType: '',
      billingFrequency: ''
    };
  }
}
