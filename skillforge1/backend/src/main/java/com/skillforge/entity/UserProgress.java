package com.skillforge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "user_progress")
@CompoundIndex(def = "{'userId': 1, 'courseId': 1}", unique = true)
public class UserProgress {
    
    @Id
    private String id;
    
    private String userId;
    private String courseId;
    private String courseName;
    private List<String> completedModules;
    private Map<String, Integer> quizScores; // quizId -> score percentage
    private int overallProgress; // percentage
    private LocalDateTime enrolledAt;
    private LocalDateTime lastAccessedAt;
    private LocalDateTime completedAt;
    private boolean completed;
    private int totalTimeSpent; // in minutes
    
    // Constructors
    public UserProgress() {
        this.enrolledAt = LocalDateTime.now();
        this.lastAccessedAt = LocalDateTime.now();
        this.completed = false;
        this.overallProgress = 0;
        this.totalTimeSpent = 0;
    }
    
    public UserProgress(String userId, String courseId, String courseName) {
        this();
        this.userId = userId;
        this.courseId = courseId;
        this.courseName = courseName;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    
    public List<String> getCompletedModules() { return completedModules; }
    public void setCompletedModules(List<String> completedModules) { this.completedModules = completedModules; }
    
    public Map<String, Integer> getQuizScores() { return quizScores; }
    public void setQuizScores(Map<String, Integer> quizScores) { this.quizScores = quizScores; }
    
    public int getOverallProgress() { return overallProgress; }
    public void setOverallProgress(int overallProgress) { this.overallProgress = overallProgress; }
    
    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public void setEnrolledAt(LocalDateTime enrolledAt) { this.enrolledAt = enrolledAt; }
    
    public LocalDateTime getLastAccessedAt() { return lastAccessedAt; }
    public void setLastAccessedAt(LocalDateTime lastAccessedAt) { this.lastAccessedAt = lastAccessedAt; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    
    public int getTotalTimeSpent() { return totalTimeSpent; }
    public void setTotalTimeSpent(int totalTimeSpent) { this.totalTimeSpent = totalTimeSpent; }
}