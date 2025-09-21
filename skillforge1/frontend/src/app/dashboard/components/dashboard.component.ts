import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <nav class="sidebar">
        <h3>SkillForge</h3>
        <ul class="nav-menu">
          <li *ngIf="userRole === 'STUDENT'">
            <a href="#" class="nav-link">Learning Path</a>
          </li>
          <li *ngIf="userRole === 'STUDENT'">
            <a href="#" class="nav-link">Take Quiz</a>
          </li>
          <li *ngIf="userRole === 'INSTRUCTOR'">
            <a href="#" class="nav-link">Course Management</a>
          </li>
          <li *ngIf="userRole === 'INSTRUCTOR'">
            <a href="#" class="nav-link">Generate Quiz</a>
          </li>
          <li>
            <a href="#" class="nav-link">Analytics</a>
          </li>
          <li>
            <a href="#" (click)="logout()" class="nav-link">Logout</a>
          </li>
        </ul>
      </nav>
      <main class="main-content">
        <div class="welcome-card">
          <h2>Welcome to SkillForge</h2>
          <p>Role: {{userRole}}</p>
          <div class="dashboard-stats">
            <div class="stat-card" *ngIf="userRole === 'STUDENT'">
              <h4>Progress</h4>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="75"></div>
              </div>
              <p>75% Complete</p>
            </div>
            <div class="stat-card">
              <h4>Next Suggested</h4>
              <p>Advanced JavaScript</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      min-height: 100vh;
    }
    .sidebar {
      width: 250px;
      background: #2c3e50;
      color: white;
      padding: 20px;
    }
    .nav-menu {
      list-style: none;
      padding: 0;
    }
    .nav-menu li {
      margin: 10px 0;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 10px;
      display: block;
      border-radius: 5px;
    }
    .nav-link:hover {
      background: #34495e;
    }
    .main-content {
      flex: 1;
      padding: 20px;
      background: #ecf0f1;
    }
    .welcome-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .stat-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .progress-bar {
      width: 100%;
      height: 10px;
      background: #e0e0e0;
      border-radius: 5px;
      overflow: hidden;
      margin: 10px 0;
    }
    .progress-fill {
      height: 100%;
      background: #667eea;
      transition: width 0.3s ease;
    }
  `]
})
export class DashboardComponent implements OnInit {
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}