package com.skillforge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "learning_analytics")
public class LearningAnalytics {
    
    @Id
    private String id;
    
    private String userId;
    private String courseId;
    private Map<String, TopicPerformance> topicPerformances; // topic -> performance data
    private List<String> weakTopics; // topics where student needs improvement
    private List<String> strongTopics; // topics where student excels
    private Map<String, Integer> recommendedQuizCount; // topic -> number of additional quizzes needed
    private LocalDateTime lastAnalyzed;
    private String learningStyle; // visual, auditory, kinesthetic, reading
    private double overallMastery; // 0.0 to 1.0
    
    public static class TopicPerformance {
        private String topicName;
        private int totalAttempts;
        private double averageScore;
        private double masteryLevel; // 0.0 to 1.0
        private List<String> weakConcepts;
        private List<String> strongConcepts;
        private LocalDateTime lastAttempt;
        private String difficultyTrend; // improving, declining, stable
        
        public TopicPerformance() {}
        
        public TopicPerformance(String topicName) {
            this.topicName = topicName;
            this.totalAttempts = 0;
            this.averageScore = 0.0;
            this.masteryLevel = 0.0;
            this.difficultyTrend = "stable";
        }
        
        // Getters and Setters
        public String getTopicName() { return topicName; }
        public void setTopicName(String topicName) { this.topicName = topicName; }
        
        public int getTotalAttempts() { return totalAttempts; }
        public void setTotalAttempts(int totalAttempts) { this.totalAttempts = totalAttempts; }
        
        public double getAverageScore() { return averageScore; }
        public void setAverageScore(double averageScore) { this.averageScore = averageScore; }
        
        public double getMasteryLevel() { return masteryLevel; }
        public void setMasteryLevel(double masteryLevel) { this.masteryLevel = masteryLevel; }
        
        public List<String> getWeakConcepts() { return weakConcepts; }
        public void setWeakConcepts(List<String> weakConcepts) { this.weakConcepts = weakConcepts; }
        
        public List<String> getStrongConcepts() { return strongConcepts; }
        public void setStrongConcepts(List<String> strongConcepts) { this.strongConcepts = strongConcepts; }
        
        public LocalDateTime getLastAttempt() { return lastAttempt; }
        public void setLastAttempt(LocalDateTime lastAttempt) { this.lastAttempt = lastAttempt; }
        
        public String getDifficultyTrend() { return difficultyTrend; }
        public void setDifficultyTrend(String difficultyTrend) { this.difficultyTrend = difficultyTrend; }
    }
    
    public LearningAnalytics() {
        this.lastAnalyzed = LocalDateTime.now();
        this.overallMastery = 0.0;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    
    public Map<String, TopicPerformance> getTopicPerformances() { return topicPerformances; }
    public void setTopicPerformances(Map<String, TopicPerformance> topicPerformances) { this.topicPerformances = topicPerformances; }
    
    public List<String> getWeakTopics() { return weakTopics; }
    public void setWeakTopics(List<String> weakTopics) { this.weakTopics = weakTopics; }
    
    public List<String> getStrongTopics() { return strongTopics; }
    public void setStrongTopics(List<String> strongTopics) { this.strongTopics = strongTopics; }
    
    public Map<String, Integer> getRecommendedQuizCount() { return recommendedQuizCount; }
    public void setRecommendedQuizCount(Map<String, Integer> recommendedQuizCount) { this.recommendedQuizCount = recommendedQuizCount; }
    
    public LocalDateTime getLastAnalyzed() { return lastAnalyzed; }
    public void setLastAnalyzed(LocalDateTime lastAnalyzed) { this.lastAnalyzed = lastAnalyzed; }
    
    public String getLearningStyle() { return learningStyle; }
    public void setLearningStyle(String learningStyle) { this.learningStyle = learningStyle; }
    
    public double getOverallMastery() { return overallMastery; }
    public void setOverallMastery(double overallMastery) { this.overallMastery = overallMastery; }
}