package com.skillforge.controller;

import com.skillforge.entity.*;
import com.skillforge.service.*;
import com.skillforge.repository.*;
import com.skillforge.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/adaptive-quiz")
@CrossOrigin(origins = "http://localhost:4200")
public class AdaptiveQuizController {
    
    @Autowired
    private AdaptiveLearningService adaptiveLearningService;
    
    @Autowired
    private AIQuizService aiQuizService;
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private QuizRepository quizRepository;
    
    @GetMapping("/recommendations/{courseId}")
    public ResponseEntity<?> getPersonalizedRecommendations(
            @PathVariable String courseId,
            Authentication authentication) {
        try {
            String userId = getUserIdFromAuth(authentication);
            Map<String, Object> recommendations = adaptiveLearningService.getPersonalizedRecommendations(userId, courseId);
            return ResponseEntity.ok(recommendations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting recommendations: " + e.getMessage());
        }
    }
    
    @PostMapping("/generate/{courseId}/{topic}")
    public ResponseEntity<?> generatePersonalizedQuiz(
            @PathVariable String courseId,
            @PathVariable String topic,
            Authentication authentication) {
        try {
            String userId = getUserIdFromAuth(authentication);
            Quiz quiz = adaptiveLearningService.generatePersonalizedQuiz(userId, courseId, topic);
            
            // Set additional properties
            quiz.setCourseId(courseId);
            quiz.setModuleId(topic);
            quiz.setPublished(true);
            
            // Save quiz to database
            Quiz savedQuiz = quizRepository.save(quiz);
            
            return ResponseEntity.ok(savedQuiz);
        } catch (Exception e) {
            // Log error but still return a quiz
            System.err.println("Quiz generation error: " + e.getMessage());
            
            // Generate a simple fallback quiz directly in controller
            Quiz fallbackQuiz = new Quiz();
            fallbackQuiz.setTitle(topic + " Practice Quiz");
            fallbackQuiz.setDescription("Practice quiz on " + topic);
            fallbackQuiz.setDifficulty("medium");
            fallbackQuiz.setCourseId(courseId);
            fallbackQuiz.setModuleId(topic);
            fallbackQuiz.setPublished(true);
            
            // Add a simple question
            List<Quiz.Question> questions = new ArrayList<>();
            Quiz.Question q = new Quiz.Question();
            q.setQuestionText("What is the main concept in " + topic + "?");
            q.setOptions(Arrays.asList("Concept A", "Concept B", "Concept C", "Concept D"));
            q.setCorrectAnswer(0);
            q.setExplanation("This is a practice question for " + topic);
            q.setPoints(1);
            questions.add(q);
            fallbackQuiz.setQuestions(questions);
            
            Quiz savedQuiz = quizRepository.save(fallbackQuiz);
            return ResponseEntity.ok(savedQuiz);
        }
    }
    
    @PostMapping("/submit-result")
    public ResponseEntity<?> submitQuizResult(
            @RequestBody QuizResultSubmission submission,
            Authentication authentication) {
        try {
            String userId = getUserIdFromAuth(authentication);
            
            QuizResult result = new QuizResult();
            result.setUserId(userId);
            result.setQuizId(submission.getQuizId());
            result.setCourseId(submission.getCourseId());
            result.setTopicName(submission.getTopicName());
            result.setTotalQuestions(submission.getTotalQuestions());
            result.setCorrectAnswers(submission.getCorrectAnswers());
            result.setScorePercentage(submission.getScorePercentage());
            result.setQuestionResults(submission.getQuestionResults());
            result.setTimeSpentMinutes(submission.getTimeSpentMinutes());
            result.setDifficultyLevel(submission.getDifficultyLevel());
            result.setCompletedAt(LocalDateTime.now());
            
            // Calculate topic scores
            Map<String, Integer> topicScores = calculateTopicScores(submission.getQuestionResults());
            result.setTopicScores(topicScores);
            
            QuizResult savedResult = quizResultRepository.save(result);
            
            // Trigger analytics update
            LearningAnalytics analytics = adaptiveLearningService.analyzeStudentPerformance(userId, submission.getCourseId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("result", savedResult);
            response.put("analytics", analytics);
            response.put("recommendations", adaptiveLearningService.getPersonalizedRecommendations(userId, submission.getCourseId()));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error submitting quiz result: " + e.getMessage());
        }
    }
    
    @GetMapping("/analytics/{courseId}")
    public ResponseEntity<?> getStudentAnalytics(
            @PathVariable String courseId,
            Authentication authentication) {
        try {
            String userId = getUserIdFromAuth(authentication);
            LearningAnalytics analytics = adaptiveLearningService.analyzeStudentPerformance(userId, courseId);
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting analytics: " + e.getMessage());
        }
    }
    
    @GetMapping("/quiz-history/{courseId}")
    public ResponseEntity<?> getQuizHistory(
            @PathVariable String courseId,
            Authentication authentication) {
        try {
            String userId = getUserIdFromAuth(authentication);
            List<QuizResult> history = quizResultRepository.findByUserIdAndCourseId(userId, courseId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting quiz history: " + e.getMessage());
        }
    }
    
    @GetMapping("/topic-performance/{courseId}/{topic}")
    public ResponseEntity<?> getTopicPerformance(
            @PathVariable String courseId,
            @PathVariable String topic,
            Authentication authentication) {
        try {
            String userId = getUserIdFromAuth(authentication);
            List<QuizResult> topicResults = quizResultRepository.findByUserIdAndCourseIdAndTopicName(userId, courseId, topic);
            
            Map<String, Object> performance = new HashMap<>();
            performance.put("results", topicResults);
            performance.put("totalAttempts", topicResults.size());
            
            if (!topicResults.isEmpty()) {
                double avgScore = topicResults.stream()
                    .mapToInt(QuizResult::getScorePercentage)
                    .average()
                    .orElse(0.0);
                performance.put("averageScore", Math.round(avgScore));
                
                int bestScore = topicResults.stream()
                    .mapToInt(QuizResult::getScorePercentage)
                    .max()
                    .orElse(0);
                performance.put("bestScore", bestScore);
                
                QuizResult latestResult = topicResults.stream()
                    .max(Comparator.comparing(QuizResult::getCompletedAt))
                    .orElse(null);
                performance.put("latestResult", latestResult);
            }
            
            return ResponseEntity.ok(performance);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting topic performance: " + e.getMessage());
        }
    }
    
    @GetMapping("/available-topics/{courseId}")
    public ResponseEntity<?> getAvailableTopics(@PathVariable String courseId) {
        try {
            // In a real system, this would come from the course structure
            List<Map<String, Object>> topics = Arrays.asList(
                createTopicInfo("Linear Search", "Basic searching algorithm", "easy", "🔍"),
                createTopicInfo("Binary Search", "Efficient searching in sorted arrays", "medium", "🎯"),
                createTopicInfo("Bubble Sort", "Simple sorting algorithm", "easy", "🫧"),
                createTopicInfo("Quick Sort", "Efficient divide-and-conquer sorting", "hard", "⚡"),
                createTopicInfo("Merge Sort", "Stable divide-and-conquer sorting", "medium", "🔀"),
                createTopicInfo("Hash Tables", "Key-value data structure", "medium", "🗂️"),
                createTopicInfo("Linked Lists", "Dynamic data structure", "easy", "🔗"),
                createTopicInfo("Binary Trees", "Hierarchical data structure", "medium", "🌳"),
                createTopicInfo("Graph Algorithms", "Network and path algorithms", "hard", "🕸️"),
                createTopicInfo("Dynamic Programming", "Optimization technique", "hard", "🧩")
            );
            
            return ResponseEntity.ok(topics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting topics: " + e.getMessage());
        }
    }
    
    private Map<String, Object> createTopicInfo(String name, String description, String difficulty, String icon) {
        Map<String, Object> topic = new HashMap<>();
        topic.put("name", name);
        topic.put("description", description);
        topic.put("difficulty", difficulty);
        topic.put("icon", icon);
        return topic;
    }
    
    private Map<String, Integer> calculateTopicScores(List<QuizResult.QuestionResult> questionResults) {
        Map<String, List<Boolean>> topicCorrectness = new HashMap<>();
        
        for (QuizResult.QuestionResult qr : questionResults) {
            topicCorrectness.computeIfAbsent(qr.getTopic(), k -> new ArrayList<>())
                .add(qr.isCorrect());
        }
        
        Map<String, Integer> topicScores = new HashMap<>();
        for (Map.Entry<String, List<Boolean>> entry : topicCorrectness.entrySet()) {
            String topic = entry.getKey();
            List<Boolean> correctness = entry.getValue();
            
            double accuracy = correctness.stream()
                .mapToDouble(correct -> correct ? 1.0 : 0.0)
                .average()
                .orElse(0.0);
            
            topicScores.put(topic, (int) Math.round(accuracy * 100));
        }
        
        return topicScores;
    }
    
    private String getUserIdFromAuth(Authentication authentication) {
        if (authentication != null && authentication.getName() != null) {
            return userRepository.findByEmail(authentication.getName())
                .map(User::getId)
                .orElse("default-user");
        }
        return "default-user";
    }
    
    public static class QuizResultSubmission {
        private String quizId;
        private String courseId;
        private String topicName;
        private int totalQuestions;
        private int correctAnswers;
        private int scorePercentage;
        private List<QuizResult.QuestionResult> questionResults;
        private int timeSpentMinutes;
        private String difficultyLevel;
        
        // Getters and Setters
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
        
        public List<QuizResult.QuestionResult> getQuestionResults() { return questionResults; }
        public void setQuestionResults(List<QuizResult.QuestionResult> questionResults) { this.questionResults = questionResults; }
        
        public int getTimeSpentMinutes() { return timeSpentMinutes; }
        public void setTimeSpentMinutes(int timeSpentMinutes) { this.timeSpentMinutes = timeSpentMinutes; }
        
        public String getDifficultyLevel() { return difficultyLevel; }
        public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    }
}