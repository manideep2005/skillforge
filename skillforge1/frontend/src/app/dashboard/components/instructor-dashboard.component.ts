import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <nav class="sidebar">
        <h3>SkillForge - Instructor</h3>
        <ul class="nav-menu">
          <li><a href="#" class="nav-link active">Course Management</a></li>
          <li><a href="#" class="nav-link">Generate Quiz</a></li>
          <li><a href="#" class="nav-link">Student Analytics</a></li>
          <li><a href="#" class="nav-link">Upload Content</a></li>
          <li><a href="#" (click)="logout()" class="nav-link">Logout</a></li>
        </ul>
      </nav>
      <main class="main-content">
        <div class="welcome-card">
          <h2>Welcome, Instructor!</h2>
          <p>Manage your courses and create AI-powered assessments</p>
          
          <div class="dashboard-stats">
            <div class="stat-card">
              <h4>Total Courses</h4>
              <div class="big-number">12</div>
              <button class="btn-primary">Create New Course</button>
            </div>
            
            <div class="stat-card">
              <h4>AI Quiz Generator</h4>
              <p>Generate quizzes using AI for any topic</p>
              <button class="btn-primary">Generate Quiz</button>
            </div>
            
            <div class="stat-card">
              <h4>Active Students</h4>
              <div class="big-number">248</div>
              <p>Across all courses</p>
            </div>
          </div>
          
          <div class="course-table">
            <h3>Recent Courses</h3>
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Students</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>JavaScript Fundamentals</td>
                  <td>45</td>
                  <td>Beginner</td>
                  <td><button class="btn-small">Edit</button></td>
                </tr>
                <tr>
                  <td>React Advanced</td>
                  <td>32</td>
                  <td>Advanced</td>
                  <td><button class="btn-small">Edit</button></td>
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
    .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #e74c3c; }
    .big-number { font-size: 2rem; font-weight: bold; color: #e74c3c; margin: 10px 0; }
    .btn-primary { background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; }
    .btn-small { background: #3498db; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px; }
    .course-table { margin-top: 30px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: bold; }
  `]
})
export class InstructorDashboardComponent {
  constructor(private router: Router) {}
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}