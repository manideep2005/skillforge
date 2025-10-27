import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-adaptive-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="adaptive-quiz-container">
      <!-- Header -->
      <div class="quiz-header">
        <h1>🧠 Adaptive Learning Quiz Panel</h1>
        <p>AI-powered personalized quizzes based on your performance</p>
      </div>

      <!-- Performance Dashboard -->
      <div class="performance-dashboard" *ngIf="analytics">
        <div class="mastery-card">
          <div class="mastery-circle">
            <div class="mastery-progress" [style.--progress]="analytics.overallMastery + '%'">
              <span class="mastery-text">{{analytics.overallMastery}}%</span>
            </div>
          </div>
          <h3>Overall Mastery</h3>
          <p>{{getMasteryLevel(analytics.overallMastery)}}</p>
        </div>

        <div class="learning-style-card">
          <div class="style-icon">{{getLearningStyleIcon(analytics.learningStyle)}}</div>
          <h3>Learning Style</h3>
          <p>{{analytics.learningStyle | titlecase}}</p>
          <span class="style-description">{{getLearningStyleDescription(analytics.learningStyle)}}</span>
        </div>

        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-number">{{analytics.strongTopics?.length || 0}}</span>
            <span class="stat-label">Strong Topics</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{analytics.weakTopics?.length || 0}}</span>
            <span class="stat-label">Need Practice</span>
          </div>
        </div>
      </div>

      <!-- AI Recommendations -->
      <div class="recommendations-section" *ngIf="recommendations">
        <h2>🎯 AI Recommendations</h2>
        
        <div class="recommendation-cards">
          <div class="weak-topics-card" *ngIf="recommendations.weakTopics?.length > 0">
            <h3>📚 Focus Areas</h3>
            <div class="topic-list">
              <div class="topic-item weak" *ngFor="let topic of recommendations.weakTopics">
                <span class="topic-name">{{topic}}</span>
                <button class="practice-btn" (click)="generateQuizForTopic(topic)">
                  Practice Now ({{recommendations.recommendedQuizzes[topic] || 1}} quizzes)
                </button>
              </div>
            </div>
          </div>

          <div class="strong-topics-card" *ngIf="recommendations.strongTopics?.length > 0">
            <h3>💪 Your Strengths</h3>
            <div class="topic-list">
              <div class="topic-item strong" *ngFor="let topic of recommendations.strongTopics">
                <span class="topic-name">{{topic}}</span>
                <button class="maintain-btn" (click)="generateQuizForTopic(topic)">
                  Maintain Skills
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="action-items" *ngIf="recommendations.actionItems?.length > 0">
          <h3>📋 Action Items</h3>
          <ul class="action-list">
            <li *ngFor="let item of recommendations.actionItems" class="action-item">
              {{item}}
            </li>
          </ul>
        </div>
      </div>

      <!-- Available Topics -->
      <div class="topics-section">
        <h2>📖 Available Topics</h2>
        <div class="topics-grid">
          <div class="topic-card" *ngFor="let topic of availableTopics" 
               [class.weak-topic]="isWeakTopic(topic.name)"
               [class.strong-topic]="isStrongTopic(topic.name)">
            <div class="topic-header">
              <span class="topic-icon">{{topic.icon}}</span>
              <div class="topic-status">
                <span class="status-badge" [class]="getTopicStatusClass(topic.name)">
                  {{getTopicStatus(topic.name)}}
                </span>
              </div>
            </div>
            <h3>{{topic.name}}</h3>
            <p>{{topic.description}}</p>
            <div class="topic-info">
              <span class="difficulty" [class]="topic.difficulty">{{topic.difficulty}}</span>
              <div class="topic-stats">
                <span class="performance" *ngIf="getTopicPerformance(topic.name) !== null">
                  {{getTopicPerformance(topic.name)}}% avg
                </span>
                <span class="attempts" *ngIf="getTopicAttempts(topic.name) > 0">
                  {{getTopicAttempts(topic.name)}} attempts
                </span>
                <span class="not-attempted" *ngIf="getTopicAttempts(topic.name) === 0">
                  Not attempted
                </span>
              </div>
            </div>
            <div class="topic-actions">
              <button class="quiz-btn adaptive" (click)="generateAdaptiveQuiz(topic.name)">
                🤖 AI Quiz
              </button>
              <button class="quiz-btn history" (click)="viewTopicHistory(topic.name)">
                📊 History
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quiz Taking Interface -->
      <div class="quiz-modal" *ngIf="currentQuiz" (click)="closeQuiz($event)">
        <div class="quiz-content" (click)="$event.stopPropagation()">
          <!-- Anti-Cheating Header -->
          <div class="anti-cheat-header" *ngIf="tabSwitchCount > 0 || suspiciousActivity.length > 0">
            <div class="warning-banner">
              ⚠️ MONITORING ACTIVE - Tab Switches: {{tabSwitchCount}} | Suspicious Activities: {{suspiciousActivity.length}}
            </div>
          </div>
          
          <div class="quiz-modal-header">
            <div class="quiz-title-section">
              <h2>{{currentQuiz.title}}</h2>
              <span class="difficulty-badge" [class]="currentQuiz.difficulty">
                {{currentQuiz.difficulty}}
              </span>
            </div>
            <div class="quiz-controls">
              <button class="fullscreen-btn" (click)="enterFullScreen()" *ngIf="!isFullScreen">
                📺 Fullscreen
              </button>
              <div class="quiz-timer">⏱️ {{formatTime(timeRemaining)}}</div>
            </div>
            <button class="close-btn" (click)="closeQuiz()">✕</button>
          </div>
          
          <div class="question-progress">
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="(currentQuestionIndex + 1) / currentQuiz.questions.length * 100"></div>
            </div>
            <span>Question {{currentQuestionIndex + 1}} of {{currentQuiz.questions.length}}</span>
          </div>

          <div class="question-section" *ngIf="currentQuestion">
            <h3>{{currentQuestion.questionText}}</h3>
            <div class="options">
              <button 
                *ngFor="let option of currentQuestion.options; let i = index"
                class="option-btn"
                [class.selected]="selectedAnswer === i"
                (click)="selectAnswer(i)">
                {{option}}
              </button>
            </div>
          </div>

          <div class="quiz-navigation">
            <button 
              class="nav-btn" 
              (click)="previousQuestion()"
              [disabled]="currentQuestionIndex === 0">
              Previous
            </button>
            <button 
              class="nav-btn primary" 
              (click)="nextQuestion()"
              [disabled]="selectedAnswer === null">
              {{currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}}
            </button>
          </div>
        </div>
      </div>

      <!-- Results Modal -->
      <div class="results-modal" *ngIf="showResults" (click)="closeResults($event)">
        <div class="results-content" (click)="$event.stopPropagation()">
          <div class="results-header">
            <h2>🎉 Quiz Complete!</h2>
            <button class="close-btn" (click)="closeResults()">✕</button>
          </div>
          
          <div class="score-display">
            <div class="score-circle">
              <span class="score-text">{{lastQuizResult?.scorePercentage}}%</span>
            </div>
            <p class="score-message">{{getScoreMessage(lastQuizResult?.scorePercentage)}}</p>
          </div>

          <div class="results-breakdown" *ngIf="lastQuizResult">
            <div class="breakdown-item">
              <span class="label">Correct Answers:</span>
              <span class="value">{{lastQuizResult.correctAnswers}}/{{lastQuizResult.totalQuestions}}</span>
            </div>
            <div class="breakdown-item">
              <span class="label">Time Spent:</span>
              <span class="value">{{lastQuizResult.timeSpentMinutes}} minutes</span>
            </div>
            <div class="breakdown-item">
              <span class="label">Topic:</span>
              <span class="value">{{lastQuizResult.topicName}}</span>
            </div>
          </div>

          <div class="ai-feedback" *ngIf="aiFeedback">
            <h3>🤖 AI Feedback</h3>
            <p>{{aiFeedback}}</p>
          </div>

          <div class="results-actions">
            <button class="action-btn secondary" (click)="retakeQuiz()">🔄 Retake</button>
            <button class="action-btn primary" (click)="continueToNextTopic()">➡️ Next Topic</button>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div class="loading-overlay" *ngIf="isGeneratingQuiz">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <h3>🤖 AI is generating your personalized quiz...</h3>
          <p>Analyzing your performance and creating adaptive questions</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .adaptive-quiz-container {
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 100vh;
    }

    .quiz-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .quiz-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .quiz-header p {
      color: #64748b;
      font-size: 1.1rem;
    }

    .performance-dashboard {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
      margin-bottom: 40px;
    }

    .mastery-card {
      background: white;
      padding: 32px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .mastery-circle {
      width: 120px;
      height: 120px;
      margin: 0 auto 20px;
      position: relative;
    }

    .mastery-progress {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(#3b82f6 0deg, #3b82f6 calc(var(--progress) * 3.6deg), #e2e8f0 calc(var(--progress) * 3.6deg));
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .mastery-progress::before {
      content: '';
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 50%;
      position: absolute;
    }

    .mastery-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      z-index: 1;
    }

    .learning-style-card {
      background: white;
      padding: 32px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .style-icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }

    .style-description {
      font-size: 0.875rem;
      color: #64748b;
    }

    .progress-stats {
      background: white;
      padding: 32px;
      border-radius: 20px;
      display: flex;
      justify-content: space-around;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2.5rem;
      font-weight: 700;
      color: #3b82f6;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
    }

    .recommendations-section {
      margin-bottom: 40px;
    }

    .recommendations-section h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 24px;
    }

    .recommendation-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    .weak-topics-card, .strong-topics-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .weak-topics-card {
      border-left: 4px solid #ef4444;
    }

    .strong-topics-card {
      border-left: 4px solid #10b981;
    }

    .topic-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .topic-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
    }

    .topic-item.weak {
      background: #fef2f2;
      border: 1px solid #fecaca;
    }

    .topic-item.strong {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
    }

    .practice-btn, .maintain-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .practice-btn {
      background: #ef4444;
      color: white;
    }

    .maintain-btn {
      background: #10b981;
      color: white;
    }

    .action-items {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .action-list {
      list-style: none;
      padding: 0;
    }

    .action-item {
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .action-item:last-child {
      border-bottom: none;
    }

    .topics-section h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 24px;
    }

    .topics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .topic-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .topic-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 50px rgba(0, 0, 0, 0.15);
    }

    .topic-card.weak-topic {
      border-color: #ef4444;
      background: linear-gradient(135deg, #fef2f2 0%, white 100%);
    }

    .topic-card.strong-topic {
      border-color: #10b981;
      background: linear-gradient(135deg, #f0fdf4 0%, white 100%);
    }

    .topic-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .topic-icon {
      font-size: 2rem;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.needs-practice {
      background: #fef2f2;
      color: #dc2626;
    }

    .status-badge.good {
      background: #f0fdf4;
      color: #16a34a;
    }

    .status-badge.excellent {
      background: #eff6ff;
      color: #2563eb;
    }

    .status-badge.not-attempted {
      background: #f8fafc;
      color: #64748b;
    }

    .topic-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0;
    }

    .difficulty {
      padding: 4px 8px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.75rem;
    }

    .difficulty.easy {
      background: #dcfce7;
      color: #166534;
    }

    .difficulty.medium {
      background: #fef3c7;
      color: #92400e;
    }

    .difficulty.hard {
      background: #fecaca;
      color: #991b1b;
    }

    .topic-stats {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .performance {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 600;
    }

    .attempts {
      font-size: 0.75rem;
      color: #3b82f6;
      font-weight: 500;
    }

    .not-attempted {
      font-size: 0.75rem;
      color: #94a3b8;
      font-style: italic;
    }

    .topic-actions {
      display: flex;
      gap: 8px;
    }

    .quiz-btn {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
    }

    .quiz-btn.adaptive {
      background: linear-gradient(135deg, #3b82f6, #1e40af);
      color: white;
    }

    .quiz-btn.history {
      background: #f8fafc;
      color: #64748b;
      border: 2px solid #e2e8f0;
    }

    .quiz-btn:hover {
      transform: translateY(-2px);
    }

    /* Quiz Modal Styles */
    .quiz-modal, .results-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .quiz-content, .results-content {
      background: white;
      border-radius: 20px;
      padding: 32px;
      max-width: 800px;
      width: 90%;
      max-height: 90%;
      overflow-y: auto;
    }

    .quiz-modal-header, .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .quiz-title-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .difficulty-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .quiz-timer {
      font-weight: 600;
      color: #dc2626;
      font-size: 1.1rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #64748b;
    }

    .question-progress {
      margin-bottom: 32px;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      transition: width 0.3s ease;
    }

    .question-section h3 {
      color: #1e293b;
      margin-bottom: 24px;
      font-size: 1.25rem;
      line-height: 1.6;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }

    .option-btn {
      padding: 16px 20px;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 12px;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .option-btn:hover {
      border-color: #3b82f6;
      background: #f8fafc;
    }

    .option-btn.selected {
      border-color: #3b82f6;
      background: #eff6ff;
      color: #1e40af;
    }

    .quiz-navigation {
      display: flex;
      justify-content: space-between;
    }

    .nav-btn {
      padding: 12px 24px;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .nav-btn.primary {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .nav-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Results Modal Styles */
    .score-display {
      text-align: center;
      margin-bottom: 32px;
    }

    .score-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #1e40af);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    .score-text {
      font-size: 2rem;
      font-weight: 700;
      color: white;
    }

    .score-message {
      font-size: 1.1rem;
      color: #64748b;
    }

    .results-breakdown {
      background: #f8fafc;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 24px;
    }

    .breakdown-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .breakdown-item:last-child {
      border-bottom: none;
    }

    .ai-feedback {
      background: linear-gradient(135deg, #eff6ff, #dbeafe);
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 24px;
      border-left: 4px solid #3b82f6;
    }

    .results-actions {
      display: flex;
      gap: 12px;
    }

    .action-btn {
      flex: 1;
      padding: 12px 20px;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action-btn.primary {
      background: linear-gradient(135deg, #3b82f6, #1e40af);
      color: white;
    }

    .action-btn.secondary {
      background: #f8fafc;
      color: #64748b;
      border: 2px solid #e2e8f0;
    }

    /* Anti-Cheating Styles */
    .anti-cheat-header {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      padding: 8px 16px;
      text-align: center;
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .warning-banner {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .quiz-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .fullscreen-btn {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .fullscreen-btn:hover {
      background: #1d4ed8;
    }

    /* Loading Overlay */
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }

    .loading-content {
      text-align: center;
      color: white;
    }

    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .performance-dashboard {
        grid-template-columns: 1fr;
      }
      
      .recommendation-cards {
        grid-template-columns: 1fr;
      }
      
      .topics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdaptiveQuizComponent implements OnInit {
  analytics: any = null;
  recommendations: any = null;
  availableTopics: any[] = [];
  currentQuiz: any = null;
  currentQuestionIndex = 0;
  currentQuestion: any = null;
  selectedAnswer: number | null = null;
  userAnswers: any[] = [];
  timeRemaining = 0;
  timer: any;
  showResults = false;
  lastQuizResult: any = null;
  aiFeedback = '';
  isGeneratingQuiz = false;
  
  // Anti-cheating system
  tabSwitchCount = 0;
  isFullScreen = false;
  suspiciousActivity: string[] = [];
  quizStartTime = 0;
  focusLostTimes: number[] = [];
  
  private readonly API_BASE = 'http://localhost:8080/api';
  private readonly courseId = 'dsa-course';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAnalytics();
    this.loadRecommendations();
    this.loadAvailableTopics();
    this.setupAntiCheatingSystem();
  }
  
  setupAntiCheatingSystem() {
    // Detect tab switching
    document.addEventListener('visibilitychange', () => {
      if (this.currentQuiz && document.hidden) {
        this.tabSwitchCount++;
        this.focusLostTimes.push(Date.now());
        this.logSuspiciousActivity(`Tab switched (${this.tabSwitchCount} times)`);
        this.showTabSwitchWarning();
      }
    });
    
    // Detect window focus loss
    window.addEventListener('blur', () => {
      if (this.currentQuiz) {
        this.logSuspiciousActivity('Window lost focus');
      }
    });
    
    // Prevent right-click context menu
    document.addEventListener('contextmenu', (e) => {
      if (this.currentQuiz) {
        e.preventDefault();
        this.logSuspiciousActivity('Right-click attempted');
      }
    });
    
    // Detect key combinations (Ctrl+C, Ctrl+V, etc.)
    document.addEventListener('keydown', (e) => {
      if (this.currentQuiz) {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
          e.preventDefault();
          this.logSuspiciousActivity(`Keyboard shortcut: Ctrl+${e.key.toUpperCase()}`);
        }
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
          e.preventDefault();
          this.logSuspiciousActivity('Developer tools access attempted');
        }
      }
    });
    
    // Detect fullscreen exit
    document.addEventListener('fullscreenchange', () => {
      if (this.currentQuiz) {
        this.isFullScreen = !!document.fullscreenElement;
        if (!this.isFullScreen) {
          this.logSuspiciousActivity('Exited fullscreen mode');
        }
      }
    });
  }
  
  logSuspiciousActivity(activity: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.suspiciousActivity.push(`${timestamp}: ${activity}`);
    console.warn('Suspicious activity detected:', activity);
  }
  
  showTabSwitchWarning() {
    if (this.tabSwitchCount >= 3) {
      alert('⚠️ WARNING: Multiple tab switches detected! Your quiz may be flagged for review.');
    } else {
      alert(`⚠️ Tab switching detected (${this.tabSwitchCount}/3). Stay focused on the quiz!`);
    }
  }
  
  enterFullScreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }
  
  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  loadAnalytics() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${this.API_BASE}/adaptive-quiz/analytics/${this.courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.analytics = data;
        },
        error: (error) => {
          console.error('Error loading analytics:', error);
          this.analytics = {
            overallMastery: 65,
            learningStyle: 'visual',
            strongTopics: ['Linear Search'],
            weakTopics: ['Binary Search', 'Quick Sort']
          };
        }
      });
    }
  }

  loadRecommendations() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${this.API_BASE}/adaptive-quiz/recommendations/${this.courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.recommendations = data;
        },
        error: (error) => {
          console.error('Error loading recommendations:', error);
          this.recommendations = {
            weakTopics: ['Binary Search', 'Quick Sort'],
            strongTopics: ['Linear Search'],
            recommendedQuizzes: {
              'Binary Search': 3,
              'Quick Sort': 2
            },
            actionItems: [
              'Practice 3 more quizzes on Binary Search',
              'Practice 2 more quizzes on Quick Sort'
            ]
          };
        }
      });
    }
  }

  loadAvailableTopics() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${this.API_BASE}/adaptive-quiz/available-topics/${this.courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.availableTopics = data;
        },
        error: (error) => {
          console.error('Error loading topics:', error);
          this.availableTopics = [
            { name: 'Linear Search', description: 'Basic searching algorithm', difficulty: 'easy', icon: '🔍' },
            { name: 'Binary Search', description: 'Efficient searching in sorted arrays', difficulty: 'medium', icon: '🎯' },
            { name: 'Quick Sort', description: 'Efficient divide-and-conquer sorting', difficulty: 'hard', icon: '⚡' }
          ];
        }
      });
    }
  }

  generateAdaptiveQuiz(topicName: string) {
    this.isGeneratingQuiz = true;
    const token = localStorage.getItem('token');
    
    if (token) {
      this.http.post(`${this.API_BASE}/adaptive-quiz/generate/${this.courseId}/${topicName}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (quiz: any) => {
          this.isGeneratingQuiz = false;
          this.startQuiz(quiz, topicName);
        },
        error: (error) => {
          console.error('Error generating quiz:', error);
          this.isGeneratingQuiz = false;
          // Backend should always return a quiz now, so this shouldn't happen
          alert('Quiz generation service is temporarily unavailable. Please try again.');
        }
      });
    } else {
      this.isGeneratingQuiz = false;
      alert('Please log in to generate AI-powered quizzes.');
    }
  }

  generateQuizForTopic(topicName: string) {
    this.generateAdaptiveQuiz(topicName);
  }



  startQuiz(quiz: any, topicName: string) {
    this.currentQuiz = quiz;
    this.currentQuiz.topicName = topicName;
    this.currentQuestionIndex = 0;
    this.currentQuestion = quiz.questions[0];
    this.selectedAnswer = null;
    this.userAnswers = [];
    this.timeRemaining = (quiz.timeLimit || 15) * 60;
    
    // Reset anti-cheating counters
    this.tabSwitchCount = 0;
    this.suspiciousActivity = [];
    this.focusLostTimes = [];
    this.quizStartTime = Date.now();
    
    // Show anti-cheating warning
    alert('🚨 QUIZ MONITORING ACTIVE\n\n• Tab switching will be detected\n• Right-click is disabled\n• Copy/paste is blocked\n• Stay focused on this tab\n\nGood luck!');
    
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.finishQuiz();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  selectAnswer(index: number) {
    this.selectedAnswer = index;
  }

  nextQuestion() {
    if (this.selectedAnswer !== null) {
      this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;
    }

    if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.currentQuiz.questions[this.currentQuestionIndex];
      this.selectedAnswer = this.userAnswers[this.currentQuestionIndex] || null;
    } else {
      this.finishQuiz();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      if (this.selectedAnswer !== null) {
        this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;
      }
      this.currentQuestionIndex--;
      this.currentQuestion = this.currentQuiz.questions[this.currentQuestionIndex];
      this.selectedAnswer = this.userAnswers[this.currentQuestionIndex] || null;
    }
  }

  finishQuiz() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    let correct = 0;
    const questionResults: any[] = [];
    
    this.userAnswers.forEach((answer, index) => {
      const question = this.currentQuiz.questions[index];
      const isCorrect = answer === question.correctAnswer;
      if (isCorrect) correct++;
      
      questionResults.push({
        questionId: `q${index}`,
        questionText: question.questionText,
        selectedAnswer: question.options[answer] || 'No answer',
        correctAnswer: question.options[question.correctAnswer],
        isCorrect: isCorrect,
        topic: this.currentQuiz.topicName,
        concept: this.currentQuiz.topicName
      });
    });

    const scorePercentage = Math.round((correct / this.currentQuiz.questions.length) * 100);
    const timeSpentMinutes = Math.round(((this.currentQuiz.timeLimit || 15) * 60 - this.timeRemaining) / 60);

    this.lastQuizResult = {
      quizId: this.currentQuiz.id,
      courseId: this.courseId,
      topicName: this.currentQuiz.topicName,
      totalQuestions: this.currentQuiz.questions.length,
      correctAnswers: correct,
      scorePercentage: scorePercentage,
      questionResults: questionResults,
      timeSpentMinutes: timeSpentMinutes,
      difficultyLevel: this.currentQuiz.difficulty,
      // Anti-cheating data
      tabSwitchCount: this.tabSwitchCount,
      suspiciousActivities: this.suspiciousActivity,
      focusLostTimes: this.focusLostTimes,
      wasFullScreen: this.isFullScreen
    };

    this.submitQuizResult(this.lastQuizResult);
    this.generateAIFeedback(scorePercentage, this.currentQuiz.topicName);

    this.currentQuiz = null;
    this.showResults = true;
    
    // Navigate to detailed results page
    setTimeout(() => {
      this.router.navigate(['/quiz-results'], {
        state: { quizResult: this.lastQuizResult }
      });
    }, 3000); // Show summary for 3 seconds then go to detailed page
  }

  submitQuizResult(result: any) {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.post(`${this.API_BASE}/adaptive-quiz/submit-result`, result, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (response: any) => {
          console.log('Quiz result submitted successfully');
          // Force refresh analytics and recommendations
          setTimeout(() => {
            this.loadAnalytics();
            this.loadRecommendations();
            this.loadAvailableTopics(); // Refresh topic performance
          }, 500);
        },
        error: (error) => {
          console.error('Error submitting quiz result:', error);
        }
      });
    }
  }

  generateAIFeedback(score: number, topic: string) {
    if (score >= 80) {
      this.aiFeedback = `Excellent work on ${topic}! You've mastered this topic. Consider moving to more advanced concepts or helping others learn.`;
    } else if (score >= 60) {
      this.aiFeedback = `Good progress on ${topic}! You're on the right track. Review the concepts you missed and try a few more practice problems.`;
    } else {
      this.aiFeedback = `${topic} needs more practice. Don't worry - this is a challenging topic! I recommend reviewing the fundamentals and taking easier quizzes first.`;
    }
  }

  closeQuiz(event?: Event) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.currentQuiz = null;
    this.currentQuestion = null;
    this.selectedAnswer = null;
    this.userAnswers = [];
  }

  closeResults(event?: Event) {
    this.showResults = false;
    this.lastQuizResult = null;
    this.aiFeedback = '';
  }

  retakeQuiz() {
    this.closeResults();
    if (this.lastQuizResult) {
      // Generate a new quiz (should be different questions due to randomization)
      this.generateAdaptiveQuiz(this.lastQuizResult.topicName);
    }
  }

  continueToNextTopic() {
    this.closeResults();
    // Refresh data before suggesting next topic
    this.loadAnalytics();
    this.loadRecommendations();
    
    setTimeout(() => {
      if (this.recommendations?.weakTopics?.length > 0) {
        const nextTopic = this.recommendations.weakTopics[0];
        this.generateAdaptiveQuiz(nextTopic);
      }
    }, 1000);
  }

  viewTopicHistory(topicName: string) {
    alert(`View history for ${topicName} - Feature coming soon!`);
  }

  getMasteryLevel(mastery: number): string {
    if (mastery >= 80) return 'Expert';
    if (mastery >= 60) return 'Proficient';
    if (mastery >= 40) return 'Developing';
    return 'Beginner';
  }

  getLearningStyleIcon(style: string): string {
    const icons: any = {
      'visual': '👁️',
      'auditory': '👂',
      'kinesthetic': '✋',
      'reading': '📖'
    };
    return icons[style] || '🧠';
  }

  getLearningStyleDescription(style: string): string {
    const descriptions: any = {
      'visual': 'Learns best with diagrams and visual aids',
      'auditory': 'Learns best through listening and discussion',
      'kinesthetic': 'Learns best through hands-on practice',
      'reading': 'Learns best through reading and writing'
    };
    return descriptions[style] || 'Adaptive learning style';
  }

  isWeakTopic(topicName: string): boolean {
    return this.recommendations?.weakTopics?.includes(topicName) || false;
  }

  isStrongTopic(topicName: string): boolean {
    return this.recommendations?.strongTopics?.includes(topicName) || false;
  }

  getTopicStatus(topicName: string): string {
    if (this.isStrongTopic(topicName)) return 'Excellent';
    if (this.isWeakTopic(topicName)) return 'Needs Practice';
    return 'Not Attempted';
  }

  getTopicStatusClass(topicName: string): string {
    if (this.isStrongTopic(topicName)) return 'excellent';
    if (this.isWeakTopic(topicName)) return 'needs-practice';
    return 'not-attempted';
  }

  getTopicPerformance(topicName: string): number | null {
    // Get actual performance from analytics if available
    if (this.analytics?.topicPerformances?.[topicName]) {
      return Math.round(this.analytics.topicPerformances[topicName].averageScore);
    }
    return null;
  }
  
  getTopicAttempts(topicName: string): number {
    if (this.analytics?.topicPerformances?.[topicName]) {
      return this.analytics.topicPerformances[topicName].totalAttempts || 0;
    }
    return 0;
  }

  getScoreMessage(score: number): string {
    if (score >= 90) return 'Outstanding! You\'ve mastered this topic!';
    if (score >= 80) return 'Excellent work! You\'re doing great!';
    if (score >= 70) return 'Good job! Keep practicing to improve!';
    if (score >= 60) return 'Not bad! Review the concepts and try again!';
    return 'Keep practicing! You\'ll get better with more attempts!';
  }
}