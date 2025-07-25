import { Injectable, Injector, EnvironmentInjector } from '@angular/core';
import { MessageDataService } from './message-data.service';
import { ComponentInjectionService } from './component-injection.service';
import { CommunicationMessage } from '../pages/components/communication-panel/communication-panel.component';
import { FilterType } from '../pages/components/message-center-header/message-center-header.component';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleWindowLauncherService {
  private openWindow: Window | null = null;
  private messageSubscription: Subscription | null = null;
  private unreadCountsSubscription: Subscription | null = null;

  constructor(
    private messageDataService: MessageDataService,
    private componentInjectionService: ComponentInjectionService,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {
    this.setupMessageListener();
    this.initializeComponentInjection();
  }

  /**
   * Initialize component injection system
   */
  private initializeComponentInjection(): void {
    this.componentInjectionService.initialize({
      injector: this.injector,
      environmentInjector: this.environmentInjector
    });
  }

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

      // Generate and write HTML content with live data
      const currentMessages = this.messageDataService.getMessages();
      const currentUnreadCounts = this.messageDataService.getUnreadCounts();
      const htmlContent = this.generateWindowHTML(currentMessages, currentUnreadCounts);
      this.openWindow.document.write(htmlContent);
      this.openWindow.document.close();

      // Focus the new window
      this.openWindow.focus();

      // Set up data synchronization
      this.setupDataSync();

      console.log('Message Center window opened successfully with live data');
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

        // Clean up subscriptions
        if (this.messageSubscription) {
          this.messageSubscription.unsubscribe();
          this.messageSubscription = null;
        }
        if (this.unreadCountsSubscription) {
          this.unreadCountsSubscription.unsubscribe();
          this.unreadCountsSubscription = null;
        }

        console.log('Message Center window closed and subscriptions cleaned up');
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

  /**
   * Set up message listener for communication from child window
   */
  private setupMessageListener(): void {
    window.addEventListener('message', (event) => {
      // Verify the message is from our expanded window
      if (event.source === this.openWindow) {
        this.handleChildWindowMessage(event.data);
      }
    });
  }

  /**
   * Handle messages received from the child window
   */
  private handleChildWindowMessage(data: any): void {
    switch (data.type) {
      case 'MESSAGE_READ':
        this.messageDataService.updateMessage(data.payload.messageId, { isRead: true });
        break;
      case 'MESSAGE_CLICKED':
        console.log('Message clicked in expanded view:', data.payload);
        break;
      case 'FILTER_CHANGED':
        console.log('Filter changed in expanded view:', data.payload.filter);
        break;
      case 'COMPOSE_EMAIL':
        console.log('Compose email requested from expanded view');
        // This could trigger opening a compose modal in the main app
        break;
      case 'WINDOW_READY':
        // Child window is ready, send initial data
        this.sendDataToWindow();
        break;
      default:
        console.log('Unknown message from child window:', data);
    }
  }

  /**
   * Set up real-time data synchronization with the child window
   */
  private setupDataSync(): void {
    // Subscribe to message updates
    this.messageSubscription = this.messageDataService.messages$.subscribe(messages => {
      this.sendMessageToWindow({
        type: 'MESSAGES_UPDATED',
        payload: { messages }
      });
    });

    // Subscribe to unread count updates
    this.unreadCountsSubscription = this.messageDataService.unreadCounts$.subscribe(unreadCounts => {
      this.sendMessageToWindow({
        type: 'UNREAD_COUNTS_UPDATED',
        payload: { unreadCounts }
      });
    });
  }

  /**
   * Send initial data to the child window
   */
  private sendDataToWindow(): void {
    const messages = this.messageDataService.getMessages();
    const unreadCounts = this.messageDataService.getUnreadCounts();

    this.sendMessageToWindow({
      type: 'INITIAL_DATA',
      payload: { messages, unreadCounts }
    });
  }

  /**
   * Send a message to the child window
   */
  private sendMessageToWindow(message: any): void {
    if (this.openWindow && !this.openWindow.closed) {
      try {
        this.openWindow.postMessage(message, '*');
      } catch (error) {
        console.error('Error sending message to child window:', error);
      }
    }
  }

  /**
   * Add a new message (for external components to call)
   */
  addMessage(message: CommunicationMessage): void {
    this.messageDataService.addMessage(message);
  }

  /**
   * Mark message as read (for external components to call)
   */
  markMessageAsRead(messageId: string): void {
    this.messageDataService.updateMessage(messageId, { isRead: true });
  }

  private generateWindowHTML(messages: CommunicationMessage[], unreadCounts: { [key in FilterType]: number }): string {
    // Use live data instead of mock data

    // Data will be updated via postMessage, starting with live data
    const initialMessages = messages;
    const initialUnreadCounts = unreadCounts;

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

    /* Message Item Wrapper Styles - exact component alignment */
    .message-item-wrapper {
      display: flex;
      width: 100%;
    }

    .message-item-wrapper.other-message-wrapper {
      justify-content: flex-start;
      padding-right: 48px;
      padding-left: 16px;
    }

    .message-item-wrapper.own-message-wrapper {
      justify-content: flex-end;
      padding-left: 48px;
      padding-right: 16px;
    }

    .message-item-wrapper.outbound-message-wrapper {
      justify-content: flex-end;
      padding-left: 48px;
      padding-right: 16px;
    }

    .message-item-wrapper.upload-message-wrapper {
      justify-content: flex-start;
      padding-right: 48px;
      padding-left: 16px;
    }

    /* Note Bubble Styles - exact NoteBubbleComponent styles */
    .bubble-container {
      display: flex;
      padding: 16px;
      align-items: flex-start;
      gap: 8px;
      border-radius: 8px;
      border: 3px solid;
      background: var(--surface-overlay, #FFF);
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
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 10px;
      flex-shrink: 0;
    }

    .other-avatar {
      background-color: #A9B3C2;
      color: #FFF;
    }

    .own-avatar {
      background-color: #2474BB;
      color: #FFF;
    }

    .message-details {
      flex: 1;
      min-width: 0;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .author-name {
      color: rgba(58, 58, 58, 1);
      font-size: 14px;
      font-weight: 500;
    }

    .menu-button {
      background: none;
      border: none;
      color: #2068A8;
      font-size: 16px;
      cursor: pointer;
      padding: 2px;
      border-radius: 2px;
      transition: background-color 0.2s ease;
    }

    .menu-button:hover {
      background-color: var(--surface-hover, #F6F9FC);
    }

    .message-text {
      color: rgba(58, 58, 58, 1);
      font-size: 14px;
      font-weight: 300;
      line-height: 1.4;
    }

    .timestamp-container {
      display: flex;
      padding: 4px 8px;
      border-radius: 4px;
      width: fit-content;
    }

    .timestamp-container.other-timestamp {
      background: #EFF2F4;
    }

    .timestamp-container.own-timestamp {
      background: #E9F1F8;
    }

    .timestamp {
      color: rgba(58, 58, 58, 1);
      font-size: 13px;
      font-weight: 300;
    }

    /* SMS Bubble Styles - exact SmsBubbleComponent styles */
    .sms-bubble-container {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-radius: 8px 8px 0px 8px;
      border: 1px solid #BCBDF9;
      background: #F7F7FE;
      font-family: 'Roboto', sans-serif;
      max-width: 600px;
      width: 100%;
    }

    .sms-bubble-content {
      flex: 1;
    }

    .sms-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      background: #DADAFC;
      color: #6366F1;
    }

    .sms-icon i {
      font-size: 12px;
      font-weight: 400;
    }

    .sms-automated-badge {
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 27px;
      background: #DADAFC;
      color: #282960;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
      width: fit-content;
    }

    .sms-automated-badge svg {
      width: 17.5px;
      height: 14px;
      fill: currentColor;
    }

    /* Email Bubble Styles - exact AutomatedEmailBubbleComponent styles */
    .email-bubble-container {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-radius: 8px 8px 0px 8px;
      border: 1px solid #91B9DD;
      background: #F1FAFE;
      font-family: 'Roboto', sans-serif;
      max-width: 600px;
      width: 100%;
    }

    .email-bubble-content {
      flex: 1;
    }

    .email-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      background: #C7EBFB;
      color: #0E2E4B;
    }

    .email-icon i {
      font-size: 12px;
      font-weight: 900;
    }

    .automated-badge {
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 27px;
      background: #C7EBFB;
      color: #0E2E4B;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
      width: fit-content;
    }

    .automated-badge svg {
      width: 17.5px;
      height: 14px;
      fill: currentColor;
    }

    /* Upload Bubble Styles - exact UploadBubbleComponent styles */
    .upload-bubble-container {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-radius: 8px 8px 8px 0px;
      border: 1px solid #00BF30;
      background: #E5F9EA;
      font-family: 'Roboto', sans-serif;
      max-width: 600px;
      width: 100%;
    }

    .upload-bubble-content {
      flex: 1;
    }

    .upload-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 105px;
      background: #004C13;
      color: #FFF;
    }

    .upload-icon i {
      font-size: 12px;
      font-weight: 900;
    }

    .upload-method-badge {
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 27px;
      background: #004C13;
      color: #FFF;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
      width: fit-content;
    }

    .upload-status-badge {
      display: flex;
      padding: 4px 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 4px;
      background: #004C13;
      color: #E5F9EA;
      font-family: 'Roboto', sans-serif;
      width: fit-content;
    }

    /* Manual Email Bubble Styles - exact ManualEmailBubbleComponent styles */
    .manual-email-bubble-container {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      border-radius: 8px 8px 0px 8px;
      border: 1px solid #91B9DD;
      background: #F1FAFE;
      font-family: 'Roboto', sans-serif;
      max-width: 600px;
      width: 100%;
    }

    .manual-email-bubble-container.failed-state {
      background: #FBE9EA;
    }

    .manual-email-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      background: #C7EBFB;
      color: #0E2E4B;
    }

    .manual-email-icon.failed-state {
      background: #F8D2D5;
      color: #570C12;
    }

    .manual-email-icon i {
      font-size: 12px;
      font-weight: 900;
    }

    .user-badge {
      display: flex;
      padding: 4px 8px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 27px;
      background: #C7EBFB;
      color: #0E2E4B;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
      width: fit-content;
    }

    .user-badge.failed-state {
      background: #F8D2D5;
      color: #570C12;
    }

    .user-badge i {
      font-size: 12px;
      font-weight: 900;
    }

    .manual-email-status-badge {
      display: flex;
      padding: 4px 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 4px;
      width: fit-content;
      font-family: 'Roboto', sans-serif;
    }

    .manual-email-status-badge.sent {
      background: #CCF2D6;
      color: #004C13;
    }

    .manual-email-status-badge.failed {
      background: #F8D2D5;
      color: #570C12;
    }

    .manual-subject {
      color: #174A78;
    }

    /* Shared Badge and Status Styles */
    .badge-section {
      display: flex;
    }

    .status-and-menu {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .status-badge {
      display: flex;
      padding: 4px 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 4px;
      width: fit-content;
      font-family: 'Roboto', sans-serif;
    }

    .status-content {
      display: flex;
      align-items: center;
      gap: 5px;
      align-self: stretch;
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

    .status-badge.sent {
      background: #CCF2D6;
      color: #004C13;
    }

    .status-badge.workflow-stopped {
      background: #F1FAFE;
      color: #AE1923;
    }

    .status-badge i {
      font-size: 13px;
    }

    /* Field Styles */
    .sms-field, .email-field, .upload-field {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .field-label {
      color: #5A626F;
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      min-width: fit-content;
    }

    .field-value {
      color: #5A626F;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
    }

    .phone-number {
      font-weight: 700;
    }

    .uploader-name, .file-name {
      color: rgba(58, 58, 58, 1);
      font-size: 15px;
      font-weight: 700;
      line-height: normal;
    }

    .subject-line {
      color: #0E2E4B;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      margin-top: 4px;
    }

    .message-body {
      align-self: stretch;
      color: rgba(58, 58, 58, 1);
      font-size: 14px;
      font-weight: 300;
      line-height: normal;
      margin-top: 4px;
    }

    .upload-method {
      height: 16px;
      align-self: stretch;
      color: rgba(58, 58, 58, 1);
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
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
          <button class="filter-tab active" data-filter="all">
            <i class="fas fa-list tab-icon"></i>
            <span class="tab-label">All</span>
            <span class="tab-badge" id="all-badge">0</span>
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

  <script>
    // Live data - will be updated via postMessage
    let messages = ${JSON.stringify(messages)};
    let unreadCounts = ${JSON.stringify(unreadCounts)};
    let activeFilter = 'all';

    // Set up postMessage communication with parent window
    function setupParentCommunication() {
      // Listen for messages from parent window
      window.addEventListener('message', function(event) {
        if (event.source === window.opener) {
          handleParentMessage(event.data);
        }
      });

      // Notify parent that window is ready
      sendToParent({
        type: 'WINDOW_READY'
      });
    }

    // Handle messages from parent window
    function handleParentMessage(data) {
      switch (data.type) {
        case 'INITIAL_DATA':
          messages = data.payload.messages;
          unreadCounts = data.payload.unreadCounts;
          updateDisplay();
          break;
        case 'MESSAGES_UPDATED':
          messages = data.payload.messages;
          renderMessages();
          updateTabBadges();
          break;
        case 'UNREAD_COUNTS_UPDATED':
          unreadCounts = data.payload.unreadCounts;
          updateTabBadges();
          break;
        default:
          console.log('Unknown message from parent:', data);
      }
    }

    // Send message to parent window
    function sendToParent(message) {
      if (window.opener && !window.opener.closed) {
        try {
          window.opener.postMessage(message, '*');
        } catch (error) {
          console.error('Error sending message to parent:', error);
        }
      }
    }

    // Update the entire display
    function updateDisplay() {
      renderMessages();
      updateTabBadges();
      console.log('Display updated with live data:', messages.length, 'messages');
    }

    // Enhanced message click handler
    function handleMessageClick(messageId, messageType) {
      sendToParent({
        type: 'MESSAGE_CLICKED',
        payload: { messageId, messageType }
      });
    }

    // Enhanced message read handler
    function markMessageAsRead(messageId) {
      sendToParent({
        type: 'MESSAGE_READ',
        payload: { messageId }
      });
    }

    // Filter mapping - match the exact behavior of CommunicationPanel
    function getFilteredMessages() {
      switch (activeFilter) {
        case 'notes':
          return messages.filter(msg => msg.type === 'note');
        case 'emails':
          return messages.filter(msg => msg.type === 'automated-email' || msg.type === 'manual-email');
        case 'sms':
          return messages.filter(msg => msg.type === 'sms');
        case 'all':
        default:
          return messages;
      }
    }

    // Use live unread counts from parent
    function getCurrentUnreadCounts() {
      return unreadCounts;
    }

    // Render a note message using exact NoteBubbleComponent structure
    function renderNoteMessage(message) {
      const data = message.data;
      const isOwn = data.isOwnMessage;
      const timestamp = new Date(message.timestamp).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      return \`
        <div class="message-item-wrapper \${isOwn ? 'own-message-wrapper' : 'other-message-wrapper'}">
          <div class="bubble-container \${isOwn ? 'own-message' : 'other-message'}">
            <div class="bubble-content">
              <div class="bubble-header">
                <div class="bubble-avatar \${isOwn ? 'own-avatar' : 'other-avatar'}">
                  \${data.authorInitials || data.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="message-details">
                  <div class="header-row">
                    <span class="author-name">\${data.authorName || data.author}</span>
                    <button class="menu-button">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                  <div class="message-text">\${data.content}</div>
                  <div class="timestamp-container \${isOwn ? 'own-timestamp' : 'other-timestamp'}">
                    <span class="timestamp">\${timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // Render an SMS message using exact SmsBubbleComponent structure
    function renderSmsMessage(message) {
      const data = message.data;
      const timestamp = new Date(message.timestamp).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      return \`
        <div class="message-item-wrapper outbound-message-wrapper">
          <div class="sms-bubble-container">
            <div class="sms-bubble-content">
              <div class="bubble-header">
                <div class="sms-icon">
                  <i class="fa-solid fa-message"></i>
                </div>
                <div class="message-details">
                  <div class="header-row">
                    <div class="badge-section">
                      <div class="sms-automated-badge">
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.75 0.5C9.23398 0.5 9.625 0.891016 9.625 1.375V3.125H12.9062C13.9945 3.125 14.875 4.00547 14.875 5.09375V12.5312C14.875 13.6195 13.9945 14.5 12.9062 14.5H4.59375C3.50547 14.5 2.625 13.6195 2.625 12.5312V5.09375C2.625 4.00547 3.50547 3.125 4.59375 3.125H7.875V1.375C7.875 0.891016 8.26602 0.5 8.75 0.5ZM5.6875 11C5.44687 11 5.25 11.1969 5.25 11.4375C5.25 11.6781 5.44687 11.875 5.6875 11.875H6.5625C6.80313 11.875 7 11.6781 7 11.4375C7 11.1969 6.80313 11 6.5625 11H5.6875ZM8.3125 11C8.07187 11 7.875 11.1969 7.875 11.4375C7.875 11.6781 8.07187 11.875 8.3125 11.875H9.1875C9.42813 11.875 9.625 11.6781 9.625 11.4375C9.625 11.1969 9.42813 11 9.1875 11H8.3125ZM10.9375 11C10.6969 11 10.5 11.1969 10.5 11.4375C10.5 11.6781 10.6969 11.875 10.9375 11.875H11.8125C12.0531 11.875 12.25 11.6781 12.25 11.4375C12.25 11.1969 12.0531 11 11.8125 11H10.9375ZM7.21875 7.5C7.21875 7.20992 7.10352 6.93172 6.8984 6.7266C6.69328 6.52148 6.41508 6.40625 6.125 6.40625C5.83492 6.40625 5.55672 6.52148 5.3516 6.7266C5.14648 6.93172 5.03125 7.20992 5.03125 7.5C5.03125 7.79008 5.14648 8.06828 5.3516 8.2734C5.55672 8.47852 5.83492 8.59375 6.125 8.59375C6.41508 8.59375 6.69328 8.47852 6.8984 8.2734C7.10352 8.06828 7.21875 7.79008 7.21875 7.5ZM11.375 8.59375C11.6651 8.59375 11.9433 8.47852 12.1484 8.2734C12.3535 8.06828 12.4688 7.79008 12.4688 7.5C12.4688 7.20992 12.3535 6.93172 12.1484 6.7266C11.9433 6.52148 11.6651 6.40625 11.375 6.40625C11.0849 6.40625 10.8067 6.52148 10.6016 6.7266C10.3965 6.93172 10.2812 7.20992 10.2812 7.5C10.2812 7.79008 10.3965 8.06828 10.6016 8.2734C10.8067 8.47852 11.0849 8.59375 11.375 8.59375ZM1.3125 6.625H1.75V11.875H1.3125C0.587891 11.875 0 11.2871 0 10.5625V7.9375C0 7.21289 0.587891 6.625 1.3125 6.625ZM16.1875 6.625C16.9121 6.625 17.5 7.21289 17.5 7.9375V10.5625C17.5 11.2871 16.9121 11.875 16.1875 11.875H15.75V6.625H16.1875Z" fill="currentColor"/>
                        </svg>
                        <span>Automated</span>
                      </div>
                    </div>
                    <div class="status-and-menu">
                      <div class="status-badge sent">
                        <div class="status-content">
                          <i class="fa-solid fa-check"></i>
                          <span class="status-label">Sent:</span>
                          <span class="status-value">\${timestamp}</span>
                        </div>
                      </div>
                      <button class="menu-button">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </div>
                  </div>
                  <div class="sms-field">
                    <span class="field-label">To:</span>
                    <span class="field-value phone-number">\${data.toRecipients ? data.toRecipients.join(', ') : '+1 (999) 999-9999'}</span>
                  </div>
                  <div class="message-body">\${data.messageBody}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // Render an automated email message using exact AutomatedEmailBubbleComponent structure
    function renderAutomatedEmailMessage(message) {
      const data = message.data;
      const timestamp = new Date(message.timestamp).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const statusIcon = data.status === 'workflow-stopped' ? 'clipboard-check' : 'check';
      const statusLabel = data.status === 'workflow-stopped' ? 'Workflow Stopped' : 'Sent';
      const statusClass = data.status === 'workflow-stopped' ? 'workflow-stopped' : 'sent';

      return \`
        <div class="message-item-wrapper outbound-message-wrapper">
          <div class="email-bubble-container">
            <div class="email-bubble-content">
              <div class="bubble-header">
                <div class="email-icon">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="message-details">
                  <div class="header-row">
                    <div class="badge-section">
                      <div class="automated-badge">
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.75 0.5C9.23398 0.5 9.625 0.891016 9.625 1.375V3.125H12.9062C13.9945 3.125 14.875 4.00547 14.875 5.09375V12.5312C14.875 13.6195 13.9945 14.5 12.9062 14.5H4.59375C3.50547 14.5 2.625 13.6195 2.625 12.5312V5.09375C2.625 4.00547 3.50547 3.125 4.59375 3.125H7.875V1.375C7.875 0.891016 8.26602 0.5 8.75 0.5ZM5.6875 11C5.44687 11 5.25 11.1969 5.25 11.4375C5.25 11.6781 5.44687 11.875 5.6875 11.875H6.5625C6.80313 11.875 7 11.6781 7 11.4375C7 11.1969 6.80313 11 6.5625 11H5.6875ZM8.3125 11C8.07187 11 7.875 11.1969 7.875 11.4375C7.875 11.6781 8.07187 11.875 8.3125 11.875H9.1875C9.42813 11.875 9.625 11.6781 9.625 11.4375C9.625 11.1969 9.42813 11 9.1875 11H8.3125ZM10.9375 11C10.6969 11 10.5 11.1969 10.5 11.4375C10.5 11.6781 10.6969 11.875 10.9375 11.875H11.8125C12.0531 11.875 12.25 11.6781 12.25 11.4375C12.25 11.1969 12.0531 11 11.8125 11H10.9375ZM7.21875 7.5C7.21875 7.20992 7.10352 6.93172 6.8984 6.7266C6.69328 6.52148 6.41508 6.40625 6.125 6.40625C5.83492 6.40625 5.55672 6.52148 5.3516 6.7266C5.14648 6.93172 5.03125 7.20992 5.03125 7.5C5.03125 7.79008 5.14648 8.06828 5.3516 8.2734C5.55672 8.47852 5.83492 8.59375 6.125 8.59375C6.41508 8.59375 6.69328 8.47852 6.8984 8.2734C7.10352 8.06828 7.21875 7.79008 7.21875 7.5ZM11.375 8.59375C11.6651 8.59375 11.9433 8.47852 12.1484 8.2734C12.3535 8.06828 12.4688 7.79008 12.4688 7.5C12.4688 7.20992 12.3535 6.93172 12.1484 6.7266C11.9433 6.52148 11.6651 6.40625 11.375 6.40625C11.0849 6.40625 10.8067 6.52148 10.6016 6.7266C10.3965 6.93172 10.2812 7.20992 10.2812 7.5C10.2812 7.79008 10.3965 8.06828 10.6016 8.2734C10.8067 8.47852 11.0849 8.59375 11.375 8.59375ZM1.3125 6.625H1.75V11.875H1.3125C0.587891 11.875 0 11.2871 0 10.5625V7.9375C0 7.21289 0.587891 6.625 1.3125 6.625ZM16.1875 6.625C16.9121 6.625 17.5 7.21289 17.5 7.9375V10.5625C17.5 11.2871 16.9121 11.875 16.1875 11.875H15.75V6.625H16.1875Z" fill="currentColor"/>
                        </svg>
                        <span>Automated</span>
                      </div>
                    </div>
                    <div class="status-and-menu">
                      <div class="status-badge \${statusClass}">
                        <div class="status-content">
                          <i class="fa-solid fa-\${statusIcon}"></i>
                          <span class="status-label">\${statusLabel}:</span>
                          \${data.status !== 'workflow-stopped' ? \`<span class="status-value">\${timestamp}</span>\` : ''}
                        </div>
                      </div>
                      <button class="menu-button">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </div>
                  </div>
                  <div class="email-field">
                    <span class="field-label">From:</span>
                    <span class="field-value">\${data.fromAddress}</span>
                  </div>
                  <div class="email-field">
                    <span class="field-label">To:</span>
                    <span class="field-value">\${data.toRecipients.join(', ')}</span>
                  </div>
                  <div class="subject-line">\${data.subjectLine}</div>
                  <div class="message-body">\${data.messageBody}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // Render a manual email message using exact ManualEmailBubbleComponent structure
    function renderManualEmailMessage(message) {
      const data = message.data;
      const timestamp = new Date(message.timestamp).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const isFailed = data.status === 'failed';
      const statusIcon = isFailed ? 'triangle-exclamation' : 'check';
      const statusLabel = isFailed ? 'Failed' : 'Sent';
      const statusClass = isFailed ? 'failed' : 'sent';

      return \`
        <div class="message-item-wrapper outbound-message-wrapper">
          <div class="manual-email-bubble-container \${isFailed ? 'failed-state' : ''}">
            <div class="email-bubble-content">
              <div class="bubble-header">
                <div class="manual-email-icon \${isFailed ? 'failed-state' : ''}">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="message-details">
                  <div class="header-row">
                    <div class="badge-section">
                      <div class="user-badge \${isFailed ? 'failed-state' : ''}">
                        <i class="fa-solid fa-user"></i>
                        <span>\${data.authorName || data.fromUser}</span>
                      </div>
                    </div>
                    <div class="status-and-menu">
                      <div class="manual-email-status-badge \${statusClass}">
                        <div class="status-content">
                          <i class="fa-solid fa-\${statusIcon}"></i>
                          <span class="status-label">\${statusLabel}:</span>
                          <span class="status-value">\${timestamp}</span>
                        </div>
                      </div>
                      <button class="menu-button">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </div>
                  </div>
                  <div class="email-field">
                    <span class="field-label">From:</span>
                    <span class="field-value">\${data.fromAddress || data.fromUser}</span>
                  </div>
                  <div class="email-field">
                    <span class="field-label">To:</span>
                    <span class="field-value">\${data.toRecipients.join(', ')}</span>
                  </div>
                  <div class="subject-line manual-subject">\${data.subjectLine}</div>
                  <div class="message-body">\${data.messageBody}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // Render an upload message using exact UploadBubbleComponent structure
    function renderUploadMessage(message) {
      const data = message.data;
      const timestamp = new Date(message.timestamp).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      return \`
        <div class="message-item-wrapper upload-message-wrapper">
          <div class="upload-bubble-container">
            <div class="upload-bubble-content">
              <div class="bubble-header">
                <div class="upload-icon">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <div class="message-details">
                  <div class="header-row">
                    <div class="badge-section">
                      <div class="upload-method-badge">
                        <span>Upload Link</span>
                      </div>
                    </div>
                    <div class="status-and-menu">
                      <div class="upload-status-badge">
                        <div class="status-content">
                          <span class="status-label">Uploaded:</span>
                          <span class="status-value">\${timestamp}</span>
                        </div>
                      </div>
                      <button class="menu-button">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </div>
                  </div>
                  <div class="upload-field">
                    <span class="field-label">Uploaded by:</span>
                    <span class="field-value uploader-name">\${data.uploader}</span>
                  </div>
                  <div class="upload-field">
                    <span class="field-label">Client uploaded document:</span>
                    <span class="field-value file-name">\${data.filename}</span>
                  </div>
                  <div class="upload-method">
                    Upload method: \${data.uploadMethod === 'upload-link' ? 'Upload Link' : data.uploadMethod}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // Render messages
    function renderMessages() {
      const container = document.getElementById('message-list');
      const filteredMessages = getFilteredMessages();

      if (filteredMessages.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--surface-700); padding: 40px; font-style: italic;">No messages found for this filter.</div>';
        return;
      }

      const messagesHtml = filteredMessages.map(message => {
        switch (message.type) {
          case 'note':
            return renderNoteMessage(message);
          case 'sms':
            return renderSmsMessage(message);
          case 'automated-email':
            return renderAutomatedEmailMessage(message);
          case 'manual-email':
            return renderManualEmailMessage(message);
          case 'upload':
            return renderUploadMessage(message);
          case 'manual-email':
            return renderManualEmailMessage(message);
          default:
            return '<div>Unknown message type</div>';
        }
      }).join('');

      container.innerHTML = messagesHtml;
    }

    // Update tab badges with live unread counts
    function updateTabBadges() {
      const counts = getCurrentUnreadCounts();

      // Update badges
      const allBadge = document.getElementById('all-badge');
      const notesBadge = document.getElementById('notes-badge');
      const emailsBadge = document.getElementById('emails-badge');
      const smsBadge = document.getElementById('sms-badge');

      if (allBadge) {
        allBadge.textContent = counts.all;
        allBadge.style.display = counts.all > 0 ? 'flex' : 'none';
      }

      if (notesBadge) {
        notesBadge.textContent = counts.notes;
        notesBadge.style.display = counts.notes > 0 ? 'flex' : 'none';
      }

      if (emailsBadge) {
        emailsBadge.textContent = counts.emails;
        emailsBadge.style.display = counts.emails > 0 ? 'flex' : 'none';
      }

      if (smsBadge) {
        smsBadge.textContent = counts.sms;
        smsBadge.style.display = counts.sms > 0 ? 'flex' : 'none';
      }
    }

    // Handle filter changes with parent notification
    function setFilter(filter) {
      activeFilter = filter;

      // Update active tab
      document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      const targetTab = document.querySelector(\`[data-filter="\${filter}"]\`);
      if (targetTab) {
        targetTab.classList.add('active');
      }

      // Show/hide compose button for emails
      const composeBtn = document.getElementById('compose-btn');
      if (composeBtn) {
        if (filter === 'emails') {
          composeBtn.style.display = 'flex';
        } else {
          composeBtn.style.display = 'none';
        }
      }

      // Re-render messages
      renderMessages();

      // Notify parent of filter change
      sendToParent({
        type: 'FILTER_CHANGED',
        payload: { filter }
      });

      console.log('Filter changed to:', filter);
    }

    // Enhanced compose button handler
    function handleComposeEmail() {
      sendToParent({
        type: 'COMPOSE_EMAIL'
      });
    }

    // Set up event listeners
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const filter = this.dataset.filter;
        setFilter(filter);
      });
    });

    // Add event listener for compose button
    document.addEventListener('DOMContentLoaded', function() {
      const composeBtn = document.getElementById('compose-btn');
      if (composeBtn) {
        composeBtn.addEventListener('click', handleComposeEmail);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        window.close();
      }
    });

    // Initialize communication and display
    setupParentCommunication();

    // Initial render with current data
    updateDisplay();

    console.log('Message Center expanded window initialized with live data sync');
    console.log('Initial data loaded:', messages.length, 'messages');
  </script>
</body>
</html>`;
  }

  ngOnDestroy(): void {
    this.closeWindow();
  }
}
