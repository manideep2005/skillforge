import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <nav class="sidebar">
        <h3>SkillForge - Admin</h3>
        <ul class="nav-menu">
          <li><a href="#" class="nav-link active">User Management</a></li>
          <li><a href="#" class="nav-link">System Analytics</a></li>
          <li><a href="#" class="nav-link">Platform Settings</a></li>
          <li><a href="#" class="nav-link">Reports</a></li>
          <li><a href="#" (click)="logout()" class="nav-link">Logout</a></li>
        </ul>
      </nav>
      <main class="main-content">
        <div class="welcome-card">
          <h2>Welcome, Admin!</h2>
          <p>Manage platform users and monitor system performance</p>
          
          <div class="dashboard-stats">
            <div class="stat-card">
              <h4>Total Users</h4>
              <div class="big-number">1,247</div>
              <p>↑ 12% from last month</p>
            </div>
            
            <div class="stat-card">
              <h4>Active Courses</h4>
              <div class="big-number">89</div>
              <p>Across all instructors</p>
            </div>
            
            <div class="stat-card">
              <h4>System Performance</h4>
              <div class="performance-indicator good">Excellent</div>
              <p>99.8% uptime</p>
            </div>
          </div>
          
          <div class="user-table">
            <h3>Recent User Activity</h3>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Last Active</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Student</td>
                  <td>2 hours ago</td>
                  <td><span class="status active">Active</span></td>
                  <td><button class="btn-small">Manage</button></td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>Instructor</td>
                  <td>1 day ago</td>
                  <td><span class="status active">Active</span></td>
                  <td><button class="btn-small">Manage</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container { display: flex; min-height: 100vh; }
    .sidebar { width: 250px; background: #2c3e50; color: white; padding: 20px; }
    .nav-menu { list-style: none; padding: 0; }
    .nav-menu li { margin: 10px 0; }
    .nav-link { color: white; text-decoration: none; padding: 10px; display: block; border-radius: 5px; }
    .nav-link:hover, .nav-link.active { background: #34495e; }
    .main-content { flex: 1; padding: 20px; background: #ecf0f1; }
    .welcome-card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .dashboard-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
    .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #f39c12; }
    .big-number { font-size: 2rem; font-weight: bold; color: #f39c12; margin: 10px 0; }
    .performance-indicator { padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold; }
    .performance-indicator.good { background: #2ecc71; color: white; }
    .btn-small { background: #f39c12; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px; }
    .user-table { margin-top: 30px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: bold; }
    .status { padding: 2px 8px; border-radius: 10px; font-size: 12px; }
    .status.active { background: #2ecc71; color: white; }
  `]
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}