import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-input-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    InputTextModule,
    ButtonModule
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Input Text</h1>
        <p class="component-description">
          Text input field with PrimeNG styling and accessible labeling.
          Provides a clean, modern interface for text input with proper label association and form integration.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic Input with Label</h3>
            <div class="example-container">
              <div class="input-wrapper">
                <label for="basicInput" class="input-label">Enter your name</label>
                <input
                  pInputText
                  id="basicInput"
                  [(ngModel)]="basicValue"
                  autocomplete="off"
                  tabindex="0"
                  placeholder="Enter your name"
                />
              </div>
              <div class="example-output">
                <small>Value: "{{ basicValue }}"</small>
              </div>
            </div>

            <h3>Email Input with Validation</h3>
            <div class="example-container">
              <div class="input-wrapper">
                <label for="emailInput" class="input-label">Email Address</label>
                <input
                  pInputText
                  id="emailInput"
                  [(ngModel)]="emailValue"
                  type="email"
                  autocomplete="email"
                  tabindex="0"
                  placeholder="Enter your email"
                  [class.ng-invalid]="emailValue && !isValidEmail(emailValue)"
                />
              </div>
              <div class="example-output">
                <small>Value: "{{ emailValue }}"</small>
                <small *ngIf="emailValue && !isValidEmail(emailValue)" class="error-text">
                  Please enter a valid email address
                </small>
              </div>
            </div>

            <h3>Password Input</h3>
            <div class="example-container">
              <div class="input-wrapper">
                <label for="passwordInput" class="input-label">Password</label>
                <input
                  pInputText
                  id="passwordInput"
                  [(ngModel)]="passwordValue"
                  type="password"
                  autocomplete="current-password"
                  tabindex="0"
                  placeholder="Enter your password"
                />
              </div>
              <div class="example-output">
                <small>Value: "{{ passwordValue ? '•'.repeat(passwordValue.length) : '' }}"</small>
              </div>
            </div>

            <h3>Multiple Inputs with Tab Order</h3>
            <div class="example-container">
              <div class="input-group">
                <div class="input-wrapper">
                  <label for="firstNameInput" class="input-label">First Name</label>
                  <input
                    pInputText
                    id="firstNameInput"
                    [(ngModel)]="firstNameValue"
                    autocomplete="given-name"
                    tabindex="0"
                    placeholder="First name"
                  />
                </div>

                <div class="input-wrapper">
                  <label for="lastNameInput" class="input-label">Last Name</label>
                  <input
                    pInputText
                    id="lastNameInput"
                    [(ngModel)]="lastNameValue"
                    autocomplete="family-name"
                    tabindex="0"
                    placeholder="Last name"
                  />
                </div>

                <div class="input-wrapper">
                  <label for="phoneInput" class="input-label">Phone Number</label>
                  <input
                    pInputText
                    id="phoneInput"
                    [(ngModel)]="phoneValue"
                    type="tel"
                    autocomplete="tel"
                    tabindex="0"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div class="example-output">
                <small>Full Name: {{ getFullName() }}</small><br>
                <small>Phone: {{ phoneValue || 'Not provided' }}</small>
              </div>
            </div>

            <h3>Float Label Variant</h3>
            <div class="example-container">
              <div class="input-wrapper float-label">
                <input
                  pInputText
                  id="floatLabelInput"
                  [(ngModel)]="floatLabelValue"
                  autocomplete="off"
                  tabindex="0"
                  placeholder=" "
                />
                <label for="floatLabelInput" class="float-label-text">Enter your name</label>
              </div>
              <div class="example-output">
                <small>Value: "{{ floatLabelValue }}"</small>
              </div>
            </div>

            <h3>Float Label Email with Validation</h3>
            <div class="example-container">
              <div class="input-wrapper float-label">
                <input
                  pInputText
                  id="floatEmailInput"
                  [(ngModel)]="floatEmailValue"
                  type="email"
                  autocomplete="email"
                  tabindex="0"
                  placeholder=" "
                  [class.ng-invalid]="floatEmailValue && !isValidEmail(floatEmailValue)"
                />
                <label for="floatEmailInput" class="float-label-text">Email Address</label>
              </div>
              <div class="example-output">
                <small>Value: "{{ floatEmailValue }}"</small>
                <small *ngIf="floatEmailValue && !isValidEmail(floatEmailValue)" class="error-text">
                  Please enter a valid email address
                </small>
              </div>
            </div>

            <h3>Float Label Multiple Inputs</h3>
            <div class="example-container">
              <div class="input-group">
                <div class="input-wrapper float-label">
                  <input
                    pInputText
                    id="floatFirstName"
                    [(ngModel)]="floatFirstNameValue"
                    autocomplete="given-name"
                    tabindex="0"
                    placeholder=" "
                  />
                  <label for="floatFirstName" class="float-label-text">First Name</label>
                </div>

                <div class="input-wrapper float-label">
                  <input
                    pInputText
                    id="floatLastName"
                    [(ngModel)]="floatLastNameValue"
                    autocomplete="family-name"
                    tabindex="0"
                    placeholder=" "
                  />
                  <label for="floatLastName" class="float-label-text">Last Name</label>
                </div>

                <div class="input-wrapper float-label">
                  <input
                    pInputText
                    id="floatPhone"
                    [(ngModel)]="floatPhoneValue"
                    type="tel"
                    autocomplete="tel"
                    tabindex="0"
                    placeholder=" "
                  />
                  <label for="floatPhone" class="float-label-text">Phone Number</label>
                </div>
              </div>
              <div class="example-output">
                <small>Full Name: {{ getFloatFullName() }}</small><br>
                <small>Phone: {{ floatPhoneValue || 'Not provided' }}</small>
              </div>
            </div>

            <h3>Disabled State</h3>
            <div class="example-container">
              <div class="input-wrapper">
                <label for="disabledInput" class="input-label">Disabled Input</label>
                <input
                  pInputText
                  id="disabledInput"
                  [(ngModel)]="disabledValue"
                  [disabled]="true"
                  autocomplete="off"
                  tabindex="-1"
                  placeholder="This field is disabled"
                />
              </div>
            </div>

            <h3>Form Example</h3>
            <div class="example-container">
              <form class="form-example">
                <div class="form-field">
                  <div class="input-wrapper">
                    <label for="formTitle" class="input-label">Title *</label>
                    <input
                      pInputText
                      id="formTitle"
                      [(ngModel)]="formData.title"
                      name="title"
                      autocomplete="off"
                      tabindex="0"
                      required
                      placeholder="Enter title"
                    />
                  </div>
                </div>

                <div class="form-field">
                  <div class="input-wrapper">
                    <label for="formDescription" class="input-label">Description</label>
                    <input
                      pInputText
                      id="formDescription"
                      [(ngModel)]="formData.description"
                      name="description"
                      autocomplete="off"
                      tabindex="0"
                      placeholder="Enter description"
                    />
                  </div>
                </div>

                <div class="form-field">
                  <div class="input-wrapper">
                    <label for="formUrl" class="input-label">Website URL</label>
                    <input
                      pInputText
                      id="formUrl"
                      [(ngModel)]="formData.url"
                      name="url"
                      type="url"
                      autocomplete="url"
                      tabindex="0"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div class="form-actions">
                  <p-button
                    label="Submit"
                    [disabled]="!formData.title"
                    (click)="submitForm()"
                    tabindex="0">
                  </p-button>
                  <p-button
                    label="Clear"
                    severity="secondary"
                    (click)="clearForm()"
                    tabindex="0">
                  </p-button>
                </div>
              </form>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Code">
          <div class="code-section">
            <h3>Import Required Modules</h3>
            <pre><code>import &#123; InputTextModule &#125; from 'primeng/inputtext';
import &#123; FormsModule &#125; from '&#64;angular/forms';

&#64;Component(&#123;
  imports: [InputTextModule, FormsModule],
  // ...
&#125;)</code></pre>

            <h3>Basic Input Usage</h3>
            <pre><code>&lt;div class="input-wrapper"&gt;
  &lt;label for="userInput" class="input-label"&gt;Input Label&lt;/label&gt;
  &lt;input
    pInputText
    id="userInput"
    [(ngModel)]="value"
    autocomplete="off"
    tabindex="0"
    placeholder="Enter value"
  /&gt;
&lt;/div&gt;</code></pre>

            <h3>Email Input with Validation</h3>
            <pre><code>&lt;div class="input-wrapper"&gt;
  &lt;label for="emailInput" class="input-label"&gt;Email Address&lt;/label&gt;
  &lt;input
    pInputText
    id="emailInput"
    [(ngModel)]="emailValue"
    type="email"
    autocomplete="email"
    tabindex="0"
    placeholder="Enter your email"
    [class.ng-invalid]="emailValue && !isValidEmail(emailValue)"
  /&gt;
&lt;/div&gt;</code></pre>

            <h3>Component Logic</h3>
            <pre><code>export class MyComponent &#123;
  value = '';
  emailValue = '';
  
  isValidEmail(email: string): boolean &#123;
    const emailRegex = /^[^\\s&#64;]+&#64;[^\\s&#64;]+\\.[^\\s&#64;]+$/;
    return emailRegex.test(email);
  &#125;
&#125;</code></pre>

            <h3>Float Label Usage</h3>
            <pre><code>&lt;div class="input-wrapper float-label"&gt;
  &lt;input
    pInputText
    id="floatInput"
    [(ngModel)]="value"
    autocomplete="off"
    tabindex="0"
    placeholder=" "
  /&gt;
  &lt;label for="floatInput" class="float-label-text"&gt;Label Text&lt;/label&gt;
&lt;/div&gt;</code></pre>

            <h3>Form Usage</h3>
            <pre><code>&lt;form&gt;
  &lt;div class="form-field"&gt;
    &lt;div class="input-wrapper"&gt;
      &lt;label for="title" class="input-label"&gt;Title *&lt;/label&gt;
      &lt;input
        pInputText
        id="title"
        [(ngModel)]="formData.title"
        name="title"
        required
        tabindex="0"
        placeholder="Enter title"
      /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>Input Wrapper Structure</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Element</th>
                    <th>Class</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>div</td>
                    <td>input-wrapper</td>
                    <td>Container for label and input field</td>
                  </tr>
                  <tr>
                    <td>div</td>
                    <td>input-wrapper float-label</td>
                    <td>Container for float label variant</td>
                  </tr>
                  <tr>
                    <td>label</td>
                    <td>input-label</td>
                    <td>Accessible label for standard inputs</td>
                  </tr>
                  <tr>
                    <td>label</td>
                    <td>float-label-text</td>
                    <td>Floating label for float label variant</td>
                  </tr>
                  <tr>
                    <td>input</td>
                    <td>pInputText</td>
                    <td>PrimeNG styled input field</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Float Label Requirements</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Value</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>placeholder</td>
                    <td>" " (single space)</td>
                    <td>Required for CSS :placeholder-shown selector</td>
                  </tr>
                  <tr>
                    <td>input order</td>
                    <td>Before label</td>
                    <td>CSS sibling selector dependency</td>
                  </tr>
                  <tr>
                    <td>wrapper class</td>
                    <td>float-label</td>
                    <td>Enables float label styling</td>
                  </tr>
                  <tr>
                    <td>label class</td>
                    <td>float-label-text</td>
                    <td>Float label specific styling</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Input Properties</h3>
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
                    <td>pInputText</td>
                    <td>directive</td>
                    <td>-</td>
                    <td>PrimeNG directive for styling input fields</td>
                  </tr>
                  <tr>
                    <td>id</td>
                    <td>string</td>
                    <td>-</td>
                    <td>Unique identifier for the input field</td>
                  </tr>
                  <tr>
                    <td>ngModel</td>
                    <td>any</td>
                    <td>-</td>
                    <td>Two-way data binding value</td>
                  </tr>
                  <tr>
                    <td>type</td>
                    <td>string</td>
                    <td>text</td>
                    <td>HTML input type (text, email, password, tel, url, etc.)</td>
                  </tr>
                  <tr>
                    <td>autocomplete</td>
                    <td>string</td>
                    <td>-</td>
                    <td>HTML autocomplete attribute for better UX</td>
                  </tr>
                  <tr>
                    <td>tabindex</td>
                    <td>number</td>
                    <td>0</td>
                    <td>Tab order for keyboard navigation</td>
                  </tr>
                  <tr>
                    <td>disabled</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether the input is disabled</td>
                  </tr>
                  <tr>
                    <td>required</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether the input is required</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Label Properties</h3>
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
                    <td>for</td>
                    <td>string</td>
                    <td>-</td>
                    <td>Associates the label with the input field (must match input's id)</td>
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
                    <td>for + id</td>
                    <td>Screen readers can associate label with input</td>
                  </tr>
                  <tr>
                    <td>Tab Order</td>
                    <td>tabindex="0"</td>
                    <td>Proper keyboard navigation sequence</td>
                  </tr>
                  <tr>
                    <td>Autocomplete</td>
                    <td>autocomplete attribute</td>
                    <td>Helps users and screen readers understand field purpose</td>
                  </tr>
                  <tr>
                    <td>Input Type</td>
                    <td>type attribute</td>
                    <td>Semantic meaning for assistive technologies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Input Label Behavior</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Standard Labels</strong>
                <ul>
                  <li>Label positioned above input field</li>
                  <li>Clear visual hierarchy</li>
                  <li>Accessible label association with for/id</li>
                  <li>Consistent spacing and typography</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Input States</strong>
                <ul>
                  <li>Default: Clean border, placeholder text visible</li>
                  <li>Focused: Primary color border highlight</li>
                  <li>Filled: Content visible, maintains focus styling</li>
                  <li>Disabled: Grayed out appearance, non-interactive</li>
                  <li>Error: Red border and validation messages</li>
                </ul>
              </div>
            </div>

            <h3>Styling Guidelines</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Typography</strong>
                <ul>
                  <li>Font Family: Roboto, sans-serif</li>
                  <li>Input Text: 14px, normal weight</li>
                  <li>Floating Label: 12px, medium weight</li>
                  <li>Helper Text: 12px, normal weight</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Colors</strong>
                <ul>
                  <li>Input Text: var(--text-color)</li>
                  <li>Label: var(--text-color-secondary)</li>
                  <li>Border: var(--surface-border)</li>
                  <li>Focus: var(--theme-primary-color)</li>
                  <li>Error: var(--red-500)</li>
                </ul>
              </div>
            </div>

            <h3>Best Practices</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Accessibility</strong>
                <ul>
                  <li>Always use proper label association (for + id)</li>
                  <li>Include meaningful autocomplete attributes</li>
                  <li>Maintain logical tab order</li>
                  <li>Use semantic input types</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>UX Guidelines</strong>
                <ul>
                  <li>Keep labels concise and descriptive</li>
                  <li>Use helper text for additional context</li>
                  <li>Validate input in real-time when appropriate</li>
                  <li>Show clear error states</li>
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

    .error-text {
      color: var(--red-500) !important;
    }

    .input-group {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .form-example {
      max-width: 400px;
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

    /* Input Wrapper Styles */
    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    .input-label {
      font-family: 'Roboto', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-color);
      margin: 0;
    }

    .input-wrapper input {
      width: 100%;
    }

    .ng-invalid {
      border-color: var(--red-500) !important;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .input-group {
        grid-template-columns: 1fr;
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
export class InputDocComponent {
  // Basic examples
  basicValue = '';
  emailValue = '';
  passwordValue = '';
  
  // Multiple inputs
  firstNameValue = '';
  lastNameValue = '';
  phoneValue = '';
  
  // Disabled input
  disabledValue = 'This field is disabled';
  
  // Form example
  formData = {
    title: '',
    description: '',
    url: ''
  };

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getFullName(): string {
    return `${this.firstNameValue} ${this.lastNameValue}`.trim() || 'Not provided';
  }

  submitForm(): void {
    if (this.formData.title) {
      console.log('Form submitted:', this.formData);
      alert('Form submitted successfully!');
    }
  }

  clearForm(): void {
    this.formData = {
      title: '',
      description: '',
      url: ''
    };
  }
}
