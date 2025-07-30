import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent)
  },
  {
    path: 'installation',
    loadComponent: () => import('./pages/installation/installation.component').then(m => m.InstallationComponent)
  },
  {
    path: 'components/button',
    loadComponent: () => import('./pages/components/button/button.component').then(m => m.ButtonDocComponent)
  },
  {
    path: 'components/input',
    loadComponent: () => import('./pages/components/input/input.component').then(m => m.InputDocComponent)
  },
  {
    path: 'components/search-input',
    loadComponent: () => import('./pages/components/search-input/search-input.component').then(m => m.SearchInputDocComponent)
  },
  {
    path: 'components/table',
    loadComponent: () => import('./pages/components/table/table.component').then(m => m.TableDocComponent)
  },
  {
    path: 'components/card',
    loadComponent: () => import('./pages/components/card/card.component').then(m => m.CardDocComponent)
  },
  {
    path: 'components/prev-next-button',
    loadComponent: () => import('./pages/components/prev-next-button/prev-next-button.component').then(m => m.PrevNextButtonDocComponent)
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./pages/components/checkbox/checkbox.component').then(m => m.CheckboxDocComponent)
  },
  {
    path: 'components/radio',
    loadComponent: () => import('./pages/components/radio/radio.component').then(m => m.RadioDocComponent)
  },
  {
    path: 'components/accordion',
    loadComponent: () => import('./pages/components/accordion/accordion.component').then(m => m.AccordionDocComponent)
  },
  {
    path: 'components/tabs',
    loadComponent: () => import('./pages/components/tabs/tabs.component').then(m => m.TabsDocComponent)
  },
  {
    path: 'components/note-bubble',
    loadComponent: () => import('./pages/components/note-bubble/note-bubble.component').then(m => m.NoteBubbleDocComponent)
  },
  {
    path: 'components/automated-email-bubble',
    loadComponent: () => import('./pages/components/automated-email-bubble/automated-email-bubble.component').then(m => m.AutomatedEmailBubbleDocComponent)
  },
  {
    path: 'components/status-badges',
    loadComponent: () => import('./pages/components/status-badges/status-badges.component').then(m => m.StatusBadgesDocComponent)
  },
  {
    path: 'components/sms-bubble',
    loadComponent: () => import('./pages/components/sms-bubble/sms-bubble.component').then(m => m.SmsBubbleDocComponent)
  },
  {
    path: 'components/manual-email-bubble',
    loadComponent: () => import('./pages/components/manual-email-bubble/manual-email-bubble.component').then(m => m.ManualEmailBubbleDocComponent)
  },
  {
    path: 'components/upload-bubble',
    loadComponent: () => import('./pages/components/upload-bubble/upload-bubble.component').then(m => m.UploadBubbleDocComponent)
  },
  {
    path: 'components/notification-fab',
    loadComponent: () => import('./pages/components/notification-fab/notification-fab.component').then(m => m.NotificationFabDocsComponent)
  },
  {
    path: 'components/message-center-header',
    loadComponent: () => import('./pages/components/message-center-header/message-center-header.component').then(m => m.MessageCenterHeaderDocsComponent)
  },
  {
    path: 'components/communication-panel',
    loadComponent: () => import('./pages/components/communication-panel/communication-panel.component').then(m => m.CommunicationPanelDocsComponent)
  },
  {
    path: 'components/message-center-expanded',
    loadComponent: () => import('./pages/components/message-center-expanded/message-center-expanded.component').then(m => m.MessageCenterExpandedDocsComponent)
  },
  {
    path: 'components/wfai-approved-container',
    loadComponent: () => import('./pages/components/wfai-approved-container/wfai-approved-container.component').then(m => m.WFAIApprovedContainerDocComponent)
  },
  {
    path: 'communication-demo',
    loadComponent: () => import('./pages/communication-demo/communication-demo.component').then(m => m.CommunicationDemoComponent)
  },
  {
    path: 'foundation/colors',
    loadComponent: () => import('./pages/foundation/colors/colors.component').then(m => m.ColorsComponent)
  },
  {
    path: 'foundation/typography',
    loadComponent: () => import('./pages/foundation/typography/typography.component').then(m => m.TypographyComponent)
  },
  {
    path: '**',
    redirectTo: '/overview'
  }
];
