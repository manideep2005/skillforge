import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="analytics-container">
      <div class="analytics-header">
        <h1>📊 Learning Analytics</h1>
        <p>Track your progress and performance</p>
      </div>

      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-content">
            <h3>{{analytics.totalCourses || 0}}</h3>
            <p>Courses Enrolled</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>{{analytics.completedCourses || 0}}</h3>
            <p>Courses Completed</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-content">
            <h3>{{analytics.totalHours || 0}}h</h3>
            <p>Learning Hours</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <h3>{{analytics.averageScore || 0}}%</h3>
            <p>Average Score</p>
          </div>
        </div>
      </div>

      <div class="analytics-content">
        <div class="chart-section">
          <div class="chart-card">
            <h3>📈 Learning Progress</h3>
            <div class="progress-chart">
              <div class="progress-week">
                <div *ngFor="let day of weeklyProgress" class="progress-day">
                  <div class="progress-bar" [style.height.%]="day.progress"></div>
                  <span class="day-label">{{day.day}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card">
            <h3>🏆 Recent Achievements</h3>
            <div class="achievements-list">
              <div *ngFor="let achievement of recentAchievements" class="achievement-item">
                <span class="achievement-icon">{{achievement.icon}}</span>
                <div class="achievement-info">
                  <h4>{{achievement.title}}</h4>
                  <p>{{achievement.date}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="performance-section">
          <div class="performance-card">
            <h3>📊 Subject Performance</h3>
            <div class="subject-list">
              <div *ngFor="let subject of subjectPerformance" class="subject-item">
                <div class="subject-info">
                  <span class="subject-name">{{subject.name}}</span>
                  <span class="subject-score">{{subject.score}}%</span>
                </div>
                <div class="subject-progress">
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" [style.width.%]="subject.score"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 100vh;
    }

    .analytics-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .analytics-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .analytics-header p {
      color: #64748b;
      font-size: 1.1rem;
    }

    .stats-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 50px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
      font-size: 2.5rem;
    }

    .stat-content h3 {
      font-size: 2rem;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 4px;
    }

    .stat-content p {
      color: #64748b;
      font-weight: 500;
    }

    .analytics-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
    }

    .chart-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .chart-card, .performance-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .chart-card h3, .performance-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 20px;
    }

    .progress-chart {
      padding: 20px 0;
    }

    .progress-week {
      display: flex;
      justify-content: space-between;
      align-items: end;
      height: 150px;
    }

    .progress-day {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .progress-bar {
      width: 30px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 4px;
      min-height: 20px;
    }

    .day-label {
      font-size: 0.8rem;
      color: #64748b;
      font-weight: 500;
    }

    .achievements-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .achievement-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f8fafc;
      border-radius: 12px;
    }

    .achievement-icon {
      font-size: 1.5rem;
    }

    .achievement-info h4 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .achievement-info p {
      color: #64748b;
      font-size: 0.875rem;
    }

    .subject-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .subject-item {
      padding: 16px;
      background: #f8fafc;
      border-radius: 12px;
    }

    .subject-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .subject-name {
      font-weight: 600;
      color: #1e293b;
    }

    .subject-score {
      font-weight: 600;
      color: #3b82f6;
    }

    .progress-bar-bg {
      width: 100%;
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      transition: width 0.3s ease;
    }

    @media (max-width: 768px) {
      .analytics-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  analytics: any = {};
  weeklyProgress = [
    { day: 'Mon', progress: 80 },
    { day: 'Tue', progress: 65 },
    { day: 'Wed', progress: 90 },
    { day: 'Thu', progress: 75 },
    { day: 'Fri', progress: 85 },
    { day: 'Sat', progress: 60 },
    { day: 'Sun', progress: 45 }
  ];

  recentAchievements = [
    { icon: '🏆', title: 'Course Completed', date: '2 days ago' },
    { icon: '🎯', title: 'Perfect Score', date: '1 week ago' },
    { icon: '🔥', title: '7-day Streak', date: '1 week ago' }
  ];

  subjectPerformance = [
    { name: 'JavaScript', score: 92 },
    { name: 'React', score: 88 },
    { name: 'Node.js', score: 85 },
    { name: 'CSS', score: 90 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get('http://localhost:3000/api/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.analytics = data;
        },
        error: (error) => {
          console.error('Error loading analytics:', error);
          // Use default values if API fails
          this.analytics = {
            totalCourses: 8,
            completedCourses: 5,
            totalHours: 42,
            averageScore: 87
          };
        }
      });
    }
  }
}