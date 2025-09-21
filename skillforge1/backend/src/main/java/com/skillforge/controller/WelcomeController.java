package com.skillforge.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class WelcomeController {
    
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to SkillForge - AI-Powered Learning Platform";
    }
}