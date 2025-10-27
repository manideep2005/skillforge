import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="profile-container">
      <!-- Enhanced Header -->
      <div class="profile-header">
        <div class="header-background"></div>
        <div class="profile-content-header">
          <div class="profile-main-info">
            <div class="profile-avatar-placeholder">
              <span class="avatar-initials">{{getInitials()}}</span>
            </div>
            <div class="profile-details">
              <h1>{{userProfile.name}}</h1>
              <p class="profile-title">{{userProfile.title}}</p>
              <div class="profile-meta">
                <span class="meta-item">📍 {{userProfile.location || 'Location not set'}}</span>
                <span class="meta-item">📅 Joined {{userProfile.joinDate}}</span>
              </div>
            </div>
          </div>
          <div class="profile-actions">
            <button class="action-btn secondary">📤 Share Profile</button>
            <button class="action-btn primary">✏️ Edit Profile</button>
          </div>
        </div>
        
        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <span class="stat-number">{{userProfile.coursesCompleted}}</span>
              <span class="stat-label">Courses Completed</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-content">
              <span class="stat-number">{{userProfile.hoursLearned}}</span>
              <span class="stat-label">Hours Learned</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <span class="stat-number">{{userProfile.certificates}}</span>
              <span class="stat-label">Certificates</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-content">
              <span class="stat-number">{{userProfile.streak}}</span>
              <span class="stat-label">Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="profile-content">
        <!-- Left Column -->
        <div class="profile-left">
          <!-- About Section -->
          <div class="profile-card">
            <h3>📝 About</h3>
            <p>{{userProfile.bio}}</p>
          </div>

          <!-- Skills Section -->
          <div class="profile-card">
            <h3>🎯 Skills</h3>
            <div class="skills-grid">
              <div *ngFor="let skill of userProfile.skills" class="skill-tag">
                {{skill.name}}
                <div class="skill-level" [style.width.%]="skill.level"></div>
              </div>
            </div>
          </div>

          <!-- Achievements -->
          <div class="profile-card">
            <h3>🏆 Achievements</h3>
            <div class="achievements-grid">
              <div *ngFor="let achievement of userProfile.achievements" class="achievement">
                <span class="achievement-icon">{{achievement.icon}}</span>
                <div class="achievement-info">
                  <h4>{{achievement.title}}</h4>
                  <p>{{achievement.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="profile-right">
          <!-- Learning Activity -->
          <div class="profile-card">
            <h3>📊 Learning Activity</h3>
            <div class="activity-chart">
              <div class="activity-week">
                <div *ngFor="let day of activityData" class="activity-day">
                  <div class="activity-bar" [style.height.%]="day.activity"></div>
                  <span class="day-label">{{day.day}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Courses -->
          <div class="profile-card">
            <h3>📚 Recent Courses</h3>
            <div class="recent-courses">
              <div *ngFor="let course of recentCourses" class="course-item">
                <img [src]="course.image" alt="Course" class="course-thumb">
                <div class="course-info">
                  <h4>{{course.title}}</h4>
                  <div class="course-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" [style.width.%]="course.progress"></div>
                    </div>
                    <span class="progress-text">{{course.progress}}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Certificates -->
          <div class="profile-card">
            <h3>🎓 Certificates</h3>
            <div class="certificates-grid">
              <div *ngFor="let cert of certificates" class="certificate">
                <div class="cert-icon">🏆</div>
                <div class="cert-info">
                  <h4>{{cert.title}}</h4>
                  <p>{{cert.issuer}} • {{cert.date}}</p>
                </div>
                <button class="view-cert-btn">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};
  
  constructor(private http: HttpClient) {}

  activityData = [
    { day: 'Mon', activity: 80 },
    { day: 'Tue', activity: 60 },
    { day: 'Wed', activity: 90 },
    { day: 'Thu', activity: 70 },
    { day: 'Fri', activity: 85 },
    { day: 'Sat', activity: 40 },
    { day: 'Sun', activity: 30 }
  ];

  recentCourses = [
    {
      title: 'Advanced React Patterns',
      image: 'https://picsum.photos/seed/react1/60/60',
      progress: 75
    },
    {
      title: 'Node.js Masterclass',
      image: 'https://picsum.photos/seed/node1/60/60',
      progress: 45
    },
    {
      title: 'AWS Cloud Practitioner',
      image: 'https://picsum.photos/seed/aws1/60/60',
      progress: 90
    }
  ];

  certificates = [
    { title: 'JavaScript Expert', issuer: 'SkillForge', date: 'Dec 2024' },
    { title: 'React Developer', issuer: 'SkillForge', date: 'Nov 2024' },
    { title: 'AWS Certified', issuer: 'Amazon', date: 'Oct 2024' }
  ];

  ngOnInit() {
    this.loadUserProfile();
  }
  
  loadUserProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get('http://localhost:3000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.userProfile = data;
        },
        error: (error) => {
          console.error('Error loading profile:', error);
        }
      });
    }
  }
  
  getInitials(): string {
    if (!this.userProfile.name) return '';
    return this.userProfile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  }
}