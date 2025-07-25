import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleWindowLauncherService {
  private openWindow: Window | null = null;

  openMessageCenterWindow(): boolean {
    try {
      // Close existing window if open
      if (this.openWindow && !this.openWindow.closed) {
        this.openWindow.close();
      }

      // Calculate window dimensions (40% width, 70% height, centered)
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const windowWidth = Math.floor(screenWidth * 0.4);
      const windowHeight = Math.floor(screenHeight * 0.7);
      const left = Math.floor((screenWidth - windowWidth) / 2);
      const top = Math.floor((screenHeight - windowHeight) / 2);

      // Window features
      const features = [
        `width=${windowWidth}`,
        `height=${windowHeight}`,
        `left=${left}`,
        `top=${top}`,
        'resizable=yes',
        'scrollbars=yes',
        'toolbar=no',
        'menubar=no',
        'location=no',
        'status=no'
      ].join(',');

      // Open new window
      this.openWindow = window.open('about:blank', 'message-center-expanded', features);

      if (!this.openWindow) {
        console.error('Failed to open window - popup blocker may be active');
        return false;
      }

      // Generate and write HTML content
      const htmlContent = this.generateWindowHTML();
      this.openWindow.document.write(htmlContent);
      this.openWindow.document.close();

      // Focus the new window
      this.openWindow.focus();

      console.log('Message Center window opened successfully');
      return true;

    } catch (error) {
      console.error('Error opening Message Center window:', error);
      return false;
    }
  }

  closeWindow(): boolean {
    if (this.openWindow && !this.openWindow.closed) {
      try {
        this.openWindow.close();
        this.openWindow = null;
        console.log('Message Center window closed');
        return true;
      } catch (error) {
        console.error('Error closing window:', error);
        return false;
      }
    }
    return false;
  }

  isWindowOpen(): boolean {
    return this.openWindow !== null && !this.openWindow.closed;
  }

  private generateWindowHTML(): string {
    // Use the exact same data structure as MessageDataService
    const mockMessages = [
      {
        id: '1',
        type: 'note',
        timestamp: new Date('2024-08-01T09:00:00'),
        isRead: false,
        data: {
          author: 'Jake Cummings',
          content: 'A BOL document is like the passport for a shipment; it tells you everything you need to know about where it\'s coming from, where it\'s going, and what\'s inside.',
          timestamp: '2024-08-02T09:00:00',
          isOwnMessage: false,
          authorInitials: 'JC',
          authorName: 'Jake Cummings'
        }
      },
      {
        id: '2',
        type: 'sms',
        timestamp: new Date('2024-08-01T11:00:00'),
        isRead: false,
        data: {
          toRecipients: ['+1 (999) 999-9999'],
          messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
          status: 'sent',
          timestamp: '2024-08-01T11:00:00'
        }
      },
      {
        id: '3',
        type: 'automated-email',
        timestamp: new Date('2024-08-02T10:32:00'),
        isRead: false,
        data: {
          fromAddress: 'system@docprocessing.com',
          toRecipients: ['client@company.com', 'shipper@logistics.com'],
          subjectLine: 'Document Upload Required - Shipment #SP-2024-1205',
          messageBody: 'Your shipment requires additional documentation. Please upload the required BOL document using the secure link below within 24 hours to avoid delays.',
          status: 'sent',
          timestamp: '2024-08-02T10:32:00'
        }
      },
      {
        id: '4',
        type: 'note',
        timestamp: new Date('2024-08-02T11:15:00'),
        isRead: true,
        data: {
          author: 'Sarah Mitchell',
          content: 'I\'ve reviewed the documentation and everything looks good to proceed. The carrier has confirmed pickup for tomorrow morning.',
          timestamp: '2024-08-02T11:15:00',
          isOwnMessage: true,
          authorInitials: 'SM',
          authorName: 'Sarah Mitchell'
        }
      },
      {
        id: '5',
        type: 'upload',
        timestamp: new Date('2024-08-02T11:23:00'),
        isRead: false,
        data: {
          uploader: 'driver@carrier.com',
          filename: 'BOL_12345.pdf',
          uploadMethod: 'upload-link',
          status: 'uploaded',
          timestamp: '2024-08-02T11:23:00'
        }
      },
      {
        id: '6',
        type: 'manual-email',
        timestamp: new Date('2024-08-02T12:30:00'),
        isRead: false,
        data: {
          fromUser: 'operations@company.com',
          toRecipients: ['client@business.com'],
          subjectLine: 'Shipment Update - Delivery Confirmed',
          messageBody: 'Your shipment has been successfully delivered. Thank you for choosing our services!',
          status: 'sent',
          timestamp: '2024-08-02T12:30:00'
        }
      }
    ];

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Center - Expanded View</title>
  <!-- FontAwesome -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root {
      /* Design System Variables */
      --surface-0: #ffffff;
      --surface-50: #F7F8F9;
      --surface-100: #F7F8F9;
      --surface-border: #C6CCD6;
      --surface-ground: #EFF2F4;
      --surface-hover: #F6F9FC;
      --surface-overlay: #ffffff;
      --text-color: #3D3D3D;
      --surface-700: #8D9AAE;
      --blue-900: #0E2E4B;
      --primary-color: #2474BB;
      --status-alert: #DA1F2C;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--surface-ground);
      min-height: 100vh;
      line-height: 1.5;
    }

    .communication-panel {
      width: 100%;
      height: 100vh;
      background: var(--surface-0);
      display: flex;
      flex-direction: column;
    }

    /* Message Center Header Styles */
    .message-center-header {
      width: 100%;
      background: var(--surface-0);
      border-radius: 8px 8px 0 0;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: var(--surface-100);
      border-radius: 8px 8px 0 0;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .header-icon {
      color: var(--blue-900);
      font-size: 21px;
    }

    .title-text {
      color: var(--blue-900);
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      line-height: normal;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .action-button {
      background: transparent;
      border: none;
      color: var(--blue-900);
      padding: 0;
      width: auto;
      height: auto;
      cursor: pointer;
    }

    .action-button i {
      font-size: 21px;
      color: var(--blue-900);
    }

    .action-button:hover i {
      color: var(--primary-color);
    }

    /* Filter Tabs Section */
    .filter-tabs-section {
      padding: 16px 24px;
      background: var(--surface-0);
      border-bottom: 1px solid var(--surface-border);
    }

    .filter-tabs {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .filter-tab {
      display: flex;
      padding: 4px 8px;
      align-items: center;
      gap: 10px;
      border-radius: 6px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      position: relative;
    }

    .filter-tab:hover {
      background: var(--surface-hover);
    }

    .filter-tab.active {
      background: var(--surface-ground);
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.10), 0px 1px 3px rgba(0, 0, 0, 0.10);
    }

    .tab-icon {
      font-size: 12px;
      color: var(--surface-700);
      transition: color 0.2s ease-in-out;
    }

    .filter-tab.active .tab-icon {
      color: var(--text-color);
    }

    .tab-label {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: var(--surface-700);
      transition: color 0.2s ease-in-out;
    }

    .filter-tab.active .tab-label {
      color: var(--text-color);
    }

    .tab-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      background: var(--status-alert);
      color: var(--surface-0);
      border-radius: 50%;
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 500;
      line-height: 1;
      margin-left: 2px;
    }

    /* Panel Content */
    .panel-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .secondary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: var(--surface-0);
      border-bottom: 1px solid var(--surface-border);
    }

    .filter-button {
      background: transparent;
      border: none;
      color: var(--text-color);
      font-size: 16px;
      cursor: pointer;
      padding: 8px;
    }

    .compose-button {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }

    /* Message Feed */
    .message-feed {
      flex: 1;
      overflow-y: auto;
      background: var(--surface-ground);
    }

    .message-list {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Message Item Styles */
    .message-item {
      display: flex;
      width: 100%;
    }

    .message-item.note-message.note-other {
      justify-content: flex-start;
      padding-right: 48px;
      padding-left: 16px;
    }

    .message-item.note-message.note-own {
      justify-content: flex-end;
      padding-left: 48px;
      padding-right: 16px;
    }

    .message-item.outbound-message {
      justify-content: flex-end;
      padding-left: 48px;
      padding-right: 16px;
    }

    /* Note Bubble Styles */
    .bubble-container {
      display: flex;
      padding: 16px;
      align-items: flex-start;
      gap: 8px;
      border-radius: 8px;
      border: 3px solid;
      background: var(--surface-overlay);
      font-family: 'Roboto', sans-serif;
      width: 100%;
      max-width: 100%;
      min-width: 280px;
      flex: 1 1 auto;
      box-sizing: border-box;
    }

    .bubble-container.other-message {
      border-color: #EFF2F4;
      border-radius: 8px 8px 8px 0px;
    }

    .bubble-container.own-message {
      border-color: #D3E3F1;
      border-radius: 8px 8px 0px 8px;
    }

    .bubble-content {
      flex: 1;
    }

    .bubble-header {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    .bubble-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      flex-shrink: 0;
    }

    .other-avatar {
      background: #EFF2F4;
      color: #3D3D3D;
    }

    .own-avatar {
      background: #D3E3F1;
      color: #3D3D3D;
    }

    .message-details {
      flex: 1;
      min-width: 0;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .author-name {
      font-weight: 500;
      font-size: 14px;
      color: var(--text-color);
    }

    .menu-button {
      background: transparent;
      border: none;
      color: var(--surface-700);
      cursor: pointer;
      padding: 4px;
    }

    .message-text {
      color: var(--text-color);
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 8px;
    }

    .timestamp-container {
      display: flex;
    }

    .timestamp {
      font-size: 12px;
      color: var(--surface-700);
    }

    /* Outbound Message Styles */
    .outbound-bubble {
      background: #E3F2FD;
      border: 1px solid #BBDEFB;
      border-radius: 8px;
      padding: 16px;
      width: 100%;
      font-family: 'Roboto', sans-serif;
    }

    .outbound-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .outbound-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: white;
    }

    .sms-icon {
      background: #9C27B0;
    }

    .email-icon {
      background: #1976D2;
    }

    .upload-icon {
      background: #4CAF50;
    }

    .outbound-details {
      flex: 1;
    }

    .outbound-title {
      font-weight: 500;
      font-size: 14px;
      color: var(--text-color);
      margin-bottom: 4px;
    }

    .outbound-subtitle {
      font-size: 12px;
      color: var(--surface-700);
    }

    .outbound-content {
      color: var(--text-color);
      font-size: 14px;
      line-height: 1.4;
    }

    .status-tag {
      background: #4CAF50;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      margin-left: 8px;
    }

    .status-tag.sent {
      background: #4CAF50;
    }

    .status-tag.uploaded {
      background: #4CAF50;
    }

    .new-badge {
      background: var(--status-alert);
      color: white;
      padding: 2px 6px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 500;
      margin-left: 8px;
    }

    .close-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #dc3545;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 1000;
    }

    .close-btn:hover {
      background: #c82333;
    }
  </style>
</head>
<body>
  <div class="communication-panel">
    <!-- Header Section -->
    <div class="message-center-header">
      <div class="header-section">
        <div class="header-title">
          <i class="fas fa-comment header-icon"></i>
          <h3 class="title-text">Message Center</h3>
        </div>
        <div class="header-actions">
          <button class="action-button close-button" onclick="window.close()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Filter Tabs Section -->
      <div class="filter-tabs-section">
        <div class="filter-tabs" id="filter-tabs">
          <button class="filter-tab active" data-filter="all">
            <i class="fas fa-list tab-icon"></i>
            <span class="tab-label">All</span>
            <span class="tab-badge" id="all-badge">0</span>
          </button>
          <button class="filter-tab" data-filter="notes">
            <i class="fas fa-sticky-note tab-icon"></i>
            <span class="tab-label">Notes</span>
            <span class="tab-badge" id="notes-badge" style="display: none;">0</span>
          </button>
          <button class="filter-tab" data-filter="emails">
            <i class="fas fa-envelope tab-icon"></i>
            <span class="tab-label">Emails</span>
            <span class="tab-badge" id="emails-badge" style="display: none;">0</span>
          </button>
          <button class="filter-tab" data-filter="sms">
            <i class="fas fa-comment-sms tab-icon"></i>
            <span class="tab-label">SMS</span>
            <span class="tab-badge" id="sms-badge" style="display: none;">0</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Panel Content -->
    <div class="panel-content">
      <!-- Secondary Header -->
      <div class="secondary-header">
        <button class="filter-button">
          <i class="fas fa-filter"></i>
        </button>
        <button class="compose-button" id="compose-btn" style="display: none;">
          <i class="fas fa-pen"></i>
          <span>Compose</span>
        </button>
      </div>

      <!-- Message Feed -->
      <div class="message-feed">
        <div class="message-list" id="message-list">
          <!-- Messages will be rendered here -->
        </div>
      </div>
    </div>
  </div>

  <button class="close-btn" onclick="window.close()">Close Window</button>

  <script>
    // Mock data
    const messages = ${JSON.stringify(mockMessages)};
    let activeFilter = 'all';

    // Render messages
    function renderMessages() {
      const container = document.getElementById('messages-list');
      const filteredMessages = messages.filter(msg => 
        activeFilter === 'all' || msg.type === activeFilter
      );

      if (filteredMessages.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No messages found for this filter.</p>';
        return;
      }

      container.innerHTML = filteredMessages.map(msg => \`
        <div class="message-item \${msg.type} \${msg.isUnread ? 'unread' : ''}">
          <div class="message-header">
            <span class="message-author">
              \${msg.author}
              \${msg.isUnread ? '<span class="unread-badge">NEW</span>' : ''}
            </span>
            <span class="message-timestamp">\${msg.timestamp}</span>
          </div>
          <div class="message-content">\${msg.content}</div>
        </div>
      \`).join('');

      updateStats(filteredMessages.length);
    }

    // Update statistics
    function updateStats(visibleCount) {
      const unreadCount = messages.filter(msg => msg.isUnread).length;
      const statsEl = document.getElementById('stats');
      statsEl.textContent = \`Showing \${visibleCount} of \${messages.length} messages • \${unreadCount} unread\`;
    }

    // Handle filter changes
    function setFilter(filter) {
      activeFilter = filter;
      
      // Update active tab
      document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      document.querySelector(\`[data-filter="\${filter}"]\`).classList.add('active');
      
      // Re-render messages
      renderMessages();
      
      console.log('Filter changed to:', filter);
    }

    // Set up event listeners
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const filter = this.dataset.filter;
        setFilter(filter);
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        window.close();
      }
    });

    // Initial render
    renderMessages();
    
    console.log('Message Center expanded window initialized successfully');
    console.log('Mock data loaded:', messages.length, 'messages');
  </script>
</body>
</html>`;
  }
}
