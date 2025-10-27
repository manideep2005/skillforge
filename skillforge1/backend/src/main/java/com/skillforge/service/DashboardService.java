package com.skillforge.service;

import com.skillforge.entity.*;
import com.skillforge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class DashboardService {
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private ProfileRepository profileRepository;
    
    @Autowired
    private AchievementRepository achievementRepository;
    
    @Autowired
    private ActivityLogRepository activityLogRepository;
    
    public Map<String, Object> getUserDashboardData(String userId) {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // Get user enrollments
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        
        // Calculate stats
        long totalEnrolled = enrollments.size();
        long completed = enrollmentRepository.countByUserIdAndStatus(userId, "COMPLETED");
        int totalHours = enrollments.stream()
            .mapToInt(Enrollment::getTotalTimeSpent)
            .sum() / 60; // convert minutes to hours
        
        // Get user profile
        Profile profile = profileRepository.findByUserId(userId).orElse(null);
        
        // Get recent activities
        List<ActivityLog> recentActivities = activityLogRepository.findTop10ByUserIdOrderByCreatedAtDesc(userId);
        
        // Get achievements
        List<Achievement> achievements = achievementRepository.findByUserId(userId);
        
        // Get enrolled courses with progress
        List<Map<String, Object>> enrolledCourses = new ArrayList<>();
        for (Enrollment enrollment : enrollments) {
            Optional<Course> courseOpt = courseRepository.findById(enrollment.getCourseId());
            if (courseOpt.isPresent()) {
                Course course = courseOpt.get();
                Map<String, Object> courseData = new HashMap<>();
                courseData.put("id", course.getId());
                courseData.put("title", course.getTitle());
                courseData.put("description", course.getDescription());
                courseData.put("instructor", course.getInstructor());
                courseData.put("progress", enrollment.getProgress());
                courseData.put("status", enrollment.getStatus());
                courseData.put("image", course.getImageUrl());
                courseData.put("duration", course.getDuration());
                enrolledCourses.add(courseData);
            }
        }
        
        // Build response
        dashboardData.put("stats", Map.of(
            "coursesEnrolled", totalEnrolled,
            "coursesCompleted", completed,
            "hoursLearned", totalHours,
            "certificates", achievements.size()
        ));
        
        dashboardData.put("profile", profile);
        dashboardData.put("enrolledCourses", enrolledCourses);
        dashboardData.put("recentActivities", recentActivities);
        dashboardData.put("achievements", achievements);
        
        return dashboardData;
    }
    
    public Map<String, Object> getInstructorDashboardData(String userId) {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // Get instructor's courses
        List<Course> instructorCourses = courseRepository.findByInstructorId(userId);
        
        // Calculate instructor stats
        int totalStudents = 0;
        double avgRating = 0.0;
        int totalHours = 0;
        
        for (Course course : instructorCourses) {
            List<Enrollment> courseEnrollments = enrollmentRepository.findByCourseId(course.getId());
            totalStudents += courseEnrollments.size();
            totalHours += course.getDuration();
        }
        
        if (!instructorCourses.isEmpty()) {
            avgRating = instructorCourses.stream()
                .mapToDouble(Course::getRating)
                .average()
                .orElse(0.0);
        }
        
        dashboardData.put("stats", Map.of(
            "coursesCreated", instructorCourses.size(),
            "studentsCount", totalStudents,
            "hoursTeaching", totalHours,
            "avgRating", Math.round(avgRating * 10.0) / 10.0
        ));
        
        dashboardData.put("courses", instructorCourses);
        
        return dashboardData;
    }
}