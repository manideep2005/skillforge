package com.skillforge.controller;

import com.skillforge.entity.Profile;
import com.skillforge.service.ProfileService;
import com.skillforge.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {
    
    @Autowired
    private ProfileService profileService;
    
    @Autowired
    private JwtService jwtService;
    
    @GetMapping
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            String userId = jwtService.extractUserId(jwt);
            Profile profile = profileService.getUserProfile(userId);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
    
    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Profile profileData) {
        try {
            String jwt = token.substring(7);
            String userId = jwtService.extractUserId(jwt);
            Profile updatedProfile = profileService.updateProfile(userId, profileData);
            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
    
    @PostMapping("/avatar")
    public ResponseEntity<?> updateAvatar(@RequestHeader("Authorization") String token, @RequestBody String avatarUrl) {
        try {
            String jwt = token.substring(7);
            String userId = jwtService.extractUserId(jwt);
            Profile updatedProfile = profileService.updateAvatar(userId, avatarUrl);
            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}