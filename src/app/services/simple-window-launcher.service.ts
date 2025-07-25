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
    const mockMessages = [
      {
        id: '1',
        type: 'note',
        author: 'Jake Cummings',
        content: 'A BOL document is like the passport for a shipment; it tells you everything you need to know about where it\'s coming from, where it\'s going, and what\'s inside.',
        timestamp: '9:00 AM',
        isUnread: true
      },
      {
        id: '2',
        type: 'email',
        author: 'Automated Email',
        content: 'Document Upload Required - Your shipment requires additional documentation. Please upload the required BOL document.',
        timestamp: '10:32 AM',
        isUnread: true
      },
      {
        id: '3',
        type: 'sms',
        author: 'SMS to +1 (999) 999-9999',
        content: 'Your shipment requires additional documentation. Please upload the required BOL document within 24 hours.',
        timestamp: '11:00 AM',
        isUnread: false
      },
      {
        id: '4',
        type: 'upload',
        author: 'File Upload: BOL_12345.pdf',
        content: 'Uploaded via secure link by driver@carrier.com',
        timestamp: '11:23 AM',
        isUnread: false
      }
    ];

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Center - Expanded View</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      line-height: 1.5;
    }

    .header {
      background: #2474BB;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      text-align: center;
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .filter-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .filter-tab {
      padding: 10px 16px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .filter-tab.active {
      background: #2474BB;
      color: white;
      border-color: #2474BB;
    }

    .filter-tab:hover:not(.active) {
      background: #f0f0f0;
    }

    .messages-container {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      min-height: 400px;
    }

    .message-item {
      border-left: 4px solid transparent;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 6px;
      background: #f9f9f9;
    }

    .message-item.unread {
      border-left-color: #FF9800;
      background: #fff3e0;
    }

    .message-item.note {
      border-left-color: #2474BB;
    }

    .message-item.email {
      border-left-color: #1976D2;
    }

    .message-item.sms {
      border-left-color: #9C27B0;
    }

    .message-item.upload {
      border-left-color: #4CAF50;
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .message-author {
      font-weight: 600;
      color: #333;
    }

    .message-timestamp {
      font-size: 0.85rem;
      color: #666;
    }

    .message-content {
      color: #444;
      line-height: 1.4;
    }

    .unread-badge {
      background: #FF9800;
      color: white;
      padding: 2px 6px;
      border-radius: 12px;
      font-size: 0.7rem;
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
    }

    .close-btn:hover {
      background: #c82333;
    }

    .stats {
      text-align: center;
      margin-top: 20px;
      padding: 15px;
      background: #e8f5e8;
      border-radius: 6px;
      color: #2e7d32;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📬 Message Center - Expanded View</h1>
  </div>

  <div class="filter-tabs">
    <div class="filter-tab active" data-filter="all">All Messages</div>
    <div class="filter-tab" data-filter="note">Notes</div>
    <div class="filter-tab" data-filter="email">Emails</div>
    <div class="filter-tab" data-filter="sms">SMS</div>
    <div class="filter-tab" data-filter="upload">Uploads</div>
  </div>

  <div class="messages-container">
    <div id="messages-list">
      <!-- Messages will be rendered here by JavaScript -->
    </div>
  </div>

  <div class="stats" id="stats">
    <!-- Stats will be updated by JavaScript -->
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
