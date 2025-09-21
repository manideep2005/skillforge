package com.skillforge.repository;

import com.skillforge.entity.UserProgress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends MongoRepository<UserProgress, String> {
    
    List<UserProgress> findByUserId(String userId);
    
    Optional<UserProgress> findByUserIdAndCourseId(String userId, String courseId);
    
    List<UserProgress> findByCourseId(String courseId);
    
    List<UserProgress> findByCompletedTrue();
    
    List<UserProgress> findByUserIdAndCompletedTrue(String userId);
}