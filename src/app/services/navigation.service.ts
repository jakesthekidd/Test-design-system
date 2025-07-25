import { Injectable } from '@angular/core';

export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  route: string;
  tags: string[];
}

export interface NavigationCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  components: ComponentItem[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private categories: NavigationCategory[] = [
    {
      id: 'form',
      name: 'Form',
      icon: 'fas fa-edit',
      description: 'Form components for user input and data collection',
      components: [
        {
          id: 'button',
          name: 'Button',
          description: 'Interactive buttons with multiple variants and states',
          route: '/components/button',
          tags: ['action', 'click', 'submit', 'interactive']
        },
        {
          id: 'input',
          name: 'Input Text',
          description: 'Text input fields with validation and styling',
          route: '/components/input',
          tags: ['form', 'text', 'input', 'field']
        },
        {
          id: 'checkbox',
          name: 'Checkbox',
          description: 'Binary choice input component',
          route: '/components/checkbox',
          tags: ['form', 'boolean', 'selection']
        },
        {
          id: 'radio',
          name: 'Radio Button',
          description: 'Single selection from multiple options',
          route: '/components/radio',
          tags: ['form', 'selection', 'single-choice']
        },
        {
          id: 'prev-next-button',
          name: 'WFAI Previous/Next Button',
          description: 'Navigation component for moving between work items with dropdown history',
          route: '/components/prev-next-button',
          tags: ['navigation', 'workflow', 'history', 'dropdown', 'wfai']
        },
        {
          id: 'wfai-approved-container',
          name: 'WFAI Approved Container',
          description: 'Hierarchical container for document approval workflows with nested panels',
          route: '/components/wfai-approved-container',
          tags: ['container', 'approval', 'workflow', 'nested', 'documents', 'wfai']
        }
      ]
    },
    {
      id: 'data',
      name: 'Data',
      icon: 'fas fa-table',
      description: 'Components for displaying and organizing data',
      components: [
        {
          id: 'table',
          name: 'Table',
          description: 'Data table with sorting, filtering, and pagination',
          route: '/components/table',
          tags: ['data', 'grid', 'list', 'tabular']
        },
        {
          id: 'card',
          name: 'Card',
          description: 'Container for related content and actions',
          route: '/components/card',
          tags: ['container', 'content', 'layout']
        }
      ]
    },
    {
      id: 'panel',
      name: 'Panel',
      icon: 'fas fa-window-maximize',
      description: 'Layout and container components',
      components: [
        {
          id: 'accordion',
          name: 'Accordion',
          description: 'Collapsible content panels',
          route: '/components/accordion',
          tags: ['collapse', 'expand', 'content']
        },
        {
          id: 'tabs',
          name: 'Tabs',
          description: 'Tabbed interface for organizing content',
          route: '/components/tabs',
          tags: ['navigation', 'content', 'organization']
        }
      ]
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: 'fas fa-comments',
      description: 'Messaging and communication components',
      components: [
        {
          id: 'note-bubble',
          name: 'Note Bubble',
          description: 'Message bubbles for threaded conversations and internal notes',
          route: '/components/note-bubble',
          tags: ['messaging', 'chat', 'notes', 'conversation', 'bubble']
        },
        {
          id: 'automated-email-bubble',
          name: 'Automated Email Bubble',
          description: 'System-triggered email communications with delivery status tracking',
          route: '/components/automated-email-bubble',
          tags: ['email', 'automation', 'status', 'workflow', 'communication', 'messaging']
        },
        {
          id: 'status-badges',
          name: 'Status Badges',
          description: 'Reusable status indicators for communication types including SMS and email',
          route: '/components/status-badges',
          tags: ['status', 'badges', 'indicators', 'automation', 'communication']
        },
        {
          id: 'sms-bubble',
          name: 'SMS Bubble',
          description: 'Automated SMS message display with delivery status tracking and indigo styling',
          route: '/components/sms-bubble',
          tags: ['sms', 'messaging', 'automation', 'status', 'workflow', 'communication']
        },
        {
          id: 'manual-email-bubble',
          name: 'Manual Email Bubble',
          description: 'User-composed email messages with author identification and sent/failed status tracking',
          route: '/components/manual-email-bubble',
          tags: ['email', 'manual', 'user', 'status', 'failed', 'communication', 'messaging']
        },
        {
          id: 'upload-bubble',
          name: 'Upload Bubble',
          description: 'Document upload confirmations with method tracking and uploader identification',
          route: '/components/upload-bubble',
          tags: ['upload', 'documents', 'files', 'confirmation', 'communication', 'workflow']
        },
        {
          id: 'notification-fab',
          name: 'Notification FAB',
          description: 'Floating action button for global Message Center access with notification badges',
          route: '/components/notification-fab',
          tags: ['fab', 'floating', 'notification', 'badge', 'message-center', 'button', 'communication']
        },
        {
          id: 'message-center-header',
          name: 'Message Center Header',
          description: 'Sticky header component for Message Center with filter tabs and action buttons',
          route: '/components/message-center-header',
          tags: ['header', 'tabs', 'filter', 'message-center', 'sticky', 'communication', 'navigation']
        },
        {
          id: 'communication-panel',
          name: 'Communication Panel',
          description: 'Slide-up drawer panel with message feed and filtering for desktop Message Center',
          route: '/components/communication-panel',
          tags: ['panel', 'drawer', 'message-center', 'slide-up', 'communication', 'feed', 'desktop']
        },
        {
          id: 'message-center-expanded',
          name: 'Message Center Expanded',
          description: 'Window-based Message Center that launches in a separate browser window for multi-monitor workflows',
          route: '/components/message-center-expanded',
          tags: ['window', 'message-center', 'expanded', 'multi-monitor', 'communication', 'detached']
        }
      ]
    },
    {
      id: 'demo',
      name: 'Demo',
      icon: 'fas fa-play-circle',
      description: 'Interactive demos and workflows',
      components: [
        {
          id: 'communication-demo',
          name: 'Communication Demo',
          description: 'End-to-end communication flow demonstration: FAB → Panel → Expanded Window with state synchronization',
          route: '/communication-demo',
          tags: ['demo', 'workflow', 'communication', 'fab', 'panel', 'expanded', 'state-sync', 'end-to-end']
        }
      ]
    },
    {
      id: 'overlay',
      name: 'Overlay',
      icon: 'fas fa-layer-group',
      description: 'Overlay and modal components',
      components: [
        {
          id: 'dialog',
          name: 'Dialog',
          description: 'Modal dialogs for user interaction',
          route: '/components/dialog',
          tags: ['modal', 'popup', 'overlay']
        },
        {
          id: 'tooltip',
          name: 'Tooltip',
          description: 'Contextual information overlay',
          route: '/components/tooltip',
          tags: ['help', 'information', 'overlay']
        }
      ]
    },
    {
      id: 'foundation',
      name: 'Foundation',
      icon: 'fas fa-palette',
      description: 'Design tokens, colors, and typography',
      components: [
        {
          id: 'colors',
          name: 'Colors',
          description: 'Color palette and design tokens',
          route: '/foundation/colors',
          tags: ['design-tokens', 'palette', 'theming']
        },
        {
          id: 'typography',
          name: 'Typography',
          description: 'Font styles, sizes, and text components',
          route: '/foundation/typography',
          tags: ['text', 'fonts', 'headings']
        },
        {
          id: 'spacing',
          name: 'Spacing',
          description: 'Spacing scale and layout guidelines',
          route: '/foundation/spacing',
          tags: ['layout', 'margins', 'padding']
        }
      ]
    }
  ];

  getCategories(): NavigationCategory[] {
    return this.categories;
  }

  getAllComponents(): ComponentItem[] {
    return this.categories.flatMap(category => category.components);
  }

  searchComponents(query: string): ComponentItem[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getAllComponents().filter(component => 
      component.name.toLowerCase().includes(lowercaseQuery) ||
      component.description.toLowerCase().includes(lowercaseQuery) ||
      component.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  getComponentById(id: string): ComponentItem | undefined {
    return this.getAllComponents().find(component => component.id === id);
  }

  getCategoryById(id: string): NavigationCategory | undefined {
    return this.categories.find(category => category.id === id);
  }
}
