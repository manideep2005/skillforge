import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quiz-results-container">
      <div class="results-header">
        <button class="back-btn" (click)="goBack()">← Back to Quiz</button>
        <h1>📊 Detailed Quiz Analysis</h1>
        <p>AI-powered insights and recommendations</p>
      </div>

      <!-- Anti-Cheating Report -->
      <div class="integrity-report" *ngIf="quizResult && hasIntegrityData()">
        <h2>🔒 Quiz Integrity Report</h2>
        <div class="integrity-grid">
          <div class="integrity-item" [class]="getIntegrityClass('tabSwitch')">
            <span class="integrity-icon">📱</span>
            <div class="integrity-content">
              <h3>Tab Switches</h3>
              <p>{{quizResult.tabSwitchCount || 0}} detected</p>
            </div>
          </div>
          <div class="integrity-item" [class]="getIntegrityClass('suspicious')">
            <span class="integrity-icon">⚠️</span>
            <div class="integrity-content">
              <h3>Suspicious Activities</h3>
              <p>{{(quizResult.suspiciousActivities || []).length}} detected</p>
            </div>
          </div>
          <div class="integrity-item" [class]="getIntegrityClass('fullscreen')">
            <span class="integrity-icon">📺</span>
            <div class="integrity-content">
              <h3>Fullscreen Mode</h3>
              <p>{{quizResult.wasFullScreen ? 'Used' : 'Not used'}}</p>
            </div>
          </div>
        </div>
        <div class="integrity-status">
          <span class="status-badge" [class]="getOverallIntegrityClass()">
            {{getIntegrityStatus()}}
          </span>
        </div>
      </div>

      <div class="performance-overview" *ngIf="quizResult">
        <div class="score-card">
          <div class="score-circle" [class]="getScoreClass(quizResult.scorePercentage)">
            <span class="score-text">{{quizResult.scorePercentage}}%</span>
          </div>
          <h2>{{quizResult.topicName}} Quiz</h2>
          <p>{{getScoreDescription(quizResult.scorePercentage)}}</p>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">{{quizResult.correctAnswers}}</span>
            <span class="stat-label">Correct</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{quizResult.totalQuestions - quizResult.correctAnswers}}</span>
            <span class="stat-label">Incorrect</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{quizResult.timeSpentMinutes}}</span>
            <span class="stat-label">Minutes</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{quizResult.difficultyLevel}}</span>
            <span class="stat-label">Level</span>
          </div>
        </div>
      </div>

      <div class="ai-insights-section">
        <h2>🤖 AI Insights</h2>
        <div class="insights-grid">
          <div class="insight-card strengths">
            <h3>💪 Strengths</h3>
            <ul><li *ngFor="let strength of aiInsights.strengths">{{strength}}</li></ul>
          </div>
          <div class="insight-card weaknesses">
            <h3>📚 Improve</h3>
            <ul><li *ngFor="let weakness of aiInsights.weaknesses">{{weakness}}</li></ul>
          </div>
          <div class="insight-card recommendations">
            <h3>🎯 Next Steps</h3>
            <ul><li *ngFor="let rec of aiInsights.recommendations">{{rec}}</li></ul>
          </div>
        </div>
      </div>

      <div class="suggested-topics">
        <h2>🚀 Suggested Topics</h2>
        <div class="topics-grid">
          <div *ngFor="let topic of suggestedTopics" class="topic-suggestion">
            <div class="topic-icon">{{topic.icon}}</div>
            <h3>{{topic.name}}</h3>
            <p>{{topic.description}}</p>
            <span class="difficulty" [class]="topic.difficulty">{{topic.difficulty}}</span>
            <button class="start-btn" (click)="startTopic(topic.name)">Start Learning</button>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="btn secondary" (click)="retakeQuiz()">🔄 Retake</button>
        <button class="btn primary" (click)="continueToNextTopic()">➡️ Next Topic</button>
      </div>
    </div>
  `,
  styles: [`
    .quiz-results-container { padding: 40px; max-width: 1200px; margin: 0 auto; }
    .results-header { text-align: center; margin-bottom: 40px; }
    .back-btn { position: absolute; top: 20px; left: 20px; padding: 8px 16px; border: 2px solid #e2e8f0; background: white; border-radius: 8px; cursor: pointer; }
    .performance-overview { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); margin-bottom: 32px; text-align: center; }
    .score-circle { width: 150px; height: 150px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
    .score-circle.excellent { background: linear-gradient(135deg, #10b981, #059669); }
    .score-circle.good { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
    .score-circle.average { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .score-circle.poor { background: linear-gradient(135deg, #ef4444, #dc2626); }
    .score-text { font-size: 2.5rem; font-weight: 700; color: white; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 32px; }
    .stat-item { text-align: center; }
    .stat-number { display: block; font-size: 2rem; font-weight: 700; color: #1e293b; }
    .stat-label { color: #64748b; font-size: 0.875rem; }
    .insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 24px; }
    .insight-card { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
    .insight-card.strengths { border-left: 4px solid #10b981; }
    .insight-card.weaknesses { border-left: 4px solid #ef4444; }
    .insight-card.recommendations { border-left: 4px solid #3b82f6; }
    .topics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 24px; }
    .topic-suggestion { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); text-align: center; }
    .topic-icon { font-size: 3rem; margin-bottom: 16px; }
    .action-buttons { display: flex; gap: 16px; justify-content: center; margin-top: 40px; }
    .btn { padding: 12px 24px; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; }
    .btn.primary { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
    .btn.secondary { background: #f8fafc; color: #64748b; border: 2px solid #e2e8f0; }
    .difficulty.easy { background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; }
    .difficulty.medium { background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; }
    .difficulty.hard { background: #fecaca; color: #991b1b; padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; }
    .start-btn { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-top: 16px; }
    
    .integrity-report { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); margin-bottom: 24px; }
    .integrity-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0; }
    .integrity-item { display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 12px; }
    .integrity-item.excellent { background: #f0fdf4; border: 2px solid #10b981; }
    .integrity-item.warning { background: #fef3c7; border: 2px solid #f59e0b; }
    .integrity-item.danger { background: #fef2f2; border: 2px solid #ef4444; }
    .integrity-icon { font-size: 1.5rem; }
    .integrity-content h3 { margin: 0; font-size: 0.875rem; color: #374151; }
    .integrity-content p { margin: 4px 0 0 0; font-size: 0.75rem; color: #6b7280; }
    .integrity-status { text-align: center; margin-top: 16px; }
    .status-badge { padding: 8px 16px; border-radius: 20px; font-weight: 600; }
    .status-badge.excellent { background: #10b981; color: white; }
    .status-badge.good { background: #f59e0b; color: white; }
    .status-badge.flagged { background: #ef4444; color: white; }
  `]
})
export class QuizResultsComponent implements OnInit {
  quizResult: any = null;
  aiInsights: any = {};
  suggestedTopics: any[] = [];
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.loadQuizResult();
    this.generateAIInsights();
    this.loadSuggestedTopics();
  }

  loadQuizResult() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['quizResult']) {
      this.quizResult = navigation.extras.state['quizResult'];
    }
  }

  generateAIInsights() {
    if (!this.quizResult) return;
    const score = this.quizResult.scorePercentage;
    
    this.aiInsights = {
      strengths: score >= 80 ? 
        ["Excellent understanding of core concepts", "Strong problem-solving abilities"] :
        ["Good grasp of fundamental principles", "Shows potential for improvement"],
      weaknesses: score < 60 ? 
        ["Need to strengthen fundamental concepts", "More practice required"] :
        ["Minor gaps in advanced topics", "Could improve speed"],
      recommendations: score < 70 ? 
        ["Review fundamentals before advancing", "Practice with easier problems first"] :
        ["Ready for advanced topics", "Consider exploring related concepts"]
    };
  }

  loadSuggestedTopics() {
    this.suggestedTopics = [
      { name: "Binary Search Trees", description: "Learn hierarchical data structures", difficulty: "medium", icon: "🌳" },
      { name: "Graph Algorithms", description: "Explore network-based problems", difficulty: "hard", icon: "🕸️" },
      { name: "Dynamic Programming", description: "Master optimization techniques", difficulty: "hard", icon: "🧩" }
    ];
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'average';
    return 'poor';
  }

  getScoreDescription(score: number): string {
    if (score >= 90) return 'Outstanding Performance! 🌟';
    if (score >= 75) return 'Great Job! Keep it up! 👏';
    if (score >= 60) return 'Good effort! Room for improvement 📈';
    return 'Keep practicing! You\'ll get better 💪';
  }
  
  hasIntegrityData(): boolean {
    return this.quizResult && (
      this.quizResult.tabSwitchCount !== undefined ||
      this.quizResult.suspiciousActivities !== undefined ||
      this.quizResult.wasFullScreen !== undefined
    );
  }
  
  getIntegrityClass(type: string): string {
    if (!this.quizResult) return 'good';
    
    switch (type) {
      case 'tabSwitch':
        const tabSwitches = this.quizResult.tabSwitchCount || 0;
        return tabSwitches === 0 ? 'excellent' : tabSwitches <= 2 ? 'warning' : 'danger';
      case 'suspicious':
        const suspicious = (this.quizResult.suspiciousActivities || []).length;
        return suspicious === 0 ? 'excellent' : suspicious <= 3 ? 'warning' : 'danger';
      case 'fullscreen':
        return this.quizResult.wasFullScreen ? 'excellent' : 'warning';
      default:
        return 'good';
    }
  }
  
  getOverallIntegrityClass(): string {
    if (!this.quizResult) return 'good';
    
    const tabSwitches = this.quizResult.tabSwitchCount || 0;
    const suspicious = (this.quizResult.suspiciousActivities || []).length;
    
    if (tabSwitches === 0 && suspicious === 0 && this.quizResult.wasFullScreen) {
      return 'excellent';
    } else if (tabSwitches <= 2 && suspicious <= 3) {
      return 'good';
    } else {
      return 'flagged';
    }
  }
  
  getIntegrityStatus(): string {
    const integrityClass = this.getOverallIntegrityClass();
    switch (integrityClass) {
      case 'excellent': return '✅ Excellent Integrity';
      case 'good': return '⚠️ Minor Issues Detected';
      case 'flagged': return '🚨 Flagged for Review';
      default: return 'Unknown Status';
    }
  }

  goBack() { this.router.navigate(['/adaptive-quiz']); }
  retakeQuiz() { this.router.navigate(['/adaptive-quiz']); }
  continueToNextTopic() { this.router.navigate(['/adaptive-quiz']); }
  startTopic(topicName: string) { this.router.navigate(['/adaptive-quiz']); }
}