import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-layout">
      <!-- Top Navigation -->
      <nav class="top-nav">
        <div class="nav-left">
          <h1 class="logo">🚀 SkillForge</h1>
          <span class="breadcrumb">Dashboard / {{getPageTitle()}}</span>
        </div>
        <div class="nav-right">
          <div class="search-box">
            <input type="text" placeholder="Search courses..." />
            <i class="search-icon">🔍</i>
          </div>
          <div class="user-menu">
            <div class="notifications">🔔</div>
            <div class="user-avatar" (click)="logout()">
              <img src="https://via.placeholder.com/40" alt="User" />
              <span>{{userName}}</span>
            </div>
          </div>
        </div>
      </nav>

      <div class="main-layout">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-menu">
            <div class="menu-item" [class.active]="activeTab === 'dashboard'" (click)="setActiveTab('dashboard')">
              <i class="icon">📊</i>
              <span>Dashboard</span>
            </div>
            <div class="menu-item" (click)="navigateTo('/courses')">
              <i class="icon">📚</i>
              <span>My Courses</span>
            </div>
            <div class="menu-item" (click)="navigateTo('/quiz')">
              <i class="icon">🧠</i>
              <span>Quizzes</span>
            </div>
            <div class="menu-item" (click)="navigateTo('/adaptive-quiz')">
              <i class="icon">🤖</i>
              <span>AI Quiz Generator</span>
            </div>
            <div class="menu-item" [class.active]="activeTab === 'progress'" (click)="setActiveTab('progress')">
              <i class="icon">📈</i>
              <span>Progress</span>
            </div>
            <div class="menu-item" [class.active]="activeTab === 'achievements'" (click)="setActiveTab('achievements')">
              <i class="icon">🏆</i>
              <span>Achievements</span>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="content">
          <!-- Dashboard Tab -->
          <div *ngIf="activeTab === 'dashboard'" class="tab-content">
            <!-- Stats Cards -->
            <div class="stats-row">
              <div class="stat-card blue">
                <div class="stat-header">
                  <h3>Total Courses</h3>
                  <span class="stat-icon">📚</span>
                </div>
                <div class="stat-number">{{dashboardData.stats?.totalCourses || 0}}</div>
                <div class="stat-footer">
                  <span class="trend up">↗ +2 this month</span>
                </div>
              </div>
              
              <div class="stat-card green">
                <div class="stat-header">
                  <h3>Completed</h3>
                  <span class="stat-icon">✅</span>
                </div>
                <div class="stat-number">{{dashboardData.stats?.completedCourses || 0}}</div>
                <div class="stat-footer">
                  <span class="trend up">↗ 67% completion</span>
                </div>
              </div>
              
              <div class="stat-card orange">
                <div class="stat-header">
                  <h3>Study Hours</h3>
                  <span class="stat-icon">⏰</span>
                </div>
                <div class="stat-number">{{dashboardData.stats?.totalStudyHours || 0}}h</div>
                <div class="stat-footer">
                  <span class="trend up">↗ +12h this week</span>
                </div>
              </div>
              
              <div class="stat-card purple">
                <div class="stat-header">
                  <h3>Streak</h3>
                  <span class="stat-icon">🔥</span>
                </div>
                <div class="stat-number">{{dashboardData.stats?.streak || 0}}</div>
                <div class="stat-footer">
                  <span class="trend up">↗ Days active</span>
                </div>
              </div>
            </div>

            <!-- Main Dashboard Grid -->
            <div class="dashboard-grid">
              <!-- Current Course -->
              <div class="card current-course">
                <div class="card-header">
                  <h3>Continue Learning</h3>
                  <button class="btn-ghost">View All</button>
                </div>
                <div class="course-item">
                  <div class="course-thumbnail">
                    <div class="course-image">JS</div>
                    <div class="play-button">▶</div>
                  </div>
                  <div class="course-details">
                    <h4>Advanced JavaScript</h4>
                    <p>Module 5: Async Programming & Promises</p>
                    <div class="progress-container">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%"></div>
                      </div>
                      <span class="progress-text">75% Complete</span>
                    </div>
                  </div>
                </div>
                <button class="btn-primary full-width">Continue Course</button>
              </div>

              <!-- Quick Actions -->
              <div class="card quick-actions">
                <div class="card-header">
                  <h3>Quick Actions</h3>
                </div>
                <div class="actions-grid">
                  <div class="action-item" (click)="navigateTo('/adaptive-quiz')">
                    <div class="action-icon">🤖</div>
                    <span>AI Quiz Generator</span>
                  </div>
                  <div class="action-item" (click)="setActiveTab('courses')">
                    <div class="action-icon">📚</div>
                    <span>Browse Courses</span>
                  </div>
                  <div class="action-item" (click)="setActiveTab('progress')">
                    <div class="action-icon">📊</div>
                    <span>View Progress</span>
                  </div>
                  <div class="action-item">
                    <div class="action-icon">💬</div>
                    <span>Join Discussion</span>
                  </div>
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="card recent-activity">
                <div class="card-header">
                  <h3>Recent Activity</h3>
                </div>
                <div class="activity-list">
                  <div class="activity-item" *ngFor="let act of dashboardData.recentActivity">
                    <div class="activity-icon" [ngClass]="getActivityClass(act.type)">{{ getActivityIcon(act.type) }}</div>
                    <div class="activity-content">
                      <p>{{ act.message }}</p>
                      <span class="activity-time">{{ act.createdAt | date:'short' }}</span>
                    </div>
                  </div>
                  <div class="activity-item" *ngIf="!dashboardData.recentActivity || dashboardData.recentActivity.length === 0">
                    <div class="activity-icon started">ℹ️</div>
                    <div class="activity-content">
                      <p>No recent activity yet.</p>
                      <span class="activity-time">—</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Learning Path -->
              <div class="card learning-path">
                <div class="card-header">
                  <h3>Your Learning Path</h3>
                </div>
                <div class="path-progress">
                  <div class="path-step completed">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>HTML & CSS</h4>
                      <p>Foundation Complete</p>
                    </div>
                  </div>
                  <div class="path-step active">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>JavaScript</h4>
                      <p>75% Complete</p>
                    </div>
                  </div>
                  <div class="path-step upcoming">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>React</h4>
                      <p>Coming Next</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Courses Tab -->
          <div *ngIf="activeTab === 'courses'" class="tab-content">
            <div class="courses-header">
              <h2>My Courses</h2>
              <div class="course-filters">
                <button class="filter-btn active">All</button>
                <button class="filter-btn">In Progress</button>
                <button class="filter-btn">Completed</button>
                <button class="filter-btn">New</button>
              </div>
            </div>
            
            <div class="courses-grid">
              <div class="course-card" *ngFor="let course of dashboardData.courses" [class.featured]="course.progress > 0 && course.progress < 100">
                <div class="course-image">
                  <img [src]="course.image" [alt]="course.title" class="course-img">
                  <div class="course-badge" [class]="getBadgeClass(course)">{{getBadgeText(course)}}</div>
                  <div class="course-progress">{{course.progress}}%</div>
                </div>
                <div class="course-content">
                  <h3>{{course.title}}</h3>
                  <p>{{course.description}}</p>
                  <div class="course-meta">
                    <span>⏱️ {{course.duration}}</span>
                    <span>📚 {{course.modules}} modules</span>
                    <span>⭐ {{course.rating}}</span>
                    <span *ngIf="course.language">💻 {{course.language}}</span>
                  </div>
                  <button class="btn-primary" *ngIf="course.progress < 100">{{course.progress > 0 ? 'Continue' : 'Start'}} Course</button>
                  <button class="btn-secondary" *ngIf="course.progress === 100">Review Course</button>
                </div>
              </div>
            </div>

            <div class="courses-header" style="margin-top: 32px;">
              <h2>Available Courses</h2>
            </div>
            <div class="courses-grid">
              <div class="course-card" *ngFor="let course of dashboardData.availableCourses">
                <div class="course-image">
                  <img [src]="'https://picsum.photos/seed/' + course.id + '/400/200'" [alt]="course.title" class="course-img">
                  <div class="course-badge">{{course.difficulty || 'General'}}</div>
                </div>
                <div class="course-content">
                  <h3>{{course.title}}</h3>
                  <p>{{course.description}}</p>
                  <div class="course-meta">
                    <span>⏱️ {{course.estimatedHours || 0}}h</span>
                    <span>⭐ {{course.rating || 0}}</span>
                  </div>
                  <button class="btn-primary" (click)="enrollInCourse(course.id)">Enroll</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quiz Tab -->
          <div *ngIf="activeTab === 'quiz'" class="tab-content">
            <div class="quiz-header">
              <h2>Practice Quizzes</h2>
              <p>Test your knowledge and track your progress</p>
            </div>
            
            <div class="quiz-grid">
              <div class="quiz-card available">
                <div class="quiz-header-card">
                  <div class="quiz-icon">🟢</div>
                  <div class="quiz-difficulty easy">Easy</div>
                </div>
                <h3>JavaScript Basics</h3>
                <p>Test your understanding of JavaScript fundamentals</p>
                <div class="quiz-stats">
                  <div class="stat">
                    <span class="label">Questions</span>
                    <span class="value">15</span>
                  </div>
                  <div class="stat">
                    <span class="label">Time</span>
                    <span class="value">20 min</span>
                  </div>
                  <div class="stat">
                    <span class="label">Best Score</span>
                    <span class="value">85%</span>
                  </div>
                </div>
                <button class="btn-primary">Start Quiz</button>
              </div>

              <div class="quiz-card available">
                <div class="quiz-header-card">
                  <div class="quiz-icon">🔵</div>
                  <div class="quiz-difficulty medium">Medium</div>
                </div>
                <h3>Async Programming</h3>
                <p>Challenge yourself with promises and async/await</p>
                <div class="quiz-stats">
                  <div class="stat">
                    <span class="label">Questions</span>
                    <span class="value">12</span>
                  </div>
                  <div class="stat">
                    <span class="label">Time</span>
                    <span class="value">15 min</span>
                  </div>
                  <div class="stat">
                    <span class="label">Best Score</span>
                    <span class="value">--</span>
                  </div>
                </div>
                <button class="btn-primary">Start Quiz</button>
              </div>

              <div class="quiz-card mastered">
                <div class="quiz-header-card">
                  <div class="quiz-icon">🟡</div>
                  <div class="quiz-difficulty easy">Easy</div>
                </div>
                <h3>DOM Manipulation</h3>
                <p>Master DOM operations and event handling</p>
                <div class="quiz-stats">
                  <div class="stat">
                    <span class="label">Questions</span>
                    <span class="value">10</span>
                  </div>
                  <div class="stat">
                    <span class="label">Time</span>
                    <span class="value">12 min</span>
                  </div>
                  <div class="stat">
                    <span class="label">Best Score</span>
                    <span class="value">92%</span>
                  </div>
                </div>
                <button class="btn-secondary">Mastered ✓</button>
              </div>
            </div>
          </div>

          <!-- Progress Tab -->
          <div *ngIf="activeTab === 'progress'" class="tab-content">
            <div class="progress-overview">
              <h2>Learning Progress</h2>
              <div class="progress-summary">
                <div class="summary-card">
                  <h3>Overall Progress</h3>
                  <div class="circular-progress">
                    <div class="progress-circle">
                      <span class="progress-value">67%</span>
                    </div>
                  </div>
                </div>
                
                <div class="skills-breakdown">
                  <h3>Skills Breakdown</h3>
                  <div class="skill-item">
                    <div class="skill-info">
                      <span class="skill-name">JavaScript</span>
                      <span class="skill-level">Advanced</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-fill" style="width: 85%"></div>
                    </div>
                  </div>
                  
                  <div class="skill-item">
                    <div class="skill-info">
                      <span class="skill-name">HTML/CSS</span>
                      <span class="skill-level">Expert</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-fill" style="width: 95%"></div>
                    </div>
                  </div>
                  
                  <div class="skill-item">
                    <div class="skill-info">
                      <span class="skill-name">React</span>
                      <span class="skill-level">Beginner</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-fill" style="width: 25%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Achievements Tab -->
          <div *ngIf="activeTab === 'achievements'" class="tab-content">
            <div class="achievements-header">
              <h2>Your Achievements</h2>
              <p>Celebrate your learning milestones</p>
            </div>
            
            <div class="achievements-grid" *ngIf="dashboardData.achievements && dashboardData.achievements.length > 0; else noAchievements">
              <div class="achievement-card earned" *ngFor="let a of dashboardData.achievements">
                <div class="achievement-icon">{{ a.icon || '🏆' }}</div>
                <h3>{{ a.title }}</h3>
                <p>{{ a.description }}</p>
                <div class="achievement-date">Earned {{ a.earnedAt | date:'mediumDate' }}</div>
              </div>
            </div>
            <ng-template #noAchievements>
              <div class="achievements-grid">
                <div class="achievement-card">
                  <div class="achievement-icon">ℹ️</div>
                  <h3>No Achievements Yet</h3>
                  <p>Keep learning to unlock achievements!</p>
                </div>
              </div>
            </ng-template>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    .dashboard-layout {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      position: relative;
      overflow-x: hidden;
    }
    
    .dashboard-layout::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }

    /* Top Navigation */
    .top-nav {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(226, 232, 240, 0.5);
      padding: 0 24px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .logo {
      font-size: 24px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .breadcrumb {
      color: #64748b;
      font-size: 14px;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .search-box {
      position: relative;
      width: 300px;
    }

    .search-box input {
      width: 100%;
      padding: 12px 40px 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 14px;
      background: rgba(248, 250, 252, 0.8);
      transition: all 0.3s ease;
    }
    
    .search-box input:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .notifications {
      font-size: 20px;
      cursor: pointer;
      padding: 12px;
      border-radius: 12px;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .notifications::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }

    .notifications:hover {
      background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
      transform: translateY(-1px);
    }

    .user-avatar {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 6px 16px 6px 6px;
      border-radius: 25px;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .user-avatar:hover {
      background: linear-gradient(135deg, #f8faff, #f1f5f9);
      border-color: #667eea;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }

    .user-avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;
    }
    
    .user-avatar:hover img {
      border-color: #667eea;
    }

    /* Main Layout */
    .main-layout {
      display: flex;
      min-height: calc(100vh - 64px);
    }

    /* Sidebar */
    .sidebar {
      width: 260px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(226, 232, 240, 0.5);
      padding: 32px 0;
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.05);
    }

    .sidebar-menu {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0 16px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 24px;
      margin: 0 16px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #64748b;
      font-weight: 600;
      position: relative;
      overflow: hidden;
    }
    
    .menu-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    .menu-item:hover {
      background: linear-gradient(135deg, #f8faff, #f1f5f9);
      color: #334155;
      transform: translateX(4px);
    }

    .menu-item.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .menu-item.active::before {
      transform: scaleY(1);
    }

    .menu-item .icon {
      font-size: 20px;
      transition: transform 0.3s ease;
    }
    
    .menu-item:hover .icon {
      transform: scale(1.1);
    }
    
    .menu-item.active .icon {
      transform: scale(1.2);
    }

    /* Content Area */
    .content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }

    .tab-content {
      animation: slideInUp 0.5s ease-out;
    }

    @keyframes slideInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px) scale(0.95); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
      }
    }

    /* Stats Row */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 28px;
      border-left: 4px solid;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
      animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .stat-card:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    }

    .stat-card.blue { border-left-color: #3b82f6; }
    .stat-card.green { border-left-color: #10b981; }
    .stat-card.orange { border-left-color: #f59e0b; }
    .stat-card.purple { border-left-color: #8b5cf6; }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .stat-header h3 {
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-icon {
      font-size: 24px;
    }

    .stat-number {
      font-size: 36px;
      font-weight: 800;
      background: linear-gradient(135deg, #1e293b, #475569);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
      animation: countUp 1s ease-out;
    }
    
    @keyframes countUp {
      from { transform: scale(0.5); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .stat-footer .trend {
      font-size: 14px;
      font-weight: 500;
    }

    .trend.up {
      color: #10b981;
    }

    /* Dashboard Grid */
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border: 1px solid rgba(226, 232, 240, 0.5);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    }
    
    .card:hover::after {
      opacity: 1;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .card-header h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    /* Current Course Card */
    .course-item {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
    }

    .course-thumbnail {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
    }

    .course-image {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
      position: relative;
      overflow: hidden;
    }
    
    .course-image::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
      transform: rotate(45deg);
      animation: shine 3s infinite;
    }
    
    @keyframes shine {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    }

    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255,255,255,0.9);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
    }

    .course-details h4 {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .course-details p {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .progress-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .progress-bar {
      flex: 1;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 1s ease;
      position: relative;
      overflow: hidden;
    }
    
    .progress-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: progressShine 2s infinite;
    }
    
    @keyframes progressShine {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .progress-text {
      font-size: 12px;
      font-weight: 600;
      color: #3b82f6;
    }

    /* Quick Actions */
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 24px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: rgba(248, 250, 252, 0.5);
      position: relative;
      overflow: hidden;
    }
    
    .action-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .action-item:hover {
      border-color: #667eea;
      background: white;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
    }
    
    .action-item:hover::before {
      opacity: 1;
    }

    .action-icon {
      font-size: 28px;
      transition: transform 0.3s ease;
      z-index: 1;
    }
    
    .action-item:hover .action-icon {
      transform: scale(1.2) rotate(5deg);
    }

    .action-item span {
      font-size: 14px;
      font-weight: 500;
      color: #64748b;
    }

    /* Activity List */
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .activity-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .activity-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }

    .activity-icon.completed {
      background: #dcfce7;
    }

    .activity-icon.started {
      background: #dbeafe;
    }

    .activity-icon.achievement {
      background: #fef3c7;
    }

    .activity-content p {
      font-size: 14px;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .activity-time {
      font-size: 12px;
      color: #64748b;
    }

    /* Learning Path */
    .path-progress {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .path-step {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }

    .path-step.completed .step-number {
      background: #10b981;
      color: white;
    }

    .path-step.active .step-number {
      background: #3b82f6;
      color: white;
    }

    .path-step.upcoming .step-number {
      background: #e2e8f0;
      color: #64748b;
    }

    .step-content h4 {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2px;
    }

    .step-content p {
      font-size: 12px;
      color: #64748b;
    }

    /* Buttons */
    .btn-primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
    
    .btn-primary:hover::before {
      left: 100%;
    }

    .btn-secondary {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #e2e8f0;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: #e2e8f0;
    }

    .btn-ghost {
      background: transparent;
      color: #3b82f6;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-ghost:hover {
      background: #f8faff;
    }

    .full-width {
      width: 100%;
    }

    /* Courses Grid */
    .courses-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    .courses-header h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
    }

    .course-filters {
      display: flex;
      gap: 8px;
    }

    .filter-btn {
      padding: 8px 16px;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .course-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border: 1px solid rgba(226, 232, 240, 0.5);
      transition: all 0.4s ease;
      position: relative;
    }
    
    .course-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .course-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    
    .course-card:hover::after {
      opacity: 1;
    }

    .course-image {
      height: 160px;
      position: relative;
      overflow: hidden;
    }
    
    .course-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .course-card:hover .course-img {
      transform: scale(1.05);
    }

    .course-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      background: rgba(255,255,255,0.9);
      color: #1e293b;
    }

    .course-badge.completed {
      background: #10b981;
      color: white;
    }

    .course-badge.new {
      background: #f59e0b;
      color: white;
    }

    .course-progress {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255,255,255,0.9);
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      color: #1e293b;
    }

    .course-content {
      padding: 20px;
    }

    .course-content h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .course-content p {
      color: #64748b;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .course-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      font-size: 12px;
      color: #64748b;
    }

    /* Quiz Grid */
    .quiz-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .quiz-header h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .quiz-header p {
      color: #64748b;
      font-size: 16px;
    }

    .quiz-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .quiz-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border: 1px solid rgba(226, 232, 240, 0.5);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }
    
    .quiz-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .quiz-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 16px 50px rgba(0,0,0,0.2);
    }
    
    .quiz-card:hover::before {
      transform: scaleX(1);
    }

    .quiz-card.mastered {
      border-color: #10b981;
      background: linear-gradient(135deg, #f0fdf4, #ffffff);
    }

    .quiz-header-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .quiz-icon {
      font-size: 24px;
    }

    .quiz-difficulty {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .quiz-difficulty.easy {
      background: #dcfce7;
      color: #166534;
    }

    .quiz-difficulty.medium {
      background: #fef3c7;
      color: #92400e;
    }

    .quiz-card h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .quiz-card p {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .quiz-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat {
      text-align: center;
    }

    .stat .label {
      display: block;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 4px;
    }

    .stat .value {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
    }

    /* Progress Overview */
    .progress-overview h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 32px;
    }

    .progress-summary {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 40px;
    }

    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .summary-card h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 24px;
    }

    .circular-progress {
      display: flex;
      justify-content: center;
    }

    .progress-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: conic-gradient(#3b82f6 0deg 241deg, #e2e8f0 241deg 360deg);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .progress-circle::before {
      content: '';
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: white;
      position: absolute;
    }

    .progress-value {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      z-index: 1;
    }

    .skills-breakdown {
      background: white;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .skills-breakdown h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 24px;
    }

    .skill-item {
      margin-bottom: 24px;
    }

    .skill-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .skill-name {
      font-weight: 600;
      color: #1e293b;
    }

    .skill-level {
      font-size: 14px;
      color: #64748b;
    }

    .skill-bar {
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .skill-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #1d4ed8);
      transition: width 0.3s ease;
    }

    /* Achievements */
    .achievements-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .achievements-header h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .achievements-header p {
      color: #64748b;
      font-size: 16px;
    }

    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .achievement-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 28px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border: 1px solid rgba(226, 232, 240, 0.5);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }
    
    .achievement-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(from 0deg, transparent, rgba(102, 126, 234, 0.1), transparent);
      animation: rotate 4s linear infinite;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .achievement-card.earned {
      border-color: #10b981;
      background: linear-gradient(135deg, #f0fdf4, #ffffff);
    }

    .achievement-card.locked {
      opacity: 0.6;
    }

    .achievement-card:hover {
      transform: translateY(-6px) scale(1.05);
      box-shadow: 0 16px 50px rgba(0,0,0,0.2);
    }
    
    .achievement-card:hover::before {
      opacity: 1;
    }

    .achievement-icon {
      font-size: 56px;
      margin-bottom: 20px;
      transition: transform 0.3s ease;
      z-index: 1;
      position: relative;
    }
    
    .achievement-card:hover .achievement-icon {
      transform: scale(1.2) rotate(10deg);
    }
    
    .achievement-card.earned .achievement-icon {
      animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }

    .achievement-card h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .achievement-card p {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .achievement-date {
      font-size: 12px;
      color: #10b981;
      font-weight: 500;
    }

    .achievement-progress {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .main-layout {
        flex-direction: column;
      }
      
      .sidebar {
        width: 100%;
        order: 2;
      }
      
      .content {
        order: 1;
      }
      
      .nav-right .search-box {
        display: none;
      }
      
      .stats-row {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StudentDashboardComponent implements OnInit {
  activeTab: string = 'dashboard';
  dashboardData: any = {};
  userEmail: string = '';
  userName: string = '';
  userId: string = '';

  constructor(private router: Router, private http: HttpClient, private dashboardService: DashboardService) {}
  
  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userName = localStorage.getItem('userName') || 'Student';
    this.userId = localStorage.getItem('userId') || '';
    this.loadDashboardData();
  }
  
  loadDashboardData() {
    this.loadExternalData();
    
    if (!this.userId) {
      this.loadMockData();
      return;
    }
    this.dashboardService.getStudentDashboard(this.userId).subscribe({
      next: (data: any) => {
        this.dashboardData = {
          stats: data.stats || this.generateMockStats(),
          enrolledCourses: data.enrolledCourses || [],
          availableCourses: data.availableCourses || [],
          recentActivity: data.recentActivity || this.generateMockActivity(),
          achievements: data.achievements || this.generateMockAchievements()
        };
        const courses = (data.enrolledCourses || []).map((p: any) => ({
          title: p.courseName,
          description: 'Your enrolled course',
          duration: Math.max(1, Math.round((p.totalTimeSpent || 0) / 60)).toString(),
          modules: (p.completedModules || []).length,
          rating: 4.5,
          progress: p.overallProgress || 0,
          image: 'https://picsum.photos/seed/' + p.courseId + '/400/200'
        }));
        this.dashboardData.courses = courses.length > 0 ? courses : this.generateMockCourses();
      },
      error: (err: any) => {
        console.error('Error loading dashboard:', err);
        this.loadMockData();
      }
    });
  }
  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getPageTitle(): string {
    const titles: {[key: string]: string} = {
      'dashboard': 'Dashboard Overview',
      'courses': 'My Courses',
      'quiz': 'Practice Quizzes',
      'progress': 'Learning Progress',
      'achievements': 'Achievements'
    };
    return titles[this.activeTab] || 'Dashboard';
  }
  
  getBadgeClass(course: any): string {
    if (course.progress === 100) return 'completed';
    if (course.progress > 0) return 'in-progress';
    return 'new';
  }

  getBadgeText(course: any): string {
    if (course.progress === 100) return 'Completed';
    if (course.progress > 0) return 'In Progress';
    return 'New';
  }

  getActivityClass(type: string): string {
    switch (type) {
      case 'COURSE_COMPLETED':
      case 'MODULE_COMPLETED':
        return 'completed';
      case 'QUIZ_ATTEMPT':
        return 'achievement';
      case 'ENROLL':
      case 'PROGRESS_UPDATE':
      default:
        return 'started';
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'COURSE_COMPLETED':
        return '🏆';
      case 'MODULE_COMPLETED':
        return '✅';
      case 'QUIZ_ATTEMPT':
        return '🧠';
      case 'ENROLL':
        return '📚';
      case 'PROGRESS_UPDATE':
      default:
        return '🚀';
    }
  }

  enrollInCourse(courseId: string) {
    if (!this.userId) return;
    this.dashboardService.enrollInCourse(this.userId, courseId).subscribe({
      next: () => this.loadDashboardData(),
      error: (err: any) => console.error('Enroll failed:', err)
    });
  }

  loadExternalData() {
    this.http.get('https://api.github.com/search/repositories?q=javascript+tutorial&sort=stars&order=desc&per_page=10').subscribe({
      next: (data: any) => {
        const repos = data.items.map((repo: any) => ({
          id: repo.id,
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          description: repo.description || 'Learn from this popular repository',
          estimatedHours: Math.floor(Math.random() * 20) + 5,
          rating: Math.round((repo.stargazers_count / 1000) * 10) / 10,
          difficulty: repo.stargazers_count > 10000 ? 'Advanced' : repo.stargazers_count > 1000 ? 'Intermediate' : 'Beginner',
          language: repo.language || 'General'
        }));
        if (!this.dashboardData.availableCourses) {
          this.dashboardData.availableCourses = repos;
        }
      },
      error: (err: any) => console.log('GitHub API unavailable, using mock data')
    });
  }
  
  loadMockData() {
    this.dashboardData = {
      stats: this.generateMockStats(),
      courses: this.generateMockCourses(),
      availableCourses: this.generateMockAvailableCourses(),
      recentActivity: this.generateMockActivity(),
      achievements: this.generateMockAchievements()
    };
  }
  
  generateMockStats() {
    return {
      totalCourses: Math.floor(Math.random() * 15) + 5,
      completedCourses: Math.floor(Math.random() * 8) + 2,
      totalStudyHours: Math.floor(Math.random() * 100) + 50,
      streak: Math.floor(Math.random() * 30) + 5
    };
  }
  
  generateMockCourses() {
    const courses = [
      { title: 'Advanced JavaScript', description: 'Master modern JS concepts', duration: '12h', modules: 8, rating: 4.8, progress: 75, language: 'JavaScript' },
      { title: 'React Fundamentals', description: 'Build dynamic web apps', duration: '15h', modules: 10, rating: 4.9, progress: 45, language: 'React' },
      { title: 'Node.js Backend', description: 'Server-side development', duration: '18h', modules: 12, rating: 4.7, progress: 100, language: 'Node.js' },
      { title: 'Python Data Science', description: 'Analyze data with Python', duration: '20h', modules: 15, rating: 4.6, progress: 30, language: 'Python' }
    ];
    return courses.map((course, index) => ({
      ...course,
      image: `https://picsum.photos/seed/${index + 100}/400/200`
    }));
  }
  
  generateMockAvailableCourses() {
    return [
      { id: '1', title: 'Vue.js Complete Guide', description: 'Progressive JavaScript framework', estimatedHours: 16, rating: 4.8, difficulty: 'Intermediate' },
      { id: '2', title: 'TypeScript Mastery', description: 'Strongly typed JavaScript', estimatedHours: 12, rating: 4.9, difficulty: 'Advanced' },
      { id: '3', title: 'Docker Containers', description: 'Containerization made easy', estimatedHours: 10, rating: 4.7, difficulty: 'Intermediate' },
      { id: '4', title: 'GraphQL APIs', description: 'Modern API development', estimatedHours: 14, rating: 4.6, difficulty: 'Advanced' },
      { id: '5', title: 'MongoDB Database', description: 'NoSQL database fundamentals', estimatedHours: 8, rating: 4.5, difficulty: 'Beginner' },
      { id: '6', title: 'AWS Cloud Services', description: 'Cloud computing essentials', estimatedHours: 22, rating: 4.8, difficulty: 'Advanced' }
    ];
  }
  
  generateMockActivity() {
    return [
      { type: 'COURSE_COMPLETED', message: 'Completed Node.js Backend course', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { type: 'MODULE_COMPLETED', message: 'Finished Module 5: Async Programming', createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { type: 'QUIZ_ATTEMPT', message: 'Scored 92% on JavaScript Basics quiz', createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) },
      { type: 'ENROLL', message: 'Enrolled in React Fundamentals', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      { type: 'PROGRESS_UPDATE', message: 'Reached 75% progress in JavaScript course', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }
    ];
  }
  
  generateMockAchievements() {
    return [
      { icon: '🏆', title: 'Course Completionist', description: 'Completed your first course', earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      { icon: '🔥', title: 'Week Streak', description: 'Studied for 7 consecutive days', earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { icon: '🧠', title: 'Quiz Master', description: 'Scored 90%+ on 5 quizzes', earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { icon: '⚡', title: 'Fast Learner', description: 'Completed a module in under 2 hours', earnedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    ];
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}