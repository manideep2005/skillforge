package com.skillforge.controller;

import com.skillforge.entity.Course;
import com.skillforge.entity.User;
import com.skillforge.entity.UserProgress;
import com.skillforge.repository.CourseRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserProgressRepository userProgressRepository;

    @GetMapping("/student/{userId}")
    public ResponseEntity<Map<String, Object>> getStudentDashboard(@PathVariable String userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        User user = userOpt.get();
        List<UserProgress> userProgress = userProgressRepository.findByUserId(userId);
        List<Course> allCourses = courseRepository.findByPublishedTrue();
        
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("user", user);
        dashboardData.put("enrolledCourses", userProgress);
        dashboardData.put("availableCourses", allCourses);
        
        // Calculate stats
        long completedCourses = userProgress.stream().filter(UserProgress::isCompleted).count();
        int totalStudyTime = userProgress.stream().mapToInt(UserProgress::getTotalTimeSpent).sum();
        double avgProgress = userProgress.stream().mapToInt(UserProgress::getOverallProgress).average().orElse(0.0);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCourses", userProgress.size());
        stats.put("completedCourses", completedCourses);
        stats.put("totalStudyHours", totalStudyTime / 60.0); // convert minutes to hours
        stats.put("averageProgress", Math.round(avgProgress));
        stats.put("streak", 15); // Mock streak for now
        
        dashboardData.put("stats", stats);
        
        return ResponseEntity.ok(dashboardData);
    }
    
    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseRepository.findByPublishedTrue();
        return ResponseEntity.ok(courses);
    }
    
    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/enroll")
    public ResponseEntity<UserProgress> enrollInCourse(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String courseId = request.get("courseId");
        
        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if (!courseOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Course course = courseOpt.get();
        
        // Check if already enrolled
        Optional<UserProgress> existingProgress = userProgressRepository.findByUserIdAndCourseId(userId, courseId);
        if (existingProgress.isPresent()) {
            return ResponseEntity.ok(existingProgress.get());
        }
        
        // Create new enrollment
        UserProgress progress = new UserProgress(userId, courseId, course.getTitle());
        UserProgress savedProgress = userProgressRepository.save(progress);
        
        return ResponseEntity.ok(savedProgress);
    }
}