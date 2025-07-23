import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

export interface DocumentItem {
  id: string;
  title: string;
  collapsed: boolean;
  data: {
    field: string;
    expected: string;
    evaluated: string;
  };
}

@Component({
  selector: 'app-wfai-approved-container-doc',
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
        <h1>WFAI Approved Container</h1>
        <p class="component-description">
          A semi-custom container component using PrimeNG panels for hierarchical document approval workflows.
          Features nested expandable panels with integrated data tables for document management.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic WFAI Approved Container</h3>
            <div class="example-container">
              <div class="wfai-approved-container">
                <!-- Outer Approved Container -->
                <p-panel [toggleable]="true" [collapsed]="outerCollapsed" (onAfterToggle)="onOuterToggle($event)" [attr.data-collapsed]="outerCollapsed">
                  <ng-template pTemplate="header">
                    <div class="wfai-header-content" (click)="toggleOuter()">
                      <div class="header-left">
                        <i class="chevron-icon fa-solid" 
                           [class.fa-angle-right]="outerCollapsed"
                           [class.fa-angle-down]="!outerCollapsed"></i>
                        <i class="fa-solid fa-circle-check approved-icon"></i>
                        <span class="container-title">Approved</span>
                        <span class="document-count">({{ getDocumentCount() }})</span>
                      </div>
                      <i class="fa-solid fa-ellipsis-vertical menu-icon"></i>
                    </div>
                  </ng-template>
                  
                  <div class="container-content">
                    <!-- Document Separator -->
                    <div class="separator"></div>
                    
                    <!-- Nested Document Panels -->
                    <div class="document-panels">
                      <div class="document-panel" *ngFor="let doc of documents; let i = index">
                        <p-panel [toggleable]="true" [collapsed]="doc.collapsed" (onAfterToggle)="onDocumentToggle(doc.id, $event)" [attr.data-collapsed]="doc.collapsed">
                          <ng-template pTemplate="header">
                            <div class="document-header-content" (click)="toggleDocument(doc.id)">
                              <div class="document-header-left">
                                <i class="chevron-icon fa-solid" 
                                   [class.fa-angle-right]="doc.collapsed"
                                   [class.fa-angle-down]="!doc.collapsed"></i>
                                <span class="document-title" [class.document-title-active]="!doc.collapsed">{{ doc.title }}</span>
                              </div>
                              <i class="fa-solid fa-ellipsis-vertical menu-icon"></i>
                            </div>
                          </ng-template>
                          
                          <!-- Document Table Content -->
                          <div class="document-table-container">
                            <table class="document-table">
                              <tbody>
                                <tr *ngIf="doc.id === 'invoice'">
                                  <td class="field-label">Total</td>
                                  <td class="field-expected">
                                    <div class="field-value-with-range">
                                      <span class="main-value">$900</span>
                                      <div class="range-text">
                                        <span class="range-label">Range:</span>
                                        <span class="range-value">$800 -$900</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="field-evaluated">
                                    <div class="evaluated-cell">
                                      <span>$900</span>
                                      <i class="fa-solid fa-circle-check check-icon"></i>
                                    </div>
                                  </td>
                                </tr>
                                <tr *ngIf="doc.id === 'invoice'">
                                  <td class="field-label">Carrier</td>
                                  <td class="field-expected">Swift</td>
                                  <td class="field-evaluated">
                                    <div class="evaluated-cell">
                                      <span>Swift</span>
                                      <i class="fa-solid fa-circle-check check-icon"></i>
                                    </div>
                                  </td>
                                </tr>
                                <tr *ngIf="doc.id === 'invoice'">
                                  <td class="field-label">Total</td>
                                  <td class="field-expected">RTS</td>
                                  <td class="field-evaluated">
                                    <div class="evaluated-cell">
                                      <span>RTS</span>
                                      <i class="fa-solid fa-circle-check check-icon"></i>
                                    </div>
                                  </td>
                                </tr>
                                <tr *ngIf="doc.id === 'invoice'">
                                  <td class="field-label">Total</td>
                                  <td class="field-expected"></td>
                                  <td class="field-evaluated">
                                    <div class="evaluated-cell-invalid">
                                      <i class="fa-solid fa-not-equal invalid-icon"></i>
                                    </div>
                                  </td>
                                </tr>
                                <tr *ngIf="doc.id !== 'invoice'">
                                  <td class="field-label">{{ doc.data.field }}</td>
                                  <td class="field-expected">{{ doc.data.expected }}</td>
                                  <td class="field-evaluated">
                                    <div class="evaluated-cell">
                                      <span>{{ doc.data.evaluated }}</span>
                                      <i class="fa-solid fa-circle-check check-icon"></i>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </p-panel>
                      </div>
                    </div>
                  </div>
                </p-panel>
              </div>
            </div>

            <h3>Different States Example</h3>
            <div class="example-container">
              <div class="states-demo">
                <div class="state-example">
                  <h4>Closed State</h4>
                  <div class="wfai-approved-container">
                    <p-panel [toggleable]="true" [collapsed]="true">
                      <ng-template pTemplate="header">
                        <div class="wfai-header-content">
                          <div class="header-left">
                            <i class="chevron-icon fa-solid fa-angle-right"></i>
                            <i class="fa-solid fa-circle-check approved-icon"></i>
                            <span class="container-title">Approved</span>
                            <span class="document-count">(1)</span>
                          </div>
                          <i class="fa-solid fa-ellipsis-vertical menu-icon"></i>
                        </div>
                      </ng-template>
                    </p-panel>
                  </div>
                </div>

                <div class="state-example">
                  <h4>Hover State</h4>
                  <div class="wfai-approved-container">
                    <p-panel [toggleable]="true" [collapsed]="true">
                      <ng-template pTemplate="header">
                        <div class="wfai-header-content hover-state">
                          <div class="header-left">
                            <i class="chevron-icon fa-solid fa-angle-right"></i>
                            <i class="fa-solid fa-circle-check approved-icon"></i>
                            <span class="container-title">Approved</span>
                            <span class="document-count">(1)</span>
                          </div>
                          <i class="fa-solid fa-ellipsis-vertical menu-icon"></i>
                        </div>
                      </ng-template>
                    </p-panel>
                  </div>
                </div>
              </div>
            </div>

            <h3>Interactive Controls</h3>
            <div class="example-container">
              <div class="controls-section">
                <p-button label="Expand All" (click)="expandAll()" severity="secondary" size="small"></p-button>
                <p-button label="Collapse All" (click)="collapseAll()" severity="secondary" size="small"></p-button>
                <p-button label="Add Document" (click)="addDocument()" severity="info" size="small"></p-button>
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

            <h3>Basic WFAI Container Structure</h3>
            <pre><code>&lt;div class="wfai-approved-container"&gt;
  &lt;p-panel [toggleable]="true" [collapsed]="outerCollapsed"&gt;
    &lt;ng-template pTemplate="header"&gt;
      &lt;div class="wfai-header-content" (click)="toggleOuter()"&gt;
        &lt;div class="header-left"&gt;
          &lt;i class="chevron-icon fa-solid fa-angle-right"&gt;&lt;/i&gt;
          &lt;i class="fa-solid fa-circle-check approved-icon"&gt;&lt;/i&gt;
          &lt;span class="container-title"&gt;Approved&lt;/span&gt;
          &lt;span class="document-count"&gt;(3)&lt;/span&gt;
        &lt;/div&gt;
        &lt;i class="fa-solid fa-ellipsis-vertical menu-icon"&gt;&lt;/i&gt;
      &lt;/div&gt;
    &lt;/ng-template&gt;

    &lt;div class="container-content"&gt;
      &lt;!-- Nested document panels --&gt;
    &lt;/div&gt;
  &lt;/p-panel&gt;
&lt;/div&gt;</code></pre>

            <h3>Nested Document Panel</h3>
            <pre><code>&lt;p-panel [toggleable]="true" [collapsed]="documentItem.collapsed"&gt;
  &lt;ng-template pTemplate="header"&gt;
    &lt;div class="document-header-content"&gt;
      &lt;div class="document-header-left"&gt;
        &lt;i class="chevron-icon fa-solid fa-angle-right"&gt;&lt;/i&gt;
        &lt;span class="document-title"&gt;Document Title&lt;/span&gt;
      &lt;/div&gt;
      &lt;i class="fa-solid fa-ellipsis-vertical menu-icon"&gt;&lt;/i&gt;
    &lt;/div&gt;
  &lt;/ng-template&gt;
  
  &lt;div class="document-table-container"&gt;
    &lt;table class="document-table"&gt;
      &lt;tbody&gt;
        &lt;tr&gt;
          &lt;td class="field-label"&gt;BOL #&lt;/td&gt;
          &lt;td class="field-expected"&gt;987654321&lt;/td&gt;
          &lt;td class="field-evaluated"&gt;
            &lt;div class="evaluated-cell"&gt;
              &lt;span&gt;987654321&lt;/span&gt;
              &lt;i class="fa-solid fa-circle-check check-icon"&gt;&lt;/i&gt;
            &lt;/div&gt;
          &lt;/td&gt;
        &lt;/tr&gt;
      &lt;/tbody&gt;
    &lt;/table&gt;
  &lt;/div&gt;
&lt;/p-panel&gt;</code></pre>

            <h3>Component Logic</h3>
            <pre><code>export class WFAIApprovedContainerComponent &#123;
  outerCollapsed = false;
  
  documents: DocumentItem[] = [
    &#123;
      id: 'fuel-receipt',
      title: 'Fuel Receipt',
      collapsed: true,
      data: &#123; field: 'BOL #', expected: '987654321', evaluated: '987654321' &#125;
    &#125;,
    // ... more documents
  ];

  toggleOuter(): void &#123;
    this.outerCollapsed = !this.outerCollapsed;
  &#125;

  toggleDocument(docId: string): void &#123;
    const doc = this.documents.find(d =&gt; d.id === docId);
    if (doc) doc.collapsed = !doc.collapsed;
  &#125;
&#125;</code></pre>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>Component Properties</h3>
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
                    <td>outerCollapsed</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Controls the main container collapse state</td>
                  </tr>
                  <tr>
                    <td>documents</td>
                    <td>DocumentItem[]</td>
                    <td>[]</td>
                    <td>Array of document items to display</td>
                  </tr>
                  <tr>
                    <td>title</td>
                    <td>string</td>
                    <td>'Approved'</td>
                    <td>Main container title</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>DocumentItem Interface</h3>
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
                    <td>id</td>
                    <td>string</td>
                    <td>Unique identifier for the document</td>
                  </tr>
                  <tr>
                    <td>title</td>
                    <td>string</td>
                    <td>Display title for the document panel</td>
                  </tr>
                  <tr>
                    <td>collapsed</td>
                    <td>boolean</td>
                    <td>Whether the document panel is collapsed</td>
                  </tr>
                  <tr>
                    <td>data</td>
                    <td>object</td>
                    <td>Table data with field, expected, and evaluated values</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Methods</h3>
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
                    <td>toggleOuter</td>
                    <td>-</td>
                    <td>Toggles the main container collapsed state</td>
                  </tr>
                  <tr>
                    <td>toggleDocument</td>
                    <td>docId: string</td>
                    <td>Toggles a specific document panel</td>
                  </tr>
                  <tr>
                    <td>expandAll</td>
                    <td>-</td>
                    <td>Expands all panels</td>
                  </tr>
                  <tr>
                    <td>collapseAll</td>
                    <td>-</td>
                    <td>Collapses all panels</td>
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
                <strong>Container Structure</strong>
                <ul>
                  <li>Outer container with "Approved" title and count</li>
                  <li>Nested document panels inside</li>
                  <li>Left-aligned chevron icons</li>
                  <li>Right-aligned ellipsis menu icons</li>
                  <li>Clean borders and rounded corners</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Visual States</strong>
                <ul>
                  <li>Closed: Right-pointing chevron</li>
                  <li>Open: Down-pointing chevron</li>
                  <li>Active document: Blue text and background highlight</li>
                  <li>Hover: Subtle background change</li>
                </ul>
              </div>
            </div>

            <h3>Typography & Colors</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Fonts</strong>
                <ul>
                  <li>Font Family: Roboto, sans-serif</li>
                  <li>Container Title: 16px, bold</li>
                  <li>Document Title: 16px, bold</li>
                  <li>Table Text: 12px-14px, normal</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Colors</strong>
                <ul>
                  <li>Approved Icon: #00BF30 (green)</li>
                  <li>Primary Text: #3D3D3D</li>
                  <li>Secondary Text: #8D9AAE</li>
                  <li>Primary Blue: #2474BB</li>
                  <li>Active Background: #F1FAFE</li>
                  <li>Borders: #E2E6EB</li>
                </ul>
              </div>
            </div>

            <h3>Layout Guidelines</h3>
            <div class="design-specs">
              <div class="spec-item">
                <strong>Spacing</strong>
                <ul>
                  <li>Consistent 16px padding in panels</li>
                  <li>4px border-radius for modern look</li>
                  <li>1px borders throughout</li>
                  <li>Proper gap between nested elements</li>
                </ul>
              </div>
              <div class="spec-item">
                <strong>Best Practices</strong>
                <ul>
                  <li>Use semantic HTML for tables</li>
                  <li>Maintain accessibility with proper ARIA labels</li>
                  <li>Support keyboard navigation</li>
                  <li>Responsive design for mobile devices</li>
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

    /* WFAI Approved Container Styles */
    .wfai-approved-container {
      max-width: 600px;
      margin: 0 auto;
    }

    /* Hide default panel elements */
    :host ::ng-deep .wfai-approved-container .p-panel .p-panel-header .p-panel-title {
      display: none;
    }

    :host ::ng-deep .wfai-approved-container .p-panel .p-panel-header .p-panel-icons {
      display: none;
    }

    :host ::ng-deep .wfai-approved-container .p-panel .p-panel-header .p-panel-toggler {
      display: none;
    }

    /* Outer Panel - Approved Section */
    :host ::ng-deep .wfai-approved-container .p-panel .p-panel-header {
      background: var(--surface-overlay);
      border: 1px solid #E2E6EB;
      border-radius: 8px;
      padding: 0;
      min-height: auto;
    }

    :host ::ng-deep .wfai-approved-container .p-panel[data-collapsed="true"] .p-panel-header {
      border-radius: 8px;
    }

    :host ::ng-deep .wfai-approved-container .p-panel[data-collapsed="false"] .p-panel-header {
      border-bottom: 0;
      border-radius: 8px 8px 0 0;
    }

    /* Outer Panel Content */
    :host ::ng-deep .wfai-approved-container .p-panel .p-panel-content {
      border: 1px solid #E2E6EB;
      border-top: 0;
      border-radius: 0 0 8px 8px;
      padding: 0;
      background: var(--surface-50, #F8F9FA);
    }

    /* Header content layout */
    .wfai-header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px; /* Add 16px padding to content */
      cursor: pointer;
      user-select: none;
      width: 100%;
      font-family: 'Roboto', sans-serif;
    }

    .document-header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px; /* Add 16px padding to document headers */
      cursor: pointer;
      user-select: none;
      width: 100%;
      font-family: 'Roboto', sans-serif;
    }

    /* Hover states for all panel titles */
    .wfai-header-content:hover {
      background: #F1FAFE !important;
    }

    .document-header-content:hover {
      background: #F1FAFE !important;
    }

    /* Override hover for selected state to maintain cyan-50 background */
    :host ::ng-deep .document-panel .p-panel[data-collapsed="false"] .document-header-content:hover {
      background: #F1FAFE !important;
    }

    .hover-state {
      background: var(--surface-hover) !important;
    }

    /* Prevent hover background on main container when expanded */
    :host ::ng-deep .wfai-approved-container .p-panel[data-collapsed="false"] .p-panel-header {
      background: var(--surface-overlay) !important;
    }

    :host ::ng-deep .wfai-approved-container .p-panel[data-collapsed="false"] .wfai-header-content:hover {
      background: var(--surface-overlay) !important;
    }

    .header-left,
    .document-header-left {
      display: flex;
      align-items: center;
      gap: 8px; /* Use 8px token-based spacing */
    }

    .chevron-icon {
      color: var(--text-color);
      font-size: 12px;
      width: 12px;
      text-align: center;
      transition: transform 0.2s ease;
    }

    .approved-icon {
      color: #00BF30;
      font-size: 16px;
    }

    .container-title,
    .document-title {
      color: var(--text-color);
      font-size: 16px;
      font-weight: 700;
    }

    .document-title-active {
      color: #2474BB;
    }

    .document-count {
      color: #8D9AAE;
      font-size: 16px;
      font-weight: 300;
    }

    .menu-icon {
      color: var(--theme-primary-color);
      font-size: 16px;
    }

    /* Container content */
    .container-content {
      display: flex;
      flex-direction: column;
      padding: 16px;
    }

    .separator {
      display: none; /* Remove divider between header and document list */
    }

    .document-panels {
      display: flex;
      flex-direction: column;
      gap: 8px; /* 8px vertical spacing between panels */
    }

    .document-panel {
      border-radius: 4px;
      overflow: hidden;
    }

    /* Document panel specific styling */
    :host ::ng-deep .document-panel .p-panel .p-panel-header {
      border-radius: 4px;
      border: 1px solid #E2E6EB;
      margin-bottom: 0;
      padding: 0; /* Remove padding since we'll add it to content */
      min-height: 44px;
      background: var(--surface-overlay);
    }

    /* Collapsed state */
    :host ::ng-deep .document-panel .p-panel[data-collapsed="true"] .p-panel-header {
      border-radius: 4px;
      background: var(--surface-overlay);
    }

    /* Selected State for Document Panel - Applied when expanded */
    :host ::ng-deep .document-panel .p-panel[data-collapsed="false"] .p-panel-header {
      background: #F1FAFE !important;
      border: 1px solid #E2E6EB !important;
      border-left: 4px solid #72CDF4 !important;
      border-radius: 4px 4px 0 0 !important;
      border-bottom: 1px solid #C6CCD6 !important;
    }

    /* Ensure selected document title has proper color */
    :host ::ng-deep .document-panel .p-panel[data-collapsed="false"] .document-title {
      color: #2474BB !important;
    }

    /* Selected panel content styling */
    :host ::ng-deep .document-panel .p-panel[data-collapsed="false"] .p-panel-content {
      border: 1px solid #E2E6EB;
      border-top: 0;
      border-radius: 0 0 4px 4px;
      padding: 0;
    }

    /* Document table styling */
    .document-table-container {
      padding: 0;
      background: var(--surface-overlay);
    }

    .document-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Roboto', sans-serif;
      background: var(--surface-overlay);
    }

    .document-table td {
      padding: 10px;
      border-right: 1px solid #E2E6EB;
      vertical-align: center;
      height: 42px;
    }

    .document-table td:last-child {
      border-right: none;
    }

    .field-label {
      width: 121px;
      color: #3D3D3D;
      font-size: 12px;
      font-weight: 400;
      padding-left: 67px;
      background: var(--surface-overlay);
    }

    .field-expected {
      color: #3D3D3D;
      font-size: 14px;
      font-weight: 300;
      text-align: center;
      background: var(--surface-overlay);
      border-left: 1px solid #E2E6EB;
    }

    .field-evaluated {
      padding: 4px 8px;
      background: var(--surface-overlay);
    }

    .evaluated-cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 4px 8px;
      background: var(--surface-overlay);
      border-radius: 4px;
    }

    .evaluated-cell span {
      color: var(--text-color);
      font-size: 12px;
      font-weight: 400;
    }

    .check-icon {
      color: #00BF30;
      font-size: 12px;
    }

    /* Range display styling */
    .field-value-with-range {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .main-value {
      color: #3D3D3D;
      font-size: 14px;
      font-weight: 400;
    }

    .range-text {
      display: flex;
      gap: 4px;
    }

    .range-label {
      color: #3D3D3D;
      font-size: 10px;
      font-weight: 700;
    }

    .range-value {
      color: #3D3D3D;
      font-size: 10px;
      font-weight: 400;
    }

    /* Invalid state styling */
    .evaluated-cell-invalid {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 8px;
      background: var(--surface-overlay);
      border-radius: 4px;
      border-left: 1px solid #E2E6EB;
    }

    .invalid-icon {
      color: #8D9AAE;
      font-size: 12px;
    }

    /* States demo */
    .states-demo {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 1rem 0;
    }

    .state-example h4 {
      color: var(--text-color);
      margin: 0 0 1rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    /* Controls */
    .controls-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
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

    .spec-item {
      background: var(--surface-section);
      padding: 1rem;
      border-radius: 6px;
      border-left: 3px solid var(--theme-primary-color);
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
      .states-demo {
        grid-template-columns: 1fr;
      }
      
      .controls-section {
        flex-direction: column;
      }
      
      .design-specs {
        grid-template-columns: 1fr;
      }

      .field-label {
        padding-left: 20px;
      }
    }
  `]
})
export class WFAIApprovedContainerDocComponent {
  outerCollapsed = false;
  
  documents: DocumentItem[] = [
    {
      id: 'invoice',
      title: 'Invoice',
      collapsed: false,
      data: {
        field: 'Total',
        expected: '$900',
        evaluated: '$900'
      }
    },
    {
      id: 'pod',
      title: 'POD',
      collapsed: true,
      data: {
        field: 'BOL #',
        expected: '987654321',
        evaluated: '987654321'
      }
    },
    {
      id: 'fuel-receipt',
      title: 'Fuel Receipt',
      collapsed: true,
      data: {
        field: 'Total',
        expected: '$250.00',
        evaluated: '$250.00'
      }
    }
  ];

  getDocumentCount(): number {
    return this.documents.length;
  }

  toggleOuter(): void {
    this.outerCollapsed = !this.outerCollapsed;
  }

  onOuterToggle(event: any): void {
    if (event && typeof event.collapsed === 'boolean') {
      this.outerCollapsed = event.collapsed;
    }
  }

  toggleDocument(docId: string): void {
    const doc = this.documents.find(d => d.id === docId);
    if (doc) {
      doc.collapsed = !doc.collapsed;
    }
  }

  onDocumentToggle(docId: string, event: any): void {
    if (event && typeof event.collapsed === 'boolean') {
      const doc = this.documents.find(d => d.id === docId);
      if (doc) {
        doc.collapsed = event.collapsed;
      }
    }
  }

  expandAll(): void {
    this.outerCollapsed = false;
    this.documents.forEach(doc => doc.collapsed = false);
  }

  collapseAll(): void {
    this.outerCollapsed = true;
    this.documents.forEach(doc => doc.collapsed = true);
  }

  addDocument(): void {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: 'New Document',
      collapsed: true,
      data: {
        field: 'REF #',
        expected: '123456789',
        evaluated: '123456789'
      }
    };
    this.documents.push(newDoc);
  }
}
