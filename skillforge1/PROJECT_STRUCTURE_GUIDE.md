# SkillForge Project Structure Guide

## 🎯 **Project Overview**
SkillForge is an AI-powered e-learning platform with role-based access (Student, Instructor, Admin) that provides personalized learning paths and adaptive quizzes.

---

## 📁 **Root Directory Structure**

```
skillforge1/
├── backend/          # Spring Boot API server
├── frontend/         # Angular web application
├── README.md         # Project documentation
├── QUICKSTART.md     # Setup instructions
├── start.sh          # Launch script for both apps
└── *.sql            # Database setup files
```

---

## 🔧 **Backend Structure (`/backend/`)**

### **Main Application**
- **`SkillForgeApplication.java`** - Spring Boot entry point, starts the server

### **📦 Entity Layer (`/entity/`) - Database Models**

| File | Purpose | Key Data |
|------|---------|----------|
| **`User.java`** | User accounts & authentication | email, password, role (STUDENT/INSTRUCTOR/ADMIN) |
| **`Course.java`** | Course information & modules | title, description, modules, difficulty, rating |
| **`UserProgress.java`** | Learning progress tracking | completed modules, quiz scores, time spent |
| **`Quiz.java`** | AI-generated quizzes | questions, answers, difficulty level |
| **`Enrollment.java`** | Student course enrollments | user-course relationships |
| **`LearningPath.java`** | Personalized learning paths | recommended courses, skill progression |
| **`Profile.java`** | User profile details | bio, skills, achievements |
| **`Achievement.java`** | Badges and certifications | completion certificates, skill badges |
| **`ActivityLog.java`** | User activity tracking | login times, course access |

### **🎮 Controller Layer (`/controller/`) - API Endpoints**

| File | Purpose | Key Endpoints |
|------|---------|---------------|
| **`AuthController.java`** | User authentication | `/api/auth/login`, `/api/auth/register` |
| **`CourseController.java`** | Course management | `/api/courses`, `/api/courses/{id}` |
| **`DashboardController.java`** | Dashboard data | `/api/dashboard/student`, `/api/dashboard/admin` |
| **`ProgressController.java`** | Learning progress | `/api/progress/{userId}`, `/api/progress/update` |
| **`ProfileController.java`** | User profiles | `/api/profile`, `/api/profile/update` |
| **`WelcomeController.java`** | Landing page data | `/api/welcome/stats` |

### **⚙️ Service Layer (`/service/`) - Business Logic**

| Service | Responsibility |
|---------|----------------|
| **`AuthService`** | Login, registration, JWT token management |
| **`CourseService`** | Course CRUD, enrollment logic |
| **`ProgressService`** | Track learning progress, calculate completion |
| **`QuizService`** | AI quiz generation, scoring |
| **`DashboardService`** | Aggregate data for dashboards |

### **💾 Repository Layer (`/repository/`) - Data Access**

| Repository | Database Operations |
|------------|-------------------|
| **`UserRepository`** | User CRUD operations |
| **`CourseRepository`** | Course data management |
| **`ProgressRepository`** | Progress tracking queries |
| **`QuizRepository`** | Quiz storage and retrieval |

---

## 🎨 **Frontend Structure (`/frontend/src/app/`)**

### **🏠 Core Components**

| File | Purpose |
|------|---------|
| **`app.component.ts`** | Root component, router outlet |
| **`app.routes.ts`** | Application routing configuration |

### **🔐 Authentication (`/auth/`)**

| File | Purpose |
|------|---------|
| **`login.component.ts`** | Login form and validation |
| **`auth.service.ts`** | JWT token management, API calls |
| **`auth.guard.ts`** | Route protection based on roles |

### **📊 Dashboard Components (`/dashboard/`)**

| File | Purpose | User Role |
|------|---------|-----------|
| **`student-dashboard.component.ts`** | Learning progress, recommendations | Student |
| **`instructor-dashboard.component.ts`** | Course management, student analytics | Instructor |
| **`admin-dashboard.component.ts`** | User management, system stats | Admin |

### **📚 Course Management (`/course/`)**

| Component | Functionality |
|-----------|---------------|
| **Course Creation** | Add new courses, upload content |
| **Course Editing** | Modify existing courses |
| **Module Management** | Add/edit course modules |

### **🧠 Quiz System (`/quiz/`)**

| Component | Functionality |
|-----------|---------------|
| **Quiz Taking** | Interactive quiz interface |
| **AI Generation** | Create adaptive quizzes |
| **Results Display** | Show scores and feedback |

### **📈 Analytics (`/analytics/`)**

| Component | Data Displayed |
|-----------|----------------|
| **Progress Charts** | Learning completion graphs |
| **Performance Metrics** | Quiz scores, time spent |
| **Skill Progression** | Competency tracking |

---

## 🔑 **Core Logic Examples**

### **1. User Authentication Flow**

```java
// AuthController.java - Login endpoint
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    AuthResponse response = authService.login(request);
    return ResponseEntity.ok(response);
}

// AuthService.java - Login logic
public AuthResponse login(LoginRequest request) {
    User user = userRepository.findByEmail(request.getEmail());
    if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token, user.getRole());
    }
    throw new RuntimeException("Invalid credentials");
}
```

### **2. Progress Tracking Logic**

```java
// UserProgress.java - Core entity
@Document(collection = "user_progress")
public class UserProgress {
    private String userId;
    private String courseId;
    private List<String> completedModules;
    private Map<String, Integer> quizScores;
    private int overallProgress; // percentage
    private LocalDateTime lastAccessedAt;
    
    // Auto-calculate progress when modules completed
    public void updateProgress(int totalModules) {
        this.overallProgress = (completedModules.size() * 100) / totalModules;
        this.lastAccessedAt = LocalDateTime.now();
    }
}
```

### **3. Role-Based Dashboard Logic**

```typescript
// dashboard.service.ts - Frontend service
getDashboardData(role: string) {
  switch(role) {
    case 'STUDENT':
      return this.http.get('/api/dashboard/student');
    case 'INSTRUCTOR':
      return this.http.get('/api/dashboard/instructor');
    case 'ADMIN':
      return this.http.get('/api/dashboard/admin');
  }
}
```

### **4. Course Enrollment Logic**

```java
// CourseService.java - Enrollment process
public void enrollStudent(String userId, String courseId) {
    // Create enrollment record
    Enrollment enrollment = new Enrollment(userId, courseId);
    enrollmentRepository.save(enrollment);
    
    // Initialize progress tracking
    UserProgress progress = new UserProgress(userId, courseId, courseName);
    progressRepository.save(progress);
    
    // Update course enrollment count
    Course course = courseRepository.findById(courseId);
    course.setEnrolledStudents(course.getEnrolledStudents() + 1);
    courseRepository.save(course);
}
```

---

## 🚀 **Key Features Implementation**

### **1. AI Quiz Generation**
- **Backend**: OpenAI API integration in `QuizService`
- **Frontend**: Dynamic quiz rendering in `quiz.component.ts`
- **Logic**: Adaptive difficulty based on user performance

### **2. Progress Analytics**
- **Data Collection**: `ActivityLog` tracks all user interactions
- **Calculation**: `ProgressService` computes completion percentages
- **Visualization**: Chart.js integration in analytics components

### **3. Role-Based Access**
- **Security**: JWT tokens with role claims
- **Frontend**: Route guards check user permissions
- **Backend**: Method-level security annotations

---

## 🎯 **Data Flow Summary**

1. **User Login** → JWT Token → Role-based Dashboard
2. **Course Enrollment** → Progress Tracking → Analytics Update
3. **Module Completion** → Progress Calculation → Recommendation Engine
4. **Quiz Taking** → AI Scoring → Adaptive Difficulty Adjustment
5. **Activity Logging** → Analytics Dashboard → Performance Insights

---

## 🔧 **Quick Start Commands**

```bash
# Start entire application
./start.sh

# Backend only (port 8080)
cd backend && mvn spring-boot:run

# Frontend only (port 4200)
cd frontend && npm start
```

---

## 📱 **Demo Flow for Presentation**

1. **Welcome Page** → Role selection interface
2. **Login Demo** → Use test credentials (student/password)
3. **Student Dashboard** → Show learning progress, recommendations
4. **Course Enrollment** → Demonstrate enrollment process
5. **Quiz Taking** → Show AI-generated adaptive quiz
6. **Progress Analytics** → Display completion charts
7. **Role Switch** → Show instructor/admin dashboards

This structure demonstrates a professional, scalable e-learning platform with clear separation of concerns and modern development practices!