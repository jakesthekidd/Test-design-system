import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabs-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    TableModule
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Tabs</h1>
        <p class="component-description">
          Tabbed interface components using PrimeNG TabView with design tokens for organizing content 
          into logical sections. Provides efficient content organization with clean navigation.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic Tabs</h3>
            <div class="example-container">
              <div class="tabs-container">
                <p-tabView [(activeIndex)]="activeIndex">
                  <p-tabPanel header="Overview">
                    <div class="tab-content">
                      <h4>Product Overview</h4>
                      <p>This section provides a comprehensive overview of the product features, capabilities, and general information.</p>
                      <ul>
                        <li>High-performance design</li>
                        <li>User-friendly interface</li>
                        <li>Cross-platform compatibility</li>
                        <li>Advanced security features</li>
                      </ul>
                    </div>
                  </p-tabPanel>
                  
                  <p-tabPanel header="Features">
                    <div class="tab-content">
                      <h4>Key Features</h4>
                      <div class="features-grid">
                        <div class="feature-card">
                          <div class="feature-icon">
                            <i class="fa-solid fa-rocket"></i>
                          </div>
                          <h5>Performance</h5>
                          <p>Optimized for speed and efficiency</p>
                        </div>
                        <div class="feature-card">
                          <div class="feature-icon">
                            <i class="fa-solid fa-shield-halved"></i>
                          </div>
                          <h5>Security</h5>
                          <p>Enterprise-grade security protocols</p>
                        </div>
                        <div class="feature-card">
                          <div class="feature-icon">
                            <i class="fa-solid fa-users"></i>
                          </div>
                          <h5>Collaboration</h5>
                          <p>Real-time team collaboration tools</p>
                        </div>
                        <div class="feature-card">
                          <div class="feature-icon">
                            <i class="fa-solid fa-chart-line"></i>
                          </div>
                          <h5>Analytics</h5>
                          <p>Comprehensive reporting and insights</p>
                        </div>
                      </div>
                    </div>
                  </p-tabPanel>
                  
                  <p-tabPanel header="Specifications">
                    <div class="tab-content">
                      <h4>Technical Specifications</h4>
                      <div class="specs-table">
                        <p-table [value]="specifications" [tableStyle]="{'min-width': '50rem'}">
                          <ng-template pTemplate="header">
                            <tr>
                              <th>Component</th>
                              <th>Specification</th>
                              <th>Details</th>
                            </tr>
                          </ng-template>
                          <ng-template pTemplate="body" let-spec>
                            <tr>
                              <td><strong>{{ spec.component }}</strong></td>
                              <td>{{ spec.specification }}</td>
                              <td>{{ spec.details }}</td>
                            </tr>
                          </ng-template>
                        </p-table>
                      </div>
                    </div>
                  </p-tabPanel>
                  
                  <p-tabPanel header="Support">
                    <div class="tab-content">
                      <h4>Support & Documentation</h4>
                      <div class="support-sections">
                        <div class="support-section">
                          <h5>Getting Started</h5>
                          <p>Quick start guide and initial setup instructions for new users.</p>
                          <p-button label="View Guide" severity="info" size="small"></p-button>
                        </div>
                        
                        <div class="support-section">
                          <h5>API Documentation</h5>
                          <p>Comprehensive API reference and integration examples.</p>
                          <p-button label="API Docs" severity="secondary" size="small"></p-button>
                        </div>
                        
                        <div class="support-section">
                          <h5>Community Support</h5>
                          <p>Connect with our community forums and knowledge base.</p>
                          <p-button label="Community" severity="success" size="small"></p-button>
                        </div>
                        
                        <div class="support-section">
                          <h5>Contact Support</h5>
                          <p>Get direct help from our technical support team.</p>
                          <p-button label="Contact Us" severity="warning" size="small"></p-button>
                        </div>
                      </div>
                    </div>
                  </p-tabPanel>
                </p-tabView>
              </div>
            </div>

            <h3>Scrollable Tabs</h3>
            <div class="example-container">
              <div class="tabs-container">
                <p-tabView scrollable="true">
                  <p-tabPanel header="Tab 1">
                    <div class="tab-content">
                      <p>Content for scrollable tab 1</p>
                    </div>
                  </p-tabPanel>
                  <p-tabPanel header="Tab 2">
                    <div class="tab-content">
                      <p>Content for scrollable tab 2</p>
                    </div>
                  </p-tabPanel>
                  <p-tabPanel header="Tab 3">
                    <div class="tab-content">
                      <p>Content for scrollable tab 3</p>
                    </div>
                  </p-tabPanel>
                  <p-tabPanel header="Tab 4">
                    <div class="tab-content">
                      <p>Content for scrollable tab 4</p>
                    </div>
                  </p-tabPanel>
                  <p-tabPanel header="Tab 5">
                    <div class="tab-content">
                      <p>Content for scrollable tab 5</p>
                    </div>
                  </p-tabPanel>
                  <p-tabPanel header="Tab 6">
                    <div class="tab-content">
                      <p>Content for scrollable tab 6</p>
                    </div>
                  </p-tabPanel>
                </p-tabView>
              </div>
            </div>

            <h3>Interactive Controls</h3>
            <div class="example-container">
              <div class="controls-section">
                <p-button label="Switch to Overview" (click)="setActiveTab(0)" severity="secondary" size="small"></p-button>
                <p-button label="Switch to Features" (click)="setActiveTab(1)" severity="secondary" size="small"></p-button>
                <p-button label="Switch to Specs" (click)="setActiveTab(2)" severity="secondary" size="small"></p-button>
                <p-button label="Switch to Support" (click)="setActiveTab(3)" severity="secondary" size="small"></p-button>
              </div>
              <p class="active-tab-info">Current active tab: {{ getActiveTabName() }}</p>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Code">
          <div class="code-section">
            <h3>Import Required Modules</h3>
            <pre><code>import &#123; TabViewModule &#125; from 'primeng/tabview';
import &#123; CommonModule &#125; from '&#64;angular/common';

&#64;Component(&#123;
  imports: [TabViewModule, CommonModule],
  // ...
&#125;)</code></pre>

            <h3>Basic Tab Structure</h3>
            <pre><code>&lt;p-tabView [(activeIndex)]="activeIndex"&gt;
  &lt;p-tabPanel header="Tab 1"&gt;
    &lt;div class="tab-content"&gt;
      &lt;h4&gt;Content Title&lt;/h4&gt;
      &lt;p&gt;Tab content goes here...&lt;/p&gt;
    &lt;/div&gt;
  &lt;/p-tabPanel&gt;
  
  &lt;p-tabPanel header="Tab 2"&gt;
    &lt;div class="tab-content"&gt;
      &lt;h4&gt;Another Section&lt;/h4&gt;
      &lt;p&gt;More content for the second tab.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/p-tabPanel&gt;
&lt;/p-tabView&gt;</code></pre>

            <h3>Scrollable Tabs</h3>
            <pre><code>&lt;p-tabView scrollable="true"&gt;
  &lt;p-tabPanel header="Long Tab Name 1"&gt;
    &lt;p&gt;Content for first tab&lt;/p&gt;
  &lt;/p-tabPanel&gt;
  &lt;p-tabPanel header="Long Tab Name 2"&gt;
    &lt;p&gt;Content for second tab&lt;/p&gt;
  &lt;/p-tabPanel&gt;
  &lt;!-- More tabs... --&gt;
&lt;/p-tabView&gt;</code></pre>

            <h3>Component Logic</h3>
            <pre><code>export class TabsComponent &#123;
  activeIndex: number = 0;
  
  setActiveTab(index: number): void &#123;
    this.activeIndex = index;
  &#125;
  
  getActiveTabName(): string &#123;
    const tabNames = ['Overview', 'Features', 'Specifications', 'Support'];
    return tabNames[this.activeIndex] || 'Unknown';
  &#125;
&#125;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>TabView Properties</h3>
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
                    <td>activeIndex</td>
                    <td>number</td>
                    <td>0</td>
                    <td>Index of the active tab</td>
                  </tr>
                  <tr>
                    <td>scrollable</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>When enabled, tab headers are scrollable</td>
                  </tr>
                  <tr>
                    <td>lazy</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether tab panels are rendered lazily</td>
                  </tr>
                  <tr>
                    <td>controlClose</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether to control tab closing programmatically</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>TabPanel Properties</h3>
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
                    <td>header</td>
                    <td>string</td>
                    <td>Title of the tab panel</td>
                  </tr>
                  <tr>
                    <td>disabled</td>
                    <td>boolean</td>
                    <td>Whether the tab panel is disabled</td>
                  </tr>
                  <tr>
                    <td>closable</td>
                    <td>boolean</td>
                    <td>Whether the tab panel is closable</td>
                  </tr>
                  <tr>
                    <td>leftIcon</td>
                    <td>string</td>
                    <td>Icon class for the left side of tab header</td>
                  </tr>
                  <tr>
                    <td>rightIcon</td>
                    <td>string</td>
                    <td>Icon class for the right side of tab header</td>
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
                    <td>event.originalEvent: Event<br>event.index: number</td>
                    <td>Callback to invoke when an active tab is changed</td>
                  </tr>
                  <tr>
                    <td>onClose</td>
                    <td>event.originalEvent: Event<br>event.index: number</td>
                    <td>Callback to invoke when a tab is closed</td>
                  </tr>
                  <tr>
                    <td>activeIndexChange</td>
                    <td>index: number</td>
                    <td>Emitted when active tab index changes</td>
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
                <strong>Tab Structure</strong>
                <ul>
                  <li>Clean horizontal navigation</li>
                  <li>Clear active state indication</li>
                  <li>Consistent spacing and typography</li>
                  <li>Smooth transitions between tabs</li>
                  <li>Responsive design for mobile devices</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Visual States</strong>
                <ul>
                  <li>Default: Gray background with subtle border</li>
                  <li>Active: Primary color with bottom border</li>
                  <li>Hover: Light background highlight</li>
                  <li>Disabled: Muted colors with reduced opacity</li>
                </ul>
              </div>
            </div>

            <h3>Typography & Colors</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Design Tokens Used</strong>
                <ul>
                  <li>Primary Color: var(--primary-color)</li>
                  <li>Surface Colors: var(--surface-overlay), var(--surface-border)</li>
                  <li>Text Colors: var(--text-color), var(--text-color-secondary)</li>
                  <li>Hover State: var(--surface-hover)</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Typography</strong>
                <ul>
                  <li>Tab Headers: 14px, medium weight</li>
                  <li>Content Headers: 18px, semibold</li>
                  <li>Body Text: 14px, normal weight</li>
                  <li>Font Family: System font stack</li>
                </ul>
              </div>
            </div>

            <h3>Layout Guidelines</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Spacing</strong>
                <ul>
                  <li>Tab padding: 12px horizontal, 8px vertical</li>
                  <li>Content padding: 16px on all sides</li>
                  <li>Border radius: 4px for rounded corners</li>
                  <li>Consistent gaps between interactive elements</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Best Practices</strong>
                <ul>
                  <li>Use clear, descriptive tab labels</li>
                  <li>Limit number of tabs for better usability</li>
                  <li>Consider scrollable tabs for many options</li>
                  <li>Maintain consistent content structure across tabs</li>
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

    /* Tabs Container Styling */
    .tabs-container {
      width: 100%;
    }

    /* Tab Content Styling */
    .tab-content {
      padding: 1rem 0;
    }

    .tab-content h4 {
      color: var(--text-color);
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .tab-content h5 {
      color: var(--text-color);
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .tab-content p {
      color: var(--text-color-secondary);
      line-height: 1.5;
      margin: 0 0 1rem 0;
    }

    .tab-content ul {
      color: var(--text-color-secondary);
      padding-left: 1.5rem;
    }

    .tab-content li {
      margin: 0.5rem 0;
    }

    /* Features Grid */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 1rem 0;
    }

    .feature-card {
      background: var(--surface-overlay);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.2s ease;
    }

    .feature-card:hover {
      background: var(--surface-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .feature-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: var(--primary-light);
      color: var(--primary-color);
      border-radius: 50%;
      margin: 0 auto 1rem auto;
      font-size: 1.25rem;
    }

    /* Support Sections */
    .support-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 1rem 0;
    }

    .support-section {
      background: var(--surface-overlay);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      padding: 1.5rem;
    }

    .support-section h5 {
      color: var(--text-color);
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .support-section p {
      color: var(--text-color-secondary);
      line-height: 1.5;
      margin: 0 0 1rem 0;
    }

    /* Specifications Table */
    .specs-table {
      margin: 1rem 0;
    }

    /* Controls */
    .controls-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 1rem 0;
    }

    .active-tab-info {
      color: var(--text-color-secondary);
      font-style: italic;
      margin: 1rem 0 0 0;
    }

    /* Custom TabView Styling with Design Tokens */
    :host ::ng-deep .p-tabview .p-tabview-nav {
      background: var(--surface-overlay);
      border: 1px solid var(--surface-border);
      border-radius: 6px 6px 0 0;
    }

    :host ::ng-deep .p-tabview .p-tabview-nav li {
      margin-right: 2px;
    }

    :host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link {
      background: transparent;
      border: none;
      color: var(--text-color-secondary);
      padding: 12px 16px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 4px 4px 0 0;
      transition: all 0.2s ease;
    }

    :host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link:hover {
      background: var(--surface-hover);
      color: var(--text-color);
    }

    :host ::ng-deep .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
      background: var(--primary-color);
      color: var(--primary-contrast);
      border-bottom: 2px solid var(--primary-dark);
    }

    :host ::ng-deep .p-tabview .p-tabview-panels {
      background: var(--surface-overlay);
      border: 1px solid var(--surface-border);
      border-top: none;
      border-radius: 0 0 6px 6px;
      padding: 1.5rem;
    }

    /* Scrollable tabs styling */
    :host ::ng-deep .p-tabview.p-tabview-scrollable .p-tabview-nav {
      overflow-x: auto;
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
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .support-sections {
        grid-template-columns: 1fr;
      }
      
      .controls-section {
        flex-direction: column;
      }
      
      .design-specs {
        grid-template-columns: 1fr;
      }

      :host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link {
        padding: 8px 12px;
        font-size: 13px;
      }
    }
  `]
})
export class TabsDocComponent {
  activeIndex: number = 0;
  
  specifications = [
    {
      component: 'Processor',
      specification: 'Intel Core i7-12700K',
      details: '12 cores, 20 threads, 3.6GHz base'
    },
    {
      component: 'Memory',
      specification: '32GB DDR4',
      details: '3200MHz, ECC supported'
    },
    {
      component: 'Storage',
      specification: '1TB NVMe SSD',
      details: 'PCIe 4.0, 7000MB/s read speed'
    },
    {
      component: 'Graphics',
      specification: 'NVIDIA RTX 4070',
      details: '12GB GDDR6X, Ray Tracing'
    },
    {
      component: 'Network',
      specification: 'Wi-Fi 6E + Ethernet',
      details: 'Gigabit connectivity options'
    }
  ];

  setActiveTab(index: number): void {
    this.activeIndex = index;
  }

  getActiveTabName(): string {
    const tabNames = ['Overview', 'Features', 'Specifications', 'Support'];
    return tabNames[this.activeIndex] || 'Unknown';
  }
}
