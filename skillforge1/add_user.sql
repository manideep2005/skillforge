-- Add new user to SkillForge database
USE skillforge;

INSERT INTO users (email, password, name, role) VALUES 
('manideep.gonugunta1802@gmail.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9tYofdDzpmcKlsK', 'Manideep Gonugunta', 'STUDENT');

-- Verify the user was added
SELECT * FROM users WHERE email = 'manideep.gonugunta1802@gmail.com';