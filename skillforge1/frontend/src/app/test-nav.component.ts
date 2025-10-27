import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 20px;">
      <h2>Test Navigation</h2>
      <nav>
        <a routerLink="/dashboard" style="margin-right: 20px;">Dashboard</a>
        <a routerLink="/settings" style="margin-right: 20px;">Settings</a>
        <a routerLink="/profile" style="margin-right: 20px;">Profile</a>
        <a routerLink="/learning-path" style="margin-right: 20px;">Learning Path</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class TestNavComponent {}