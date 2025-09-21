-- SkillForge Database Setup Script
-- Run this in MySQL to create the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS skillforge;
USE skillforge;

-- Create Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN') DEFAULT 'STUDENT',
    skill_level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Courses table
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject VARCHAR(255) NOT NULL,
    difficulty ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
    materials JSON,
    instructor_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

-- Create Quizzes table
CREATE TABLE quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    difficulty ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
    time_limit INT DEFAULT 30,
    course_id BIGINT NOT NULL,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create Questions table
CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    type ENUM('MCQ', 'SHORT_ANSWER') DEFAULT 'MCQ',
    options JSON,
    correct_answer TEXT NOT NULL,
    points INT DEFAULT 1,
    quiz_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Create Quiz Attempts table
CREATE TABLE quiz_attempts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    score FLOAT NOT NULL,
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    time_spent INT,
    answers JSON,
    student_id BIGINT NOT NULL,
    quiz_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Create Progress table
CREATE TABLE progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    completion_percentage FLOAT DEFAULT 0,
    current_level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Insert sample data
-- Sample Users
INSERT INTO users (email, password, name, role) VALUES
('student@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9tYofdDzpmcKlsK', 'John Student', 'STUDENT'),
('instructor@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9tYofdDzpmcKlsK', 'Jane Instructor', 'INSTRUCTOR'),
('admin@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9tYofdDzpmcKlsK', 'Admin User', 'ADMIN');

-- Sample Courses
INSERT INTO courses (title, description, subject, difficulty, instructor_id) VALUES
('JavaScript Fundamentals', 'Learn the basics of JavaScript programming', 'Programming', 'BEGINNER', 2),
('React Advanced', 'Advanced React concepts and patterns', 'Programming', 'ADVANCED', 2),
('Data Structures', 'Understanding data structures and algorithms', 'Computer Science', 'INTERMEDIATE', 2);

-- Sample Quizzes
INSERT INTO quizzes (title, topic, difficulty, course_id) VALUES
('JS Basics Quiz', 'JavaScript Variables and Functions', 'BEGINNER', 1),
('React Hooks Quiz', 'React Hooks and State Management', 'ADVANCED', 2);

-- Sample Questions
INSERT INTO questions (question, type, options, correct_answer, quiz_id) VALUES
('What is a variable in JavaScript?', 'MCQ', '["A container for data", "A function", "A loop", "An object"]', 'A container for data', 1),
('Which hook is used for state management?', 'MCQ', '["useState", "useEffect", "useContext", "useReducer"]', 'useState', 2);

-- Sample Progress
INSERT INTO progress (completion_percentage, student_id, course_id) VALUES
(75.0, 1, 1),
(45.0, 1, 2);

-- Sample Quiz Attempts
INSERT INTO quiz_attempts (score, total_questions, correct_answers, student_id, quiz_id) VALUES
(85.0, 10, 8, 1, 1),
(92.0, 15, 14, 1, 2);

-- Show created tables
SHOW TABLES;

-- Display sample data
SELECT 'Users:' as Info;
SELECT * FROM users;

SELECT 'Courses:' as Info;
SELECT * FROM courses;

SELECT 'Progress:' as Info;
SELECT * FROM progress;