import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavigationService, NavigationCategory, ComponentItem } from '../services/navigation.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="design-system-layout">
      <!-- Header -->
      <header class="ds-header">
        <div class="header-content">
          <div class="logo-section">
            <h1 class="logo" (click)="navigateHome()">
              <img src="https://cdn.builder.io/api/v1/image/assets%2Fcec1caf5d0d444ed91733b34b90309ff%2F1bc8e780dffe4479933cb79b22868862?format=webp&width=800" alt="Logo" class="logo-image">
              Design System
            </h1>
          </div>
          <div class="search-section">
            <div class="search-container">
              <i class="fas fa-search search-icon"></i>
              <input 
                type="text" 
                placeholder="Search components..."
                class="search-input"
                [(ngModel)]="searchQuery"
                (input)="onSearch($event)"
                (focus)="showSearchResults = true"
                (blur)="hideSearchResults()">
              <div class="search-results" *ngIf="showSearchResults && searchResults.length > 0">
                <div 
                  *ngFor="let result of searchResults" 
                  class="search-result-item"
                  (click)="navigateToComponent(result)">
                  <span class="result-name">{{ result.name }}</span>
                  <span class="result-description">{{ result.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="ds-content">
        <!-- Sidebar Navigation -->
        <nav class="ds-sidebar">
          <div class="sidebar-content">
            <div class="nav-section">
              <h3 class="section-title">Getting Started</h3>
              <ul class="nav-list">
                <li><a routerLink="/overview" routerLinkActive="active">Overview</a></li>
                <li><a routerLink="/installation" routerLinkActive="active">Installation</a></li>
              </ul>
            </div>

            <div class="nav-section" *ngFor="let category of categories">
              <h3 class="section-title">
                <i [class]="category.icon"></i>
                {{ category.name }}
              </h3>
              <ul class="nav-list">
                <li *ngFor="let component of category.components">
                  <a [routerLink]="component.route" routerLinkActive="active">
                    {{ component.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="ds-main">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .design-system-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--surface-ground);
    }

    /* Header */
    .ds-header {
      background-color: var(--surface-card);
      border-bottom: 1px solid var(--surface-border);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      margin: 0;
      color: var(--theme-primary-color);
      font-size: 1.5rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo i {
      font-size: 1.75rem;
    }

    .search-container {
      position: relative;
      width: 300px;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      font-size: 0.875rem;
      background-color: var(--surface-section);
      color: var(--global-text-color);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--theme-primary-color);
      box-shadow: 0 0 0 0.1rem var(--theme-primary-light-color);
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--global-text-secondary-color);
      font-size: 0.875rem;
    }

    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      margin-top: 0.25rem;
      max-height: 300px;
      overflow-y: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 1001;
    }

    .search-result-item {
      padding: 0.75rem;
      cursor: pointer;
      border-bottom: 1px solid var(--surface-border);
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .search-result-item:hover {
      background-color: var(--surface-hover);
    }

    .search-result-item:last-child {
      border-bottom: none;
    }

    .result-name {
      font-weight: 600;
      color: var(--global-text-color);
    }

    .result-description {
      font-size: 0.875rem;
      color: var(--global-text-secondary-color);
    }

    /* Content Area */
    .ds-content {
      flex: 1;
      display: flex;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    /* Sidebar */
    .ds-sidebar {
      width: 280px;
      background-color: var(--surface-card);
      border-right: 1px solid var(--surface-border);
      height: calc(100vh - 80px);
      overflow-y: auto;
      position: sticky;
      top: 80px;
    }

    .sidebar-content {
      padding: 1.5rem;
    }

    .nav-section {
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--global-text-color);
      margin: 0 0 0.75rem 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-list li {
      margin-bottom: 0.25rem;
    }

    .nav-list a {
      display: block;
      padding: 0.5rem 0.75rem;
      color: var(--global-text-secondary-color);
      text-decoration: none;
      border-radius: 4px;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .nav-list a:hover {
      background-color: var(--surface-hover);
      color: var(--global-text-color);
    }

    .nav-list a.active {
      background-color: var(--theme-highlight-background);
      color: var(--theme-highlight-color);
      font-weight: 600;
    }

    /* Main Content */
    .ds-main {
      flex: 1;
      padding: 2rem;
      background-color: var(--surface-ground);
    }

    @media (max-width: 768px) {
      .ds-sidebar {
        position: fixed;
        left: -280px;
        top: 80px;
        z-index: 999;
        transition: left 0.3s ease;
      }

      .ds-sidebar.open {
        left: 0;
      }

      .ds-main {
        padding: 1rem;
      }

      .header-content {
        padding: 0 1rem;
      }

      .search-container {
        width: 200px;
      }
    }
  `]
})
export class LayoutComponent implements OnInit {
  categories: NavigationCategory[] = [];
  searchQuery: string = '';
  searchResults: ComponentItem[] = [];
  showSearchResults: boolean = false;

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories = this.navigationService.getCategories();
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.searchQuery = query;
    
    if (query.length > 0) {
      this.searchResults = this.navigationService.searchComponents(query);
      this.showSearchResults = true;
    } else {
      this.searchResults = [];
      this.showSearchResults = false;
    }
  }

  navigateToComponent(component: ComponentItem) {
    this.router.navigate([component.route]);
    this.showSearchResults = false;
    this.searchQuery = '';
  }

  navigateHome() {
    this.router.navigate(['/overview']);
  }

  hideSearchResults() {
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }
}
