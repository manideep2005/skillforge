package com.skillforge.repository;

import com.skillforge.entity.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends MongoRepository<Achievement, String> {
    List<Achievement> findByUserIdOrderByEarnedAtDesc(String userId);
    List<Achievement> findByUserId(String userId);
}
