package com.skillforge.repository;

import com.skillforge.entity.LearningAnalytics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LearningAnalyticsRepository extends MongoRepository<LearningAnalytics, String> {
    
    Optional<LearningAnalytics> findByUserIdAndCourseId(String userId, String courseId);
    
    List<LearningAnalytics> findByUserId(String userId);
    
    List<LearningAnalytics> findByCourseId(String courseId);
    
    List<LearningAnalytics> findByOverallMasteryLessThan(double masteryThreshold);
    
    List<LearningAnalytics> findByOverallMasteryGreaterThan(double masteryThreshold);
    
    List<LearningAnalytics> findByLearningStyle(String learningStyle);
}