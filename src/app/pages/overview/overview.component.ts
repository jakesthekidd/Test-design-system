import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { FigmaButtonComponent } from '../../figma-button.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, FigmaButtonComponent],
  template: `
    <div class="overview-container">
      <div class="hero-section">
        <h1 class="page-title">Design System</h1>
        <p class="page-subtitle">
          A comprehensive component library built with Angular and PrimeNG, 
          featuring the complete Lara Light design system with exact Figma specifications.
        </p>
        <div class="hero-actions">
          <app-figma-button 
            label="Get Started" 
            severity="primary" 
            rightIcon="arrow-right"
            (click)="navigateToInstallation()">
          </app-figma-button>
          <app-figma-button 
            label="View Components" 
            severity="secondary" 
            rightIcon="cube"
            (click)="navigateToComponents()">
          </app-figma-button>
        </div>
      </div>

      <div class="features-grid">
        <p-card header="🎨 Design Tokens" class="feature-card">
          <p>Complete implementation of the Lara Light design system with all color primitives, typography scales, and spacing tokens.</p>
          <a routerLink="/foundation/colors" class="feature-link">Explore Colors →</a>
        </p-card>

        <p-card header="🧩 Components" class="feature-card">
          <p>Production-ready components that match Figma designs pixel-perfectly with proper responsive behavior.</p>
          <a routerLink="/components/button" class="feature-link">View Components →</a>
        </p-card>

        <p-card header="📖 Documentation" class="feature-card">
          <p>Comprehensive usage guidelines, code examples, and implementation patterns for every component.</p>
          <a routerLink="/installation" class="feature-link">Read Docs →</a>
        </p-card>

        <p-card header="🔍 Searchable" class="feature-card">
          <p>Quickly find any component or design token with our built-in search functionality.</p>
          <span class="feature-link">Try searching above ↗</span>
        </p-card>
      </div>

      <div class="quick-preview">
        <h2>Quick Preview</h2>
        <p>Here's a taste of our Figma-perfect button components:</p>
        <div class="button-showcase">
          <app-figma-button 
            label="Primary" 
            severity="primary" 
            leftIcon="heart" 
            rightIcon="heart">
          </app-figma-button>
          <app-figma-button 
            label="Success" 
            severity="success" 
            leftIcon="check" 
            rightIcon="check">
          </app-figma-button>
          <app-figma-button 
            label="Warning" 
            severity="warning" 
            leftIcon="exclamation" 
            rightIcon="exclamation">
          </app-figma-button>
          <app-figma-button 
            label="Danger" 
            severity="danger" 
            leftIcon="times" 
            rightIcon="times">
          </app-figma-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overview-container {
      max-width: 1000px;
      margin: 0 auto;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 4rem;
      padding: 3rem 0;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--theme-primary-color);
      margin: 0 0 1rem 0;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-primary-dark-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .page-subtitle {
      font-size: 1.25rem;
      color: var(--global-text-secondary-color);
      margin: 0 0 2rem 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .feature-card {
      height: 100%;
      border: 1px solid var(--surface-border);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .feature-link {
      color: var(--theme-primary-color);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      display: inline-block;
      margin-top: 1rem;
    }

    .feature-link:hover {
      color: var(--theme-primary-dark-color);
    }

    .quick-preview {
      background-color: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
    }

    .quick-preview h2 {
      color: var(--global-text-color);
      margin: 0 0 0.5rem 0;
    }

    .quick-preview p {
      color: var(--global-text-secondary-color);
      margin: 0 0 2rem 0;
    }

    .button-showcase {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class OverviewComponent {
  navigateToInstallation() {
    // This could navigate to installation page
    console.log('Navigate to installation');
  }

  navigateToComponents() {
    // This could navigate to components page
    console.log('Navigate to components');
  }
}
