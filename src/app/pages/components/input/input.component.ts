import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-doc',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-documentation">
      <h1>Input Text</h1>
      <p>Input Text documentation coming soon...</p>
    </div>
  `
})
export class InputDocComponent {}
