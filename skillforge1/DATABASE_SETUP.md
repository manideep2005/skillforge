# SkillForge Database Setup

## Step 1: Connect to MySQL
```bash
mysql -u root -p
```

## Step 2: Run the Setup Script
```sql
source /Users/manideepgonugunta/Desktop/internship/skillforge/database_setup.sql
```

OR copy and paste the SQL commands from `database_setup.sql`

## Step 3: Verify Database Creation
```sql
USE skillforge;
SHOW TABLES;
SELECT * FROM users;
```

## Test Credentials Created
- **Student**: email: `student@test.com`, password: `password`
- **Instructor**: email: `instructor@test.com`, password: `password`  
- **Admin**: email: `admin@test.com`, password: `password`

## Database Schema

### Tables Created:
1. **users** - User authentication and roles
2. **courses** - Course content and metadata
3. **quizzes** - Quiz information
4. **questions** - Individual quiz questions
5. **quiz_attempts** - Student quiz results
6. **progress** - Student learning progress

### Sample Data Included:
- 3 users (student, instructor, admin)
- 3 courses (JavaScript, React, Data Structures)
- 2 quizzes with questions
- Progress tracking for student
- Sample quiz attempts

## After Database Setup:
1. Update `application.yml` with your MySQL credentials
2. Run the Spring Boot application: `mvn spring-boot:run`
3. Start Angular frontend: `npm start`
4. Access: http://localhost:4200

## Database Connection Settings:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/skillforge
    username: root
    password: your_mysql_password
```