import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommunicationMessage } from '../pages/components/communication-panel/communication-panel.component';
import { FilterType } from '../pages/components/message-center-header/message-center-header.component';
import { MessageCenterStateService } from './message-center-state.service';

@Injectable({
  providedIn: 'root'
})
export class MessageDataService {
  private messagesSubject = new BehaviorSubject<CommunicationMessage[]>([]);
  private unreadCountsSubject = new BehaviorSubject<{ [key in FilterType]: number }>({
    notes: 0,
    emails: 0,
    sms: 0,
    all: 0
  });

  public messages$ = this.messagesSubject.asObservable();
  public unreadCounts$ = this.unreadCountsSubject.asObservable();

  constructor(private stateService: MessageCenterStateService) {
    this.initializeData();
  }

  /**
   * Gets current messages
   */
  getMessages(): CommunicationMessage[] {
    return this.messagesSubject.value;
  }

  /**
   * Gets current unread counts
   */
  getUnreadCounts(): { [key in FilterType]: number } {
    return this.unreadCountsSubject.value;
  }

  /**
   * Updates a message (e.g., mark as read)
   */
  updateMessage(messageId: string, updates: Partial<CommunicationMessage>): void {
    const messages = this.messagesSubject.value;
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex !== -1) {
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], ...updates };

      this.messagesSubject.next(updatedMessages);
      this.updateUnreadCounts();

      // Sync with state service
      this.stateService.updateState({
        messages: updatedMessages,
        unreadCounts: this.unreadCountsSubject.value
      });
    }
  }

  /**
   * Adds a new message
   */
  addMessage(message: CommunicationMessage): void {
    const messages = this.messagesSubject.value;
    const updatedMessages = [...messages, message];

    this.messagesSubject.next(updatedMessages);
    this.updateUnreadCounts();

    // Sync with state service
    this.stateService.updateState({
      messages: updatedMessages,
      unreadCounts: this.unreadCountsSubject.value
    });
  }

  /**
   * Marks all messages as read
   */
  markAllAsRead(): void {
    const messages = this.messagesSubject.value;
    const updatedMessages = messages.map(m => ({ ...m, isRead: true }));

    this.messagesSubject.next(updatedMessages);
    this.updateUnreadCounts();

    // Sync with state service
    this.stateService.updateState({
      messages: updatedMessages,
      unreadCounts: this.unreadCountsSubject.value
    });
  }

  /**
   * Initialize with sample data identical to CommunicationPanel docs
   */
  private initializeData(): void {
    const sampleMessages: CommunicationMessage[] = [
      {
        id: '1',
        type: 'note',
        timestamp: new Date('2024-08-01T09:00:00'),
        isRead: false,
        data: {
          author: 'Jake Cummings',
          content: 'A BOL document is like the passport for a shipment; it tells you everything you need to know about where it\'s coming from, where it\'s going, and what\'s inside.',
          timestamp: '2024-08-02T09:00:00',
          isOwnMessage: false
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
          isOwnMessage: true
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
      },
      {
        id: '7',
        type: 'automated-email',
        timestamp: new Date('2024-08-02T13:45:00'),
        isRead: true,
        data: {
          fromAddress: 'notifications@logistics.com',
          toRecipients: ['warehouse@company.com'],
          subjectLine: 'Workflow Stopped - Manual Review Required',
          messageBody: 'The automated processing workflow has been stopped due to missing documentation. Please review and take appropriate action.',
          status: 'workflow-stopped',
          timestamp: '2024-08-02T13:45:00'
        }
      },
      {
        id: '8',
        type: 'sms',
        timestamp: new Date('2024-08-02T14:20:00'),
        isRead: true,
        data: {
          toRecipients: ['+1 (555) 123-4567'],
          messageBody: 'Delivery attempt failed. Customer not available. Will retry tomorrow between 9 AM - 5 PM.',
          status: 'workflow-stopped',
          timestamp: '2024-08-02T14:20:00'
        }
      },
      {
        id: '9',
        type: 'note',
        timestamp: new Date('2024-08-02T15:10:00'),
        isRead: false,
        data: {
          author: 'Mike Chen',
          content: 'Customer called to reschedule delivery. Updated delivery window to Aug 3rd, 10 AM - 2 PM. Driver has been notified.',
          timestamp: '2024-08-02T15:10:00',
          isOwnMessage: false
        }
      },
      {
        id: '10',
        type: 'upload',
        timestamp: new Date('2024-08-02T16:00:00'),
        isRead: true,
        data: {
          uploader: 'client@business.com',
          filename: 'Delivery_Authorization.pdf',
          uploadMethod: 'platform',
          status: 'uploaded',
          timestamp: '2024-08-02T16:00:00'
        }
      }
    ];

    this.messagesSubject.next(sampleMessages);
    this.updateUnreadCounts();

    // Initialize state service with sample data
    this.stateService.updateState({
      messages: sampleMessages,
      unreadCounts: this.unreadCountsSubject.value
    });
  }

  /**
   * Recalculates unread counts based on current messages
   */
  private updateUnreadCounts(): void {
    const messages = this.messagesSubject.value;
    const counts = { notes: 0, emails: 0, sms: 0, all: 0 };

    messages.forEach(message => {
      if (!message.isRead) {
        counts.all++;
        switch (message.type) {
          case 'note':
            counts.notes++;
            break;
          case 'automated-email':
          case 'manual-email':
            counts.emails++;
            break;
          case 'sms':
            counts.sms++;
            break;
        }
      }
    });

    this.unreadCountsSubject.next(counts);
  }
}
