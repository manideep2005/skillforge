package com.skillforge.repository;

import com.skillforge.entity.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {
    
    List<Quiz> findByCourseId(String courseId);
    
    List<Quiz> findByModuleId(String moduleId);
    
    List<Quiz> findByDifficulty(String difficulty);
    
    List<Quiz> findByPublishedTrue();
    
    List<Quiz> findByCourseIdAndPublishedTrue(String courseId);
}