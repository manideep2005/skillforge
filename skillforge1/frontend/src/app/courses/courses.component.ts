import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { YoutubeApiService } from '../services/youtube-api.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="courses-container">
      <div class="courses-header">
        <h1>Discover Courses</h1>
        <p>Learn new skills with our comprehensive course library</p>
        
        <div class="search-section">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Search courses..."
            class="search-input"
          >
          <button (click)="searchCourses()" class="search-btn">Search</button>
        </div>
      </div>

      <div *ngIf="loading" class="loading">Loading courses...</div>

      <div *ngIf="!loading" class="courses-grid">
        <div class="course-card" *ngFor="let course of filteredCourses">
          <div class="course-header">
            <div class="course-icon">{{getCourseIcon(course.category)}}</div>
            <div class="course-level" [class]="course.level.toLowerCase()">{{course.level}}</div>
          </div>
          <div class="course-content">
            <div class="course-category">{{course.category}}</div>
            <h3 class="course-title">{{course.title}}</h3>
            <p class="course-instructor">by {{course.instructor}}</p>
            <div class="course-stats">
              <span>⭐ {{course.rating}}</span>
              <span>👥 {{course.students}}</span>
              <span>🕰 {{course.duration}}</span>
            </div>
            <div class="course-price">
              <span *ngIf="course.price > 0" class="paid">\${{course.price}}</span>
              <span *ngIf="course.price === 0" class="free">FREE</span>
            </div>
            <button class="enroll-btn" (click)="enrollCourse(course)">Enroll Now</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  filteredCourses: any[] = [];
  searchQuery = '';
  loading = true;

  constructor(
    private router: Router,
    private youtubeApi: YoutubeApiService
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.youtubeApi.getMockCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.filteredCourses = courses;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  searchCourses() {
    if (this.searchQuery.trim()) {
      this.filteredCourses = this.courses.filter(course => 
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCourses = this.courses;
    }
  }

  enrollCourse(course: any) {
    console.log('Enrolling in:', course.title);
  }

  getCourseIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'JavaScript': '📜',
      'Python': '🐍',
      'React': '⚛️',
      'Angular': '🅰️',
      'Node.js': '🟢',
      'CSS': '🎨',
      'HTML': '🌐',
      'Java': '☕',
      'Programming': '💻'
    };
    return icons[category] || '📚';
  }
}