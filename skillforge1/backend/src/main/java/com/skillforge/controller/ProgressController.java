package com.skillforge.controller;

import com.skillforge.entity.ActivityLog;
import com.skillforge.entity.Achievement;
import com.skillforge.entity.Course;
import com.skillforge.entity.UserProgress;
import com.skillforge.repository.ActivityLogRepository;
import com.skillforge.repository.AchievementRepository;
import com.skillforge.repository.CourseRepository;
import com.skillforge.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    @Autowired
    private UserProgressRepository userProgressRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private AchievementRepository achievementRepository;

    @PostMapping("/complete-module")
    public ResponseEntity<UserProgress> completeModule(@RequestBody Map<String, String> request) {
        String userId = request.getOrDefault("userId", "");
        String courseId = request.getOrDefault("courseId", "");
        String moduleId = request.getOrDefault("moduleId", "");
        if (userId.isEmpty() || courseId.isEmpty() || moduleId.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if (!courseOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Course course = courseOpt.get();
        int totalModules = (course.getModules() != null) ? course.getModules().size() : 0;

        UserProgress progress = userProgressRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseGet(() -> new UserProgress(userId, courseId, course.getTitle()));

        List<String> completed = progress.getCompletedModules();
        if (completed == null) {
            completed = new ArrayList<>();
        }
        if (!completed.contains(moduleId)) {
            completed.add(moduleId);
        }
        progress.setCompletedModules(completed);
        progress.setLastAccessedAt(LocalDateTime.now());

        // Compute progress percentage
        int pct = 0;
        if (totalModules > 0) {
            pct = (int) Math.round((completed.size() * 100.0) / totalModules);
        }
        progress.setOverallProgress(Math.min(100, pct));

        boolean wasCompleted = progress.isCompleted();
        if (pct >= 100) {
            progress.setCompleted(true);
            if (progress.getCompletedAt() == null) {
                progress.setCompletedAt(LocalDateTime.now());
            }
        }

        UserProgress saved = userProgressRepository.save(progress);

        // Log activity
        if (pct >= 100 && !wasCompleted) {
            ActivityLog log = new ActivityLog(userId, ActivityLog.Type.COURSE_COMPLETED, "Completed " + course.getTitle());
            log.setCourseId(courseId);
            activityLogRepository.save(log);

            // Award achievement for course completion
            Achievement a = new Achievement(userId, "COURSE_COMPLETED", "Course Completed", "Completed: " + course.getTitle());
            a.setIcon("🏆");
            a.setPoints(100);
            achievementRepository.save(a);
        } else {
            ActivityLog log = new ActivityLog(userId, ActivityLog.Type.MODULE_COMPLETED, "Completed a module in " + course.getTitle());
            log.setCourseId(courseId);
            log.setEntityId(moduleId);
            activityLogRepository.save(log);
        }

        return ResponseEntity.ok(saved);
    }

    @PostMapping("/track-time")
    public ResponseEntity<UserProgress> trackTime(@RequestBody Map<String, Object> request) {
        String userId = Objects.toString(request.get("userId"), "");
        String courseId = Objects.toString(request.get("courseId"), "");
        int minutes = 0;
        try {
            Object m = request.get("minutes");
            if (m instanceof Number) {
                minutes = ((Number) m).intValue();
            } else if (m != null) {
                minutes = Integer.parseInt(m.toString());
            }
        } catch (Exception ignored) {}

        if (userId.isEmpty() || courseId.isEmpty() || minutes <= 0) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if (!courseOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Course course = courseOpt.get();

        UserProgress progress = userProgressRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseGet(() -> new UserProgress(userId, courseId, course.getTitle()));

        progress.setTotalTimeSpent(progress.getTotalTimeSpent() + minutes);
        progress.setLastAccessedAt(LocalDateTime.now());
        UserProgress saved = userProgressRepository.save(progress);

        ActivityLog log = new ActivityLog(userId, ActivityLog.Type.PROGRESS_UPDATE,
                "Studied " + minutes + " min in " + course.getTitle());
        log.setCourseId(courseId);
        Map<String, Object> meta = new HashMap<>();
        meta.put("minutes", minutes);
        log.setMeta(meta);
        activityLogRepository.save(log);

        return ResponseEntity.ok(saved);
    }
}
