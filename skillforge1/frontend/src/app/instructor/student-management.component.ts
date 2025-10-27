import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="student-management-container">
      <div class="header">
        <h1>👥 Student Management</h1>
        <p>Manage all your students and track their progress</p>
      </div>

      <!-- Student Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👨‍🎓</div>
          <div class="stat-content">
            <h3>{{studentStats.totalStudents}}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>{{studentStats.activeStudents}}</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <h3>{{studentStats.averageProgress}}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <h3>{{studentStats.averageRating}}</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="controls">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Search students by name or ID..." 
            [(ngModel)]="searchTerm"
            (input)="filterStudents()"
            class="search-input">
        </div>
        <div class="filters">
          <select [(ngModel)]="selectedCourse" (change)="filterStudents()" class="filter-select">
            <option value="">All Courses</option>
            <option *ngFor="let course of courses" [value]="course.id">{{course.title}}</option>
          </select>
          <select [(ngModel)]="selectedStatus" (change)="filterStudents()" class="filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <!-- Students List -->
      <div class="students-section">
        <div class="section-header">
          <h2>Students ({{filteredStudents.length}})</h2>
          <button class="export-btn" (click)="exportStudentData()">📊 Export Data</button>
        </div>

        <div class="students-grid">
          <div class="student-card" *ngFor="let student of filteredStudents">
            <div class="student-header">
              <div class="student-avatar">{{getInitials(student.name)}}</div>
              <div class="student-status" [class]="student.status">{{student.status}}</div>
            </div>
            <div class="student-info">
              <h3>{{student.name}}</h3>
              <p class="student-id">ID: {{student.id}}</p>
              <p class="student-email">{{student.email}}</p>
              <div class="student-meta">
                <span class="meta-item">📚 {{student.enrolledCourses}} courses</span>
                <span class="meta-item">🏆 {{student.completedCourses}} completed</span>
              </div>
            </div>
            <div class="student-progress">
              <div class="progress-info">
                <span class="progress-label">Overall Progress</span>
                <span class="progress-percentage">{{student.overallProgress}}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="student.overallProgress"></div>
              </div>
            </div>
            <div class="student-stats">
              <div class="stat">
                <span class="stat-label">Avg Score:</span>
                <span class="stat-value">{{student.averageScore}}%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Last Active:</span>
                <span class="stat-value">{{student.lastActive}}</span>
              </div>
            </div>
            <div class="student-actions">
              <button class="action-btn primary" (click)="viewStudentDetail(student)">👁️ View</button>
              <button class="action-btn secondary" (click)="messageStudent(student)">💬 Message</button>
              <button class="action-btn info" (click)="assignCourse(student)">📚 Assign</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Detail Modal -->
      <div class="student-detail-modal" *ngIf="showStudentDetail" (click)="closeStudentDetail($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{selectedStudent?.name}} - Detailed View</h2>
            <button class="close-btn" (click)="showStudentDetail = false">✕</button>
          </div>
          <div class="student-detail-content" *ngIf="selectedStudent">
            <div class="detail-section">
              <h3>📋 Basic Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Student ID:</label>
                  <span>{{selectedStudent.id}}</span>
                </div>
                <div class="info-item">
                  <label>Email:</label>
                  <span>{{selectedStudent.email}}</span>
                </div>
                <div class="info-item">
                  <label>Join Date:</label>
                  <span>{{selectedStudent.joinDate}}</span>
                </div>
                <div class="info-item">
                  <label>Status:</label>
                  <span class="status-badge" [class]="selectedStudent.status">{{selectedStudent.status}}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h3>📚 Enrolled Courses</h3>
              <div class="courses-list">
                <div class="course-item" *ngFor="let enrollment of selectedStudent.courseEnrollments">
                  <div class="course-info">
                    <h4>{{enrollment.courseTitle}}</h4>
                    <p>Enrolled: {{enrollment.enrolledDate}}</p>
                  </div>
                  <div class="course-progress">
                    <span>{{enrollment.progress}}%</span>
                    <div class="progress-bar small">
                      <div class="progress-fill" [style.width.%]="enrollment.progress"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h3>🎯 Quiz Results</h3>
              <div class="quiz-results">
                <div class="quiz-item" *ngFor="let quiz of selectedStudent.quizResults">
                  <div class="quiz-info">
                    <h4>{{quiz.quizTitle}}</h4>
                    <p>Completed: {{quiz.completedDate}}</p>
                  </div>
                  <div class="quiz-score" [class]="getScoreClass(quiz.score)">
                    {{quiz.score}}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Assign Course Modal -->
      <div class="assign-course-modal" *ngIf="showAssignCourse" (click)="closeAssignCourse($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Assign Course to {{selectedStudent?.name}}</h2>
            <button class="close-btn" (click)="showAssignCourse = false">✕</button>
          </div>
          <div class="assign-content">
            <div class="available-courses">
              <h3>Available Courses</h3>
              <div class="course-selection">
                <div class="course-option" *ngFor="let course of availableCourses">
                  <input 
                    type="checkbox" 
                    [id]="'course-' + course.id"
                    [(ngModel)]="course.selected">
                  <label [for]="'course-' + course.id">
                    <div class="course-details">
                      <h4>{{course.title}}</h4>
                      <p>{{course.description}}</p>
                      <span class="course-price">\${{course.price}}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div class="assign-actions">
              <button class="btn secondary" (click)="showAssignCourse = false">Cancel</button>
              <button class="btn primary" (click)="confirmAssignCourse()">Assign Selected Courses</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .student-management-container {
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 100vh;
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
    }

    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .stats-grid {
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

    .controls {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      align-items: center;
    }

    .search-input {
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      width: 300px;
      font-size: 1rem;
    }

    .filters {
      display: flex;
      gap: 12px;
    }

    .filter-select {
      padding: 8px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .export-btn {
      background: #10b981;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }

    .students-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .student-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .student-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .student-avatar {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 1.2rem;
    }

    .student-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .student-status.active {
      background: #dcfce7;
      color: #166534;
    }

    .student-status.inactive {
      background: #fef3c7;
      color: #92400e;
    }

    .student-status.completed {
      background: #dbeafe;
      color: #1e40af;
    }

    .student-info h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .student-id {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 4px;
    }

    .student-email {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 12px;
    }

    .student-meta {
      display: flex;
      gap: 16px;
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 16px;
    }

    .student-progress {
      margin-bottom: 16px;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-bar.small {
      height: 6px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .student-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      font-size: 0.875rem;
    }

    .student-actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
    }

    .action-btn.primary {
      background: #3b82f6;
      color: white;
    }

    .action-btn.secondary {
      background: #f8fafc;
      color: #64748b;
      border: 1px solid #e2e8f0;
    }

    .action-btn.info {
      background: #10b981;
      color: white;
    }

    .student-detail-modal, .assign-course-modal {
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

    .modal-content {
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 800px;
      width: 90%;
      max-height: 90%;
      overflow-y: auto;
    }

    .detail-section {
      margin-bottom: 24px;
    }

    .detail-section h3 {
      color: #1e293b;
      margin-bottom: 16px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item label {
      font-weight: 600;
      color: #64748b;
      font-size: 0.875rem;
    }

    .course-item, .quiz-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: #f8fafc;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .quiz-score {
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 8px;
    }

    .quiz-score.high {
      background: #dcfce7;
      color: #166534;
    }

    .quiz-score.medium {
      background: #fef3c7;
      color: #92400e;
    }

    .quiz-score.low {
      background: #fecaca;
      color: #991b1b;
    }

    .course-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      margin-bottom: 12px;
    }

    .course-option input[type="checkbox"]:checked + label {
      background: #eff6ff;
    }

    .assign-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn.primary {
      background: #3b82f6;
      color: white;
    }

    .btn.secondary {
      background: #f8fafc;
      color: #64748b;
      border: 2px solid #e2e8f0;
    }
  `]
})
export class StudentManagementComponent implements OnInit {
  searchTerm = '';
  selectedCourse = '';
  selectedStatus = '';
  showStudentDetail = false;
  showAssignCourse = false;
  selectedStudent: any = null;

  studentStats = {
    totalStudents: 456,
    activeStudents: 389,
    averageProgress: 73,
    averageRating: 4.6
  };

  students: any[] = [];
  filteredStudents: any[] = [];
  courses: any[] = [];
  availableCourses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudents();
    this.loadCourses();
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
            status: student.status || 'active',
            enrolledCourses: student.enrolledCourses || 0,
            completedCourses: student.completedCourses || 0,
            overallProgress: student.overallProgress || 0,
            averageScore: student.averageScore || 0,
            lastActive: student.lastActive || 'Recently',
            joinDate: student.joinDate || new Date().toISOString().split('T')[0],
            courseEnrollments: student.courseEnrollments || [],
            quizResults: student.quizResults || []
          }));
          this.filteredStudents = [...this.students];
        },
        error: (error) => {
          console.error('Error loading students:', error);
          this.students = [
            {
              id: 'STU001',
              name: 'John Doe',
              email: 'john@example.com',
              status: 'active',
              enrolledCourses: 3,
              completedCourses: 2,
              overallProgress: 85,
              averageScore: 92,
              lastActive: '2 hours ago',
              joinDate: '2024-01-15',
              courseEnrollments: [],
              quizResults: []
            }
          ];
          this.filteredStudents = [...this.students];
        }
      });
    }
  }

  loadCourses() {
    this.courses = [
      { id: 1, title: 'JavaScript Fundamentals' },
      { id: 2, title: 'React Development' },
      { id: 3, title: 'Node.js Backend' }
    ];

    this.availableCourses = [
      { id: 4, title: 'Advanced JavaScript', description: 'Advanced JS concepts', price: 199, selected: false },
      { id: 5, title: 'Vue.js Framework', description: 'Vue.js development', price: 149, selected: false }
    ];
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           student.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.selectedStatus || student.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  viewStudentDetail(student: any) {
    this.selectedStudent = student;
    this.showStudentDetail = true;
  }

  messageStudent(student: any) {
    alert(`Message student: ${student.name}`);
  }

  assignCourse(student: any) {
    this.selectedStudent = student;
    this.showAssignCourse = true;
  }

  exportStudentData() {
    alert('Exporting student data...');
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'high';
    if (score >= 70) return 'medium';
    return 'low';
  }

  confirmAssignCourse() {
    const selectedCourses = this.availableCourses.filter(course => course.selected);
    alert(`Assigned ${selectedCourses.length} courses to ${this.selectedStudent?.name}`);
    this.showAssignCourse = false;
  }

  closeStudentDetail(event: Event) {
    if (event.target === event.currentTarget) {
      this.showStudentDetail = false;
    }
  }

  closeAssignCourse(event: Event) {
    if (event.target === event.currentTarget) {
      this.showAssignCourse = false;
    }
  }
}