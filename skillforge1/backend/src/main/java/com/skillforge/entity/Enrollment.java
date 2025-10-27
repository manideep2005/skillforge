package com.skillforge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "enrollments")
public class Enrollment {
    @Id
    private String id;
    private String userId;
    private String courseId;
    private int progress; // 0-100
    private LocalDateTime enrolledAt;
    private LocalDateTime lastAccessedAt;
    private LocalDateTime completedAt;
    private String status; // ENROLLED, IN_PROGRESS, COMPLETED, DROPPED
    private int currentLessonIndex;
    private int totalTimeSpent; // in minutes

    // Constructors
    public Enrollment() {
        this.enrolledAt = LocalDateTime.now();
        this.lastAccessedAt = LocalDateTime.now();
        this.status = "ENROLLED";
        this.progress = 0;
        this.currentLessonIndex = 0;
        this.totalTimeSpent = 0;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    public int getProgress() { return progress; }
    public void setProgress(int progress) { this.progress = progress; }
    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public void setEnrolledAt(LocalDateTime enrolledAt) { this.enrolledAt = enrolledAt; }
    public LocalDateTime getLastAccessedAt() { return lastAccessedAt; }
    public void setLastAccessedAt(LocalDateTime lastAccessedAt) { this.lastAccessedAt = lastAccessedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getCurrentLessonIndex() { return currentLessonIndex; }
    public void setCurrentLessonIndex(int currentLessonIndex) { this.currentLessonIndex = currentLessonIndex; }
    public int getTotalTimeSpent() { return totalTimeSpent; }
    public void setTotalTimeSpent(int totalTimeSpent) { this.totalTimeSpent = totalTimeSpent; }
}