package com.skillforge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "quiz_results")
public class QuizResult {
    
    @Id
    private String id;
    
    private String userId;
    private String quizId;
    private String courseId;
    private String topicName; // e.g., "Linear Search", "Binary Search"
    private int totalQuestions;
    private int correctAnswers;
    private int scorePercentage;
    private List<QuestionResult> questionResults;
    private Map<String, Integer> topicScores; // topic -> score percentage
    private LocalDateTime completedAt;
    private int timeSpentMinutes;
    private String difficultyLevel;
    
    public static class QuestionResult {
        private String questionId;
        private String questionText;
        private String selectedAnswer;
        private String correctAnswer;
        private boolean isCorrect;
        private String topic;
        private String concept; // specific concept within topic
        
        public QuestionResult() {}
        
        public QuestionResult(String questionId, String questionText, String selectedAnswer, 
                            String correctAnswer, boolean isCorrect, String topic, String concept) {
            this.questionId = questionId;
            this.questionText = questionText;
            this.selectedAnswer = selectedAnswer;
            this.correctAnswer = correctAnswer;
            this.isCorrect = isCorrect;
            this.topic = topic;
            this.concept = concept;
        }
        
        // Getters and Setters
        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }
        
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        
        public String getSelectedAnswer() { return selectedAnswer; }
        public void setSelectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; }
        
        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
        
        public boolean isCorrect() { return isCorrect; }
        public void setCorrect(boolean correct) { isCorrect = correct; }
        
        public String getTopic() { return topic; }
        public void setTopic(String topic) { this.topic = topic; }
        
        public String getConcept() { return concept; }
        public void setConcept(String concept) { this.concept = concept; }
    }
    
    public QuizResult() {
        this.completedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getQuizId() { return quizId; }
    public void setQuizId(String quizId) { this.quizId = quizId; }
    
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    
    public String getTopicName() { return topicName; }
    public void setTopicName(String topicName) { this.topicName = topicName; }
    
    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
    
    public int getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(int correctAnswers) { this.correctAnswers = correctAnswers; }
    
    public int getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(int scorePercentage) { this.scorePercentage = scorePercentage; }
    
    public List<QuestionResult> getQuestionResults() { return questionResults; }
    public void setQuestionResults(List<QuestionResult> questionResults) { this.questionResults = questionResults; }
    
    public Map<String, Integer> getTopicScores() { return topicScores; }
    public void setTopicScores(Map<String, Integer> topicScores) { this.topicScores = topicScores; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    
    public int getTimeSpentMinutes() { return timeSpentMinutes; }
    public void setTimeSpentMinutes(int timeSpentMinutes) { this.timeSpentMinutes = timeSpentMinutes; }
    
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
}