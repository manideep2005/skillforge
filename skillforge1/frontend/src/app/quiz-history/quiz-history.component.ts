import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-quiz-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="quiz-history-container">
      <div class="history-header">
        <h1>📋 Quiz History</h1>
        <p>Track your quiz performance over time</p>
        <div class="header-actions">
          <button class="filter-btn" (click)="toggleFilters()">🔍 Filters</button>
          <button class="export-btn" (click)="exportHistory()">📊 Export</button>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters-section" *ngIf="showFilters">
        <div class="filter-row">
          <select [(ngModel)]="selectedTopic" (change)="applyFilters()" class="filter-select">
            <option value="">All Topics</option>
            <option *ngFor="let topic of availableTopics" [value]="topic">{{topic}}</option>
          </select>
          
          <select [(ngModel)]="selectedDifficulty" (change)="applyFilters()" class="filter-select">
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          
          <input type="date" [(ngModel)]="dateFrom" (change)="applyFilters()" class="filter-date">
          <input type="date" [(ngModel)]="dateTo" (change)="applyFilters()" class="filter-date">
        </div>
      </div>

      <!-- Statistics Overview -->
      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <h3>{{totalQuizzes}}</h3>
            <p>Total Quizzes</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>{{averageScore}}%</h3>
            <p>Average Score</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <h3>{{bestScore}}%</h3>
            <p>Best Score</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-content">
            <h3>{{totalTimeSpent}}h</h3>
            <p>Time Spent</p>
          </div>
        </div>
      </div>

      <!-- Quiz History List -->
      <div class="history-list">
        <div class="list-header">
          <h2>Recent Quiz Attempts</h2>
          <div class="sort-options">
            <select [(ngModel)]="sortBy" (change)="sortHistory()" class="sort-select">
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
              <option value="topic">Sort by Topic</option>
            </select>
          </div>
        </div>

        <div class="quiz-items">
          <div *ngFor="let quiz of filteredHistory" class="quiz-item" (click)="viewQuizDetails(quiz)">
            <div class="quiz-info">
              <div class="quiz-header">
                <h3>{{quiz.topicName}}</h3>
                <span class="quiz-date">{{formatDate(quiz.completedAt)}}</span>
              </div>
              
              <div class="quiz-details">
                <div class="detail-item">
                  <span class="label">Score:</span>
                  <span class="score" [class]="getScoreClass(quiz.scorePercentage)">
                    {{quiz.scorePercentage}}%
                  </span>
                </div>
                
                <div class="detail-item">
                  <span class="label">Questions:</span>
                  <span class="value">{{quiz.correctAnswers}}/{{quiz.totalQuestions}}</span>
                </div>
                
                <div class="detail-item">
                  <span class="label">Time:</span>
                  <span class="value">{{quiz.timeSpentMinutes}} min</span>
                </div>
                
                <div class="detail-item">
                  <span class="label">Difficulty:</span>
                  <span class="difficulty" [class]="quiz.difficultyLevel">{{quiz.difficultyLevel}}</span>
                </div>
              </div>
            </div>
            
            <div class="quiz-actions">
              <button class="action-btn view" (click)="viewQuizDetails(quiz); $event.stopPropagation()">
                👁️ View
              </button>
              <button class="action-btn retake" (click)="retakeQuiz(quiz); $event.stopPropagation()">
                🔄 Retake
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="filteredHistory.length === 0">
          <div class="empty-icon">📝</div>
          <h3>No Quiz History Found</h3>
          <p>Start taking quizzes to see your history here!</p>
          <button class="start-quiz-btn" (click)="startQuiz()">Take Your First Quiz</button>
        </div>
      </div>

      <!-- Performance Chart -->
      <div class="performance-chart">
        <h2>📊 Performance Trends</h2>
        <div class="chart-container">
          <div class="chart-placeholder">
            <p>Performance chart will be displayed here</p>
            <div class="mock-chart">
              <div *ngFor="let point of chartData" class="chart-bar" [style.height.%]="point.score">
                <span class="bar-label">{{point.topic}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quiz-history-container {
      padding: 40px;
      max-width: 1400px;
      margin: 0 auto;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 100vh;
    }

    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .filter-btn, .export-btn {
      padding: 8px 16px;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .filters-section {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .filter-row {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .filter-select, .filter-date, .sort-select {
      padding: 8px 12px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      background: white;
    }

    .stats-overview {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-icon {
      font-size: 2.5rem;
    }

    .stat-content h3 {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .stat-content p {
      color: #64748b;
      margin: 4px 0 0 0;
    }

    .history-list {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      margin-bottom: 32px;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #e2e8f0;
    }

    .quiz-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      border-bottom: 1px solid #f1f5f9;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .quiz-item:hover {
      background: #f8fafc;
    }

    .quiz-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .quiz-details {
      display: flex;
      gap: 24px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .label {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 600;
    }

    .score.excellent { color: #10b981; }
    .score.good { color: #3b82f6; }
    .score.average { color: #f59e0b; }
    .score.poor { color: #ef4444; }

    .difficulty.easy { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; }
    .difficulty.medium { background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; }
    .difficulty.hard { background: #fecaca; color: #991b1b; padding: 2px 8px; border-radius: 4px; }

    .quiz-actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .action-btn.view {
      background: #eff6ff;
      color: #1d4ed8;
    }

    .action-btn.retake {
      background: #f0fdf4;
      color: #166534;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 16px;
    }

    .start-quiz-btn {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 16px;
    }

    .performance-chart {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .mock-chart {
      display: flex;
      gap: 8px;
      align-items: end;
      height: 200px;
      padding: 20px;
    }

    .chart-bar {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      width: 40px;
      border-radius: 4px 4px 0 0;
      position: relative;
      min-height: 20px;
    }

    .bar-label {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.75rem;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .stats-overview {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .filter-row {
        flex-direction: column;
        align-items: stretch;
      }
      
      .quiz-item {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }
    }
  `]
})
export class QuizHistoryComponent implements OnInit {
  quizHistory: any[] = [];
  filteredHistory: any[] = [];
  availableTopics: string[] = [];
  showFilters = false;
  
  // Filter options
  selectedTopic = '';
  selectedDifficulty = '';
  dateFrom = '';
  dateTo = '';
  sortBy = 'date';
  
  // Statistics
  totalQuizzes = 0;
  averageScore = 0;
  bestScore = 0;
  totalTimeSpent = 0;
  
  // Chart data
  chartData: any[] = [];
  
  private readonly API_BASE = 'http://localhost:8080/api';
  private readonly courseId = 'dsa-course';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadQuizHistory();
  }

  loadQuizHistory() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${this.API_BASE}/adaptive-quiz/quiz-history/${this.courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.quizHistory = data;
          this.filteredHistory = [...this.quizHistory];
          this.calculateStatistics();
          this.extractAvailableTopics();
          this.generateChartData();
        },
        error: (error) => {
          console.error('Error loading quiz history:', error);
          // Load mock data for demo
          this.loadMockData();
        }
      });
    } else {
      this.loadMockData();
    }
  }

  loadMockData() {
    this.quizHistory = [
      {
        topicName: 'Linear Search',
        scorePercentage: 85,
        correctAnswers: 8,
        totalQuestions: 10,
        timeSpentMinutes: 12,
        difficultyLevel: 'easy',
        completedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        topicName: 'Binary Search',
        scorePercentage: 70,
        correctAnswers: 7,
        totalQuestions: 10,
        timeSpentMinutes: 15,
        difficultyLevel: 'medium',
        completedAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        topicName: 'Quick Sort',
        scorePercentage: 60,
        correctAnswers: 6,
        totalQuestions: 10,
        timeSpentMinutes: 18,
        difficultyLevel: 'hard',
        completedAt: new Date(Date.now() - 259200000).toISOString()
      }
    ];
    
    this.filteredHistory = [...this.quizHistory];
    this.calculateStatistics();
    this.extractAvailableTopics();
    this.generateChartData();
  }

  calculateStatistics() {
    this.totalQuizzes = this.quizHistory.length;
    
    if (this.totalQuizzes > 0) {
      this.averageScore = Math.round(
        this.quizHistory.reduce((sum, quiz) => sum + quiz.scorePercentage, 0) / this.totalQuizzes
      );
      
      this.bestScore = Math.max(...this.quizHistory.map(quiz => quiz.scorePercentage));
      
      this.totalTimeSpent = Math.round(
        this.quizHistory.reduce((sum, quiz) => sum + quiz.timeSpentMinutes, 0) / 60
      );
    }
  }

  extractAvailableTopics() {
    this.availableTopics = [...new Set(this.quizHistory.map(quiz => quiz.topicName))];
  }

  generateChartData() {
    const topicScores = this.availableTopics.map(topic => {
      const topicQuizzes = this.quizHistory.filter(quiz => quiz.topicName === topic);
      const avgScore = topicQuizzes.reduce((sum, quiz) => sum + quiz.scorePercentage, 0) / topicQuizzes.length;
      return { topic, score: avgScore };
    });
    
    this.chartData = topicScores;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    this.filteredHistory = this.quizHistory.filter(quiz => {
      const topicMatch = !this.selectedTopic || quiz.topicName === this.selectedTopic;
      const difficultyMatch = !this.selectedDifficulty || quiz.difficultyLevel === this.selectedDifficulty;
      
      let dateMatch = true;
      if (this.dateFrom || this.dateTo) {
        const quizDate = new Date(quiz.completedAt);
        if (this.dateFrom) {
          dateMatch = dateMatch && quizDate >= new Date(this.dateFrom);
        }
        if (this.dateTo) {
          dateMatch = dateMatch && quizDate <= new Date(this.dateTo);
        }
      }
      
      return topicMatch && difficultyMatch && dateMatch;
    });
  }

  sortHistory() {
    this.filteredHistory.sort((a, b) => {
      switch (this.sortBy) {
        case 'score':
          return b.scorePercentage - a.scorePercentage;
        case 'topic':
          return a.topicName.localeCompare(b.topicName);
        case 'date':
        default:
          return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      }
    });
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'average';
    return 'poor';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  viewQuizDetails(quiz: any) {
    this.router.navigate(['/quiz-results'], {
      state: { quizResult: quiz }
    });
  }

  retakeQuiz(quiz: any) {
    this.router.navigate(['/adaptive-quiz'], {
      queryParams: { topic: quiz.topicName }
    });
  }

  startQuiz() {
    this.router.navigate(['/adaptive-quiz']);
  }

  exportHistory() {
    // Simple CSV export
    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  generateCSV(): string {
    const headers = ['Topic', 'Score %', 'Correct/Total', 'Time (min)', 'Difficulty', 'Date'];
    const rows = this.filteredHistory.map(quiz => [
      quiz.topicName,
      quiz.scorePercentage,
      `${quiz.correctAnswers}/${quiz.totalQuestions}`,
      quiz.timeSpentMinutes,
      quiz.difficultyLevel,
      this.formatDate(quiz.completedAt)
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}