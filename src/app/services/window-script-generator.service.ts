import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowScriptGeneratorService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  }

  /**
   * Generates the Angular bootstrap script for the window
   */
  generateBootstrapScript(): string {
    return `
// Dynamic Angular Bootstrap Script for Message Center Window
(function() {
  'use strict';
  
  console.log('Initializing Angular bootstrap for Message Center Window...');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAngular);
  } else {
    initializeAngular();
  }
  
  function initializeAngular() {
    console.log('DOM ready, starting Angular bootstrap...');
    
    try {
      // Import and execute the bootstrap function
      Promise.resolve().then(() => {
        return new Promise((resolve, reject) => {
          // Create dynamic script loader for Angular modules
          const scriptLoader = document.createElement('script');
          scriptLoader.type = 'module';
          scriptLoader.textContent = \`
            import { bootstrapApplication } from '@angular/platform-browser';
            import { Component, importProvidersFrom } from '@angular/core';
            import { CommonModule } from '@angular/common';
            import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
            
            // Simple MessageCenter Window Component
            @Component({
              selector: 'app-window-root',
              standalone: true,
              imports: [CommonModule],
              template: \\\`
                <div class="message-center-window">
                  <div class="window-header">
                    <div class="header-content">
                      <div class="title-section">
                        <i class="fas fa-comment"></i>
                        <h1>Message Center</h1>
                      </div>
                      <button class="close-btn" onclick="window.close()">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div class="window-content">
                    <div class="filter-tabs">
                      <button class="tab active" data-filter="all">
                        <i class="fas fa-layer-group"></i>
                        All
                      </button>
                      <button class="tab" data-filter="notes">
                        <i class="fas fa-sticky-note"></i>
                        Notes
                      </button>
                      <button class="tab" data-filter="emails">
                        <i class="fas fa-envelope"></i>
                        Emails
                      </button>
                      <button class="tab" data-filter="sms">
                        <i class="fas fa-comment"></i>
                        SMS
                      </button>
                    </div>
                    
                    <div class="message-area">
                      <div class="empty-state">
                        <i class="fas fa-comment-dots"></i>
                        <h3>Message Center Expanded</h3>
                        <p>Independent Message Center running in separate window</p>
                        <div class="features">
                          <div class="feature">
                            <i class="fas fa-check text-success"></i>
                            <span>Independent Angular Application</span>
                          </div>
                          <div class="feature">
                            <i class="fas fa-check text-success"></i>
                            <span>Separate Zone.js Context</span>
                          </div>
                          <div class="feature">
                            <i class="fas fa-check text-success"></i>
                            <span>Cross-Window Communication</span>
                          </div>
                          <div class="feature">
                            <i class="fas fa-check text-success"></i>
                            <span>Ready for CommunicationPanel Integration</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              \\\`,
              styles: [\\\`
                .message-center-window {
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  background: var(--surface-ground, #ffffff);
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }
                
                .window-header {
                  background: var(--surface-card, #ffffff);
                  border-bottom: 1px solid var(--surface-border, #E2E6EB);
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                .header-content {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 16px 24px;
                }
                
                .title-section {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                }
                
                .title-section i {
                  color: var(--primary-color, #2474BB);
                  font-size: 20px;
                }
                
                .title-section h1 {
                  color: var(--text-color, #3D3D3D);
                  font-size: 18px;
                  font-weight: 600;
                  margin: 0;
                }
                
                .close-btn {
                  background: none;
                  border: 1px solid var(--surface-border, #E2E6EB);
                  border-radius: 4px;
                  color: var(--text-color-secondary, #8D9AAE);
                  cursor: pointer;
                  padding: 8px 12px;
                  font-size: 14px;
                  transition: all 0.2s ease;
                }
                
                .close-btn:hover {
                  background: var(--red-500, #DA1F2C);
                  color: white;
                  border-color: var(--red-500, #DA1F2C);
                }
                
                .window-content {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  overflow: hidden;
                }
                
                .filter-tabs {
                  display: flex;
                  gap: 16px;
                  padding: 16px 24px;
                  background: var(--surface-50, #F7F8F9);
                  border-bottom: 1px solid var(--surface-border, #E2E6EB);
                }
                
                .tab {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 8px 16px;
                  border: none;
                  background: transparent;
                  border-radius: 6px;
                  cursor: pointer;
                  color: var(--text-color-secondary, #8D9AAE);
                  font-size: 14px;
                  font-weight: 500;
                  transition: all 0.2s ease;
                }
                
                .tab:hover {
                  background: var(--surface-100, #F0F0F0);
                }
                
                .tab.active {
                  background: var(--primary-color, #2474BB);
                  color: white;
                }
                
                .tab i {
                  font-size: 12px;
                }
                
                .message-area {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 2rem;
                  background: var(--surface-ground, #ffffff);
                }
                
                .empty-state {
                  text-align: center;
                  max-width: 500px;
                }
                
                .empty-state > i {
                  font-size: 4rem;
                  color: var(--primary-color, #2474BB);
                  opacity: 0.3;
                  margin-bottom: 1.5rem;
                }
                
                .empty-state h3 {
                  color: var(--text-color, #3D3D3D);
                  font-size: 1.5rem;
                  font-weight: 600;
                  margin: 0 0 1rem 0;
                }
                
                .empty-state p {
                  color: var(--text-color-secondary, #8D9AAE);
                  font-size: 1rem;
                  margin: 0 0 2rem 0;
                  line-height: 1.6;
                }
                
                .features {
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                  align-items: flex-start;
                  text-align: left;
                }
                
                .feature {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  padding: 8px 0;
                }
                
                .feature i {
                  font-size: 16px;
                  width: 20px;
                }
                
                .text-success {
                  color: var(--green-500, #22C55E);
                }
                
                .feature span {
                  color: var(--text-color, #3D3D3D);
                  font-size: 14px;
                  font-weight: 500;
                }
                
                @media (max-width: 600px) {
                  .header-content {
                    padding: 12px 16px;
                  }
                  
                  .filter-tabs {
                    flex-wrap: wrap;
                    gap: 8px;
                    padding: 12px 16px;
                  }
                  
                  .empty-state {
                    padding: 1rem;
                  }
                }
              \\\`]
            })
            class WindowRootComponent {
              constructor() {
                console.log('MessageCenter Window Component initialized');
                
                // Set up cross-window communication
                this.setupCommunication();
              }
              
              setupCommunication() {
                // Notify parent that Angular is ready
                setTimeout(() => {
                  if (window.opener) {
                    window.opener.postMessage({
                      type: 'ANGULAR_READY',
                      componentName: 'MessageCenterExpanded'
                    }, '*');
                  }
                }, 100);
                
                // Listen for messages from parent
                window.addEventListener('message', (event) => {
                  console.log('Message received from parent:', event.data);
                });
              }
            }
            
            // Bootstrap the application
            bootstrapApplication(WindowRootComponent, {
              providers: [
                importProvidersFrom(BrowserAnimationsModule)
              ]
            }).then(appRef => {
              console.log('Message Center Window Angular app bootstrapped successfully');
              
              // Hide loading, show app
              if (window.showApp) {
                window.showApp();
              }
              
              // Set up tab functionality
              document.addEventListener('click', (event) => {
                if (event.target.closest('.tab')) {
                  const tabs = document.querySelectorAll('.tab');
                  tabs.forEach(tab => tab.classList.remove('active'));
                  event.target.closest('.tab').classList.add('active');
                }
              });
              
            }).catch(error => {
              console.error('Error bootstrapping Message Center Window:', error);
              if (window.showError) {
                window.showError('Failed to bootstrap Angular: ' + error.message);
              }
            });
          \`;
          
          document.head.appendChild(scriptLoader);
          
          scriptLoader.onload = () => resolve(true);
          scriptLoader.onerror = (error) => reject(error);
        });
      });
      
    } catch (error) {
      console.error('Error in Angular initialization:', error);
      if (window.showError) {
        window.showError('Failed to initialize Angular: ' + error.message);
      }
    }
  }
})();
`;
  }

  /**
   * Generates the complete script bundle for the window
   */
  generateWindowScript(): string {
    return `
${this.generateZoneJsScript()}
${this.generateBootstrapScript()}
`;
  }

  private generateZoneJsScript(): string {
    return `
// Independent Zone.js setup for this window
// This ensures the window runs independently from the main app's zone
console.log('Setting up independent Zone.js for Message Center Window...');

// Zone.js configuration for this window
window.__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];
window.__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove'];

// Basic Zone.js patch for this window context
if (!window.Zone) {
  // If Zone.js isn't loaded, create a minimal implementation
  window.Zone = {
    current: {
      run: function(fn) { return fn(); },
      runGuarded: function(fn) { return fn(); }
    },
    root: {
      run: function(fn) { return fn(); }
    }
  };
}
`;
  }
}
