package com.skillforge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Document(collection = "activity_logs")
public class ActivityLog {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String courseId;      // optional: activity related to a course
    private String moduleId;      // optional: activity related to a module
    private String entityId;      // optional: generic entity (e.g., quizId)

    private Type type;
    private String message;       // human-friendly message
    private Map<String, Object> meta; // additional payload (score, duration, etc.)

    @Indexed
    private LocalDateTime createdAt;

    public enum Type {
        ENROLL,
        PROGRESS_UPDATE,
        MODULE_COMPLETED,
        QUIZ_ATTEMPT,
        COURSE_COMPLETED
    }

    public ActivityLog() {
        this.createdAt = LocalDateTime.now();
    }

    public ActivityLog(String userId, Type type, String message) {
        this();
        this.userId = userId;
        this.type = type;
        this.message = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getMeta() {
        return meta;
    }

    public void setMeta(Map<String, Object> meta) {
        this.meta = meta;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
