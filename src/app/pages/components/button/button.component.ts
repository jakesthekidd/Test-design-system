import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { FigmaButtonComponent } from '../../../figma-button.component';

@Component({
  selector: 'app-button-doc',
  standalone: true,
  imports: [CommonModule, CardModule, TabViewModule, FigmaButtonComponent],
  template: `
    <div class="component-documentation">
      <div class="doc-header">
        <h1>Button</h1>
        <p class="doc-description">
          Interactive buttons with multiple variants and states. Built to match Figma designs with exact spacing, 
          typography, and color specifications from the Lara Light design system.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="example-section">
            <h3>Severity Variants</h3>
            <p>Buttons support different severity levels for various use cases.</p>
            <div class="example-grid">
              <div class="example-item">
                <app-figma-button 
                  label="Primary" 
                  severity="primary"
                  leftIcon="heart" 
                  rightIcon="heart">
                </app-figma-button>
                <code class="example-code">severity="primary"</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="Secondary" 
                  severity="secondary"
                  leftIcon="star" 
                  rightIcon="star">
                </app-figma-button>
                <code class="example-code">severity="secondary"</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="Success" 
                  severity="success"
                  leftIcon="check" 
                  rightIcon="check">
                </app-figma-button>
                <code class="example-code">severity="success"</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="Info" 
                  severity="info"
                  leftIcon="info" 
                  rightIcon="info">
                </app-figma-button>
                <code class="example-code">severity="info"</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="Warning" 
                  severity="warning"
                  leftIcon="exclamation" 
                  rightIcon="exclamation">
                </app-figma-button>
                <code class="example-code">severity="warning"</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="Danger" 
                  severity="danger"
                  leftIcon="times" 
                  rightIcon="times">
                </app-figma-button>
                <code class="example-code">severity="danger"</code>
              </div>
            </div>
          </div>

          <div class="example-section">
            <h3>Icon Configurations</h3>
            <p>Buttons can have icons on the left, right, both sides, or no icons.</p>
            <div class="example-grid">
              <div class="example-item">
                <app-figma-button 
                  label="Left Icon" 
                  severity="primary"
                  leftIcon="arrow-left">
                </app-figma-button>
                <code class="example-code">leftIcon="arrow-left"</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="Right Icon" 
                  severity="primary"
                  rightIcon="arrow-right">
                </app-figma-button>
                <code class="example-code">rightIcon="arrow-right"</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="Both Icons" 
                  severity="primary"
                  leftIcon="star" 
                  rightIcon="star">
                </app-figma-button>
                <code class="example-code">leftIcon="star" rightIcon="star"</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="No Icons" 
                  severity="primary">
                </app-figma-button>
                <code class="example-code">No icon properties</code>
              </div>
            </div>
          </div>

          <div class="example-section">
            <h3>States</h3>
            <p>Button states including normal, hover, active, and disabled.</p>
            <div class="example-grid">
              <div class="example-item">
                <app-figma-button 
                  label="Normal" 
                  severity="primary"
                  leftIcon="play">
                </app-figma-button>
                <code class="example-code">Normal state</code>
              </div>
              <div class="example-item">
                <app-figma-button 
                  label="Disabled" 
                  severity="primary"
                  leftIcon="play"
                  [disabled]="true">
                </app-figma-button>
                <code class="example-code">disabled="true"</code>
              </div>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Code">
          <div class="code-section">
            <h3>Basic Usage</h3>
            <div class="code-block">
              <pre><code>&lt;app-figma-button 
  label="Button Text" 
  severity="primary"&gt;
&lt;/app-figma-button&gt;</code></pre>
            </div>

            <h3>With Icons</h3>
            <div class="code-block">
              <pre><code>&lt;app-figma-button 
  label="Save Changes" 
  severity="success"
  leftIcon="save"
  rightIcon="check"&gt;
&lt;/app-figma-button&gt;</code></pre>
            </div>

            <h3>Disabled State</h3>
            <div class="code-block">
              <pre><code>&lt;app-figma-button 
  label="Disabled Button" 
  severity="primary"
  [disabled]="true"&gt;
&lt;/app-figma-button&gt;</code></pre>
            </div>

            <h3>Component Import</h3>
            <div class="code-block">
              <pre><code>import {{ '{' }} FigmaButtonComponent {{ '}' }} from './figma-button.component';

&#64;Component({{ '{' }}
  // ...
  imports: [FigmaButtonComponent],
  // ...
{{ '}' }})</code></pre>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>Properties</h3>
            <div class="api-table">
              <div class="api-row api-header">
                <span class="api-prop">Property</span>
                <span class="api-type">Type</span>
                <span class="api-default">Default</span>
                <span class="api-desc">Description</span>
              </div>
              <div class="api-row">
                <span class="api-prop">label</span>
                <span class="api-type">string</span>
                <span class="api-default">'Button'</span>
                <span class="api-desc">Text displayed on the button</span>
              </div>
              <div class="api-row">
                <span class="api-prop">severity</span>
                <span class="api-type">'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'</span>
                <span class="api-default">'primary'</span>
                <span class="api-desc">Visual style variant of the button</span>
              </div>
              <div class="api-row">
                <span class="api-prop">leftIcon</span>
                <span class="api-type">string</span>
                <span class="api-default">undefined</span>
                <span class="api-desc">Font Awesome icon name for left side</span>
              </div>
              <div class="api-row">
                <span class="api-prop">rightIcon</span>
                <span class="api-type">string</span>
                <span class="api-default">undefined</span>
                <span class="api-desc">Font Awesome icon name for right side</span>
              </div>
              <div class="api-row">
                <span class="api-prop">disabled</span>
                <span class="api-type">boolean</span>
                <span class="api-default">false</span>
                <span class="api-desc">Whether the button is disabled</span>
              </div>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Design Specifications</h3>
            <p>Button design matches the exact Figma specifications:</p>
            
            <div class="spec-grid">
              <div class="spec-item">
                <h4>Dimensions</h4>
                <ul>
                  <li>Padding: 10.5px 17.5px</li>
                  <li>Border radius: 6px</li>
                  <li>Icon gap: 7px</li>
                  <li>Icon size: 14x14px</li>
                </ul>
              </div>
              <div class="spec-item">
                <h4>Typography</h4>
                <ul>
                  <li>Font: Inter</li>
                  <li>Weight: 700 (Bold)</li>
                  <li>Size: 14px</li>
                  <li>Line height: normal</li>
                </ul>
              </div>
              <div class="spec-item">
                <h4>Colors</h4>
                <ul>
                  <li>Primary: #2474BB</li>
                  <li>Primary Hover: #1D5D96</li>
                  <li>Primary Active: #164670</li>
                  <li>Text: #FFFFFF</li>
                </ul>
              </div>
              <div class="spec-item">
                <h4>Interaction</h4>
                <ul>
                  <li>Hover: Darker background</li>
                  <li>Active: Darkest background</li>
                  <li>Disabled: 60% opacity</li>
                  <li>Ripple effect on click</li>
                </ul>
              </div>
            </div>
          </div>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: [`
    .component-documentation {
      max-width: 1000px;
    }

    .doc-header {
      margin-bottom: 2rem;
    }

    .doc-header h1 {
      font-size: 2.5rem;
      color: var(--global-text-color);
      margin: 0 0 1rem 0;
      font-weight: 700;
    }

    .doc-description {
      font-size: 1.125rem;
      color: var(--global-text-secondary-color);
      line-height: 1.6;
      margin: 0;
    }

    .example-section {
      margin-bottom: 3rem;
    }

    .example-section h3 {
      color: var(--global-text-color);
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .example-section > p {
      color: var(--global-text-secondary-color);
      margin: 0 0 1.5rem 0;
    }

    .example-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .example-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      background-color: var(--surface-section);
    }

    .example-code {
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: var(--theme-primary-color);
      background-color: var(--surface-ground);
      padding: 0.5rem;
      border-radius: 4px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }

    .code-section h3 {
      color: var(--global-text-color);
      margin: 0 0 1rem 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .code-block {
      background-color: var(--surface-ground);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      margin-bottom: 2rem;
      overflow-x: auto;
    }

    .code-block pre {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;
    }

    .code-block code {
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: var(--global-text-color);
      line-height: 1.5;
    }

    .api-section h3 {
      color: var(--global-text-color);
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .api-table {
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      overflow: hidden;
    }

    .api-row {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr 3fr;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid var(--surface-border);
    }

    .api-row:last-child {
      border-bottom: none;
    }

    .api-header {
      background-color: var(--surface-section);
      font-weight: 600;
      color: var(--global-text-color);
    }

    .api-prop {
      font-family: 'Courier New', monospace;
      color: var(--theme-primary-color);
      font-weight: 600;
    }

    .api-type {
      font-family: 'Courier New', monospace;
      color: var(--global-text-secondary-color);
      font-size: 0.875rem;
    }

    .api-default {
      font-family: 'Courier New', monospace;
      color: var(--global-text-secondary-color);
      font-size: 0.875rem;
    }

    .api-desc {
      color: var(--global-text-color);
    }

    .design-section h3 {
      color: var(--global-text-color);
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .design-section > p {
      color: var(--global-text-secondary-color);
      margin: 0 0 2rem 0;
    }

    .spec-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .spec-item {
      background-color: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 1.5rem;
    }

    .spec-item h4 {
      color: var(--global-text-color);
      margin: 0 0 1rem 0;
      font-weight: 600;
    }

    .spec-item ul {
      margin: 0;
      padding-left: 1.5rem;
      color: var(--global-text-secondary-color);
    }

    .spec-item li {
      margin-bottom: 0.5rem;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .api-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }

      .example-grid {
        grid-template-columns: 1fr;
      }

      .spec-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ButtonDocComponent {}
