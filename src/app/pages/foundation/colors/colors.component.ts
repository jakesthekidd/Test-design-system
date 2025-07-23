import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, CardModule, TabViewModule],
  template: `
    <div class="colors-documentation">
      <div class="doc-header">
        <h1>Colors</h1>
        <p class="doc-description">
          Complete color palette and design tokens from the Lara Light design system. 
          All colors are available as CSS custom properties for consistent theming.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Primary Colors">
          <div class="color-section">
            <h3>Theme Colors</h3>
            <p>Primary theme colors used throughout the design system.</p>
            <div class="color-grid">
              <div class="color-card">
                <div class="color-swatch" style="background-color: var(--theme-primary-light-color)"></div>
                <div class="color-info">
                  <span class="color-name">Primary Light</span>
                  <span class="color-value">#D3E3F1</span>
                  <span class="color-var">--theme-primary-light-color</span>
                </div>
              </div>
              <div class="color-card">
                <div class="color-swatch" style="background-color: var(--theme-primary-color)"></div>
                <div class="color-info">
                  <span class="color-name">Primary</span>
                  <span class="color-value">#2474BB</span>
                  <span class="color-var">--theme-primary-color</span>
                </div>
              </div>
              <div class="color-card">
                <div class="color-swatch" style="background-color: var(--theme-primary-dark-color)"></div>
                <div class="color-info">
                  <span class="color-name">Primary Dark</span>
                  <span class="color-value">#1D5D96</span>
                  <span class="color-var">--theme-primary-dark-color</span>
                </div>
              </div>
              <div class="color-card">
                <div class="color-swatch" style="background-color: var(--theme-primary-darker-color)"></div>
                <div class="color-info">
                  <span class="color-name">Primary Darker</span>
                  <span class="color-value">#164670</span>
                  <span class="color-var">--theme-primary-darker-color</span>
                </div>
              </div>
            </div>

            <h3>Highlight Colors</h3>
            <div class="color-grid">
              <div class="color-card">
                <div class="color-swatch" style="background-color: var(--theme-highlight-background)"></div>
                <div class="color-info">
                  <span class="color-name">Highlight Background</span>
                  <span class="color-value">#E9F1F8</span>
                  <span class="color-var">--theme-highlight-background</span>
                </div>
              </div>
              <div class="color-card">
                <div class="color-swatch" style="background-color: var(--theme-highlight-color)"></div>
                <div class="color-info">
                  <span class="color-name">Highlight Color</span>
                  <span class="color-value">#2068A8</span>
                  <span class="color-var">--theme-highlight-color</span>
                </div>
              </div>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Color Scales">
          <div class="color-section">
            <h3>Blue Scale</h3>
            <div class="scale-grid">
              <div class="scale-item" *ngFor="let color of blueScale">
                <div class="scale-swatch" [style.background-color]="'var(--blue-' + color.shade + ')'"></div>
                <div class="scale-info">
                  <span class="scale-shade">{{ color.shade }}</span>
                  <span class="scale-value">{{ color.value }}</span>
                </div>
              </div>
            </div>

            <h3>Green Scale</h3>
            <div class="scale-grid">
              <div class="scale-item" *ngFor="let color of greenScale">
                <div class="scale-swatch" [style.background-color]="'var(--green-' + color.shade + ')'"></div>
                <div class="scale-info">
                  <span class="scale-shade">{{ color.shade }}</span>
                  <span class="scale-value">{{ color.value }}</span>
                </div>
              </div>
            </div>

            <h3>Red Scale</h3>
            <div class="scale-grid">
              <div class="scale-item" *ngFor="let color of redScale">
                <div class="scale-swatch" [style.background-color]="'var(--red-' + color.shade + ')'"></div>
                <div class="scale-info">
                  <span class="scale-shade">{{ color.shade }}</span>
                  <span class="scale-value">{{ color.value }}</span>
                </div>
              </div>
            </div>

            <h3>Surface Scale</h3>
            <div class="scale-grid">
              <div class="scale-item" *ngFor="let color of surfaceScale">
                <div class="scale-swatch" [style.background-color]="'var(--surface-' + color.shade + ')'"></div>
                <div class="scale-info">
                  <span class="scale-shade">{{ color.shade }}</span>
                  <span class="scale-value">{{ color.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Usage">
          <div class="usage-section">
            <h3>CSS Custom Properties</h3>
            <p>All colors are available as CSS custom properties. Use them in your styles:</p>
            
            <div class="code-example">
              <h4>In CSS</h4>
              <div class="code-block">
                <pre><code>.my-button {{ '{' }}
  background-color: var(--theme-primary-color);
  color: var(--theme-primary-contrast-color);
{{ '}' }}

.my-card {{ '{' }}
  background-color: var(--surface-card);
  border: 1px solid var(--surface-border);
{{ '}' }}</code></pre>
              </div>
            </div>

            <div class="code-example">
              <h4>In Angular Component Styles</h4>
              <div class="code-block">
                <pre><code>&#64;Component({{ '{' }}
  // ...
  styles: [\`
    .component {{ '{' }}
      background-color: var(--surface-section);
      color: var(--global-text-color);
    {{ '}' }}
  \`]
{{ '}' }})</code></pre>
              </div>
            </div>

            <h3>Color Guidelines</h3>
            <div class="guidelines-grid">
              <div class="guideline-card">
                <h4>Primary Colors</h4>
                <p>Use for main actions, links, and primary UI elements. The primary color should be the most prominent color in your interface.</p>
              </div>
              <div class="guideline-card">
                <h4>Surface Colors</h4>
                <p>Use for backgrounds, cards, and layout containers. These provide the foundation for your interface structure.</p>
              </div>
              <div class="guideline-card">
                <h4>Semantic Colors</h4>
                <p>Use green for success, red for errors/danger, yellow for warnings, and blue for informational messages.</p>
              </div>
              <div class="guideline-card">
                <h4>Text Colors</h4>
                <p>Use the text color hierarchy for readable content. Primary for headings, secondary for body text, muted for captions.</p>
              </div>
            </div>
          </div>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: [`
    .colors-documentation {
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

    .color-section h3 {
      color: var(--global-text-color);
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .color-section > p {
      color: var(--global-text-secondary-color);
      margin: 0 0 1.5rem 0;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .color-card {
      background-color: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      overflow: hidden;
    }

    .color-swatch {
      height: 80px;
      width: 100%;
    }

    .color-info {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .color-name {
      font-weight: 600;
      color: var(--global-text-color);
    }

    .color-value {
      font-family: 'Courier New', monospace;
      color: var(--global-text-secondary-color);
      font-size: 0.875rem;
    }

    .color-var {
      font-family: 'Courier New', monospace;
      color: var(--theme-primary-color);
      font-size: 0.75rem;
    }

    .scale-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .scale-item {
      background-color: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      overflow: hidden;
    }

    .scale-swatch {
      height: 60px;
      width: 100%;
    }

    .scale-info {
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      text-align: center;
    }

    .scale-shade {
      font-weight: 600;
      color: var(--global-text-color);
      font-size: 0.875rem;
    }

    .scale-value {
      font-family: 'Courier New', monospace;
      color: var(--global-text-secondary-color);
      font-size: 0.75rem;
    }

    .usage-section h3 {
      color: var(--global-text-color);
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .usage-section > p {
      color: var(--global-text-secondary-color);
      margin: 0 0 1.5rem 0;
    }

    .code-example {
      margin-bottom: 2rem;
    }

    .code-example h4 {
      color: var(--global-text-color);
      margin: 0 0 0.5rem 0;
      font-weight: 600;
    }

    .code-block {
      background-color: var(--surface-ground);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
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

    .guidelines-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .guideline-card {
      background-color: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 1.5rem;
    }

    .guideline-card h4 {
      color: var(--global-text-color);
      margin: 0 0 0.75rem 0;
      font-weight: 600;
    }

    .guideline-card p {
      color: var(--global-text-secondary-color);
      margin: 0;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .color-grid {
        grid-template-columns: 1fr;
      }

      .scale-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      }

      .guidelines-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ColorsComponent {
  blueScale = [
    { shade: '50', value: '#E9F1F8' },
    { shade: '100', value: '#D3E3F1' },
    { shade: '200', value: '#A7C7E4' },
    { shade: '300', value: '#7CACD6' },
    { shade: '400', value: '#5090C9' },
    { shade: '500', value: '#2474BB' },
    { shade: '600', value: '#2068A8' },
    { shade: '700', value: '#1D5D96' },
    { shade: '800', value: '#164670' },
    { shade: '900', value: '#0E2E4B' }
  ];

  greenScale = [
    { shade: '50', value: '#E5F9EA' },
    { shade: '100', value: '#CCF2D6' },
    { shade: '200', value: '#99E5AC' },
    { shade: '300', value: '#66D983' },
    { shade: '400', value: '#33CC59' },
    { shade: '500', value: '#00BF30' },
    { shade: '600', value: '#00AC2B' },
    { shade: '700', value: '#009926' },
    { shade: '800', value: '#00731D' },
    { shade: '900', value: '#004C13' }
  ];

  redScale = [
    { shade: '50', value: '#FBE9EA' },
    { shade: '100', value: '#F8D2D5' },
    { shade: '200', value: '#F0A5AB' },
    { shade: '300', value: '#E97980' },
    { shade: '400', value: '#E14C56' },
    { shade: '500', value: '#DA1F2C' },
    { shade: '600', value: '#C41C28' },
    { shade: '700', value: '#AE1923' },
    { shade: '800', value: '#83131A' },
    { shade: '900', value: '#570C12' }
  ];

  surfaceScale = [
    { shade: '0', value: '#ffffff' },
    { shade: '50', value: '#FBFCFC' },
    { shade: '100', value: '#F7F8F9' },
    { shade: '200', value: '#F3F5F7' },
    { shade: '300', value: '#EFF2F4' },
    { shade: '400', value: '#E2E6EB' },
    { shade: '500', value: '#C6CCD6' },
    { shade: '600', value: '#A9B3C2' },
    { shade: '700', value: '#8D9AAE' },
    { shade: '800', value: '#717B8B' },
    { shade: '900', value: '#5A626F' }
  ];
}
