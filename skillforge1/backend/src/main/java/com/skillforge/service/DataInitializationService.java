package com.skillforge.service;

import com.skillforge.entity.User;
import com.skillforge.entity.Course;
import com.skillforge.entity.Quiz;
import com.skillforge.entity.UserProgress;
import com.skillforge.repository.UserRepository;
import com.skillforge.repository.CourseRepository;
import com.skillforge.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserProgressRepository userProgressRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeCourses();
        initializeUserProgress();
    }

    private void initializeUsers() {
        if (userRepository.count() == 0) {
            // Create test users
            User student = new User("student@test.com", passwordEncoder.encode("password123"), "John Student", User.Role.STUDENT);
            User instructor = new User("instructor@test.com", passwordEncoder.encode("password123"), "Jane Instructor", User.Role.INSTRUCTOR);
            User admin = new User("admin@test.com", passwordEncoder.encode("password123"), "Admin User", User.Role.ADMIN);
            User manideep = new User("manideep.gonugunta1802@gmail.com", passwordEncoder.encode("123456789"), "Manideep Gonugunta", User.Role.STUDENT);
            
            userRepository.saveAll(Arrays.asList(student, instructor, admin, manideep));
            System.out.println("✅ Initialized test users");
        }
    }

    private void initializeCourses() {
        if (courseRepository.count() == 0) {
            // JavaScript Course
            Course jsCourse = new Course();
            jsCourse.setTitle("Advanced JavaScript");
            jsCourse.setDescription("Master modern JavaScript concepts including ES6+, async programming, and more.");
            jsCourse.setInstructorName("Jane Instructor");
            jsCourse.setDifficulty("INTERMEDIATE");
            jsCourse.setEstimatedHours(25);
            jsCourse.setRating(4.8);
            jsCourse.setEnrolledStudents(156);
            jsCourse.setPublished(true);
            jsCourse.setTags(Arrays.asList("JavaScript", "Programming", "Web Development"));
            
            List<Course.Module> jsModules = Arrays.asList(
                new Course.Module("JavaScript Fundamentals", "Variables, functions, and basic concepts", 1),
                new Course.Module("ES6+ Features", "Arrow functions, destructuring, modules", 2),
                new Course.Module("Async Programming", "Promises, async/await, fetch API", 3),
                new Course.Module("DOM Manipulation", "Working with the Document Object Model", 4),
                new Course.Module("Advanced Concepts", "Closures, prototypes, and design patterns", 5)
            );
            jsCourse.setModules(jsModules);
            
            // React Course
            Course reactCourse = new Course();
            reactCourse.setTitle("React Fundamentals");
            reactCourse.setDescription("Build modern web applications with React and its ecosystem.");
            reactCourse.setInstructorName("Jane Instructor");
            reactCourse.setDifficulty("BEGINNER");
            reactCourse.setEstimatedHours(30);
            reactCourse.setRating(4.7);
            reactCourse.setEnrolledStudents(89);
            reactCourse.setPublished(true);
            reactCourse.setTags(Arrays.asList("React", "Frontend", "JavaScript"));
            
            List<Course.Module> reactModules = Arrays.asList(
                new Course.Module("React Basics", "Components, JSX, and props", 1),
                new Course.Module("State Management", "useState and useEffect hooks", 2),
                new Course.Module("Event Handling", "User interactions and forms", 3),
                new Course.Module("Routing", "React Router for navigation", 4)
            );
            reactCourse.setModules(reactModules);
            
            // HTML/CSS Course
            Course htmlCourse = new Course();
            htmlCourse.setTitle("HTML & CSS Fundamentals");
            htmlCourse.setDescription("Learn the building blocks of web development with HTML and CSS.");
            htmlCourse.setInstructorName("Jane Instructor");
            htmlCourse.setDifficulty("BEGINNER");
            htmlCourse.setEstimatedHours(15);
            htmlCourse.setRating(4.9);
            htmlCourse.setEnrolledStudents(234);
            htmlCourse.setPublished(true);
            htmlCourse.setTags(Arrays.asList("HTML", "CSS", "Web Development"));
            
            List<Course.Module> htmlModules = Arrays.asList(
                new Course.Module("HTML Structure", "Elements, attributes, and semantic HTML", 1),
                new Course.Module("CSS Styling", "Selectors, properties, and layouts", 2),
                new Course.Module("Responsive Design", "Media queries and flexbox", 3),
                new Course.Module("CSS Grid", "Advanced layout techniques", 4)
            );
            htmlCourse.setModules(htmlModules);
            
            courseRepository.saveAll(Arrays.asList(jsCourse, reactCourse, htmlCourse));
            System.out.println("✅ Initialized courses");
        }
    }

    private void initializeUserProgress() {
        if (userProgressRepository.count() == 0) {
            User student = userRepository.findByEmail("student@test.com").orElse(null);
            User manideep = userRepository.findByEmail("manideep.gonugunta1802@gmail.com").orElse(null);
            List<Course> courses = courseRepository.findAll();
            
            if (student != null && !courses.isEmpty()) {
                // Student progress for JavaScript course
                Course jsCourse = courses.stream()
                    .filter(c -> c.getTitle().equals("Advanced JavaScript"))
                    .findFirst().orElse(null);
                    
                if (jsCourse != null) {
                    UserProgress jsProgress = new UserProgress(student.getId(), jsCourse.getId(), jsCourse.getTitle());
                    jsProgress.setCompletedModules(Arrays.asList("module1", "module2", "module3"));
                    jsProgress.setOverallProgress(75);
                    jsProgress.setTotalTimeSpent(480); // 8 hours
                    
                    HashMap<String, Integer> quizScores = new HashMap<>();
                    quizScores.put("js-basics-quiz", 85);
                    quizScores.put("dom-quiz", 92);
                    jsProgress.setQuizScores(quizScores);
                    
                    userProgressRepository.save(jsProgress);
                }
                
                // Student progress for HTML/CSS course (completed)
                Course htmlCourse = courses.stream()
                    .filter(c -> c.getTitle().equals("HTML & CSS Fundamentals"))
                    .findFirst().orElse(null);
                    
                if (htmlCourse != null) {
                    UserProgress htmlProgress = new UserProgress(student.getId(), htmlCourse.getId(), htmlCourse.getTitle());
                    htmlProgress.setCompletedModules(Arrays.asList("module1", "module2", "module3", "module4"));
                    htmlProgress.setOverallProgress(100);
                    htmlProgress.setCompleted(true);
                    htmlProgress.setTotalTimeSpent(360); // 6 hours
                    
                    HashMap<String, Integer> htmlQuizScores = new HashMap<>();
                    htmlQuizScores.put("html-basics-quiz", 95);
                    htmlQuizScores.put("css-quiz", 88);
                    htmlProgress.setQuizScores(htmlQuizScores);
                    
                    userProgressRepository.save(htmlProgress);
                }
            }
            
            // Initialize progress for Manideep as well
            if (manideep != null && !courses.isEmpty()) {
                Course jsCourse = courses.stream()
                    .filter(c -> c.getTitle().equals("Advanced JavaScript"))
                    .findFirst().orElse(null);
                    
                if (jsCourse != null) {
                    UserProgress progress = new UserProgress(manideep.getId(), jsCourse.getId(), jsCourse.getTitle());
                    progress.setCompletedModules(Arrays.asList("module1", "module2"));
                    progress.setOverallProgress(60);
                    progress.setTotalTimeSpent(300); // 5 hours
                    
                    userProgressRepository.save(progress);
                }
            }
            
            System.out.println("✅ Initialized user progress data");
        }
    }
}