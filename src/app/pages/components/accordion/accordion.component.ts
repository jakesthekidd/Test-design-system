import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-accordion-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    PanelModule,
    ButtonModule
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Accordion</h1>
        <p class="component-description">
          Collapsible content panels using PrimeNG Panel components with custom toggle icons.
          Provides space-efficient content organization with smooth expand/collapse animations.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic Accordion</h3>
            <div class="example-container">
              <div class="accordion-container">
                <p-panel header="General Information" [toggleable]="true" [collapsed]="panels.general" (onAfterToggle)="onPanelToggle('general', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="panels.general"
                         [class.fa-angle-down]="!panels.general"></i>
                      <span class="panel-title">General Information</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>This section contains general information about the product, including basic specifications, availability, and overview details.</p>
                    <ul>
                      <li>Product availability: In stock</li>
                      <li>Last updated: {{ getCurrentDate() }}</li>
                      <li>Category: Electronics</li>
                    </ul>
                  </div>
                </p-panel>

                <p-panel header="Technical Specifications" [toggleable]="true" [collapsed]="panels.technical" (onAfterToggle)="onPanelToggle('technical', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="panels.technical"
                         [class.fa-angle-down]="!panels.technical"></i>
                      <span class="panel-title">Technical Specifications</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>Detailed technical specifications and requirements for the product.</p>
                    <div class="spec-grid">
                      <div class="spec-item">
                        <strong>Dimensions:</strong>
                        <span>10" x 8" x 2"</span>
                      </div>
                      <div class="spec-item">
                        <strong>Weight:</strong>
                        <span>1.2 lbs</span>
                      </div>
                      <div class="spec-item">
                        <strong>Material:</strong>
                        <span>Aluminum alloy</span>
                      </div>
                      <div class="spec-item">
                        <strong>Power:</strong>
                        <span>USB-C, 65W</span>
                      </div>
                    </div>
                  </div>
                </p-panel>

                <p-panel header="Support & Warranty" [toggleable]="true" [collapsed]="panels.support" (onAfterToggle)="onPanelToggle('support', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="panels.support"
                         [class.fa-angle-down]="!panels.support"></i>
                      <span class="panel-title">Support & Warranty</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>Information about support options, warranty coverage, and contact details.</p>
                    <div class="support-info">
                      <div class="support-section">
                        <h4>Warranty Coverage</h4>
                        <ul>
                          <li>2-year manufacturer warranty</li>
                          <li>30-day return policy</li>
                          <li>Free repair service</li>
                        </ul>
                      </div>
                      <div class="support-section">
                        <h4>Contact Support</h4>
                        <ul>
                          <li>Email: support&#64;example.com</li>
                          <li>Phone: 1-800-555-0123</li>
                          <li>Live chat: Available 24/7</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </p-panel>
              </div>
            </div>

            <h3>FAQ Accordion</h3>
            <div class="example-container">
              <div class="accordion-container">
                <p-panel header="How do I get started?" [toggleable]="true" [collapsed]="faq.question1" (onAfterToggle)="onFaqToggle('question1', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="faq.question1"
                         [class.fa-angle-down]="!faq.question1"></i>
                      <span class="panel-title">How do I get started?</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>Getting started is easy! Follow these simple steps:</p>
                    <ol>
                      <li>Create your account by clicking the "Sign Up" button</li>
                      <li>Verify your email address</li>
                      <li>Complete your profile setup</li>
                      <li>Explore the dashboard and available features</li>
                    </ol>
                  </div>
                </p-panel>

                <p-panel header="What payment methods do you accept?" [toggleable]="true" [collapsed]="faq.question2" (onAfterToggle)="onFaqToggle('question2', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="faq.question2"
                         [class.fa-angle-down]="!faq.question2"></i>
                      <span class="panel-title">What payment methods do you accept?</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>We accept all major payment methods:</p>
                    <ul>
                      <li>Credit cards (Visa, MasterCard, American Express)</li>
                      <li>PayPal</li>
                      <li>Bank transfer</li>
                      <li>Apple Pay and Google Pay</li>
                    </ul>
                    <p>All transactions are secured with SSL encryption.</p>
                  </div>
                </p-panel>

                <p-panel header="Can I cancel my subscription?" [toggleable]="true" [collapsed]="faq.question3" (onAfterToggle)="onFaqToggle('question3', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="faq.question3"
                         [class.fa-angle-down]="!faq.question3"></i>
                      <span class="panel-title">Can I cancel my subscription?</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>Yes, you can cancel your subscription at any time from your account settings. Here's how:</p>
                    <ol>
                      <li>Go to Account Settings</li>
                      <li>Click on "Subscription"</li>
                      <li>Select "Cancel Subscription"</li>
                      <li>Follow the confirmation steps</li>
                    </ol>
                    <p><strong>Note:</strong> You'll retain access until the end of your current billing period.</p>
                  </div>
                </p-panel>

                <p-panel header="Is there a mobile app?" [toggleable]="true" [collapsed]="faq.question4" (onAfterToggle)="onFaqToggle('question4', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="faq.question4"
                         [class.fa-angle-down]="!faq.question4"></i>
                      <span class="panel-title">Is there a mobile app?</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>Yes! Our mobile app is available for both iOS and Android devices.</p>
                    <div class="app-links">
                      <p><strong>Download from:</strong></p>
                      <ul>
                        <li>App Store (iOS)</li>
                        <li>Google Play Store (Android)</li>
                      </ul>
                      <p>The mobile app includes all core features and syncs seamlessly with your web account.</p>
                    </div>
                  </div>
                </p-panel>
              </div>
            </div>

            <h3>Settings Accordion</h3>
            <div class="example-container">
              <div class="accordion-container">
                <p-panel header="Account Settings" [toggleable]="true" [collapsed]="settings.account" (onAfterToggle)="onSettingsToggle('account', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="settings.account"
                         [class.fa-angle-down]="!settings.account"></i>
                      <span class="panel-title">Account Settings</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>Manage your account information and preferences.</p>
                    <div class="settings-grid">
                      <button type="button" class="setting-button">Change Password</button>
                      <button type="button" class="setting-button">Update Email</button>
                      <button type="button" class="setting-button">Profile Information</button>
                      <button type="button" class="setting-button">Two-Factor Auth</button>
                    </div>
                  </div>
                </p-panel>

                <p-panel header="Privacy Settings" [toggleable]="true" [collapsed]="settings.privacy" (onAfterToggle)="onSettingsToggle('privacy', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="settings.privacy"
                         [class.fa-angle-down]="!settings.privacy"></i>
                      <span class="panel-title">Privacy Settings</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>Control your privacy and data sharing preferences.</p>
                    <div class="privacy-options">
                      <label class="privacy-option">
                        <input type="checkbox" checked> Share usage analytics
                      </label>
                      <label class="privacy-option">
                        <input type="checkbox"> Allow marketing emails
                      </label>
                      <label class="privacy-option">
                        <input type="checkbox" checked> Enable push notifications
                      </label>
                      <label class="privacy-option">
                        <input type="checkbox"> Make profile public
                      </label>
                    </div>
                  </div>
                </p-panel>

                <p-panel header="Notification Settings" [toggleable]="true" [collapsed]="settings.notifications" (onAfterToggle)="onSettingsToggle('notifications', $event)">
                  <ng-template pTemplate="header">
                    <span class="panel-header-content">
                      <i class="panel-toggle-icon fa-solid"
                         [class.fa-angle-right]="settings.notifications"
                         [class.fa-angle-down]="!settings.notifications"></i>
                      <span class="panel-title">Notification Settings</span>
                    </span>
                  </ng-template>
                  <div class="panel-content">
                    <p>Configure how and when you receive notifications.</p>
                    <div class="notification-settings">
                      <div class="notification-group">
                        <h5>Email Notifications</h5>
                        <label><input type="checkbox" checked> New messages</label>
                        <label><input type="checkbox"> Weekly summary</label>
                        <label><input type="checkbox" checked> Security alerts</label>
                      </div>
                      <div class="notification-group">
                        <h5>Push Notifications</h5>
                        <label><input type="checkbox" checked> Real-time updates</label>
                        <label><input type="checkbox"> Daily reminders</label>
                        <label><input type="checkbox"> System maintenance</label>
                      </div>
                    </div>
                  </div>
                </p-panel>
              </div>
            </div>

            <h3>Interactive Controls</h3>
            <div class="example-container">
              <div class="accordion-controls">
                <p-button label="Expand All" (click)="expandAll()" severity="secondary" size="small"></p-button>
                <p-button label="Collapse All" (click)="collapseAll()" severity="secondary" size="small"></p-button>
              </div>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Code">
          <div class="code-section">
            <h3>Import Required Modules</h3>
            <pre><code>import &#123; PanelModule &#125; from 'primeng/panel';
import &#123; CommonModule &#125; from '&#64;angular/common';

&#64;Component(&#123;
  imports: [PanelModule, CommonModule],
  // ...
&#125;)</code></pre>

            <h3>Basic Panel Usage</h3>
            <pre><code>&lt;p-panel header="Panel Title" [toggleable]="true" [collapsed]="isCollapsed"&gt;
  &lt;ng-template pTemplate="header"&gt;
    &lt;span class="panel-header-content"&gt;
      &lt;i class="panel-toggle-icon fa-solid" 
         [class.fa-angle-right]="isCollapsed"
         [class.fa-angle-down]="!isCollapsed"&gt;&lt;/i&gt;
      &lt;span class="panel-title"&gt;Panel Title&lt;/span&gt;
    &lt;/span&gt;
  &lt;/ng-template&gt;
  &lt;div class="panel-content"&gt;
    &lt;p&gt;Panel content goes here...&lt;/p&gt;
  &lt;/div&gt;
&lt;/p-panel&gt;</code></pre>

            <h3>Multiple Panels (Accordion)</h3>
            <pre><code>&lt;div class="accordion-container"&gt;
  &lt;p-panel header="Section 1" [toggleable]="true" [collapsed]="panels.section1"&gt;
    &lt;ng-template pTemplate="header"&gt;
      &lt;span class="panel-header-content"&gt;
        &lt;i class="panel-toggle-icon fa-solid" 
           [class.fa-angle-right]="panels.section1"
           [class.fa-angle-down]="!panels.section1"&gt;&lt;/i&gt;
        &lt;span class="panel-title"&gt;Section 1&lt;/span&gt;
      &lt;/span&gt;
    &lt;/ng-template&gt;
    &lt;div class="panel-content"&gt;Content for section 1&lt;/div&gt;
  &lt;/p-panel&gt;
  
  &lt;p-panel header="Section 2" [toggleable]="true" [collapsed]="panels.section2"&gt;
    &lt;ng-template pTemplate="header"&gt;
      &lt;span class="panel-header-content"&gt;
        &lt;i class="panel-toggle-icon fa-solid" 
           [class.fa-angle-right]="panels.section2"
           [class.fa-angle-down]="!panels.section2"&gt;&lt;/i&gt;
        &lt;span class="panel-title"&gt;Section 2&lt;/span&gt;
      &lt;/span&gt;
    &lt;/ng-template&gt;
    &lt;div class="panel-content"&gt;Content for section 2&lt;/div&gt;
  &lt;/p-panel&gt;
&lt;/div&gt;</code></pre>

            <h3>Component Logic</h3>
            <pre><code>export class AccordionComponent &#123;
  panels = &#123;
    section1: true,  // collapsed
    section2: false, // expanded
    section3: true
  &#125;;

  expandAll(): void &#123;
    Object.keys(this.panels).forEach(key =&gt; &#123;
      this.panels[key] = false;
    &#125;);
  &#125;

  collapseAll(): void &#123;
    Object.keys(this.panels).forEach(key =&gt; &#123;
      this.panels[key] = true;
    &#125;);
  &#125;
&#125;</code></pre>

            <h3>Control Individual Panels</h3>
            <pre><code>&lt;p-button label="Toggle Section 1" 
          (click)="panels.section1 = !panels.section1"&gt;
&lt;/p-button&gt;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>Panel Properties</h3>
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
                    <td>header</td>
                    <td>string</td>
                    <td>-</td>
                    <td>Header text of the panel</td>
                  </tr>
                  <tr>
                    <td>toggleable</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Defines if content of panel can be expanded and collapsed</td>
                  </tr>
                  <tr>
                    <td>collapsed</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Defines the initial state of panel content</td>
                  </tr>
                  <tr>
                    <td>style</td>
                    <td>object</td>
                    <td>-</td>
                    <td>Inline style of the component</td>
                  </tr>
                  <tr>
                    <td>styleClass</td>
                    <td>string</td>
                    <td>-</td>
                    <td>Style class of the component</td>
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
                    <td>onBeforeToggle</td>
                    <td>event: Toggle event</td>
                    <td>Callback to invoke before content toggle</td>
                  </tr>
                  <tr>
                    <td>onAfterToggle</td>
                    <td>event: Toggle event</td>
                    <td>Callback to invoke after content toggle</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Templates</h3>
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
                    <td>header</td>
                    <td>-</td>
                    <td>Custom header template</td>
                  </tr>
                  <tr>
                    <td>icons</td>
                    <td>-</td>
                    <td>Custom header icons template</td>
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
                    <td>Keyboard Support</td>
                    <td>Enter/Space keys</td>
                    <td>Toggle panel state with keyboard</td>
                  </tr>
                  <tr>
                    <td>ARIA Support</td>
                    <td>Built-in</td>
                    <td>Proper ARIA attributes for screen readers</td>
                  </tr>
                  <tr>
                    <td>Focus Management</td>
                    <td>Tab navigation</td>
                    <td>Proper tab order and focus indicators</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Panel States</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Visual States</strong>
                <ul>
                  <li>Collapsed: Content hidden, angle-right icon</li>
                  <li>Expanded: Content visible, angle-down icon</li>
                  <li>Hover: Subtle background color change</li>
                  <li>Focus: Primary color outline</li>
                  <li>Transition: Smooth expand/collapse animation</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Icon Behavior</strong>
                <ul>
                  <li>fa-angle-right when panel is collapsed</li>
                  <li>fa-angle-down when panel is expanded</li>
                  <li>Smooth rotation transition</li>
                  <li>Consistent sizing and positioning</li>
                </ul>
              </div>
            </div>

            <h3>Layout Guidelines</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Spacing</strong>
                <ul>
                  <li>Consistent gap between panels</li>
                  <li>Proper padding inside content areas</li>
                  <li>Aligned header elements</li>
                  <li>Adequate touch targets</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Typography</strong>
                <ul>
                  <li>Font Family: Roboto, sans-serif</li>
                  <li>Header: 16px, medium weight</li>
                  <li>Content: 14px, normal weight</li>
                  <li>Consistent line heights</li>
                </ul>
              </div>
            </div>

            <h3>Styling Guidelines</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Colors</strong>
                <ul>
                  <li>Header Background: var(--surface-section)</li>
                  <li>Content Background: var(--surface-overlay)</li>
                  <li>Border: var(--surface-border)</li>
                  <li>Icon: var(--theme-primary-color)</li>
                  <li>Text: var(--text-color)</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Best Practices</strong>
                <ul>
                  <li>Group related content logically</li>
                  <li>Use descriptive header titles</li>
                  <li>Consider default expanded states</li>
                  <li>Provide expand/collapse all controls</li>
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

    /* Accordion Styles */
    .accordion-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .accordion-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    /* Panel Header Customization */
    :host ::ng-deep .p-panel .p-panel-header {
      background: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 6px 6px 0 0;
      padding: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    :host ::ng-deep .p-panel .p-panel-header:hover {
      background: var(--surface-hover);
    }

    :host ::ng-deep .p-panel.p-panel-toggleable .p-panel-header {
      border-bottom: 0;
    }

    :host ::ng-deep .p-panel .p-panel-content {
      background: var(--surface-overlay);
      border: 1px solid var(--surface-border);
      border-top: 0;
      border-radius: 0 0 6px 6px;
      padding: 0;
    }

    /* Panel Header Content */
    .panel-header-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      font-family: 'Roboto', sans-serif;
    }

    .panel-toggle-icon {
      color: var(--theme-primary-color);
      font-size: 0.875rem;
      transition: transform 0.2s ease;
      width: 1rem;
      text-align: center;
    }

    .panel-title {
      color: var(--text-color);
      font-size: 1rem;
      font-weight: 500;
    }

    /* Panel Content */
    .panel-content {
      padding: 1.5rem;
      font-family: 'Roboto', sans-serif;
      color: var(--text-color);
      line-height: 1.6;
    }

    .panel-content p {
      margin: 0 0 1rem 0;
    }

    .panel-content ul,
    .panel-content ol {
      margin: 0 0 1rem 0;
      padding-left: 1.5rem;
    }

    .panel-content li {
      margin-bottom: 0.5rem;
    }

    /* Spec Grid */
    .spec-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .spec-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .spec-item strong {
      color: var(--text-color);
      font-weight: 600;
    }

    .spec-item span {
      color: var(--text-color-secondary);
    }

    /* Support Info */
    .support-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 1rem;
    }

    .support-section h4 {
      color: var(--text-color);
      margin: 0 0 0.75rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .support-section ul {
      margin: 0;
      padding-left: 1.5rem;
    }

    /* Settings */
    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .setting-button {
      background: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 4px;
      padding: 0.75rem 1rem;
      font-family: 'Roboto', sans-serif;
      font-size: 0.875rem;
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.2s;
    }

    .setting-button:hover {
      background: var(--surface-hover);
      border-color: var(--theme-primary-color);
    }

    /* Privacy Options */
    .privacy-options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .privacy-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'Roboto', sans-serif;
      color: var(--text-color);
      cursor: pointer;
    }

    .privacy-option input[type="checkbox"] {
      margin: 0;
    }

    /* Notification Settings */
    .notification-settings {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 1rem;
    }

    .notification-group h5 {
      color: var(--text-color);
      margin: 0 0 0.75rem 0;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .notification-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .notification-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'Roboto', sans-serif;
      font-size: 0.875rem;
      color: var(--text-color);
      cursor: pointer;
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
    }

    .design-specs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 1rem 0;
    }

    .design-specs .spec-item {
      background: var(--surface-section);
      padding: 1rem;
      border-radius: 6px;
      border-left: 3px solid var(--theme-primary-color);
    }

    .design-specs .spec-item strong {
      color: var(--text-color);
      display: block;
      margin-bottom: 0.5rem;
    }

    .design-specs .spec-item ul {
      margin: 0;
      padding-left: 1rem;
    }

    .design-specs .spec-item li {
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

    /* Hide default panel icons */
    :host ::ng-deep .p-panel .p-panel-header .p-panel-title {
      display: none;
    }

    :host ::ng-deep .p-panel .p-panel-header .p-panel-icons {
      display: none;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .accordion-controls {
        flex-direction: column;
      }
      
      .spec-grid {
        grid-template-columns: 1fr;
      }
      
      .support-info {
        grid-template-columns: 1fr;
      }
      
      .settings-grid {
        grid-template-columns: 1fr;
      }
      
      .notification-settings {
        grid-template-columns: 1fr;
      }
      
      .design-specs {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AccordionDocComponent {
  // Panel states for basic accordion
  panels = {
    general: false,
    technical: true,
    support: true
  };

  // FAQ states
  faq = {
    question1: true,
    question2: true,
    question3: true,
    question4: true
  };

  // Settings states
  settings = {
    account: true,
    privacy: true,
    notifications: true
  };

  expandAll(): void {
    // Set all panels to expanded (false = expanded)
    Object.keys(this.panels).forEach(key => {
      (this.panels as any)[key] = false;
    });
    Object.keys(this.faq).forEach(key => {
      (this.faq as any)[key] = false;
    });
    Object.keys(this.settings).forEach(key => {
      (this.settings as any)[key] = false;
    });
  }

  collapseAll(): void {
    // Set all panels to collapsed (true = collapsed)
    Object.keys(this.panels).forEach(key => {
      (this.panels as any)[key] = true;
    });
    Object.keys(this.faq).forEach(key => {
      (this.faq as any)[key] = true;
    });
    Object.keys(this.settings).forEach(key => {
      (this.settings as any)[key] = true;
    });
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}
