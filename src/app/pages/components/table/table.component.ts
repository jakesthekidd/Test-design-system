import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-doc',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-documentation">
      <h1>Table</h1>
      <p>Table documentation coming soon...</p>
    </div>
  `
})
export class TableDocComponent {}
