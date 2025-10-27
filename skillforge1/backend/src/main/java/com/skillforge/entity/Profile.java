package com.skillforge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "profiles")
public class Profile {
    @Id
    private String id;
    private String userId;
    private String bio;
    private String avatar;
    private String title;
    private List<Skill> skills;
    private List<String> interests;
    private String location;
    private String website;
    private String linkedin;
    private String github;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static class Skill {
        private String name;
        private int level; // 0-100
        private String category;

        // Constructors
        public Skill() {}
        public Skill(String name, int level, String category) {
            this.name = name;
            this.level = level;
            this.category = category;
        }

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public int getLevel() { return level; }
        public void setLevel(int level) { this.level = level; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
    }

    // Constructors
    public Profile() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }
    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}