package com.skillforge.controller;

import com.skillforge.service.DashboardService;
import com.skillforge.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;
    
    @Autowired
    private JwtService jwtService;

    @GetMapping
    public ResponseEntity<?> getDashboardData(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            String userId = jwtService.extractUserId(jwt);
            String userRole = jwtService.extractRole(jwt);
            
            Map<String, Object> dashboardData;
            
            if ("INSTRUCTOR".equals(userRole)) {
                dashboardData = dashboardService.getInstructorDashboardData(userId);
            } else {
                dashboardData = dashboardService.getUserDashboardData(userId);
            }
            
            return ResponseEntity.ok(dashboardData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}