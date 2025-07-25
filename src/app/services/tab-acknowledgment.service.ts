import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterType } from '../pages/components/message-center-header/message-center-header.component';

@Injectable({
  providedIn: 'root'
})
export class TabAcknowledgmentService {
  private acknowledgedTabsSubject = new BehaviorSubject<Set<FilterType>>(new Set());
  public acknowledgedTabs$ = this.acknowledgedTabsSubject.asObservable();

  /**
   * Mark a tab as acknowledged (badge dismissed) for this session
   */
  acknowledgeTab(tab: FilterType): void {
    const currentAcknowledged = this.acknowledgedTabsSubject.value;
    const updated = new Set(currentAcknowledged);
    updated.add(tab);
    this.acknowledgedTabsSubject.next(updated);
    
    console.log(`Tab '${tab}' acknowledged - badge dismissed for session`);
  }

  /**
   * Check if a tab has been acknowledged in this session
   */
  isTabAcknowledged(tab: FilterType): boolean {
    return this.acknowledgedTabsSubject.value.has(tab);
  }

  /**
   * Get all acknowledged tabs
   */
  getAcknowledgedTabs(): Set<FilterType> {
    return new Set(this.acknowledgedTabsSubject.value);
  }

  /**
   * Reset acknowledgments (useful for testing or when new messages arrive)
   */
  resetAcknowledgments(): void {
    this.acknowledgedTabsSubject.next(new Set());
    console.log('All tab acknowledgments reset');
  }

  /**
   * Reset acknowledgment for a specific tab (when new unread messages arrive)
   */
  resetTabAcknowledgment(tab: FilterType): void {
    const currentAcknowledged = this.acknowledgedTabsSubject.value;
    const updated = new Set(currentAcknowledged);
    updated.delete(tab);
    this.acknowledgedTabsSubject.next(updated);
    
    console.log(`Tab '${tab}' acknowledgment reset - badge may reappear`);
  }

  /**
   * Determine if a badge should be shown for a tab
   * Badge shows if: tab has unread count > 0 AND tab hasn't been acknowledged
   */
  shouldShowBadge(tab: FilterType, unreadCount: number): boolean {
    return unreadCount > 0 && !this.isTabAcknowledged(tab);
  }
}
