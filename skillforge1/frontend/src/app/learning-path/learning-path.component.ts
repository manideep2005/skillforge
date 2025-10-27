import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="learning-path-container">
      <div class="header">
        <h1>🎯 Your Learning Journey</h1>
        <p>Structured paths to master new skills step by step</p>
      </div>

      <!-- Progress Overview -->
      <div class="progress-overview">
        <div class="overall-stats">
          <div class="stat-item">
            <span class="stat-number">{{overallProgress}}%</span>
            <span class="stat-label">Overall Progress</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{completedPaths}}</span>
            <span class="stat-label">Paths Completed</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{totalHours}}</span>
            <span class="stat-label">Hours Invested</span>
          </div>
        </div>
      </div>

      <!-- Learning Paths -->
      <div class="paths-grid">
        <div *ngFor="let path of learningPaths" class="path-card" [class.completed]="path.progress === 100">
          <div class="path-header">
            <div class="path-icon">{{path.icon}}</div>
            <div class="path-info">
              <h3>{{path.title}}</h3>
              <p>{{path.description}}</p>
              <div class="path-meta">
                <span class="duration">⏱️ {{path.duration}}</span>
                <span class="level">📊 {{path.level}}</span>
                <span class="courses">📚 {{path.courses.length}} courses</span>
              </div>
            </div>
            <div class="path-progress">
              <div class="progress-circle">
                <svg viewBox="0 0 36 36" class="circular-chart">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="circle" [attr.stroke-dasharray]="path.progress + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <text x="18" y="20.35" class="percentage">{{path.progress}}%</text>
                </svg>
              </div>
            </div>
          </div>

          <!-- Course Timeline -->
          <div class="course-timeline" *ngIf="path.showDetails">
            <div *ngFor="let course of path.courses; let i = index" class="timeline-item" [class]="course.status">
              <div class="timeline-connector" *ngIf="i < path.courses.length - 1"></div>
              <div class="timeline-dot">
                <span class="course-icon">{{course.icon}}</span>
              </div>
              <div class="timeline-content">
                <h4>{{course.title}}</h4>
                <p>{{course.description}}</p>
                <div class="course-meta">
                  <span class="duration">{{course.duration}}</span>
                  <span class="difficulty">{{course.difficulty}}</span>

                </div>
                <div class="course-actions">
                  <button *ngIf="course.status === 'available'" class="btn-start" (click)="startCourse(course, path)">Start Course</button>
                  <button *ngIf="course.status === 'in-progress'" class="btn-continue" (click)="continueCourse(course, path)">Continue</button>
                  <button *ngIf="course.status === 'completed'" class="btn-review" (click)="reviewCourse(course, path)">Review</button>
                  <span *ngIf="course.status === 'locked'" class="locked-text">🔒 Locked</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Skills You'll Learn -->
          <div class="skills-section" *ngIf="path.showDetails">
            <h4>Skills You'll Learn:</h4>
            <div class="skills-tags">
              <span *ngFor="let skill of path.skills" class="skill-tag">{{skill}}</span>
            </div>
          </div>

          <div class="path-actions">
            <button *ngIf="path.progress === 0" class="btn-primary" (click)="startPath(path)">Start Path</button>
            <button *ngIf="path.progress > 0 && path.progress < 100" class="btn-primary" (click)="continuePath(path)">Continue Path</button>
            <button *ngIf="path.progress === 100" class="btn-secondary" (click)="viewCertificate(path)">View Certificate</button>
            <button class="btn-outline" (click)="togglePathDetails(path)">{{path.showDetails ? 'Hide' : 'Show'}} Details</button>
          </div>
        </div>
      </div>

      <!-- Recommended Paths -->
      <div class="recommended-section">
        <h2>🌟 Recommended for You</h2>
        <div class="recommended-grid">
          <div *ngFor="let path of recommendedPaths" class="recommended-card">
            <div class="recommended-icon">{{path.icon}}</div>
            <h3>{{path.title}}</h3>
            <p>{{path.description}}</p>
            <div class="recommended-meta">
              <span>{{path.duration}}</span>
              <span>{{path.level}}</span>
            </div>
            <button class="btn-outline" (click)="explorePath(path)">Explore Path</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent implements OnInit {
  overallProgress = 45;
  completedPaths = 2;
  totalHours = 89;

  learningPaths = [
    {
      icon: '🌐',
      title: 'Full Stack Web Developer',
      description: 'Master both frontend and backend development with modern technologies',
      duration: '6 months',
      level: 'Beginner to Advanced',
      progress: 65,
      showDetails: false,
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'],
      courses: [
        {
          title: 'HTML & CSS Fundamentals',
          description: 'Learn the building blocks of web development',
          duration: '2 weeks',
          difficulty: 'Beginner',
          status: 'completed',
          icon: '✅'
        },
        {
          title: 'JavaScript Essentials',
          description: 'Master JavaScript programming concepts',
          duration: '3 weeks',
          difficulty: 'Beginner',
          status: 'completed',
          icon: '✅'
        },
        {
          title: 'React Development',
          description: 'Build modern user interfaces with React',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          status: 'in-progress',
          icon: '🔄'
        },
        {
          title: 'Node.js Backend',
          description: 'Create server-side applications',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          status: 'locked',
          icon: '🔒'
        },
        {
          title: 'Database Design',
          description: 'Learn database concepts and SQL',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          status: 'locked',
          icon: '🔒'
        }
      ]
    },
    {
      icon: '📊',
      title: 'Data Science Specialist',
      description: 'Learn data analysis, machine learning, and visualization',
      duration: '4 months',
      level: 'Intermediate',
      progress: 25,
      showDetails: false,
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'SQL'],
      courses: [
        {
          title: 'Python for Data Science',
          description: 'Master Python programming for data analysis',
          duration: '3 weeks',
          difficulty: 'Beginner',
          status: 'completed',
          icon: '✅'
        },
        {
          title: 'Statistics & Probability',
          description: 'Understand statistical concepts',
          duration: '2 weeks',
          difficulty: 'Intermediate',
          status: 'in-progress',
          icon: '🔄'
        },
        {
          title: 'Machine Learning Basics',
          description: 'Introduction to ML algorithms',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          status: 'locked',
          icon: '🔒'
        },
        {
          title: 'Data Visualization',
          description: 'Create compelling data visualizations',
          duration: '2 weeks',
          difficulty: 'Intermediate',
          status: 'locked',
          icon: '🔒'
        }
      ]
    },
    {
      icon: '📱',
      title: 'Mobile App Developer',
      description: 'Build native and cross-platform mobile applications',
      duration: '5 months',
      level: 'Intermediate',
      progress: 0,
      showDetails: false,
      skills: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'API Integration'],
      courses: [
        {
          title: 'Mobile Development Fundamentals',
          description: 'Learn mobile app development basics',
          duration: '2 weeks',
          difficulty: 'Beginner',
          status: 'available',
          icon: '▶️'
        },
        {
          title: 'React Native Development',
          description: 'Build cross-platform mobile apps',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          status: 'locked',
          icon: '🔒'
        },
        {
          title: 'Native iOS Development',
          description: 'Create iOS apps with Swift',
          duration: '4 weeks',
          difficulty: 'Advanced',
          status: 'locked',
          icon: '🔒'
        }
      ]
    }
  ];

  recommendedPaths = [
    {
      icon: '☁️',
      title: 'Cloud Architecture',
      description: 'Master AWS, Azure, and cloud-native development',
      duration: '3 months',
      level: 'Advanced'
    },
    {
      icon: '🔐',
      title: 'Cybersecurity Expert',
      description: 'Learn ethical hacking and security best practices',
      duration: '4 months',
      level: 'Intermediate'
    },
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Deep dive into artificial intelligence and ML',
      duration: '6 months',
      level: 'Advanced'
    }
  ];

  ngOnInit() {}

  startPath(path: any) {
    console.log('Starting path:', path.title);
    path.progress = 5;
    // Navigate to first course or show path introduction
  }

  continuePath(path: any) {
    console.log('Continuing path:', path.title);
    // Navigate to current course in progress
  }

  viewCertificate(path: any) {
    console.log('Viewing certificate for:', path.title);
    // Show certificate modal or navigate to certificate page
  }

  togglePathDetails(path: any) {
    path.showDetails = !path.showDetails;
  }

  startCourse(course: any, path: any) {
    console.log('Starting course:', course.title, 'in path:', path.title);
    course.status = 'in-progress';
  }

  continueCourse(course: any, path: any) {
    console.log('Continuing course:', course.title);
    // Navigate to course content
  }

  reviewCourse(course: any, path: any) {
    console.log('Reviewing course:', course.title);
    // Navigate to course review or summary
  }

  explorePath(path: any) {
    console.log('Exploring recommended path:', path.title);
    // Add to learning paths or show detailed view
  }
}