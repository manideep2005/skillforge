package com.skillforge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "learning_paths")
public class LearningPath {
    @Id
    private String id;
    private String title;
    private String description;
    private String icon;
    private String level; // BEGINNER, INTERMEDIATE, ADVANCED
    private int estimatedDuration; // in weeks
    private List<String> courseIds;
    private List<String> prerequisites;
    private String category;
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public LearningPath() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.isActive = true;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public int getEstimatedDuration() { return estimatedDuration; }
    public void setEstimatedDuration(int estimatedDuration) { this.estimatedDuration = estimatedDuration; }
    public List<String> getCourseIds() { return courseIds; }
    public void setCourseIds(List<String> courseIds) { this.courseIds = courseIds; }
    public List<String> getPrerequisites() { return prerequisites; }
    public void setPrerequisites(List<String> prerequisites) { this.prerequisites = prerequisites; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}