# SkillForge Quick Start Guide

## Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

## Quick Setup

### 1. Database Setup
```sql
CREATE DATABASE skillforge;
```

### 2. Start the Application
```bash
./start.sh
```

### 3. Access the Application
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080

## Test the Application

### Step 1: Welcome Page
- Visit http://localhost:4200
- You'll see role selection cards for Student, Instructor, and Admin

### Step 2: Login with Test Credentials
- **Student**: email: `student`, password: `password`
- **Instructor**: email: `instructor`, password: `password`  
- **Admin**: email: `admin`, password: `password`

### Step 3: Role-Based Dashboards
Each role has a different dashboard:

**Student Dashboard:**
- Learning path progress (75% complete)
- Next suggested lesson
- Recent quiz scores
- Adaptive learning recommendations

**Instructor Dashboard:**
- Course management interface
- AI quiz generation tools
- Student analytics
- Content upload capabilities

**Admin Dashboard:**
- User management (1,247 total users)
- System analytics and performance
- Platform settings
- User activity monitoring

## Features Demonstrated

✅ **Role-Based Authentication** - Different login flows for each role
✅ **Welcome Page** - Interactive role selection
✅ **Responsive Dashboards** - Tailored UI for each user type
✅ **Mock Data** - Sample progress, courses, and analytics
✅ **Navigation** - Role-specific menu items

## Next Development Steps

1. **Course Management** - Add CRUD operations for courses
2. **AI Quiz Generation** - Integrate OpenAI API
3. **Progress Tracking** - Real database integration
4. **Analytics Charts** - Add Chart.js visualizations
5. **File Upload** - Course materials upload functionality

## Architecture

- **Frontend**: Angular 19 with standalone components
- **Backend**: Spring Boot 3.2 with Spring Security
- **Database**: MySQL with JPA/Hibernate
- **Authentication**: JWT tokens with role-based access