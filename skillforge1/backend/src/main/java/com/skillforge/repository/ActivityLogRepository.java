package com.skillforge.repository;

import com.skillforge.entity.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {
    List<ActivityLog> findTop20ByUserIdOrderByCreatedAtDesc(String userId);
    List<ActivityLog> findTop10ByUserIdOrderByCreatedAtDesc(String userId);
}
