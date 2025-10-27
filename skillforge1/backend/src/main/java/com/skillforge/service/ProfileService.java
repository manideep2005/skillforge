package com.skillforge.service;

import com.skillforge.entity.Profile;
import com.skillforge.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import java.util.Arrays;

@Service
public class ProfileService {
    
    @Autowired
    private ProfileRepository profileRepository;
    
    public Profile getUserProfile(String userId) {
        return profileRepository.findByUserId(userId)
            .orElseGet(() -> createDefaultProfile(userId));
    }
    
    public Profile updateProfile(String userId, Profile profileData) {
        Profile profile = profileRepository.findByUserId(userId)
            .orElse(new Profile());
        
        profile.setUserId(userId);
        profile.setBio(profileData.getBio());
        profile.setTitle(profileData.getTitle());
        profile.setSkills(profileData.getSkills());
        profile.setInterests(profileData.getInterests());
        profile.setLocation(profileData.getLocation());
        profile.setWebsite(profileData.getWebsite());
        profile.setLinkedin(profileData.getLinkedin());
        profile.setGithub(profileData.getGithub());
        profile.setUpdatedAt(LocalDateTime.now());
        
        return profileRepository.save(profile);
    }
    
    public Profile updateAvatar(String userId, String avatarUrl) {
        Profile profile = getUserProfile(userId);
        profile.setAvatar(avatarUrl);
        profile.setUpdatedAt(LocalDateTime.now());
        return profileRepository.save(profile);
    }
    
    private Profile createDefaultProfile(String userId) {
        Profile profile = new Profile();
        profile.setUserId(userId);
        profile.setBio("Welcome to SkillForge! Start your learning journey today.");
        profile.setTitle("Learner");
        profile.setAvatar("https://i.pravatar.cc/150?u=" + userId);
        return profileRepository.save(profile);
    }
    
    public Profile createDefaultProfile(String userId, String name, String email) {
        Profile profile = new Profile();
        profile.setUserId(userId);
        profile.setBio("Welcome to SkillForge! I'm excited to start my learning journey.");
        profile.setTitle("New Learner");
        profile.setAvatar("https://i.pravatar.cc/150?u=" + email);
        
        // Add some default skills based on common interests
        List<Profile.Skill> defaultSkills = Arrays.asList(
            new Profile.Skill("Communication", 70, "Soft Skills"),
            new Profile.Skill("Problem Solving", 60, "Soft Skills")
        );
        profile.setSkills(defaultSkills);
        
        // Set default interests
        profile.setInterests(Arrays.asList("Learning", "Technology", "Personal Growth"));
        
        return profileRepository.save(profile);
    }
}