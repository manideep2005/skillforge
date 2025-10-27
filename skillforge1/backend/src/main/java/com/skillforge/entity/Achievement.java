package com.skillforge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "achievements")
public class Achievement {

    @Id
    private String id;

    @Indexed
    private String userId;

    // Unique key to represent the achievement rule, e.g., FIRST_COURSE, WEEK_STREAK
    private String key;

    private String title;
    private String description;
    private String icon; // optional emoji or icon name for UI
    private int points;  // optional points value

    @Indexed
    private LocalDateTime earnedAt;

    public Achievement() {
        this.earnedAt = LocalDateTime.now();
    }

    public Achievement(String userId, String key, String title, String description) {
        this();
        this.userId = userId;
        this.key = key;
        this.title = title;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }

    public LocalDateTime getEarnedAt() { return earnedAt; }
    public void setEarnedAt(LocalDateTime earnedAt) { this.earnedAt = earnedAt; }
}
