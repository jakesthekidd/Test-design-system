import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-doc',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-documentation">
      <h1>Card</h1>
      <p>Card documentation coming soon...</p>
    </div>
  `
})
export class CardDocComponent {}
