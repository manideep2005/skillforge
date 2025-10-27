package com.skillforge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.skillforge.entity.*;
import com.skillforge.repository.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdaptiveLearningService {
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
    @Autowired
    private LearningAnalyticsRepository learningAnalyticsRepository;
    
    @Autowired
    private AIQuizService aiQuizService;
    
    public LearningAnalytics analyzeStudentPerformance(String userId, String courseId) {
        List<QuizResult> quizResults = quizResultRepository.findByUserIdAndCourseId(userId, courseId);
        
        LearningAnalytics analytics = learningAnalyticsRepository.findByUserIdAndCourseId(userId, courseId)
            .orElse(new LearningAnalytics());
        
        analytics.setUserId(userId);
        analytics.setCourseId(courseId);
        analytics.setLastAnalyzed(LocalDateTime.now());
        
        // Analyze performance by topic
        Map<String, LearningAnalytics.TopicPerformance> topicPerformances = analyzeTopicPerformances(quizResults);
        analytics.setTopicPerformances(topicPerformances);
        
        // Identify weak and strong topics
        List<String> weakTopics = identifyWeakTopics(topicPerformances);
        List<String> strongTopics = identifyStrongTopics(topicPerformances);
        analytics.setWeakTopics(weakTopics);
        analytics.setStrongTopics(strongTopics);
        
        // Calculate recommended quiz counts
        Map<String, Integer> recommendedQuizCount = calculateRecommendedQuizzes(topicPerformances);
        analytics.setRecommendedQuizCount(recommendedQuizCount);
        
        // Calculate overall mastery
        double overallMastery = calculateOverallMastery(topicPerformances);
        analytics.setOverallMastery(overallMastery);
        
        // Determine learning style
        String learningStyle = determineLearningStyle(quizResults);
        analytics.setLearningStyle(learningStyle);
        
        return learningAnalyticsRepository.save(analytics);
    }
    
    private Map<String, LearningAnalytics.TopicPerformance> analyzeTopicPerformances(List<QuizResult> quizResults) {
        Map<String, List<QuizResult>> topicResults = quizResults.stream()
            .collect(Collectors.groupingBy(QuizResult::getTopicName));
        
        Map<String, LearningAnalytics.TopicPerformance> performances = new HashMap<>();
        
        for (Map.Entry<String, List<QuizResult>> entry : topicResults.entrySet()) {
            String topic = entry.getKey();
            List<QuizResult> results = entry.getValue();
            
            LearningAnalytics.TopicPerformance performance = new LearningAnalytics.TopicPerformance(topic);
            performance.setTotalAttempts(results.size());
            
            // Calculate average score
            double avgScore = results.stream()
                .mapToInt(QuizResult::getScorePercentage)
                .average()
                .orElse(0.0);
            performance.setAverageScore(avgScore);
            
            // Calculate mastery level (considering improvement over time)
            double masteryLevel = calculateMasteryLevel(results);
            performance.setMasteryLevel(masteryLevel);
            
            // Analyze weak and strong concepts
            List<String> weakConcepts = identifyWeakConcepts(results);
            List<String> strongConcepts = identifyStrongConcepts(results);
            performance.setWeakConcepts(weakConcepts);
            performance.setStrongConcepts(strongConcepts);
            
            // Determine difficulty trend
            String trend = calculateDifficultyTrend(results);
            performance.setDifficultyTrend(trend);
            
            // Set last attempt
            performance.setLastAttempt(results.stream()
                .map(QuizResult::getCompletedAt)
                .max(LocalDateTime::compareTo)
                .orElse(LocalDateTime.now()));
            
            performances.put(topic, performance);
        }
        
        return performances;
    }
    
    private double calculateMasteryLevel(List<QuizResult> results) {
        if (results.isEmpty()) return 0.0;
        
        // Sort by completion time to see progression
        results.sort(Comparator.comparing(QuizResult::getCompletedAt));
        
        // Weight recent attempts more heavily
        double weightedSum = 0.0;
        double totalWeight = 0.0;
        
        for (int i = 0; i < results.size(); i++) {
            double weight = Math.pow(1.2, i); // Recent attempts have higher weight
            double score = results.get(i).getScorePercentage() / 100.0;
            weightedSum += score * weight;
            totalWeight += weight;
        }
        
        return weightedSum / totalWeight;
    }
    
    private List<String> identifyWeakConcepts(List<QuizResult> results) {
        Map<String, List<Boolean>> conceptResults = new HashMap<>();
        
        for (QuizResult result : results) {
            for (QuizResult.QuestionResult qr : result.getQuestionResults()) {
                conceptResults.computeIfAbsent(qr.getConcept(), k -> new ArrayList<>())
                    .add(qr.isCorrect());
            }
        }
        
        return conceptResults.entrySet().stream()
            .filter(entry -> {
                List<Boolean> correctness = entry.getValue();
                double accuracy = correctness.stream()
                    .mapToDouble(correct -> correct ? 1.0 : 0.0)
                    .average()
                    .orElse(0.0);
                return accuracy < 0.6; // Less than 60% accuracy
            })
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
    
    private List<String> identifyStrongConcepts(List<QuizResult> results) {
        Map<String, List<Boolean>> conceptResults = new HashMap<>();
        
        for (QuizResult result : results) {
            for (QuizResult.QuestionResult qr : result.getQuestionResults()) {
                conceptResults.computeIfAbsent(qr.getConcept(), k -> new ArrayList<>())
                    .add(qr.isCorrect());
            }
        }
        
        return conceptResults.entrySet().stream()
            .filter(entry -> {
                List<Boolean> correctness = entry.getValue();
                double accuracy = correctness.stream()
                    .mapToDouble(correct -> correct ? 1.0 : 0.0)
                    .average()
                    .orElse(0.0);
                return accuracy >= 0.8; // 80% or higher accuracy
            })
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
    
    private String calculateDifficultyTrend(List<QuizResult> results) {
        if (results.size() < 2) return "stable";
        
        results.sort(Comparator.comparing(QuizResult::getCompletedAt));
        
        // Compare recent performance with earlier performance
        int halfPoint = results.size() / 2;
        double earlierAvg = results.subList(0, halfPoint).stream()
            .mapToInt(QuizResult::getScorePercentage)
            .average()
            .orElse(0.0);
        
        double recentAvg = results.subList(halfPoint, results.size()).stream()
            .mapToInt(QuizResult::getScorePercentage)
            .average()
            .orElse(0.0);
        
        double improvement = recentAvg - earlierAvg;
        
        if (improvement > 10) return "improving";
        if (improvement < -10) return "declining";
        return "stable";
    }
    
    private List<String> identifyWeakTopics(Map<String, LearningAnalytics.TopicPerformance> performances) {
        return performances.entrySet().stream()
            .filter(entry -> entry.getValue().getMasteryLevel() < 0.6)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
    
    private List<String> identifyStrongTopics(Map<String, LearningAnalytics.TopicPerformance> performances) {
        return performances.entrySet().stream()
            .filter(entry -> entry.getValue().getMasteryLevel() >= 0.8)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
    
    private Map<String, Integer> calculateRecommendedQuizzes(Map<String, LearningAnalytics.TopicPerformance> performances) {
        Map<String, Integer> recommendations = new HashMap<>();
        
        for (Map.Entry<String, LearningAnalytics.TopicPerformance> entry : performances.entrySet()) {
            String topic = entry.getKey();
            LearningAnalytics.TopicPerformance performance = entry.getValue();
            
            int recommendedCount = 0;
            
            if (performance.getMasteryLevel() < 0.4) {
                recommendedCount = 5; // Very weak - need many quizzes
            } else if (performance.getMasteryLevel() < 0.6) {
                recommendedCount = 3; // Weak - need several quizzes
            } else if (performance.getMasteryLevel() < 0.8) {
                recommendedCount = 2; // Moderate - need some practice
            } else {
                recommendedCount = 1; // Strong - just maintenance
            }
            
            recommendations.put(topic, recommendedCount);
        }
        
        return recommendations;
    }
    
    private double calculateOverallMastery(Map<String, LearningAnalytics.TopicPerformance> performances) {
        if (performances.isEmpty()) return 0.0;
        
        return performances.values().stream()
            .mapToDouble(LearningAnalytics.TopicPerformance::getMasteryLevel)
            .average()
            .orElse(0.0);
    }
    
    private String determineLearningStyle(List<QuizResult> results) {
        // Simple heuristic based on performance patterns
        // In a real system, this would be more sophisticated
        
        if (results.isEmpty()) return "visual";
        
        double avgTimeSpent = results.stream()
            .mapToInt(QuizResult::getTimeSpentMinutes)
            .average()
            .orElse(0.0);
        
        double avgScore = results.stream()
            .mapToInt(QuizResult::getScorePercentage)
            .average()
            .orElse(0.0);
        
        // Quick learners might be visual
        if (avgTimeSpent < 10 && avgScore > 80) return "visual";
        
        // Thorough learners might be reading-based
        if (avgTimeSpent > 20 && avgScore > 75) return "reading";
        
        // Default to kinesthetic for hands-on learning
        return "kinesthetic";
    }
    
    public Quiz generatePersonalizedQuiz(String userId, String courseId, String topic) {
        LearningAnalytics analytics = learningAnalyticsRepository.findByUserIdAndCourseId(userId, courseId)
            .orElse(null);
        
        String difficulty = "medium";
        List<String> weakConcepts = new ArrayList<>();
        int questionCount = 10;
        
        if (analytics != null && analytics.getTopicPerformances().containsKey(topic)) {
            LearningAnalytics.TopicPerformance performance = analytics.getTopicPerformances().get(topic);
            
            // Adjust difficulty based on mastery level
            if (performance.getMasteryLevel() < 0.4) {
                difficulty = "easy";
                questionCount = 3;
            } else if (performance.getMasteryLevel() > 0.8) {
                difficulty = "hard";
                questionCount = 7;
            }
            
            // Focus on weak concepts
            weakConcepts = performance.getWeakConcepts();
        }
        
        return aiQuizService.generateAdaptiveQuiz(topic, difficulty, weakConcepts, questionCount);
    }
    
    public Map<String, Object> getPersonalizedRecommendations(String userId, String courseId) {
        LearningAnalytics analytics = learningAnalyticsRepository.findByUserIdAndCourseId(userId, courseId)
            .orElse(null);
        
        Map<String, Object> recommendations = new HashMap<>();
        
        if (analytics == null) {
            recommendations.put("message", "Take some quizzes to get personalized recommendations!");
            recommendations.put("suggestedTopics", Arrays.asList("Linear Search", "Binary Search", "Sorting Algorithms"));
            return recommendations;
        }
        
        recommendations.put("weakTopics", analytics.getWeakTopics());
        recommendations.put("strongTopics", analytics.getStrongTopics());
        recommendations.put("recommendedQuizzes", analytics.getRecommendedQuizCount());
        recommendations.put("overallMastery", Math.round(analytics.getOverallMastery() * 100));
        recommendations.put("learningStyle", analytics.getLearningStyle());
        
        // Generate specific recommendations
        List<String> actionItems = new ArrayList<>();
        
        for (String weakTopic : analytics.getWeakTopics()) {
            int quizCount = analytics.getRecommendedQuizCount().getOrDefault(weakTopic, 1);
            actionItems.add("Practice " + quizCount + " more quizzes on " + weakTopic);
        }
        
        if (actionItems.isEmpty()) {
            actionItems.add("Great job! Continue practicing to maintain your skills.");
        }
        
        recommendations.put("actionItems", actionItems);
        
        return recommendations;
    }
}