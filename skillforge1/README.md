# SkillForge - AI-Powered E-Learning Platform

## Overview
SkillForge is a smart e-learning platform that leverages AI to personalize student learning paths and dynamically generate exams tailored to each user's skill level.

## Tech Stack
- **Frontend**: Angular 19, Angular Material, Chart.js
- **Backend**: Spring Boot, Spring Security, JWT
- **Database**: MySQL with JPA/Hibernate
- **AI Integration**: OpenAI API for quiz generation

## Features
1. **User Authentication & Role-Based Dashboard**
   - Student, Instructor, Admin roles
   - JWT-based session management
   - Role-specific dashboards

2. **Course & Content Management**
   - Add/edit/delete courses and materials
   - Upload videos, PDFs, links
   - Difficulty level tagging

3. **Adaptive Learning Engine**
   - Personalized content suggestions
   - Adaptive quiz difficulty
   - Progress tracking

4. **AI-Generated Quiz Module**
   - Auto-generate questions using OpenAI
   - MCQ and short answer support
   - Review and edit capabilities

5. **Analytics & Reporting**
   - Performance tracking
   - Skill progression charts
   - Instructor insights

## Setup Instructions

### Backend (Spring Boot)
1. Navigate to `backend/` directory
2. Configure MySQL database in `application.yml`
3. Add OpenAI API key to `application.yml`
4. Run: `mvn spring-boot:run`

### Frontend (Angular)
1. Navigate to `frontend/` directory
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Access at `http://localhost:4200`

### Database Setup
```sql
CREATE DATABASE skillforge;
```

## API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/courses` - Get courses
- `POST /api/quizzes/generate` - Generate AI quiz
- `GET /api/analytics/progress` - Get progress data

## Environment Variables
```
DB_HOST=localhost
DB_NAME=skillforge
DB_USER=root
DB_PASSWORD=password
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```