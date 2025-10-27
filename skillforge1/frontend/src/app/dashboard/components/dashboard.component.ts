import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { DashboardApiService } from '../../services/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Enhanced Sidebar -->
      <nav class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <span class="logo-icon">🚀</span>
            <span class="logo-text">SkillForge</span>
          </div>
          <div class="user-info">
            <div class="user-details">
              <span class="user-name">{{userName}}</span>
              <span class="user-role">{{userRole}}</span>
            </div>
          </div>
        </div>
        
        <ul class="nav-menu">
          <li class="nav-section">📊 Overview</li>
          <li><a routerLink="/dashboard" class="nav-link active"><span class="nav-icon">🏠</span>Dashboard</a></li>
          
          <li class="nav-section" *ngIf="userRole === 'STUDENT'">📚 Learning</li>
          <li *ngIf="userRole === 'STUDENT'"><a routerLink="/courses" class="nav-link"><span class="nav-icon">📖</span>My Courses</a></li>
          <li *ngIf="userRole === 'STUDENT'"><a routerLink="/learning-path" class="nav-link"><span class="nav-icon">🎯</span>Learning Path</a></li>
          <li *ngIf="userRole === 'STUDENT'"><a routerLink="/quiz" class="nav-link"><span class="nav-icon">❓</span>Take Quiz</a></li>
          <li *ngIf="userRole === 'STUDENT'"><a routerLink="/adaptive-quiz" class="nav-link"><span class="nav-icon">🤖</span>AI Quiz Generator</a></li>
          <li *ngIf="userRole === 'STUDENT'"><a routerLink="/quiz-results" class="nav-link"><span class="nav-icon">📊</span>Quiz Results</a></li>
          <li *ngIf="userRole === 'STUDENT'"><a routerLink="/quiz-history" class="nav-link"><span class="nav-icon">📋</span>Quiz History</a></li>
          
          <li class="nav-section" *ngIf="userRole === 'INSTRUCTOR'">👨‍🏫 Teaching</li>
          <li *ngIf="userRole === 'INSTRUCTOR'"><a routerLink="/instructor/courses" class="nav-link"><span class="nav-icon">📋</span>Course Management</a></li>
          <li *ngIf="userRole === 'INSTRUCTOR'"><a routerLink="/quiz" class="nav-link"><span class="nav-icon">📝</span>Quiz Management</a></li>
          <li *ngIf="userRole === 'INSTRUCTOR'"><a routerLink="/instructor/students" class="nav-link"><span class="nav-icon">👥</span>Student Management</a></li>
          
          <li class="nav-section">⚙️ Tools</li>
          <li><a routerLink="/analytics" class="nav-link"><span class="nav-icon">📈</span>Analytics</a></li>
          <li><a routerLink="/profile" class="nav-link"><span class="nav-icon">👤</span>Profile</a></li>
          <li><a routerLink="/settings" class="nav-link"><span class="nav-icon">⚙️</span>Settings</a></li>
          
          <li class="nav-divider"></li>
          <li><a href="#" (click)="logout(); $event.preventDefault(); $event.stopPropagation()" class="nav-link logout"><span class="nav-icon">🚪</span>Logout</a></li>
        </ul>
      </nav>
      
      <!-- Enhanced Main Content -->
      <main class="main-content">
        <!-- Header -->
        <header class="dashboard-header">
          <div class="header-left">
            <h1>Good {{getTimeOfDay()}}, {{userName}}! 👋</h1>
            <p>Ready to continue your learning journey?</p>
          </div>
          <div class="header-right">
            <div class="quick-actions">
              <button class="quick-btn" *ngIf="userRole === 'STUDENT'" (click)="browseCourses()">🔍 Browse Courses</button>
              <button class="quick-btn" *ngIf="userRole === 'INSTRUCTOR'" (click)="createNewCourse()">➕ Create Course</button>
              <button class="quick-btn" (click)="viewReports()">📊 View Reports</button>
            </div>
          </div>
        </header>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card primary" *ngIf="userRole === 'STUDENT'">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <h3>{{studentStats.coursesEnrolled}}</h3>
              <p>Courses Enrolled</p>
              <span class="stat-change positive">+2 this week</span>
            </div>
          </div>
          
          <div class="stat-card success" *ngIf="userRole === 'STUDENT'">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <h3>{{studentStats.coursesCompleted}}</h3>
              <p>Completed</p>
              <span class="stat-change positive">+1 this month</span>
            </div>
          </div>
          
          <div class="stat-card warning">
            <div class="stat-icon">⏱️</div>
            <div class="stat-content">
              <h3>{{userRole === 'STUDENT' ? studentStats.hoursLearned : instructorStats.hoursTeaching}}</h3>
              <p>Hours {{userRole === 'STUDENT' ? 'Learned' : 'Teaching'}}</p>
              <span class="stat-change positive">+5.2 this week</span>
            </div>
          </div>
          
          <div class="stat-card info">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <h3>{{userRole === 'STUDENT' ? studentStats.certificates : instructorStats.studentsCount}}</h3>
              <p>{{userRole === 'STUDENT' ? 'Certificates' : 'Students'}}</p>
              <span class="stat-change positive">{{userRole === 'STUDENT' ? '+1 earned' : '+12 new'}}</span>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Content -->
        <div class="dashboard-grid">
          <!-- Left Column -->
          <div class="dashboard-left">
            <!-- Progress Section for Students -->
            <div class="dashboard-card" *ngIf="userRole === 'STUDENT'">
              <div class="card-header">
                <h3>📈 Learning Progress</h3>
                <button class="card-action">View All</button>
              </div>
              <div class="progress-overview">
                <div class="overall-progress">
                  <div class="progress-circle">
                    <svg viewBox="0 0 36 36" class="circular-chart">
                      <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      <path class="circle" [attr.stroke-dasharray]="overallProgress + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      <text x="18" y="20.35" class="percentage">{{overallProgress}}%</text>
                    </svg>
                  </div>
                  <div class="progress-info">
                    <h4>Overall Progress</h4>
                    <p>Keep going! You're doing great.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Courses -->
            <div class="dashboard-card">
              <div class="card-header">
                <h3>{{userRole === 'STUDENT' ? '📚 Continue Learning' : '👨‍🏫 Your Courses'}}</h3>
                <button class="card-action">View All</button>
              </div>
              <div class="course-list">
                <div *ngFor="let course of currentCourses" class="course-item">
                  <img [src]="course.image" alt="Course" class="course-thumb">
                  <div class="course-info">
                    <h4>{{course.title}}</h4>
                    <p>{{course.instructor}}</p>
                    <div class="course-progress" *ngIf="userRole === 'STUDENT'">
                      <div class="progress-bar">
                        <div class="progress-fill" [style.width.%]="course.progress"></div>
                      </div>
                      <span class="progress-text">{{course.progress}}%</span>
                    </div>
                    <div class="course-stats" *ngIf="userRole === 'INSTRUCTOR'">
                      <span class="stat">👥 {{course.students}} students</span>
                      <span class="stat">⭐ {{course.rating}}</span>
                    </div>
                  </div>
                  <button class="continue-btn" (click)="continueCourse(course)">{{userRole === 'STUDENT' ? 'Continue' : 'Manage'}}</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="dashboard-right">
            <!-- Quick Actions -->
            <div class="dashboard-card">
              <div class="card-header">
                <h3>⚡ Quick Actions</h3>
              </div>
              <div class="quick-actions-grid">
                <button class="action-card" *ngIf="userRole === 'STUDENT'" (click)="takeQuiz()">
                  <span class="action-icon">🎯</span>
                  <span class="action-text">Take Quiz</span>
                </button>
                <button class="action-card" *ngIf="userRole === 'STUDENT'" (click)="browseCourses()">
                  <span class="action-icon">🔍</span>
                  <span class="action-text">Browse Courses</span>
                </button>
                <button class="action-card" *ngIf="userRole === 'INSTRUCTOR'" (click)="createNewCourse()">
                  <span class="action-icon">➕</span>
                  <span class="action-text">Create Course</span>
                </button>
                <button class="action-card" (click)="viewAnalytics()">
                  <span class="action-icon">📊</span>
                  <span class="action-text">View Analytics</span>
                </button>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="dashboard-card">
              <div class="card-header">
                <h3>🕒 Recent Activity</h3>
              </div>
              <div class="activity-list">
                <div *ngFor="let activity of recentActivities" class="activity-item">
                  <div class="activity-icon" [class]="activity.type">{{activity.icon}}</div>
                  <div class="activity-content">
                    <p>{{activity.description}}</p>
                    <span class="activity-time">{{activity.time}}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Achievements -->
            <div class="dashboard-card" *ngIf="userRole === 'STUDENT'">
              <div class="card-header">
                <h3>🏆 Recent Achievements</h3>
              </div>
              <div class="achievements-list">
                <div *ngFor="let achievement of recentAchievements" class="achievement-item">
                  <span class="achievement-icon">{{achievement.icon}}</span>
                  <div class="achievement-info">
                    <h4>{{achievement.title}}</h4>
                    <p>{{achievement.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: string | null = null;
  userName = '';
  userEmail = '';
  overallProgress = 68;

  studentStats = {
    coursesEnrolled: 12,
    coursesCompleted: 8,
    hoursLearned: 156,
    certificates: 5
  };

  instructorStats = {
    coursesCreated: 6,
    studentsCount: 234,
    hoursTeaching: 89,
    avgRating: 4.8
  };

  currentCourses = [
    {
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      image: 'https://picsum.photos/seed/react1/60/60',
      progress: 75,
      students: 45,
      rating: 4.9
    },
    {
      title: 'Node.js Masterclass',
      instructor: 'Mike Chen',
      image: 'https://picsum.photos/seed/node1/60/60',
      progress: 45,
      students: 67,
      rating: 4.7
    },
    {
      title: 'AWS Cloud Practitioner',
      instructor: 'Emma Davis',
      image: 'https://picsum.photos/seed/aws1/60/60',
      progress: 90,
      students: 123,
      rating: 4.8
    }
  ];

  recentActivities = [
    {
      icon: '✅',
      type: 'success',
      description: 'Completed "JavaScript Fundamentals" course',
      time: '2 hours ago'
    },
    {
      icon: '🎯',
      type: 'info',
      description: 'Started "React Advanced Patterns" lesson',
      time: '1 day ago'
    },
    {
      icon: '🏆',
      type: 'warning',
      description: 'Earned "Quick Learner" badge',
      time: '2 days ago'
    }
  ];

  recentAchievements = [
    {
      icon: '🚀',
      title: 'Fast Learner',
      description: 'Completed 3 courses this month'
    },
    {
      icon: '🎯',
      title: 'Goal Achiever',
      description: 'Met your weekly learning goal'
    }
  ];

  instructorCourses = [
    {
      title: 'Advanced JavaScript Mastery',
      category: 'Programming',
      image: 'https://picsum.photos/seed/js-course/60/60',
      students: 156,
      rating: 4.8,
      revenue: 2450
    },
    {
      title: 'React Development Bootcamp',
      category: 'Frontend',
      image: 'https://picsum.photos/seed/react-course/60/60',
      students: 89,
      rating: 4.9,
      revenue: 1890
    },
    {
      title: 'Node.js Backend Development',
      category: 'Backend',
      image: 'https://picsum.photos/seed/node-course/60/60',
      students: 67,
      rating: 4.7,
      revenue: 1340
    }
  ];

  instructorActivities = [
    {
      icon: '👤',
      type: 'info',
      description: 'New student enrolled in "Advanced JavaScript"',
      time: '2 hours ago'
    },
    {
      icon: '⭐',
      type: 'success',
      description: 'Received 5-star rating from Sarah M.',
      time: '5 hours ago'
    },
    {
      icon: '💬',
      type: 'info',
      description: 'New question posted in React course forum',
      time: '1 day ago'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardApi: DashboardApiService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.loadUserData();
    this.loadDashboardData();
  }
  
  loadUserData() {
    this.userName = localStorage.getItem('userName') || 'User';
    this.userEmail = localStorage.getItem('userEmail') || '';
  }
  
  loadDashboardData() {
    this.dashboardApi.getDashboardData().subscribe({
      next: (data) => {
        console.log('Dashboard data:', data);
        if (data.stats) {
          this.studentStats = {
            coursesEnrolled: data.stats.coursesEnrolled || 0,
            coursesCompleted: data.stats.coursesCompleted || 0,
            hoursLearned: data.stats.hoursLearned || 0,
            certificates: data.stats.certificates || 0
          };
          
          this.instructorStats = {
            coursesCreated: data.stats.coursesCreated || 0,
            studentsCount: data.stats.studentsCount || 0,
            hoursTeaching: data.stats.hoursTeaching || 0,
            avgRating: data.stats.avgRating || 0
          };
        }
        
        if (data.enrolledCourses) {
          this.currentCourses = data.enrolledCourses.map((course: any) => ({
            title: course.title,
            instructor: course.instructor,
            image: course.image || `https://picsum.photos/seed/${course.id}/60/60`,
            progress: course.progress || 0,
            students: course.students || 0,
            rating: course.rating || 0
          }));
        }
        
        if (data.recentActivities) {
          this.recentActivities = data.recentActivities.map((activity: any) => ({
            icon: this.getActivityIcon(activity.type),
            type: activity.type?.toLowerCase() || 'info',
            description: activity.description,
            time: this.formatTime(activity.createdAt)
          }));
        }
        
        if (data.achievements) {
          this.recentAchievements = data.achievements.map((achievement: any) => ({
            icon: achievement.icon || '🏆',
            title: achievement.title,
            description: achievement.description
          }));
        }
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        // Keep default static data if API fails
      }
    });
    
    // Load user profile
    this.dashboardApi.getUserProfile().subscribe({
      next: (profile) => {
        // Profile loaded successfully
      },
      error: (error) => {
        console.error('Error loading profile:', error);
      }
    });
  }
  
  getActivityIcon(type: string): string {
    switch(type?.toLowerCase()) {
      case 'enroll': return '📚';
      case 'complete': return '✅';
      case 'achievement': return '🏆';
      case 'quiz': return '🎯';
      default: return '📝';
    }
  }
  
  formatTime(dateString: string): string {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  }

  getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  createNewCourse() {
    console.log('Creating new course...');
    // Navigate to course creation page
  }

  browseCourses() {
    console.log('Browsing courses...');
    this.router.navigate(['/courses']);
  }

  viewReports() {
    console.log('Viewing reports...');
    // Navigate to reports page
  }

  takeQuiz() {
    console.log('Taking quiz...');
    this.router.navigateByUrl('/quiz');
  }

  viewAnalytics() {
    console.log('Viewing analytics...');
    this.router.navigateByUrl('/analytics');
  }

  continueCourse(course: any) {
    console.log('Continuing course:', course.title);
    // Navigate to course page
  }

  viewAllProgress() {
    console.log('Viewing all progress...');
    // Navigate to progress page
  }

  viewAllCourses() {
    console.log('Viewing all courses...');
    this.router.navigate(['/courses']);
  }


}