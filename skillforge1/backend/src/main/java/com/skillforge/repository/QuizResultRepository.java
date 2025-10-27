package com.skillforge.repository;

import com.skillforge.entity.QuizResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuizResultRepository extends MongoRepository<QuizResult, String> {
    
    List<QuizResult> findByUserId(String userId);
    
    List<QuizResult> findByUserIdAndCourseId(String userId, String courseId);
    
    List<QuizResult> findByUserIdAndTopicName(String userId, String topicName);
    
    List<QuizResult> findByUserIdAndCourseIdAndTopicName(String userId, String courseId, String topicName);
    
    List<QuizResult> findByUserIdOrderByCompletedAtDesc(String userId);
    
    List<QuizResult> findByUserIdAndCompletedAtBetween(String userId, LocalDateTime start, LocalDateTime end);
    
    List<QuizResult> findByTopicNameAndScorePercentageLessThan(String topicName, int scoreThreshold);
    
    long countByUserIdAndCourseId(String userId, String courseId);
    
    List<QuizResult> findTop5ByUserIdOrderByCompletedAtDesc(String userId);
}