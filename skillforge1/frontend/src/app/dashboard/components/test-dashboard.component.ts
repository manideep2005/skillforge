import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background: white; margin: 20px;">
      <h1>Test Dashboard Working!</h1>
      <p>If you see this, the routing is working.</p>
    </div>
  `
})
export class TestDashboardComponent {}