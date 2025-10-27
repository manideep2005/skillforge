package com.skillforge.service;

import com.skillforge.entity.*;
import com.skillforge.repository.*;
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
    private ProfileRepository profileRepository;
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    @Autowired
    private LearningPathRepository learningPathRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeCourses();
        initializeUserProgress();
        initializeProfiles();
        initializeEnrollments();
        initializeLearningPaths();
    }

    private void initializeUsers() {
        System.out.println("Initializing users...");
        System.out.println("Total users in DB: " + userRepository.count());
        
        // Create test users only if they don't exist
        if (!userRepository.existsByEmail("student@test.com")) {
            System.out.println("Creating student@test.com");
            User student = new User("student@test.com", passwordEncoder.encode("password123"), "John Student", User.Role.STUDENT);
            userRepository.save(student);
            System.out.println("Created student user");
        } else {
            System.out.println("student@test.com already exists");
        }
        
        if (!userRepository.existsByEmail("instructor@test.com")) {
            System.out.println("Creating instructor@test.com");
            User instructor = new User("instructor@test.com", passwordEncoder.encode("password123"), "Jane Instructor", User.Role.INSTRUCTOR);
            userRepository.save(instructor);
        }
        
        if (!userRepository.existsByEmail("admin@test.com")) {
            System.out.println("Creating admin@test.com");
            User admin = new User("admin@test.com", passwordEncoder.encode("password123"), "Admin User", User.Role.ADMIN);
            userRepository.save(admin);
        }
        
        if (!userRepository.existsByEmail("manideep.gonugunta1802@gmail.com")) {
            System.out.println("Creating manideep.gonugunta1802@gmail.com");
            User manideep = new User("manideep.gonugunta1802@gmail.com", passwordEncoder.encode("123456789"), "Manideep Gonugunta", User.Role.STUDENT);
            userRepository.save(manideep);
        }
        
        System.out.println("✅ Initialized test users");
        System.out.println("Final user count: " + userRepository.count());
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
    
    private void initializeProfiles() {
        if (profileRepository.count() == 0) {
            User student = userRepository.findByEmail("student@test.com").orElse(null);
            User manideep = userRepository.findByEmail("manideep.gonugunta1802@gmail.com").orElse(null);
            
            if (student != null) {
                Profile profile = new Profile();
                profile.setUserId(student.getId());
                profile.setBio("Passionate learner exploring web development and modern technologies.");
                profile.setTitle("Full Stack Developer Student");
                profile.setAvatar("https://i.pravatar.cc/150?u=" + student.getId());
                
                List<Profile.Skill> skills = Arrays.asList(
                    new Profile.Skill("JavaScript", 75, "Programming"),
                    new Profile.Skill("HTML/CSS", 90, "Frontend"),
                    new Profile.Skill("React", 60, "Frontend")
                );
                profile.setSkills(skills);
                profile.setInterests(Arrays.asList("Web Development", "JavaScript", "React", "Node.js"));
                profileRepository.save(profile);
            }
            
            if (manideep != null) {
                Profile profile = new Profile();
                profile.setUserId(manideep.getId());
                profile.setBio("Software engineering student passionate about learning new technologies.");
                profile.setTitle("Software Engineering Student");
                profile.setAvatar("https://i.pravatar.cc/150?u=" + manideep.getId());
                
                List<Profile.Skill> skills = Arrays.asList(
                    new Profile.Skill("JavaScript", 65, "Programming"),
                    new Profile.Skill("Java", 80, "Programming"),
                    new Profile.Skill("Python", 70, "Programming")
                );
                profile.setSkills(skills);
                profile.setInterests(Arrays.asList("Software Engineering", "Web Development", "AI/ML"));
                profileRepository.save(profile);
            }
            
            System.out.println("✅ Initialized user profiles");
        }
    }
    
    private void initializeEnrollments() {
        if (enrollmentRepository.count() == 0) {
            User student = userRepository.findByEmail("student@test.com").orElse(null);
            List<Course> courses = courseRepository.findAll();
            
            if (student != null && !courses.isEmpty()) {
                for (Course course : courses) {
                    Enrollment enrollment = new Enrollment();
                    enrollment.setUserId(student.getId());
                    enrollment.setCourseId(course.getId());
                    
                    if (course.getTitle().equals("HTML & CSS Fundamentals")) {
                        enrollment.setProgress(100);
                        enrollment.setStatus("COMPLETED");
                        enrollment.setTotalTimeSpent(360);
                    } else if (course.getTitle().equals("Advanced JavaScript")) {
                        enrollment.setProgress(75);
                        enrollment.setStatus("IN_PROGRESS");
                        enrollment.setTotalTimeSpent(480);
                    } else {
                        enrollment.setProgress(25);
                        enrollment.setStatus("IN_PROGRESS");
                        enrollment.setTotalTimeSpent(120);
                    }
                    
                    enrollmentRepository.save(enrollment);
                }
            }
            
            System.out.println("✅ Initialized enrollments");
        }
    }
    
    private void initializeLearningPaths() {
        if (learningPathRepository.count() == 0) {
            // Full Stack Web Developer Path
            LearningPath fullStackPath = new LearningPath();
            fullStackPath.setTitle("Full Stack Web Developer");
            fullStackPath.setDescription("Master both frontend and backend development with modern technologies");
            fullStackPath.setIcon("🌐");
            fullStackPath.setLevel("BEGINNER");
            fullStackPath.setEstimatedDuration(24); // 24 weeks
            fullStackPath.setCategory("Web Development");
            
            List<Course> courses = courseRepository.findAll();
            List<String> courseIds = new ArrayList<>();
            for (Course course : courses) {
                courseIds.add(course.getId());
            }
            fullStackPath.setCourseIds(courseIds);
            
            // Data Science Path
            LearningPath dataPath = new LearningPath();
            dataPath.setTitle("Data Science Specialist");
            dataPath.setDescription("Learn data analysis, machine learning, and visualization techniques");
            dataPath.setIcon("📊");
            dataPath.setLevel("INTERMEDIATE");
            dataPath.setEstimatedDuration(16); // 16 weeks
            dataPath.setCategory("Data Science");
            dataPath.setCourseIds(new ArrayList<>());
            
            learningPathRepository.saveAll(Arrays.asList(fullStackPath, dataPath));
            System.out.println("✅ Initialized learning paths");
        }
    }
}