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
            <h3>Button Component</h3>
            <p-button label="Primary Button" class="p-mr-2"></p-button>
            <p-button label="Secondary" severity="secondary" class="p-mr-2"></p-button>
            <p-button label="Success" severity="success"></p-button>
          </div>

          <div class="demo-section">
            <h3>Input Component</h3>
            <span class="p-float-label">
              <input id="username" type="text" pInputText />
              <label for="username">Username</label>
            </span>
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

    /* Custom button styling using design tokens */
    :host ::ng-deep .p-button.p-button-primary {
      background-color: var(--primary-500);
      border-color: var(--primary-500);
    }

    :host ::ng-deep .p-button.p-button-primary:hover {
      background-color: var(--primary-600);
      border-color: var(--primary-600);
    }

    :host ::ng-deep .p-button.p-button-success {
      background-color: var(--green-500);
      border-color: var(--green-500);
    }

    :host ::ng-deep .p-inputtext {
      border-color: var(--surface-border);
    }

    :host ::ng-deep .p-inputtext:focus {
      border-color: var(--primary-500);
      box-shadow: 0 0 0 0.1rem var(--primary-50);
    }
  `]
})
export class AppComponent {
  sampleData = [
    { name: 'John Doe', role: 'Developer', status: 'Active' },
    { name: 'Jane Smith', role: 'Designer', status: 'Active' },
    { name: 'Bob Johnson', role: 'Manager', status: 'Inactive' }
  ];
}
