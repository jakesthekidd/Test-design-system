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
    }

    .demo-card {
      margin-bottom: 2rem;
    }

    .content-section h2 {
      color: #495057;
      margin-bottom: 1rem;
    }

    .demo-section {
      margin: 2rem 0;
      padding: 1rem;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      background-color: #f8f9fa;
    }

    .demo-section h3 {
      margin-top: 0;
      color: #6c757d;
    }

    .p-mr-2 {
      margin-right: 0.5rem;
    }

    .p-float-label {
      margin-top: 1rem;
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
