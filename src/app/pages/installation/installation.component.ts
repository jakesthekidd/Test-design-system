import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { FigmaButtonComponent } from '../../figma-button.component';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [CommonModule, CardModule, TabViewModule, FigmaButtonComponent],
  template: `
    <div class="installation-documentation">
      <div class="doc-header">
        <h1>Installation & Setup</h1>
        <p class="doc-description">
          Get started with our design system in your Angular application. 
          Follow these steps to integrate the complete Lara Light design system.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Quick Start">
          <div class="installation-section">
            <h3>Prerequisites</h3>
            <p>Ensure you have the following installed:</p>
            <ul class="requirements-list">
              <li>Angular 17+ (standalone components)</li>
              <li>Node.js 18+ and npm</li>
              <li>PrimeNG 17+</li>
            </ul>

            <h3>Step 1: Install Dependencies</h3>
            <div class="code-block">
              <pre><code># Install PrimeNG and PrimeIcons
npm install primeng primeicons

# Install Font Awesome (for icons)
npm install &#64;fortawesome/fontawesome-free

# Install Inter font (Google Fonts CDN recommended)</code></pre>
            </div>

            <h3>Step 2: Add Stylesheets</h3>
            <p>Add these imports to your <code>src/styles.css</code>:</p>
            <div class="code-block">
              <pre><code>/* Design System Imports */
&#64;import "lara-light-tokens.css";
&#64;import "primeng/resources/themes/lara-light-blue/theme.css";
&#64;import "primeng/resources/primeng.css";
&#64;import "primeicons/primeicons.css";
&#64;import "lara-light-overrides.css";

/* Font Imports */
&#64;import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
&#64;import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

body {{ '{' }}
  margin: 0;
  font-family: Inter, Roboto, -apple-system, sans-serif;
  background-color: var(--surface-ground);
  color: var(--global-text-color);
{{ '}' }}</code></pre>
            </div>

            <h3>Step 3: Copy Design System Files</h3>
            <p>Copy these files to your <code>src/</code> directory:</p>
            <ul class="file-list">
              <li><code>lara-light-tokens.css</code> - Color tokens and design variables</li>
              <li><code>lara-light-overrides.css</code> - Component style overrides</li>
              <li><code>figma-button.component.ts</code> - Custom button component</li>
            </ul>

            <h3>Step 4: Test Installation</h3>
            <p>Try using a component in your app:</p>
            <div class="code-block">
              <pre><code>import {{ '{' }} FigmaButtonComponent {{ '}' }} from './figma-button.component';

@Component({{ '{' }}
  selector: 'app-test',
  standalone: true,
  imports: [FigmaButtonComponent],
  template: \`
    &lt;app-figma-button 
      label="Test Button" 
      severity="primary"&gt;
    &lt;/app-figma-button&gt;
  \`
{{ '}' }})
export class TestComponent {{ '{' }} {{ '}' }}</code></pre>
            </div>

            <div class="test-example">
              <h4>Example Result:</h4>
              <app-figma-button 
                label="Test Button" 
                severity="primary"
                leftIcon="check">
              </app-figma-button>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Configuration">
          <div class="configuration-section">
            <h3>Angular Configuration</h3>
            <p>Update your <code>angular.json</code> for optimal builds:</p>
            <div class="code-block">
              <pre><code>{{ '{' }}
  "projects": {{ '{' }}
    "your-app": {{ '{' }}
      "architect": {{ '{' }}
        "build": {{ '{' }}
          "options": {{ '{' }}
            "styles": [
              "src/styles.css"
            ],
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {{ '{' }}
                "glob": "**/*",
                "input": "node_modules/primeicons/",
                "output": "./assets/primeicons/"
              {{ '}' }}
            ]
          {{ '}' }}
        {{ '}' }}
      {{ '}' }}
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
            </div>

            <h3>TypeScript Configuration</h3>
            <p>Ensure your <code>tsconfig.json</code> includes:</p>
            <div class="code-block">
              <pre><code>{{ '{' }}
  "compilerOptions": {{ '{' }}
    "target": "ES2022",
    "module": "ES2022",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  {{ '}' }}
{{ '}' }}</code></pre>
            </div>

            <h3>Environment Variables</h3>
            <p>Optional environment configuration for theming:</p>
            <div class="code-block">
              <pre><code>// environment.ts
export const environment = {{ '{' }}
  production: false,
  theme: {{ '{' }}
    primary: '#2474BB',
    fontFamily: 'Inter, sans-serif'
  {{ '}' }}
{{ '}' }};</code></pre>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Customization">
          <div class="customization-section">
            <h3>Custom Themes</h3>
            <p>Override design tokens to create custom themes:</p>
            <div class="code-block">
              <pre><code>/* custom-theme.css */
:root {{ '{' }}
  /* Override primary colors */
  --theme-primary-color: #your-color;
  --theme-primary-dark-color: #your-dark-color;
  --theme-primary-light-color: #your-light-color;
  
  /* Override surface colors */
  --surface-ground: #your-background;
  --surface-card: #your-card-background;
{{ '}' }}</code></pre>
            </div>

            <h3>Component Overrides</h3>
            <p>Override specific component styles:</p>
            <div class="code-block">
              <pre><code>/* Override button styles */
.figma-button.primary {{ '{' }}
  background-color: var(--my-custom-primary);
  border-radius: 12px; /* Custom border radius */
{{ '}' }}

/* Override PrimeNG components */
.p-card {{ '{' }}
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
{{ '}' }}</code></pre>
            </div>

            <h3>Dark Mode Support</h3>
            <p>Add dark mode by overriding tokens:</p>
            <div class="code-block">
              <pre><code>[data-theme="dark"] {{ '{' }}
  --surface-ground: #1a1a1a;
  --surface-card: #2a2a2a;
  --surface-border: #404040;
  --global-text-color: #ffffff;
  --global-text-secondary-color: #cccccc;
{{ '}' }}</code></pre>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Troubleshooting">
          <div class="troubleshooting-section">
            <h3>Common Issues</h3>
            
            <div class="issue-card">
              <h4>Styles not loading</h4>
              <p><strong>Problem:</strong> Design system styles are not applied</p>
              <p><strong>Solution:</strong> Ensure correct import order in styles.css:</p>
              <div class="code-block">
                <pre><code>/* Correct order */
@import "lara-light-tokens.css";        /* 1. Tokens first */
@import "primeng/resources/themes/..."; /* 2. PrimeNG theme */
@import "primeng/resources/primeng.css"; /* 3. PrimeNG styles */
@import "lara-light-overrides.css";     /* 4. Overrides last */</code></pre>
              </div>
            </div>

            <div class="issue-card">
              <h4>Icons not displaying</h4>
              <p><strong>Problem:</strong> Font Awesome icons show as squares</p>
              <p><strong>Solutions:</strong></p>
              <ul>
                <li>Verify Font Awesome CDN link in index.html</li>
                <li>Check icon names (use 'heart' not 'fa-heart')</li>
                <li>Ensure FontAwesome CSS loads before components</li>
              </ul>
            </div>

            <div class="issue-card">
              <h4>Component import errors</h4>
              <p><strong>Problem:</strong> Cannot import FigmaButtonComponent</p>
              <p><strong>Solution:</strong> Ensure file is in correct location and exported:</p>
              <div class="code-block">
                <pre><code>// figma-button.component.ts
export class FigmaButtonComponent {{ '{' }} ... {{ '}' }}

// app.component.ts
import {{ '{' }} FigmaButtonComponent {{ '}' }} from './figma-button.component';</code></pre>
              </div>
            </div>

            <h3>Performance Tips</h3>
            <ul class="tips-list">
              <li>Use lazy loading for component documentation pages</li>
              <li>Import only required PrimeNG modules</li>
              <li>Optimize Font Awesome by loading only needed icons</li>
              <li>Use CSS custom properties for better theming performance</li>
            </ul>
          </div>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: [`
    .installation-documentation {
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

    .installation-section h3,
    .configuration-section h3,
    .customization-section h3,
    .troubleshooting-section h3 {
      color: var(--global-text-color);
      margin: 2rem 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .installation-section h3:first-child {
      margin-top: 0;
    }

    .installation-section p,
    .configuration-section p,
    .customization-section p,
    .troubleshooting-section p {
      color: var(--global-text-secondary-color);
      margin: 0 0 1rem 0;
      line-height: 1.6;
    }

    .requirements-list,
    .file-list,
    .tips-list {
      color: var(--global-text-secondary-color);
      margin: 0 0 1.5rem 0;
      padding-left: 1.5rem;
    }

    .requirements-list li,
    .file-list li,
    .tips-list li {
      margin-bottom: 0.5rem;
    }

    .file-list code,
    p code {
      background-color: var(--surface-ground);
      color: var(--theme-primary-color);
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
    }

    .code-block {
      background-color: var(--surface-ground);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      margin: 1rem 0 2rem 0;
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

    .test-example {
      background-color: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .test-example h4 {
      color: var(--global-text-color);
      margin: 0 0 1rem 0;
      font-weight: 600;
    }

    .issue-card {
      background-color: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
    }

    .issue-card h4 {
      color: var(--global-text-color);
      margin: 0 0 0.75rem 0;
      font-weight: 600;
    }

    .issue-card p {
      margin: 0 0 0.75rem 0;
    }

    .issue-card p:last-child {
      margin-bottom: 0;
    }

    .issue-card ul {
      margin: 0.5rem 0 0 0;
      padding-left: 1.5rem;
    }

    .issue-card li {
      margin-bottom: 0.25rem;
      color: var(--global-text-secondary-color);
    }

    @media (max-width: 768px) {
      .code-block {
        margin: 1rem -1rem 2rem -1rem;
        border-radius: 0;
      }

      .test-example {
        margin: 2rem -1rem;
        border-radius: 0;
      }

      .issue-card {
        margin: 1.5rem -1rem;
        border-radius: 0;
      }
    }
  `]
})
export class InstallationComponent {}
