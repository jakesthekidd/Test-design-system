import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    ButtonModule, 
    CardModule, 
    InputTextModule,
    TableModule
  ],
  template: `
    <div class="app-container">
      <p-card header="PrimeNG Demo" class="demo-card">
        <div class="content-section">
          <h2>Welcome to Angular with PrimeNG!</h2>
          <p>PrimeNG has been successfully imported and configured.</p>
          
          <div class="demo-section">
            <h3>Button Components</h3>
            <div class="button-group">
              <p-button label="Primary" severity="primary"></p-button>
              <p-button label="Secondary" severity="secondary"></p-button>
              <p-button label="Success" severity="success"></p-button>
              <p-button label="Info" severity="info"></p-button>
              <p-button label="Warning" severity="warning"></p-button>
              <p-button label="Danger" severity="danger"></p-button>
            </div>
          </div>

          <div class="demo-section">
            <h3>Input Components</h3>
            <div class="input-section">
              <span class="p-float-label">
                <input id="username" type="text" pInputText />
                <label for="username">Username</label>
              </span>
            </div>
          </div>

          <div class="demo-section">
            <h3>Table Component</h3>
            <p-table [value]="sampleData" [tableStyle]="{'min-width': '50rem'}">
              <ng-template pTemplate="header">
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </ng-template>
              <ng-template pTemplate="body" let-item>
                <tr>
                  <td>{{item.name}}</td>
                  <td>{{item.role}}</td>
                  <td>{{item.status}}</td>
                </tr>
              </ng-template>
            </p-table>
          </div>

          <div class="demo-section">
            <h3>Design Tokens Showcase</h3>
            <div class="color-palette">
              <div class="color-group">
                <h4>Surface Colors</h4>
                <div class="color-swatches">
                  <div class="color-swatch surface-ground">Ground</div>
                  <div class="color-swatch surface-section">Section</div>
                  <div class="color-swatch surface-card">Card</div>
                  <div class="color-swatch surface-hover">Hover</div>
                </div>
              </div>
              <div class="color-group">
                <h4>Primary Scale</h4>
                <div class="color-swatches">
                  <div class="color-swatch primary-50">50</div>
                  <div class="color-swatch primary-200">200</div>
                  <div class="color-swatch primary-500">500</div>
                  <div class="color-swatch primary-700">700</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </p-card>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(--surface-ground);
    }

    .demo-card {
      margin-bottom: 2rem;
      background-color: var(--surface-card);
      border: 1px solid var(--surface-border);
    }

    .content-section h2 {
      color: var(--text-color);
      margin-bottom: 1rem;
    }

    .demo-section {
      margin: 2rem 0;
      padding: 1.5rem;
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      background-color: var(--surface-section);
      transition: background-color 0.2s ease;
    }

    .demo-section:hover {
      background-color: var(--surface-hover);
    }

    .demo-section h3 {
      margin-top: 0;
      color: var(--text-color-secondary);
      font-weight: 600;
    }

    .button-group {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .input-section {
      max-width: 300px;
    }

    .p-float-label {
      margin-top: 1.5rem;
    }

    /* Custom button styling using theme tokens */
    :host ::ng-deep .p-button.p-button-primary {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--primary-contrast);
    }

    :host ::ng-deep .p-button.p-button-primary:hover {
      background-color: var(--primary-dark);
      border-color: var(--primary-dark);
    }

    :host ::ng-deep .p-button.p-button-primary:active {
      background-color: var(--primary-darker);
      border-color: var(--primary-darker);
    }

    :host ::ng-deep .p-button.p-button-success {
      background-color: var(--green-500);
      border-color: var(--green-500);
    }

    :host ::ng-deep .p-inputtext {
      border-color: var(--surface-border);
    }

    :host ::ng-deep .p-inputtext:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 0.1rem var(--primary-light);
    }

    /* Color showcase styles */
    .color-palette {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .color-group h4 {
      margin: 0 0 1rem 0;
      color: var(--text-color);
      font-weight: 600;
    }

    .color-swatches {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 0.75rem;
    }

    .color-swatch {
      padding: 1rem 0.5rem;
      text-align: center;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid var(--surface-border);
      color: var(--text-color);
    }

    .surface-ground { background-color: var(--surface-ground); }
    .surface-section { background-color: var(--surface-section); }
    .surface-card { background-color: var(--surface-card); }
    .surface-hover { background-color: var(--surface-hover); }

    .primary-50 { background-color: var(--primary-50); }
    .primary-200 { background-color: var(--primary-200); }
    .primary-500 { background-color: var(--primary-500); color: white; }
    .primary-700 { background-color: var(--primary-700); color: white; }
  `]
})
export class AppComponent {
  sampleData = [
    { name: 'John Doe', role: 'Developer', status: 'Active' },
    { name: 'Jane Smith', role: 'Designer', status: 'Active' },
    { name: 'Bob Johnson', role: 'Manager', status: 'Inactive' }
  ];
}
