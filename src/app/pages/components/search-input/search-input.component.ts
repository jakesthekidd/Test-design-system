import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

export interface SearchInputConfig {
  placeholder?: string;
  disabled?: boolean;
  showClearButton?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface SearchOption {
  id: string;
  label: string;
  description?: string;
  category?: string;
  icon?: string;
}

export interface SearchAutocompleteConfig extends SearchInputConfig {
  options?: SearchOption[];
  maxResults?: number;
  showCategories?: boolean;
  highlightMatches?: boolean;
  minSearchLength?: number;
}

// Main Search Input Component
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, TooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true
    }
  ],
  template: `
    <div class="search-input-container" [class.has-value]="value" [class.disabled]="disabled">
      <div class="search-input-wrapper">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          #searchInput
          type="text"
          class="search-input"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown.enter)="onEnter()"
          (keydown.escape)="onEscape()"
        />
        <button
          *ngIf="showClearButton && value"
          type="button"
          class="clear-button"
          (click)="onClear()"
          pTooltip="Clear search"
          tooltipPosition="top"
        >
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-input-container {
      position: relative;
      width: 100%;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      padding: 12px 17px;
      border-radius: 4px;
      border: 1px solid var(--surface-700, #8D9AAE);
      background: var(--surface-0, #FFF);
      gap: 10px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .search-input-container:focus-within .search-input-wrapper {
      border-color: #72CDF4;
      box-shadow: 0 0 0 2px #D3E3F1;
    }

    .search-input-container.has-value .search-input-wrapper {
      border-color: #72CDF4;
    }

    .search-input-container.disabled .search-input-wrapper {
      background: var(--surface-100, #F7F8F9);
      border-color: var(--surface-300, #C6CCD6);
      cursor: not-allowed;
    }

    .search-icon {
      color: var(--surface-700, #8D9AAE);
      font-size: 16px;
      font-weight: 900;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--surface-900, #3D3D3D);
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: normal;
      min-width: 0;
    }

    .search-input::placeholder {
      color: #C6CCD6;
    }

    .search-input:disabled {
      cursor: not-allowed;
      color: var(--surface-500, #A9B3C2);
    }

    .clear-button {
      background: none;
      border: none;
      color: var(--surface-700, #8D9AAE);
      font-size: 16px;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
      flex-shrink: 0;
    }

    .clear-button:hover {
      color: var(--surface-900, #3D3D3D);
    }

    .clear-button:focus {
      outline: 2px solid #72CDF4;
      outline-offset: 2px;
      border-radius: 2px;
    }

    /* Size variants */
    .search-input-container.size-small .search-input-wrapper {
      padding: 8px 12px;
    }

    .search-input-container.size-small .search-icon,
    .search-input-container.size-small .clear-button {
      font-size: 14px;
    }

    .search-input-container.size-small .search-input {
      font-size: 14px;
    }

    .search-input-container.size-large .search-input-wrapper {
      padding: 16px 20px;
    }

    .search-input-container.size-large .search-icon,
    .search-input-container.size-large .clear-button {
      font-size: 18px;
    }

    .search-input-container.size-large .search-input {
      font-size: 18px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .search-input-wrapper {
        padding: 10px 14px;
      }
      
      .search-input {
        font-size: 16px; /* Prevent zoom on iOS */
      }
    }
  `]
})
export class SearchInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Search...';
  @Input() disabled: boolean = false;
  @Input() showClearButton: boolean = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Output() searchEvent = new EventEmitter<string>();
  @Output() clearEvent = new EventEmitter<void>();
  @Output() focusEvent = new EventEmitter<void>();
  @Output() blurEvent = new EventEmitter<void>();

  value: string = '';
  
  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.searchEvent.emit(this.value);
  }

  onFocus(): void {
    this.focusEvent.emit();
  }

  onBlur(): void {
    this.onTouched();
    this.blurEvent.emit();
  }

  onEnter(): void {
    this.searchEvent.emit(this.value);
  }

  onEscape(): void {
    this.onClear();
  }

  onClear(): void {
    this.value = '';
    this.onChange(this.value);
    this.clearEvent.emit();
    this.searchEvent.emit(this.value);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

// Search Autocomplete Component with Dropdown
@Component({
  selector: 'app-search-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, TooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchAutocompleteComponent),
      multi: true
    }
  ],
  template: `
    <div class="search-autocomplete-container"
         [class.has-value]="value"
         [class.disabled]="disabled"
         [class.dropdown-open]="isDropdownOpen">
      <div class="search-input-wrapper"
           (clickOutside)="closeDropdown()"
           #searchContainer>
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          #searchInput
          type="text"
          class="search-input"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown)="onKeyDown($event)"
          autocomplete="off"
        />
        <button
          *ngIf="showClearButton && value"
          type="button"
          class="clear-button"
          (click)="onClear()"
          pTooltip="Clear search"
          tooltipPosition="top"
        >
          <i class="fa-solid fa-times"></i>
        </button>
      </div>

      <!-- Dropdown Results -->
      <div *ngIf="isDropdownOpen && filteredOptions.length > 0"
           class="search-dropdown"
           role="listbox"
           [attr.aria-expanded]="isDropdownOpen">

        <div *ngFor="let option of filteredOptions; let i = index; trackBy: trackByOption"
             class="search-option"
             [class.highlighted]="i === highlightedIndex"
             [attr.aria-selected]="i === highlightedIndex"
             role="option"
             (click)="selectOption(option)"
             (mouseenter)="highlightedIndex = i">

          <div class="option-content">
            <i *ngIf="option.icon" [class]="option.icon" class="option-icon"></i>
            <div class="option-text">
              <div class="option-label" [innerHTML]="highlightMatches ? highlightText(option.label) : option.label"></div>
              <div *ngIf="option.description" class="option-description">{{ option.description }}</div>
            </div>
            <span *ngIf="showCategories && option.category" class="option-category">{{ option.category }}</span>
          </div>
        </div>

        <div *ngIf="value && value.length >= minSearchLength && filteredOptions.length === 0"
             class="no-results">
          <i class="fa-solid fa-search"></i>
          <span>No results found for "{{ value }}"</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-autocomplete-container {
      position: relative;
      width: 100%;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      padding: 12px 17px;
      border-radius: 4px;
      border: 1px solid var(--surface-700, #8D9AAE);
      background: var(--surface-0, #FFF);
      gap: 10px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .search-autocomplete-container:focus-within .search-input-wrapper,
    .search-autocomplete-container.dropdown-open .search-input-wrapper {
      border-color: #72CDF4;
      box-shadow: 0 0 0 2px #D3E3F1;
    }

    .search-autocomplete-container.has-value .search-input-wrapper {
      border-color: #72CDF4;
    }

    .search-autocomplete-container.disabled .search-input-wrapper {
      background: var(--surface-100, #F7F8F9);
      border-color: var(--surface-300, #C6CCD6);
      cursor: not-allowed;
    }

    .search-icon {
      color: var(--surface-700, #8D9AAE);
      font-size: 16px;
      font-weight: 900;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--surface-900, #3D3D3D);
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: normal;
      min-width: 0;
    }

    .search-input::placeholder {
      color: #C6CCD6;
    }

    .search-input:disabled {
      cursor: not-allowed;
      color: var(--surface-500, #A9B3C2);
    }

    .clear-button {
      background: none;
      border: none;
      color: var(--surface-700, #8D9AAE);
      font-size: 16px;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
      flex-shrink: 0;
    }

    .clear-button:hover {
      color: var(--surface-900, #3D3D3D);
    }

    .clear-button:focus {
      outline: 2px solid #72CDF4;
      outline-offset: 2px;
      border-radius: 2px;
    }

    /* Dropdown Styles */
    .search-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      background: var(--surface-0, #FFF);
      border: 1px solid #72CDF4;
      border-top: none;
      border-radius: 0 0 4px 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      max-height: 300px;
      overflow-y: auto;
    }

    .search-option {
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid var(--surface-200, #EFF2F4);
      transition: background-color 0.2s ease;
    }

    .search-option:last-child {
      border-bottom: none;
    }

    .search-option:hover,
    .search-option.highlighted {
      background: var(--surface-100, #F7F8F9);
    }

    .option-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .option-icon {
      color: var(--surface-700, #8D9AAE);
      font-size: 16px;
      width: 16px;
      flex-shrink: 0;
    }

    .option-text {
      flex: 1;
      min-width: 0;
    }

    .option-label {
      color: var(--surface-900, #3D3D3D);
      font-size: 14px;
      font-weight: 500;
      line-height: 1.3;
    }

    .option-description {
      color: var(--surface-600, #8D9AAE);
      font-size: 12px;
      line-height: 1.3;
      margin-top: 2px;
    }

    .option-category {
      color: var(--surface-600, #8D9AAE);
      font-size: 11px;
      font-weight: 500;
      background: var(--surface-200, #EFF2F4);
      padding: 2px 6px;
      border-radius: 12px;
      flex-shrink: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .no-results {
      padding: 20px 16px;
      text-align: center;
      color: var(--surface-600, #8D9AAE);
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .no-results i {
      font-size: 24px;
      opacity: 0.5;
    }

    /* Highlight text styling */
    :host ::ng-deep .highlight {
      background: #FFE066;
      font-weight: 600;
      padding: 0 1px;
    }

    /* Size variants */
    .search-autocomplete-container.size-small .search-input-wrapper {
      padding: 8px 12px;
    }

    .search-autocomplete-container.size-small .search-icon,
    .search-autocomplete-container.size-small .clear-button {
      font-size: 14px;
    }

    .search-autocomplete-container.size-small .search-input {
      font-size: 14px;
    }

    .search-autocomplete-container.size-large .search-input-wrapper {
      padding: 16px 20px;
    }

    .search-autocomplete-container.size-large .search-icon,
    .search-autocomplete-container.size-large .clear-button {
      font-size: 18px;
    }

    .search-autocomplete-container.size-large .search-input {
      font-size: 18px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .search-input-wrapper {
        padding: 10px 14px;
      }

      .search-input {
        font-size: 16px; /* Prevent zoom on iOS */
      }

      .search-dropdown {
        max-height: 250px;
      }
    }
  `]
})
export class SearchAutocompleteComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Search...';
  @Input() disabled: boolean = false;
  @Input() showClearButton: boolean = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() options: SearchOption[] = [];
  @Input() maxResults: number = 8;
  @Input() showCategories: boolean = true;
  @Input() highlightMatches: boolean = true;
  @Input() minSearchLength: number = 1;

  @Output() searchEvent = new EventEmitter<string>();
  @Output() clearEvent = new EventEmitter<void>();
  @Output() focusEvent = new EventEmitter<void>();
  @Output() blurEvent = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<SearchOption>();

  value: string = '';
  isDropdownOpen: boolean = false;
  filteredOptions: SearchOption[] = [];
  highlightedIndex: number = -1;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.searchEvent.emit(this.value);
    this.filterOptions();
    this.openDropdown();
    this.highlightedIndex = -1;
  }

  onFocus(): void {
    this.focusEvent.emit();
    if (this.value.length >= this.minSearchLength) {
      this.filterOptions();
      this.openDropdown();
    }
  }

  onBlur(): void {
    this.onTouched();
    this.blurEvent.emit();
    // Delay closing to allow option selection
    setTimeout(() => this.closeDropdown(), 150);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.isDropdownOpen) {
      if (event.key === 'ArrowDown' && this.value.length >= this.minSearchLength) {
        this.filterOptions();
        this.openDropdown();
        event.preventDefault();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredOptions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.filteredOptions[this.highlightedIndex]) {
          this.selectOption(this.filteredOptions[this.highlightedIndex]);
        } else {
          this.searchEvent.emit(this.value);
          this.closeDropdown();
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        break;
      case 'Tab':
        this.closeDropdown();
        break;
    }
  }

  onClear(): void {
    this.value = '';
    this.onChange(this.value);
    this.clearEvent.emit();
    this.searchEvent.emit(this.value);
    this.closeDropdown();
  }

  selectOption(option: SearchOption): void {
    this.value = option.label;
    this.onChange(this.value);
    this.optionSelected.emit(option);
    this.searchEvent.emit(this.value);
    this.closeDropdown();
  }

  private filterOptions(): void {
    if (!this.value || this.value.length < this.minSearchLength) {
      this.filteredOptions = [];
      return;
    }

    const query = this.value.toLowerCase();
    this.filteredOptions = this.options
      .filter(option =>
        option.label.toLowerCase().includes(query) ||
        (option.description && option.description.toLowerCase().includes(query)) ||
        (option.category && option.category.toLowerCase().includes(query))
      )
      .slice(0, this.maxResults);
  }

  private openDropdown(): void {
    if (this.filteredOptions.length > 0 || (this.value.length >= this.minSearchLength)) {
      this.isDropdownOpen = true;
    }
  }

  private closeDropdown(): void {
    this.isDropdownOpen = false;
    this.highlightedIndex = -1;
  }

  highlightText(text: string): string {
    if (!this.highlightMatches || !this.value) {
      return text;
    }

    const query = this.value.toLowerCase();
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  trackByOption(index: number, option: SearchOption): string {
    return option.id;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

// Documentation Component
@Component({
  selector: 'app-search-input-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    TooltipModule,
    SearchInputComponent
  ],
  template: `
    <div class="component-doc">
      <div class="component-header">
        <h1>Search Input</h1>
      </div>

      <p-tabView>
        <p-tabPanel header="Documentation">
          <div class="documentation-section">
            
            <h2>🔧 Component Overview</h2>
            <p>
              The Search Input component provides a specialized text input with integrated search functionality, including a magnifying glass icon and optional clear button.
              Built on PrimeNG InputText with enhanced search-specific features and pixel-perfect Figma design matching.
              Use this component for search bars, filter inputs, and any text input where users need to find or filter content.
            </p>

            <h2>📋 Usage Example</h2>
            <pre><code>&lt;app-search-input 
  placeholder="Search components..." 
  [showClearButton]="true"
  size="medium"
  [(ngModel)]="searchTerm"
  (searchEvent)="handleSearch($event)"
  (clearEvent)="handleClear()"&gt;
&lt;/app-search-input&gt;</code></pre>

            <h2>⚙️ Input/Output API</h2>
            <div class="api-table">
              <h3>&#64;Input Properties</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>placeholder</code></td>
                    <td>string</td>
                    <td>'Search...'</td>
                    <td>Placeholder text displayed when input is empty</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Whether the input is disabled</td>
                  </tr>
                  <tr>
                    <td><code>showClearButton</code></td>
                    <td>boolean</td>
                    <td>true</td>
                    <td>Whether to show clear button when input has value</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td>'small' | 'medium' | 'large'</td>
                    <td>'medium'</td>
                    <td>Size variant of the input</td>
                  </tr>
                </tbody>
              </table>

              <h3>&#64;Output Events</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>searchEvent</code></td>
                    <td>EventEmitter&lt;string&gt;</td>
                    <td>Emitted on input change and Enter key press</td>
                  </tr>
                  <tr>
                    <td><code>clearEvent</code></td>
                    <td>EventEmitter&lt;void&gt;</td>
                    <td>Emitted when clear button is clicked or Escape is pressed</td>
                  </tr>
                  <tr>
                    <td><code>focusEvent</code></td>
                    <td>EventEmitter&lt;void&gt;</td>
                    <td>Emitted when input receives focus</td>
                  </tr>
                  <tr>
                    <td><code>blurEvent</code></td>
                    <td>EventEmitter&lt;void&gt;</td>
                    <td>Emitted when input loses focus</td>
                  </tr>
                </tbody>
              </table>

              <h3>Form Integration</h3>
              <p>This component implements <code>ControlValueAccessor</code> and works seamlessly with Angular Reactive Forms and Template-driven Forms:</p>
              <pre><code>// Reactive Forms
const form = this.fb.group(&#123;
  search: ['']
&#125;);

// Template-driven Forms
[(ngModel)]="searchTerm"</code></pre>
            </div>

            <h2>🔗 Dependencies / Related Components</h2>
            <ul>
              <li><strong>PrimeNG Modules:</strong> InputTextModule, ButtonModule, TooltipModule</li>
              <li><strong>Angular Modules:</strong> CommonModule, FormsModule</li>
              <li><strong>Icons:</strong> FontAwesome (fa-magnifying-glass, fa-times)</li>
              <li><strong>Design Tokens:</strong> Uses CSS custom properties for colors, spacing, and typography</li>
              <li><strong>Form Integration:</strong> Implements ControlValueAccessor for Angular Forms</li>
            </ul>

            <h2>🎨 Styling Notes</h2>
            <ul>
              <li><strong>States:</strong> Resting, focused, has-value, and disabled states with distinct visual feedback</li>
              <li><strong>Border Colors:</strong> Gray (#8D9AAE) for resting, blue (#72CDF4) for active/focused states</li>
              <li><strong>Focus Ring:</strong> Blue box-shadow (var(--blue-100)) for accessibility compliance</li>
              <li><strong>Icon Styling:</strong> Search icon always visible, clear button appears only with content</li>
              <li><strong>Typography:</strong> Roboto font family, 16px default size with size variants</li>
              <li><strong>Responsive:</strong> Adjusts padding on mobile, maintains 16px font size to prevent iOS zoom</li>
            </ul>

            <h2>🧪 Testing Instructions</h2>
            <ul>
              <li><strong>Keyboard Testing:</strong> Test Enter (search), Escape (clear), Tab (navigation)</li>
              <li><strong>State Testing:</strong> Verify all visual states (resting, focused, has-value, disabled)</li>
              <li><strong>Size Testing:</strong> Test small, medium, and large size variants</li>
              <li><strong>Event Testing:</strong> Ensure all events fire correctly (search, clear, focus, blur)</li>
              <li><strong>Form Testing:</strong> Test integration with both Reactive and Template-driven forms</li>
              <li><strong>Accessibility:</strong> Test screen reader support, keyboard navigation, and focus management</li>
              <li><strong>Mobile Testing:</strong> Verify touch interactions and responsive behavior</li>
            </ul>

          </div>
        </p-tabPanel>

        <p-tabPanel header="Examples">
          <div class="examples-section">
            
            <h3>Basic Search Input</h3>
            <div class="example-container">
              <div class="search-examples">
                <div class="example-item">
                  <h4>Default State</h4>
                  <app-search-input 
                    placeholder="Search components..."
                    [(ngModel)]="basicSearch"
                    (searchEvent)="onSearch($event)">
                  </app-search-input>
                  <small>Value: "{{ basicSearch }}"</small>
                </div>

                <div class="example-item">
                  <h4>With Content & Clear Button</h4>
                  <app-search-input 
                    placeholder="Search..."
                    [showClearButton]="true"
                    [(ngModel)]="searchWithValue"
                    (searchEvent)="onSearch($event)"
                    (clearEvent)="onClear()">
                  </app-search-input>
                  <small>Value: "{{ searchWithValue }}"</small>
                </div>

                <div class="example-item">
                  <h4>Disabled State</h4>
                  <app-search-input 
                    placeholder="Disabled search..."
                    [disabled]="true"
                    [(ngModel)]="disabledSearch">
                  </app-search-input>
                </div>
              </div>
            </div>

            <h3>Size Variants</h3>
            <div class="example-container">
              <div class="size-examples">
                <div class="example-item">
                  <h4>Small</h4>
                  <app-search-input 
                    placeholder="Small search..."
                    size="small"
                    [(ngModel)]="smallSearch">
                  </app-search-input>
                </div>

                <div class="example-item">
                  <h4>Medium (Default)</h4>
                  <app-search-input 
                    placeholder="Medium search..."
                    size="medium"
                    [(ngModel)]="mediumSearch">
                  </app-search-input>
                </div>

                <div class="example-item">
                  <h4>Large</h4>
                  <app-search-input 
                    placeholder="Large search..."
                    size="large"
                    [(ngModel)]="largeSearch">
                  </app-search-input>
                </div>
              </div>
            </div>

            <h3>Form Integration</h3>
            <div class="example-container">
              <div class="form-examples">
                <div class="example-item">
                  <h4>Template-driven Form</h4>
                  <form #searchForm="ngForm">
                    <app-search-input 
                      name="searchTerm"
                      placeholder="Template-driven search..."
                      [(ngModel)]="templateSearch"
                      #searchInput="ngModel"
                      required>
                    </app-search-input>
                    <div *ngIf="searchInput.invalid && searchInput.touched" class="error-message">
                      Search term is required
                    </div>
                  </form>
                  <small>Form Valid: {{ searchForm.valid }}, Value: "{{ templateSearch }}"</small>
                </div>
              </div>
            </div>

            <h3>Interactive Controls</h3>
            <div class="example-container">
              <div class="controls-section">
                <p-button label="Set Search Value" (click)="setSearchValue()" severity="primary" size="small"></p-button>
                <p-button label="Clear All" (click)="clearAllSearches()" severity="secondary" size="small"></p-button>
                <p-button label="Toggle Disabled" (click)="toggleDisabled()" severity="warning" size="small"></p-button>
              </div>
            </div>

          </div>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: [`
    .component-doc {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .component-header {
      margin-bottom: 2rem;
    }

    .component-header h1 {
      color: var(--text-color);
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
      font-weight: 600;
    }

    .documentation-section,
    .examples-section {
      padding: 1rem 0;
    }

    .example-container {
      background: var(--surface-section);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      padding: 2rem;
      margin: 1rem 0;
    }

    .search-examples,
    .size-examples,
    .form-examples {
      display: grid;
      gap: 2rem;
    }

    .example-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .example-item h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text-color);
      font-size: 1.1rem;
    }

    .example-item small {
      color: var(--text-color-secondary);
      font-style: italic;
    }

    .error-message {
      color: var(--red-500);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .controls-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 1rem 0;
    }

    .api-table table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }

    .api-table th,
    .api-table td {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 1px solid var(--surface-border);
    }

    .api-table th {
      background: var(--surface-section);
      font-weight: 600;
      color: var(--text-color);
    }

    .api-table td {
      color: var(--text-color-secondary);
    }

    .api-table code {
      background: var(--surface-100);
      padding: 2px 4px;
      border-radius: 2px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.875rem;
    }

    pre {
      background: var(--surface-ground);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      margin: 1rem 0;
    }

    pre code {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.875rem;
      color: var(--text-color);
    }

    h2 {
      color: var(--text-color);
      margin: 1.5rem 0 0.5rem 0;
      font-weight: 600;
    }

    h3 {
      color: var(--text-color);
      margin: 1rem 0 0.5rem 0;
      font-weight: 600;
    }

    ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }

    li {
      color: var(--text-color-secondary);
      margin: 0.25rem 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .component-doc {
        padding: 1rem;
      }

      .search-examples,
      .size-examples {
        grid-template-columns: 1fr;
      }

      .controls-section {
        flex-direction: column;
      }

      .api-table {
        overflow-x: auto;
      }

      .api-table table {
        min-width: 600px;
      }
    }
  `]
})
export class SearchInputDocComponent {
  basicSearch: string = '';
  searchWithValue: string = 'Sample search';
  disabledSearch: string = '';
  smallSearch: string = '';
  mediumSearch: string = '';
  largeSearch: string = '';
  templateSearch: string = '';

  onSearch(value: string): void {
    console.log('Search event:', value);
  }

  onClear(): void {
    console.log('Clear event triggered');
  }

  setSearchValue(): void {
    this.basicSearch = 'Programmatically set value';
  }

  clearAllSearches(): void {
    this.basicSearch = '';
    this.searchWithValue = '';
    this.smallSearch = '';
    this.mediumSearch = '';
    this.largeSearch = '';
    this.templateSearch = '';
  }

  toggleDisabled(): void {
    // This would typically toggle a disabled state
    console.log('Toggle disabled state');
  }
}
