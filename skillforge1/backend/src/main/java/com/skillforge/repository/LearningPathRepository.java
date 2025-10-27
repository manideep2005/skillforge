package com.skillforge.repository;

import com.skillforge.entity.LearningPath;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LearningPathRepository extends MongoRepository<LearningPath, String> {
    List<LearningPath> findByIsActiveTrue();
    List<LearningPath> findByCategory(String category);
    List<LearningPath> findByLevel(String level);
}