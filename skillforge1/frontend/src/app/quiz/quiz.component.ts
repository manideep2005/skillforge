import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="quiz-container">
      <!-- Student View -->
      <div *ngIf="userRole === 'STUDENT'" class="student-view">
        <div class="quiz-header">
          <h1>🧠 Practice Quizzes</h1>
          <p>Test your knowledge and improve your skills</p>
        </div>

        <div class="quiz-stats">
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-content">
              <h3>{{quizStats.total}}</h3>
              <p>Total Quizzes</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <h3>{{quizStats.completed}}</h3>
              <p>Completed</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <h3>{{quizStats.averageScore}}%</h3>
              <p>Average Score</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <h3>{{quizStats.bestScore}}%</h3>
              <p>Best Score</p>
            </div>
          </div>
        </div>

        <div class="quiz-filters">
          <button 
            *ngFor="let category of categories" 
            class="filter-btn"
            [class.active]="selectedCategory === category"
            (click)="filterByCategory(category)">
            {{category}}
          </button>
        </div>

        <div class="quiz-grid">
          <div class="quiz-card" *ngFor="let quiz of filteredQuizzes">
            <div class="quiz-header-card">
              <div class="quiz-icon">{{quiz.icon}}</div>
              <div class="quiz-status" [class]="quiz.status">{{quiz.status}}</div>
            </div>
            <h3>{{quiz.title}}</h3>
            <p>{{quiz.description}}</p>
            <div class="quiz-info">
              <span class="info-item">
                <span class="info-icon">❓</span>
                {{quiz.questions}} Questions
              </span>
              <span class="info-item">
                <span class="info-icon">⏱️</span>
                {{quiz.timeLimit}} min
              </span>
              <span class="difficulty" [class]="quiz.difficulty">{{quiz.difficulty}}</span>
            </div>
            <div class="quiz-progress" *ngIf="quiz.progress > 0">
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="quiz.progress"></div>
              </div>
              <span class="progress-text">{{quiz.progress}}% Complete</span>
            </div>
            <div class="quiz-actions">
              <button 
                class="action-btn primary" 
                (click)="startQuiz(quiz)"
                [disabled]="quiz.status === 'locked'">
                {{getButtonText(quiz)}}
              </button>
              <button 
                *ngIf="quiz.status === 'completed'" 
                class="action-btn secondary"
                (click)="viewResults(quiz)">
                View Results
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructor View -->
      <div *ngIf="userRole === 'INSTRUCTOR'" class="instructor-view">
        <div class="quiz-header">
          <h1>👨🏫 Quiz Management</h1>
          <p>Create and assign quizzes to students</p>
        </div>

        <div class="instructor-actions">
          <button class="action-btn primary" (click)="showCreateQuiz = true">➕ Create New Quiz</button>
          <button class="action-btn secondary" (click)="showStudentList = !showStudentList">👥 View Students</button>
        </div>

        <!-- Student List -->
        <div class="student-list-card" *ngIf="showStudentList">
          <h3>📋 Student List</h3>
          <div class="students-grid">
            <div class="student-item" *ngFor="let student of students">
              <div class="student-info">
                <div class="student-avatar">{{getInitials(student.name)}}</div>
                <div class="student-details">
                  <h4>{{student.name}}</h4>
                  <p>ID: {{student.id}}</p>
                  <span class="student-email">{{student.email}}</span>
                </div>
              </div>
              <div class="student-stats">
                <span class="stat">📚 {{student.coursesCompleted}} courses</span>
                <span class="stat">🎯 {{student.averageScore}}% avg</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quiz Assignment -->
        <div class="quiz-assignment-card">
          <h3>🎯 Assign Quiz to Students</h3>
          <div class="assignment-form">
            <div class="form-group">
              <label>Select Quiz:</label>
              <select [(ngModel)]="selectedQuizId" class="form-select">
                <option value="">Choose a quiz...</option>
                <option *ngFor="let quiz of instructorQuizzes" [value]="quiz.id">{{quiz.title}}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Select Students:</label>
              <div class="student-selection">
                <div class="select-all">
                  <input type="checkbox" (change)="toggleAllStudents($event)" id="selectAll">
                  <label for="selectAll">Select All Students</label>
                </div>
                <div class="student-checkboxes">
                  <div class="student-checkbox" *ngFor="let student of students">
                    <input 
                      type="checkbox" 
                      [id]="'student-' + student.id"
                      [(ngModel)]="student.selected"
                      (change)="updateSelectedStudents()">
                    <label [for]="'student-' + student.id">
                      {{student.name}} (ID: {{student.id}})
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Due Date:</label>
              <input type="datetime-local" [(ngModel)]="dueDate" class="form-input">
            </div>

            <button 
              class="action-btn primary" 
              (click)="assignQuiz()"
              [disabled]="!selectedQuizId || selectedStudentIds.length === 0">
              📤 Assign Quiz ({{selectedStudentIds.length}} students)
            </button>
          </div>
        </div>

        <!-- Instructor's Quiz List -->
        <div class="instructor-quizzes">
          <h3>📝 Your Quizzes</h3>
          <div class="quiz-grid">
            <div class="quiz-card instructor" *ngFor="let quiz of instructorQuizzes">
              <div class="quiz-header-card">
                <div class="quiz-icon">{{quiz.icon}}</div>
                <div class="quiz-actions-menu">
                  <button class="menu-btn" (click)="toggleQuizMenu(quiz.id)">⋮</button>
                  <div class="menu-dropdown" *ngIf="quiz.showMenu">
                    <button (click)="editQuiz(quiz)">✏️ Edit</button>
                    <button (click)="viewQuizResults(quiz)">📊 Results</button>
                    <button (click)="deleteQuiz(quiz)">🗑️ Delete</button>
                  </div>
                </div>
              </div>
              <h3>{{quiz.title}}</h3>
              <p>{{quiz.description}}</p>
              <div class="quiz-stats-instructor">
                <span class="stat">👥 {{quiz.assignedTo}} assigned</span>
                <span class="stat">✅ {{quiz.completed}} completed</span>
                <span class="stat">📊 {{quiz.averageScore}}% avg score</span>
              </div>
              <div class="quiz-actions">
                <button class="action-btn secondary" (click)="assignExistingQuiz(quiz)">📤 Assign</button>
                <button class="action-btn primary" (click)="viewQuizResults(quiz)">📊 View Results</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quiz Taking Interface -->
      <div class="quiz-modal" *ngIf="currentQuiz" (click)="closeQuiz($event)">
        <div class="quiz-content" (click)="$event.stopPropagation()">
          <div class="quiz-modal-header">
            <h2>{{currentQuiz.title}}</h2>
            <div class="quiz-timer">⏱️ {{formatTime(timeRemaining)}}</div>
            <button class="close-btn" (click)="closeQuiz()">✕</button>
          </div>
          
          <div class="question-progress">
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="(currentQuestionIndex + 1) / currentQuiz.questions.length * 100"></div>
            </div>
            <span>Question {{currentQuestionIndex + 1}} of {{currentQuiz.questions.length}}</span>
          </div>

          <div class="question-section" *ngIf="currentQuestion">
            <h3>{{currentQuestion.question}}</h3>
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
              (click)="nextQuestion()">
              {{currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quiz-container {
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

    .instructor-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 30px;
    }

    .student-list-card, .quiz-assignment-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .students-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }

    .student-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .student-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .student-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
    }

    .student-details h4 {
      margin: 0 0 4px 0;
      color: #1e293b;
    }

    .student-details p {
      margin: 0 0 4px 0;
      font-size: 0.875rem;
      color: #64748b;
    }

    .student-email {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .student-stats {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat {
      font-size: 0.75rem;
      color: #64748b;
    }

    .assignment-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-weight: 600;
      color: #1e293b;
    }

    .form-select, .form-input {
      padding: 12px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
    }

    .student-selection {
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
    }

    .select-all {
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
    }

    .student-checkboxes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 8px;
    }

    .student-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .quiz-stats-instructor {
      display: flex;
      justify-content: space-between;
      margin: 16px 0;
      font-size: 0.875rem;
      color: #64748b;
    }

    .menu-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #64748b;
    }

    .quiz-actions-menu {
      position: relative;
    }

    .menu-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }

    .menu-dropdown button {
      display: block;
      width: 100%;
      padding: 8px 16px;
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
    }

    .menu-dropdown button:hover {
      background: #f8fafc;
    }
    
    .quiz-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
    }

    .stat-icon {
      font-size: 2rem;
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

    .quiz-filters {
      display: flex;
      gap: 12px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 8px 16px;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
    
    .quiz-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }
    
    .quiz-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .quiz-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 50px rgba(0, 0, 0, 0.15);
    }

    .quiz-header-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .quiz-icon {
      font-size: 2.5rem;
    }

    .quiz-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .quiz-status.available {
      background: #dcfce7;
      color: #166534;
    }

    .quiz-status.in-progress {
      background: #fef3c7;
      color: #92400e;
    }

    .quiz-status.completed {
      background: #dbeafe;
      color: #1e40af;
    }

    .quiz-status.locked {
      background: #f3f4f6;
      color: #6b7280;
    }
    
    .quiz-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }
    
    .quiz-card p {
      color: #64748b;
      margin-bottom: 16px;
    }
    
    .quiz-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-size: 0.875rem;
      color: #64748b;
      flex-wrap: wrap;
      gap: 8px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .info-icon {
      font-size: 0.75rem;
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

    .quiz-progress {
      margin-bottom: 16px;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.875rem;
      color: #64748b;
    }

    .quiz-actions {
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
    
    .action-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Quiz Modal Styles */
    .quiz-modal {
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

    .quiz-content {
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 800px;
      width: 90%;
      max-height: 90%;
      overflow-y: auto;
    }

    .quiz-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .quiz-modal-header h2 {
      color: #1e293b;
      margin: 0;
    }

    .quiz-timer {
      font-weight: 600;
      color: #dc2626;
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

    .question-progress span {
      font-size: 0.875rem;
      color: #64748b;
      margin-top: 8px;
      display: block;
    }

    .question-section h3 {
      color: #1e293b;
      margin-bottom: 24px;
      font-size: 1.25rem;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }

    .option-btn {
      padding: 16px;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 12px;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .option-btn:hover {
      border-color: #3b82f6;
    }

    .option-btn.selected {
      border-color: #3b82f6;
      background: #eff6ff;
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
  `]
})
export class QuizComponent implements OnInit {
  userRole: string | null = null;
  quizzes: any[] = [];
  filteredQuizzes: any[] = [];
  categories = ['All', 'JavaScript', 'React', 'Node.js', 'CSS', 'Python'];
  selectedCategory = 'All';
  
  // Instructor specific properties
  showStudentList = false;
  showCreateQuiz = false;
  students: any[] = [];
  instructorQuizzes: any[] = [];
  selectedQuizId = '';
  selectedStudentIds: string[] = [];
  dueDate = '';
  
  currentQuiz: any = null;
  currentQuestionIndex = 0;
  currentQuestion: any = null;
  selectedAnswer: number | null = null;
  userAnswers: any[] = [];
  timeRemaining = 0;
  timer: any;

  quizStats = {
    total: 0,
    completed: 0,
    averageScore: 0,
    bestScore: 0
  };

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'STUDENT') {
      this.loadQuizzes();
      this.loadQuizStats();
    } else if (this.userRole === 'INSTRUCTOR') {
      this.loadStudents();
      this.loadInstructorQuizzes();
    }
  }

  loadStudents() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get('http://localhost:3000/api/instructor/students', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.students = data.map((student: any) => ({
            id: student.id,
            name: student.name,
            email: student.email,
            coursesCompleted: student.coursesCompleted || 0,
            averageScore: student.averageScore || 0,
            selected: false
          }));
        },
        error: (error) => {
          console.error('Error loading students:', error);
          this.students = [
            { id: 'STU001', name: 'John Doe', email: 'john@example.com', coursesCompleted: 5, averageScore: 85, selected: false }
          ];
        }
      });
    }
  }

  loadInstructorQuizzes() {
    this.instructorQuizzes = [
      {
        id: 1,
        title: 'JavaScript Fundamentals',
        description: 'Basic JavaScript concepts',
        icon: '📝',
        assignedTo: 15,
        completed: 12,
        averageScore: 85,
        showMenu: false
      },
      {
        id: 2,
        title: 'React Components',
        description: 'React component lifecycle',
        icon: '⚛️',
        assignedTo: 8,
        completed: 6,
        averageScore: 78,
        showMenu: false
      }
    ];
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  toggleAllStudents(event: any) {
    const checked = event.target.checked;
    this.students.forEach(student => student.selected = checked);
    this.updateSelectedStudents();
  }

  updateSelectedStudents() {
    this.selectedStudentIds = this.students
      .filter(student => student.selected)
      .map(student => student.id);
  }

  assignQuiz() {
    if (!this.selectedQuizId || this.selectedStudentIds.length === 0) return;
    
    const quiz = this.instructorQuizzes.find(q => q.id == this.selectedQuizId);
    alert(`Quiz "${quiz?.title}" assigned to ${this.selectedStudentIds.length} students: ${this.selectedStudentIds.join(', ')}`);
    
    // Reset form
    this.selectedQuizId = '';
    this.students.forEach(student => student.selected = false);
    this.selectedStudentIds = [];
    this.dueDate = '';
  }

  toggleQuizMenu(quizId: number) {
    this.instructorQuizzes.forEach(quiz => {
      quiz.showMenu = quiz.id === quizId ? !quiz.showMenu : false;
    });
  }

  editQuiz(quiz: any) {
    alert(`Edit quiz: ${quiz.title}`);
    quiz.showMenu = false;
  }

  viewQuizResults(quiz: any) {
    alert(`View results for: ${quiz.title}`);
    quiz.showMenu = false;
  }

  deleteQuiz(quiz: any) {
    if (confirm(`Delete quiz: ${quiz.title}?`)) {
      alert(`Quiz deleted: ${quiz.title}`);
    }
    quiz.showMenu = false;
  }

  assignExistingQuiz(quiz: any) {
    this.selectedQuizId = quiz.id.toString();
  }

  loadQuizzes() {
    // Sample quiz data for students
    this.quizzes = [
      {
        id: 1,
        title: 'JavaScript Fundamentals',
        description: 'Test your basic JavaScript knowledge',
        questions: [
          {
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
            correct: 0
          }
        ],
        timeLimit: 20,
        difficulty: 'easy',
        icon: '📝',
        category: 'JavaScript',
        status: 'available',
        progress: 0
      }
    ];
    
    this.filteredQuizzes = [...this.quizzes];
    this.quizStats.total = this.quizzes.length;
  }

  loadQuizStats() {
    this.quizStats = {
      total: this.quizzes?.length || 0,
      completed: this.quizzes?.filter(q => q.status === 'completed').length || 0,
      averageScore: 85,
      bestScore: 95
    };
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredQuizzes = [...this.quizzes];
    } else {
      this.filteredQuizzes = this.quizzes.filter(quiz => quiz.category === category);
    }
  }

  getButtonText(quiz: any): string {
    switch (quiz.status) {
      case 'available': return 'Start Quiz';
      case 'in-progress': return 'Continue';
      case 'completed': return 'Retake';
      case 'locked': return 'Locked';
      default: return 'Start Quiz';
    }
  }

  startQuiz(quiz: any) {
    if (quiz.status === 'locked') return;
    
    this.currentQuiz = quiz;
    this.currentQuestionIndex = 0;
    this.currentQuestion = quiz.questions[0];
    this.selectedAnswer = null;
    this.userAnswers = [];
    this.timeRemaining = quiz.timeLimit * 60;
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
    this.userAnswers.forEach((answer, index) => {
      if (answer === this.currentQuiz.questions[index].correct) {
        correct++;
      }
    });

    const score = Math.round((correct / this.currentQuiz.questions.length) * 100);
    
    const quizIndex = this.quizzes.findIndex(q => q.id === this.currentQuiz.id);
    if (quizIndex !== -1) {
      this.quizzes[quizIndex].status = 'completed';
      this.quizzes[quizIndex].progress = 100;
    }

    alert(`Quiz completed! Your score: ${score}%`);
    this.closeQuiz();
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

  viewResults(quiz: any) {
    alert(`View results for ${quiz.title}`);
  }
}