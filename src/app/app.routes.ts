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
    path: 'components/wfai-approved-container',
    loadComponent: () => import('./pages/components/wfai-approved-container/wfai-approved-container.component').then(m => m.WFAIApprovedContainerDocComponent)
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
