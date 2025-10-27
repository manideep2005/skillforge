import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="course-management-container">
      <div class="header">
        <h1>📚 Course Management</h1>
        <p>Create and manage your courses</p>
        <button class="create-btn" (click)="showCreateForm = true">➕ Create New Course</button>
      </div>

      <!-- Course Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📖</div>
          <div class="stat-content">
            <h3>{{courseStats.totalCourses}}</h3>
            <p>Total Courses</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>{{courseStats.totalStudents}}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <h3>{{courseStats.averageRating}}</h3>
            <p>Average Rating</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <h3>\${{courseStats.totalRevenue}}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <!-- Courses List -->
      <div class="courses-section">
        <div class="section-header">
          <h2>Your Courses</h2>
          <div class="filters">
            <select [(ngModel)]="selectedFilter" (change)="filterCourses()" class="filter-select">
              <option value="all">All Courses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div class="courses-grid">
          <div class="course-card" *ngFor="let course of filteredCourses">
            <div class="course-header">
              <img [src]="course.image" alt="Course" class="course-image">
              <div class="course-status" [class]="course.status">{{course.status}}</div>
            </div>
            <div class="course-content">
              <h3>{{course.title}}</h3>
              <p>{{course.description}}</p>
              <div class="course-meta">
                <span class="meta-item">📚 {{course.category}}</span>
                <span class="meta-item">⏱️ {{course.duration}}h</span>
                <span class="meta-item">💰 \${{course.price}}</span>
              </div>
              <div class="course-stats">
                <div class="stat">
                  <span class="stat-label">Students:</span>
                  <span class="stat-value">{{course.enrolledStudents}}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Rating:</span>
                  <span class="stat-value">⭐ {{course.rating}}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Revenue:</span>
                  <span class="stat-value">\${{course.revenue}}</span>
                </div>
              </div>
            </div>
            <div class="course-actions">
              <button class="action-btn secondary" (click)="editCourse(course)">✏️ Edit</button>
              <button class="action-btn primary" (click)="viewStudents(course)">👥 Students</button>
              <button class="action-btn info" (click)="viewAnalytics(course)">📊 Analytics</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Student List Modal -->
      <div class="student-modal" *ngIf="showStudentModal" (click)="closeStudentModal($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Students in "{{selectedCourse?.title}}"</h2>
            <button class="close-btn" (click)="showStudentModal = false">✕</button>
          </div>
          <div class="students-list">
            <div class="student-item" *ngFor="let student of courseStudents">
              <div class="student-info">
                <div class="student-avatar">{{getInitials(student.name)}}</div>
                <div class="student-details">
                  <h4>{{student.name}}</h4>
                  <p>ID: {{student.id}}</p>
                  <span class="student-email">{{student.email}}</span>
                </div>
              </div>
              <div class="student-progress">
                <div class="progress-info">
                  <span>Progress: {{student.progress}}%</span>
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="student.progress"></div>
                  </div>
                </div>
                <div class="student-actions">
                  <button class="action-btn small" (click)="messageStudent(student)">💬</button>
                  <button class="action-btn small" (click)="viewStudentProgress(student)">📊</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .course-management-container {
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

    .create-btn {
      background: linear-gradient(135deg, #3b82f6, #1e40af);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
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

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .course-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .course-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .course-status {
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .course-status.published {
      background: #dcfce7;
      color: #166534;
    }

    .course-status.draft {
      background: #fef3c7;
      color: #92400e;
    }

    .course-content {
      padding: 24px;
    }

    .course-actions {
      display: flex;
      gap: 8px;
      padding: 0 24px 24px;
    }

    .action-btn {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 8px;
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
      background: #0ea5e9;
      color: white;
    }

    .student-modal {
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
      max-width: 600px;
      width: 90%;
      max-height: 90%;
      overflow-y: auto;
    }

    .student-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #e2e8f0;
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

    .progress-bar {
      width: 100px;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 4px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }
  `]
})
export class CourseManagementComponent implements OnInit {
  showCreateForm = false;
  showStudentModal = false;
  selectedFilter = 'all';
  selectedCourse: any = null;
  
  newCourse = {
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: 0,
    price: 0
  };
  
  courseStats = {
    totalCourses: 12,
    totalStudents: 456,
    averageRating: 4.7,
    totalRevenue: 15420
  };

  courses: any[] = [];
  filteredCourses: any[] = [];
  courseStudents: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courses = [
      {
        id: 1,
        title: 'Advanced JavaScript Mastery',
        description: 'Master advanced JavaScript concepts',
        category: 'Programming',
        duration: 40,
        price: 199,
        status: 'published',
        enrolledStudents: 156,
        rating: 4.8,
        revenue: 31044,
        image: 'https://picsum.photos/seed/js-course/400/200'
      },
      {
        id: 2,
        title: 'React Development Bootcamp',
        description: 'Complete React development course',
        category: 'Web Development',
        duration: 35,
        price: 149,
        status: 'published',
        enrolledStudents: 89,
        rating: 4.9,
        revenue: 13261,
        image: 'https://picsum.photos/seed/react-course/400/200'
      }
    ];
    this.filteredCourses = [...this.courses];
  }

  filterCourses() {
    if (this.selectedFilter === 'all') {
      this.filteredCourses = [...this.courses];
    } else {
      this.filteredCourses = this.courses.filter(course => course.status === this.selectedFilter);
    }
  }

  editCourse(course: any) {
    alert(`Edit course: ${course.title}`);
  }

  viewStudents(course: any) {
    this.selectedCourse = course;
    this.loadCourseStudents(course.id);
    this.showStudentModal = true;
  }

  loadCourseStudents(courseId: number) {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`http://localhost:3000/api/instructor/courses/${courseId}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data: any) => {
          this.courseStudents = data;
        },
        error: (error) => {
          console.error('Error loading course students:', error);
          this.courseStudents = [
            { id: 'STU001', name: 'John Doe', email: 'john@example.com', progress: 75 }
          ];
        }
      });
    }
  }

  viewAnalytics(course: any) {
    alert(`View analytics for: ${course.title}`);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  messageStudent(student: any) {
    alert(`Message student: ${student.name}`);
  }

  viewStudentProgress(student: any) {
    alert(`View progress for: ${student.name}`);
  }

  createCourse() {
    const course = {
      ...this.newCourse,
      id: this.courses.length + 1,
      status: 'draft',
      enrolledStudents: 0,
      rating: 0,
      revenue: 0,
      image: `https://picsum.photos/seed/course-${this.courses.length + 1}/400/200`
    };
    
    this.courses.push(course);
    this.filterCourses();
    this.showCreateForm = false;
    this.resetForm();
  }

  resetForm() {
    this.newCourse = {
      title: '',
      description: '',
      category: '',
      difficulty: '',
      duration: 0,
      price: 0
    };
  }

  closeCreateForm(event: Event) {
    if (event.target === event.currentTarget) {
      this.showCreateForm = false;
    }
  }

  closeStudentModal(event: Event) {
    if (event.target === event.currentTarget) {
      this.showStudentModal = false;
    }
  }
}