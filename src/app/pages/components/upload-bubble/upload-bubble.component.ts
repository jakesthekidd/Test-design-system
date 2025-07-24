import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuButtonComponent } from '../status-badges/status-badges.component';

export type UploadMethodType = 'upload-link' | 'platform';

export interface UploadData {
  uploaderName: string;
  uploaderRole?: string;
  fileName: string;
  uploadMethod: UploadMethodType;
  timestamp: string;
  fileSize?: string;
  fileType?: string;
}

// Upload Method Badge Component
@Component({
  selector: 'app-upload-method-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-method-badge" [ngClass]="methodClass">
      <span>{{ getMethodLabel() }}</span>
    </div>
  `,
  styles: [`
    .upload-method-badge {
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 27px;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
      width: fit-content;
    }
    
    .upload-method-badge.upload-link {
      background: var(--green-900, #004C13);
      color: var(--surface-0, #FFF);
    }
    
    .upload-method-badge.platform {
      background: var(--green-100, #CCF2D6);
      color: var(--green-900, #004C13);
    }
  `]
})
export class UploadMethodBadgeComponent {
  @Input() method: UploadMethodType = 'upload-link';

  get methodClass(): string {
    return this.method === 'upload-link' ? 'upload-link' : 'platform';
  }

  getMethodLabel(): string {
    return this.method === 'upload-link' ? 'Upload Link' : 'Platform';
  }
}

// Upload Status Badge Component
@Component({
  selector: 'app-upload-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-status-badge" [ngClass]="methodClass">
      <div class="status-content">
        <span class="status-label">Uploaded:</span>
        <span class="status-value">{{ timestamp }}</span>
      </div>
    </div>
  `,
  styles: [`
    .upload-status-badge {
      display: flex;
      padding: 4px 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 4px;
      font-family: 'Roboto', sans-serif;
      width: fit-content;
    }
    
    .status-content {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .status-label {
      font-size: 13px;
      font-weight: 500;
      line-height: normal;
    }
    
    .status-value {
      font-size: 13px;
      font-weight: 300;
      line-height: normal;
    }
    
    .upload-status-badge.upload-link {
      background: var(--green-900, #004C13);
      color: var(--green-50, #E5F9EA);
    }
    
    .upload-status-badge.platform {
      background: var(--green-100, #CCF2D6);
      color: var(--med-black, rgba(58, 58, 58, 1));
    }
  `]
})
export class UploadStatusBadgeComponent {
  @Input() method: UploadMethodType = 'upload-link';
  @Input() timestamp: string = '';

  get methodClass(): string {
    return this.method === 'upload-link' ? 'upload-link' : 'platform';
  }
}

// Upload Icon Component
@Component({
  selector: 'app-upload-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-icon" [ngClass]="methodClass">
      <i [class]="getIconClass()"></i>
    </div>
  `,
  styles: [`
    .upload-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 105px;
    }
    
    .upload-icon.upload-link {
      background: var(--green-900, #004C13);
      color: var(--surface-0, #FFF);
    }
    
    .upload-icon.platform {
      background: var(--green-100, #CCF2D6);
      color: var(--green-900, #004C13);
    }
    
    .upload-icon i {
      font-size: 12px;
      font-weight: 900;
    }
  `]
})
export class UploadIconComponent {
  @Input() method: UploadMethodType = 'upload-link';

  get methodClass(): string {
    return this.method === 'upload-link' ? 'upload-link' : 'platform';
  }

  getIconClass(): string {
    return this.method === 'upload-link' ? 'fa-solid fa-cloud-arrow-up' : 'fa-solid fa-upload';
  }
}

// Standalone reusable component
@Component({
  selector: 'app-upload-bubble',
  standalone: true,
  imports: [
    CommonModule, 
    UploadMethodBadgeComponent, 
    UploadStatusBadgeComponent, 
    UploadIconComponent, 
    MenuButtonComponent,
    TooltipModule
  ],
  template: `
    <div class="upload-bubble-container" [ngClass]="{'has-shadow': uploadData.uploadMethod === 'platform'}">
      <div class="upload-bubble-content">
        <div class="bubble-header">
          <app-upload-icon [method]="uploadData.uploadMethod"></app-upload-icon>
          <div class="message-details">
            <div class="header-row">
              <div class="badge-section">
                <app-upload-method-badge [method]="uploadData.uploadMethod"></app-upload-method-badge>
              </div>
              <div class="status-and-menu">
                <app-upload-status-badge 
                  [method]="uploadData.uploadMethod"
                  [timestamp]="uploadData.timestamp">
                </app-upload-status-badge>
                <app-menu-button 
                  pTooltip="Upload options" 
                  (click)="onMenuClick()">
                </app-menu-button>
              </div>
            </div>
            
            <div class="upload-field">
              <span class="field-label">Uploaded by:</span>
              <span class="field-value uploader-name">{{ uploadData.uploaderName }}</span>
            </div>
            
            <div class="upload-field">
              <span class="field-label">{{ getDocumentLabel() }}:</span>
              <span class="field-value file-name">{{ uploadData.fileName }}</span>
            </div>
            
            <div class="upload-method">
              Upload method: {{ getMethodDisplayName() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
      justify-content: flex-start;
    }

    .upload-bubble-container {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-radius: 8px 8px 8px 0px;
      border: 1px solid var(--green-500, #00BF30);
      background: var(--green-50, #E5F9EA);
      font-family: 'Roboto', sans-serif;
      max-width: 600px;
      width: 100%;
    }

    .upload-bubble-container.has-shadow {
      border-radius: 8px 8px 0px 8px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);
    }

    .upload-bubble-content {
      flex: 1;
    }

    .bubble-header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      width: 100%;
    }

    .message-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .badge-section {
      display: flex;
    }

    .status-and-menu {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .upload-field {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .field-label {
      color: #4B5563;
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      min-width: fit-content;
    }

    .field-value {
      color: var(--med-black, rgba(58, 58, 58, 1));
      font-size: 15px;
      font-weight: 700;
      line-height: normal;
    }

    .uploader-name {
      font-size: 15px;
    }

    .file-name {
      font-size: 15px;
    }

    .upload-method {
      height: 16px;
      align-self: stretch;
      color: var(--med-black, rgba(58, 58, 58, 1));
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
    }

    @media (max-width: 768px) {
      .upload-bubble-container {
        padding: 12px;
        max-width: 100%;
      }
      
      .header-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      
      .status-and-menu {
        align-self: flex-end;
        width: 100%;
        justify-content: flex-end;
      }
      
      .message-details {
        gap: 6px;
      }
    }
  `]
})
export class UploadBubbleComponent {
  @Input() uploadData!: UploadData;
  @Output() menuClick = new EventEmitter<UploadData>();
  @Output() fileClick = new EventEmitter<UploadData>();

  getDocumentLabel(): string {
    return this.uploadData.uploadMethod === 'platform' ? 'User uploaded document' : 'Client uploaded document';
  }

  getMethodDisplayName(): string {
    return this.uploadData.uploadMethod === 'upload-link' ? 'Upload Link' : 'Upload Link';
  }

  onMenuClick(): void {
    this.menuClick.emit(this.uploadData);
  }

  onFileClick(): void {
    this.fileClick.emit(this.uploadData);
  }
}

// Documentation Component
@Component({
  selector: 'app-upload-bubble-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    TooltipModule,
    UploadBubbleComponent,
    UploadMethodBadgeComponent,
    UploadStatusBadgeComponent,
    UploadIconComponent
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Upload Bubble</h1>
        <p class="component-description">
          Specialized communication element for displaying document upload confirmations associated with shipments or workflows. 
          Represents inbound activity from users confirming successful file submissions with upload method tracking and 
          comprehensive metadata display.
        </p>
      </div>

      <p-tabView>
        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Upload Method Variants</h3>
            <div class="example-container">
              <div class="upload-thread">
                
                <div class="upload-wrapper">
                  <h4>Upload Link Method</h4>
                  <app-upload-bubble 
                    [uploadData]="uploadLinkData"
                    (menuClick)="onMenuClick($event)">
                  </app-upload-bubble>
                </div>

                <div class="upload-wrapper">
                  <h4>Platform Upload Method</h4>
                  <app-upload-bubble 
                    [uploadData]="platformData"
                    (menuClick)="onMenuClick($event)">
                  </app-upload-bubble>
                </div>
              </div>
            </div>

            <h3>Upload Components</h3>
            <div class="example-container">
              <div class="status-examples">
                <div class="status-group">
                  <h4>Upload Icons</h4>
                  <div class="status-list">
                    <app-upload-icon method="upload-link"></app-upload-icon>
                    <app-upload-icon method="platform"></app-upload-icon>
                  </div>
                </div>
                
                <div class="status-group">
                  <h4>Method Badges</h4>
                  <div class="status-list">
                    <app-upload-method-badge method="upload-link"></app-upload-method-badge>
                    <app-upload-method-badge method="platform"></app-upload-method-badge>
                  </div>
                </div>
                
                <div class="status-group">
                  <h4>Status Badges</h4>
                  <div class="status-list">
                    <app-upload-status-badge method="upload-link" timestamp="Aug 2, 2024 |1:23 PM"></app-upload-status-badge>
                    <app-upload-status-badge method="platform" timestamp="Aug 2, 2024 |1:23 PM"></app-upload-status-badge>
                  </div>
                </div>
              </div>
            </div>

            <h3>Interactive Controls</h3>
            <div class="example-container">
              <div class="controls-section">
                <p-button label="Toggle Method" (click)="toggleMethod()" severity="primary" size="small"></p-button>
                <p-button label="Change File" (click)="changeFileName()" severity="secondary" size="small"></p-button>
                <p-button label="Update Timestamp" (click)="updateTimestamp()" severity="warning" size="small"></p-button>
              </div>
            </div>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Usage">
          <div class="usage-section">
            <h3>Upload Confirmation</h3>
            <p>Displays successful document uploads from users, providing audit trail for document workflows.</p>
            
            <h3>Method Types</h3>
            <p>Upload Link: External upload via secure link. Platform: Direct upload through platform interface.</p>
            
            <h3>Visual Design</h3>
            <p>Uses green color scheme throughout to indicate successful upload status and completion.</p>
          </div>
        </p-tabPanel>

        <p-tabPanel header="API">
          <div class="api-section">
            <h3>UploadBubbleComponent Properties</h3>
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
                    <td>uploadData</td>
                    <td>UploadData</td>
                    <td>required</td>
                    <td>Complete upload information including uploader, file, and method details</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>UploadData Interface</h3>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>uploaderName</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Name or identifier of the person who uploaded the file</td>
                  </tr>
                  <tr>
                    <td>uploaderRole</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Role of the uploader (driver, client, etc.)</td>
                  </tr>
                  <tr>
                    <td>fileName</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>Name of the uploaded file (displayed with bold emphasis)</td>
                  </tr>
                  <tr>
                    <td>uploadMethod</td>
                    <td>'upload-link' | 'platform'</td>
                    <td>Yes</td>
                    <td>Method used for upload (link or platform)</td>
                  </tr>
                  <tr>
                    <td>timestamp</td>
                    <td>string</td>
                    <td>Yes</td>
                    <td>When the file was uploaded</td>
                  </tr>
                  <tr>
                    <td>fileSize</td>
                    <td>string</td>
                    <td>No</td>
                    <td>Size of the uploaded file</td>
                  </tr>
                  <tr>
                    <td>fileType</td>
                    <td>string</td>
                    <td>No</td>
                    <td>MIME type or file extension</td>
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
                    <td>menuClick</td>
                    <td>uploadData: UploadData</td>
                    <td>Emitted when the three-dot menu is clicked</td>
                  </tr>
                  <tr>
                    <td>fileClick</td>
                    <td>uploadData: UploadData</td>
                    <td>Emitted when the file name is clicked (for download/preview)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Design">
          <div class="design-section">
            <h3>Green Color System</h3>
            <p>Uses comprehensive green color palette to indicate successful upload completion and positive status.</p>
            
            <h3>Method Differentiation</h3>
            <p>Upload Link: Dark green styling (#004C13). Platform: Light green styling (#CCF2D6) with subtle shadow.</p>
            
            <h3>Visual Hierarchy</h3>
            <p>Bold file names and uploader information for easy scanning. Consistent with other bubble components.</p>
            
            <h3>Corner Styling</h3>
            <p>Uses different corner radius patterns: Upload Link (8px 8px 8px 0px), Platform (8px 8px 0px 8px).</p>
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
    .usage-section,
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

    .upload-thread {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 700px;
      margin: 0 auto;
    }

    .upload-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .upload-wrapper h4 {
      color: var(--text-color);
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 500;
    }

    .status-examples {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .status-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .status-group h4 {
      color: var(--text-color);
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
    }

    .status-list {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .controls-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 1rem 0;
    }

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

    h3 {
      color: var(--text-color);
      margin: 1.5rem 0 0.5rem 0;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .upload-thread {
        max-width: 100%;
      }
      
      .controls-section {
        flex-direction: column;
      }

      .status-examples {
        gap: 1rem;
      }

      .status-list {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class UploadBubbleDocComponent {
  uploadLinkData: UploadData = {
    uploaderName: 'driver@carrier.com',
    fileName: 'BOL_12345.pdf',
    uploadMethod: 'upload-link',
    timestamp: 'Aug 2, 2024 |1:23 PM',
    uploaderRole: 'driver'
  };

  platformData: UploadData = {
    uploaderName: 'User Name',
    fileName: 'BOL_12345.pdf',
    uploadMethod: 'platform',
    timestamp: 'Aug 2, 2024 |1:23 PM',
    uploaderRole: 'user'
  };

  toggleMethod(): void {
    this.uploadLinkData.uploadMethod = this.uploadLinkData.uploadMethod === 'upload-link' ? 'platform' : 'upload-link';
  }

  changeFileName(): void {
    const fileNames = ['BOL_12345.pdf', 'Invoice_67890.pdf', 'Contract_ABCDE.pdf', 'Receipt_98765.pdf'];
    const currentIndex = fileNames.indexOf(this.uploadLinkData.fileName);
    const nextIndex = (currentIndex + 1) % fileNames.length;
    
    this.uploadLinkData.fileName = fileNames[nextIndex];
    this.platformData.fileName = fileNames[nextIndex];
  }

  updateTimestamp(): void {
    const newTimestamp = new Date().toLocaleString();
    this.uploadLinkData.timestamp = newTimestamp;
    this.platformData.timestamp = newTimestamp;
  }

  onMenuClick(uploadData: UploadData): void {
    console.log('Menu clicked for upload:', uploadData);
  }
}
