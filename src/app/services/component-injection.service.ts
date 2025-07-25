import { Injectable, ComponentRef, ViewContainerRef, Injector, createComponent, EnvironmentInjector } from '@angular/core';
import { CommunicationMessage } from '../pages/components/communication-panel/communication-panel.component';
import { NoteBubbleComponent } from '../pages/components/note-bubble/note-bubble.component';
import { SmsBubbleComponent } from '../pages/components/sms-bubble/sms-bubble.component';
import { AutomatedEmailBubbleComponent } from '../pages/components/automated-email-bubble/automated-email-bubble.component';
import { ManualEmailBubbleComponent } from '../pages/components/manual-email-bubble/manual-email-bubble.component';
import { UploadBubbleComponent } from '../pages/components/upload-bubble/upload-bubble.component';

export interface ComponentInjectionConfig {
  injector: Injector;
  environmentInjector: EnvironmentInjector;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentInjectionService {
  private injectionConfig: ComponentInjectionConfig | null = null;

  /**
   * Initialize the component injection system with Angular dependencies
   */
  initialize(config: ComponentInjectionConfig): void {
    this.injectionConfig = config;
  }

  /**
   * Create component HTML string for injection into child window
   */
  createComponentHTML(message: CommunicationMessage): string {
    if (!this.injectionConfig) {
      console.error('ComponentInjectionService not initialized');
      return this.createFallbackHTML(message);
    }

    try {
      return this.renderComponentToHTML(message);
    } catch (error) {
      console.error('Error rendering component:', error);
      return this.createFallbackHTML(message);
    }
  }

  /**
   * Render Angular component to HTML string
   */
  private renderComponentToHTML(message: CommunicationMessage): string {
    const componentClass = this.getComponentClass(message.type);
    if (!componentClass) {
      return this.createFallbackHTML(message);
    }

    // Create component instance
    const componentRef = createComponent(componentClass, {
      environmentInjector: this.injectionConfig!.environmentInjector
    });

    // Set component inputs based on message type
    this.setComponentInputs(componentRef, message);

    // Trigger change detection
    componentRef.changeDetectorRef.detectChanges();

    // Get the rendered HTML
    const htmlElement = componentRef.location.nativeElement as HTMLElement;
    const renderedHTML = htmlElement.outerHTML;

    // Clean up
    componentRef.destroy();

    // Wrap in message container
    return this.wrapInContainer(renderedHTML, message);
  }

  /**
   * Get the appropriate component class for message type
   */
  private getComponentClass(messageType: string): any {
    switch (messageType) {
      case 'note':
        return NoteBubbleComponent;
      case 'sms':
        return SmsBubbleComponent;
      case 'automated-email':
        return AutomatedEmailBubbleComponent;
      case 'manual-email':
        return ManualEmailBubbleComponent;
      case 'upload':
        return UploadBubbleComponent;
      default:
        return null;
    }
  }

  /**
   * Set component inputs based on message data
   */
  private setComponentInputs(componentRef: ComponentRef<any>, message: CommunicationMessage): void {
    const component = componentRef.instance;

    switch (message.type) {
      case 'note':
        component.noteData = {
          authorInitials: message.data.authorInitials || message.data.author?.split(' ').map((n: string) => n[0]).join(''),
          authorName: message.data.authorName || message.data.author,
          timestamp: this.formatTimestamp(message.timestamp),
          content: message.data.content,
          isOwnMessage: message.data.isOwnMessage || false
        };
        break;

      case 'sms':
        component.smsData = {
          toNumber: message.data.toRecipients?.join(', ') || message.data.toNumber || '+1 (999) 999-9999',
          messageBody: message.data.messageBody,
          status: message.data.status || 'sent',
          timestamp: this.formatTimestamp(message.timestamp)
        };
        break;

      case 'automated-email':
        component.emailData = {
          fromAddress: message.data.fromAddress,
          toRecipients: message.data.toRecipients || [],
          subjectLine: message.data.subjectLine,
          messageBody: message.data.messageBody,
          status: message.data.status || 'sent',
          timestamp: this.formatTimestamp(message.timestamp)
        };
        break;

      case 'manual-email':
        component.emailData = {
          authorName: message.data.authorName || message.data.fromUser,
          fromAddress: message.data.fromAddress || message.data.fromUser,
          toRecipients: message.data.toRecipients || [],
          subjectLine: message.data.subjectLine,
          messageBody: message.data.messageBody,
          status: message.data.status || 'sent',
          timestamp: this.formatTimestamp(message.timestamp)
        };
        break;

      case 'upload':
        component.uploadData = {
          uploaderName: message.data.uploader,
          fileName: message.data.filename,
          uploadMethod: message.data.uploadMethod || 'upload-link',
          timestamp: this.formatTimestamp(message.timestamp)
        };
        break;
    }

    // Set up event handlers
    if (component.menuClick) {
      component.menuClick.subscribe(() => {
        this.sendMessageToParent({
          type: 'COMPONENT_MENU_CLICKED',
          payload: { messageId: message.id, messageType: message.type }
        });
      });
    }
  }

  /**
   * Wrap component HTML in proper container structure
   */
  private wrapInContainer(componentHTML: string, message: CommunicationMessage): string {
    const isOwn = message.data.isOwnMessage;
    const isOutbound = ['sms', 'automated-email', 'manual-email', 'upload'].includes(message.type);
    
    let wrapperClass = 'message-item-wrapper';
    if (message.type === 'note') {
      wrapperClass += isOwn ? ' own-message-wrapper' : ' other-message-wrapper';
    } else if (isOutbound) {
      wrapperClass += ' outbound-message-wrapper';
    } else {
      wrapperClass += ' upload-message-wrapper';
    }

    return `
      <div class="${wrapperClass}" data-message-id="${message.id}">
        ${componentHTML}
      </div>
    `;
  }

  /**
   * Create fallback HTML when component rendering fails
   */
  private createFallbackHTML(message: CommunicationMessage): string {
    const timestamp = this.formatTimestamp(message.timestamp);
    
    return `
      <div class="message-item-wrapper fallback-message" data-message-id="${message.id}">
        <div class="fallback-container">
          <div class="fallback-header">
            <span class="fallback-type">${message.type.toUpperCase()}</span>
            <span class="fallback-timestamp">${timestamp}</span>
          </div>
          <div class="fallback-content">
            ${this.getFallbackContent(message)}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get fallback content for each message type
   */
  private getFallbackContent(message: CommunicationMessage): string {
    switch (message.type) {
      case 'note':
        return `<strong>${message.data.author}:</strong> ${message.data.content}`;
      case 'sms':
        return `SMS to ${message.data.toRecipients?.join(', ')}: ${message.data.messageBody}`;
      case 'automated-email':
      case 'manual-email':
        return `<strong>${message.data.subjectLine}</strong><br>${message.data.messageBody}`;
      case 'upload':
        return `File uploaded: ${message.data.filename} by ${message.data.uploader}`;
      default:
        return 'Unknown message type';
    }
  }

  /**
   * Format timestamp for display
   */
  private formatTimestamp(timestamp: Date): string {
    return new Date(timestamp).toLocaleString([], {
      month: 'short',
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  /**
   * Send message to parent window
   */
  private sendMessageToParent(message: any): void {
    if (typeof window !== 'undefined' && window.opener && !window.opener.closed) {
      try {
        window.opener.postMessage(message, '*');
      } catch (error) {
        console.error('Error sending message to parent:', error);
      }
    }
  }

  /**
   * Generate component styles for injection
   */
  generateComponentStyles(): string {
    return `
      <style>
        /* Component injection styles */
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

        /* Fallback message styles */
        .fallback-message {
          justify-content: flex-start;
          padding: 16px;
        }

        .fallback-container {
          display: flex;
          flex-direction: column;
          padding: 16px;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          max-width: 600px;
          width: 100%;
        }

        .fallback-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .fallback-type {
          background: #6c757d;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .fallback-timestamp {
          font-size: 12px;
          color: #6c757d;
        }

        .fallback-content {
          font-size: 14px;
          line-height: 1.4;
          color: #333;
        }

        /* Component wrapper adjustments */
        app-note-bubble,
        app-sms-bubble,
        app-automated-email-bubble,
        app-manual-email-bubble,
        app-upload-bubble {
          width: 100%;
          max-width: 100%;
        }
      </style>
    `;
  }
}
