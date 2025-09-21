import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

declare var gsap: any;

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">
          <i class="fas fa-rocket me-2"></i>SkillForge
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="#hero">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
            <li class="nav-item"><a class="nav-link" href="#courses">Courses</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title mb-4">
                Transform Your
                <span class="text-gradient">Learning Journey</span>
                with AI
              </h1>
              <p class="hero-subtitle mb-5">
                Experience personalized, adaptive education powered by artificial intelligence.
              </p>
              <div class="hero-stats row g-4 mb-5">
                <div class="col-4 text-center">
                  <div class="stat-number">50K+</div>
                  <div class="stat-label">Students</div>
                </div>
                <div class="col-4 text-center">
                  <div class="stat-number">1K+</div>
                  <div class="stat-label">Courses</div>
                </div>
                <div class="col-4 text-center">
                  <div class="stat-number">98%</div>
                  <div class="stat-label">Success Rate</div>
                </div>
              </div>
              <div class="hero-buttons">
                <button class="btn btn-primary btn-lg me-3" (click)="scrollToRoles()">
                  <i class="fas fa-play me-2"></i>Get Started
                </button>
                <button class="btn btn-outline-light btn-lg">
                  <i class="fas fa-video me-2"></i>Watch Demo
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-visual">
              <div class="hero-image-container">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center" alt="Students learning" class="hero-main-image">
                <div class="floating-elements">
                  <div class="floating-card card-1">
                    <i class="fas fa-brain"></i>
                    <span>AI Learning</span>
                  </div>
                  <div class="floating-card card-2">
                    <i class="fas fa-chart-line"></i>
                    <span>Progress Tracking</span>
                  </div>
                  <div class="floating-card card-3">
                    <i class="fas fa-users"></i>
                    <span>Collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="section-title">Why Choose SkillForge?</h2>
            <p class="section-subtitle">Discover the power of AI-driven personalized learning</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="feature-card text-center h-100">
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop" alt="AI Learning" class="card-image">
              </div>
              <div class="feature-icon">
                <i class="fas fa-brain"></i>
              </div>
              <h4>AI-Powered Learning</h4>
              <p>Adaptive algorithms that personalize your learning experience based on your pace and style.</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="feature-card text-center h-100">
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop" alt="Analytics" class="card-image">
              </div>
              <div class="feature-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h4>Real-time Analytics</h4>
              <p>Track your progress with detailed analytics and insights to optimize your learning journey.</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="feature-card text-center h-100">
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop" alt="Collaboration" class="card-image">
              </div>
              <div class="feature-icon">
                <i class="fas fa-users"></i>
              </div>
              <h4>Collaborative Learning</h4>
              <p>Connect with peers and learn together in our vibrant learning community.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Role Selection Section -->
    <section id="courses" class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="section-title">Choose Your Learning Path</h2>
            <p class="section-subtitle">Select your role to access personalized features</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="role-card h-100" (click)="selectRole('student')">
              <div class="role-card-header">
                <div class="role-icon">
                  <i class="fas fa-user-graduate"></i>
                </div>
                <h3>Student Portal</h3>
                <p class="role-subtitle">Embark on your personalized learning journey</p>
              </div>
              <div class="role-card-body">
                <ul class="feature-list">
                  <li><i class="fas fa-check text-primary me-2"></i>AI-Powered Learning Paths</li>
                  <li><i class="fas fa-check text-primary me-2"></i>Adaptive Assessments</li>
                  <li><i class="fas fa-check text-primary me-2"></i>Progress Analytics</li>
                  <li><i class="fas fa-check text-primary me-2"></i>Achievement Tracking</li>
                </ul>
              </div>
              <div class="role-card-footer">
                <div class="price-tag">Free to Start</div>
                <button class="btn btn-primary w-100">
                  <i class="fas fa-arrow-right me-2"></i>Get Started
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4">
            <div class="role-card h-100 featured" (click)="selectRole('instructor')">
              <div class="featured-badge">Most Popular</div>
              <div class="role-card-header">
                <div class="role-icon">
                  <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <h3>Instructor Hub</h3>
                <p class="role-subtitle">Create and manage engaging courses</p>
              </div>
              <div class="role-card-body">
                <ul class="feature-list">
                  <li><i class="fas fa-check text-primary me-2"></i>AI Quiz Generation</li>
                  <li><i class="fas fa-check text-primary me-2"></i>Course Builder</li>
                  <li><i class="fas fa-check text-primary me-2"></i>Student Management</li>
                  <li><i class="fas fa-check text-primary me-2"></i>Performance Analytics</li>
                </ul>
              </div>
              <div class="role-card-footer">
                <div class="price-tag">Pro Features</div>
                <button class="btn btn-primary w-100">
                  <i class="fas fa-arrow-right me-2"></i>Start Teaching
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4">
            <div class="role-card h-100" (click)="selectRole('admin')">
              <div class="role-card-header">
                <div class="role-icon">
                  <i class="fas fa-cogs"></i>
                </div>
                <h3>Admin Console</h3>
                <p class="role-subtitle">Manage platform and users</p>
              </div>
              <div class="role-card-body">
                <ul class="feature-list">
                  <li><i class="fas fa-check text-primary me-2"></i>User Management</li>
                  <li><i class="fas fa-check text-primary me-2"></i>System Analytics</li>
                  <li><i class="fas fa-check text-primary me-2"></i>Platform Configuration</li>
                  <li><i class="fas fa-check text-primary me-2"></i>Security Controls</li>
                </ul>
              </div>
              <div class="role-card-footer">
                <div class="price-tag">Enterprise</div>
                <button class="btn btn-primary w-100">
                  <i class="fas fa-arrow-right me-2"></i>Manage Platform
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-5 bg-gradient">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h2 class="section-title text-white">What Our Students Say</h2>
            <p class="section-subtitle text-white-50">Join thousands of successful learners</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-4" *ngFor="let testimonial of testimonials">
            <div class="testimonial-card">
              <div class="testimonial-content">
                <div class="stars mb-3">
                  <i class="fas fa-star" *ngFor="let star of [1,2,3,4,5]"></i>
                </div>
                <p class="testimonial-text">"{{testimonial.text}}"</p>
              </div>
              <div class="testimonial-author">
                <img [src]="testimonial.avatar" [alt]="testimonial.name" class="author-avatar">
                <div class="author-info">
                  <h6 class="author-name">{{testimonial.name}}</h6>
                  <p class="author-role">{{testimonial.role}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-5 bg-white">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-lg-3 col-md-6">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3 class="stat-counter" data-target="50000">0</h3>
              <p class="stat-description">Active Students</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-book"></i>
              </div>
              <h3 class="stat-counter" data-target="1200">0</h3>
              <p class="stat-description">Courses Available</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-certificate"></i>
              </div>
              <h3 class="stat-counter" data-target="25000">0</h3>
              <p class="stat-description">Certificates Issued</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-globe"></i>
              </div>
              <h3 class="stat-counter" data-target="150">0</h3>
              <p class="stat-description">Countries Reached</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 cta-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h2 class="cta-title">Ready to Transform Your Learning?</h2>
            <p class="cta-subtitle">Join millions of learners and start your AI-powered education journey today.</p>
            <button class="btn btn-light btn-lg px-5 mt-3" (click)="scrollToRoles()">
              <i class="fas fa-rocket me-2"></i>Start Learning Now
            </button>
          </div>
          <div class="col-lg-6">
            <div class="cta-image">
              <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop" alt="Learning Journey" class="img-fluid rounded-3">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer bg-dark text-white py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <h5 class="mb-3">
              <i class="fas fa-rocket me-2"></i>SkillForge
            </h5>
            <p class="mb-4">Empowering learners worldwide with AI-driven education technology.</p>
            <div class="social-links">
              <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
              <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
          <div class="col-lg-2">
            <h6 class="mb-3">Platform</h6>
            <ul class="list-unstyled footer-links">
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Mobile App</a></li>
            </ul>
          </div>
          <div class="col-lg-2">
            <h6 class="mb-3">Support</h6>
            <ul class="list-unstyled footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div class="col-lg-2">
            <h6 class="mb-3">Company</h6>
            <ul class="list-unstyled footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div class="col-lg-2">
            <h6 class="mb-3">Legal</h6>
            <ul class="list-unstyled footer-links">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <hr class="my-4">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="mb-0">&copy; 2024 SkillForge. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0">Made with <i class="fas fa-heart text-danger"></i> for learners worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      font-family: 'Inter', sans-serif;
    }
    
    .navbar {
      background: rgba(13, 110, 253, 0.95) !important;
      backdrop-filter: blur(10px);
    }
    
    .hero-section {
      background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
      color: white;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
    }
    
    .text-gradient {
      background: linear-gradient(45deg, #ffd700, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: #ffd700;
    }
    
    .stat-label {
      opacity: 0.8;
    }
    
    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
    }
    
    .hero-image {
      position: relative;
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
    }
    
    .hero-icon {
      font-size: 4rem;
      color: white;
    }
    
    .pulse-circle {
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.1); opacity: 0; }
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2d3748;
    }
    
    .section-subtitle {
      font-size: 1.1rem;
      color: #718096;
    }
    
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 1px solid #e2e8f0;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    }
    
    .feature-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
      border-radius: 12px;
      margin-bottom: 1.5rem;
    }
    
    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .feature-card:hover .card-image {
      transform: scale(1.05);
    }
    
    .feature-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #0ea5e9, #1e40af);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      color: white;
      font-size: 1.5rem;
      position: relative;
      top: -30px;
      box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
    }
    
    .role-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      border: 2px solid transparent;
      position: relative;
    }
    
    .role-card:hover {
      border-color: #0ea5e9;
      box-shadow: 0 15px 50px rgba(14, 165, 233, 0.2);
      transform: translateY(-5px);
    }
    
    .role-card.featured {
      border-color: #0ea5e9;
      transform: scale(1.02);
    }
    
    .featured-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      z-index: 1;
    }
    
    .role-card-header {
      padding: 2rem 2rem 1rem;
      text-align: center;
    }
    
    .role-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #0ea5e9, #1e40af);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      color: white;
      font-size: 2rem;
    }
    
    .role-card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }
    
    .role-subtitle {
      color: #718096;
      font-size: 0.95rem;
    }
    
    .role-card-body {
      padding: 0 2rem;
    }
    
    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .feature-list li {
      padding: 0.5rem 0;
      color: #4a5568;
      font-size: 0.9rem;
    }
    
    .role-card-footer {
      padding: 1.5rem 2rem 2rem;
    }
    
    .price-tag {
      background: #f7fafc;
      color: #667eea;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 1rem;
    }
    
    /* Testimonials */
    .bg-gradient {
      background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
    }
    
    .testimonial-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      height: 100%;
    }
    
    .testimonial-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }
    
    .stars {
      color: #ffd700;
    }
    
    .testimonial-text {
      font-style: italic;
      color: #4a5568;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .author-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .author-name {
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }
    
    .author-role {
      color: #718096;
      font-size: 0.9rem;
      margin: 0;
    }
    
    /* Stats Section */
    .stat-item {
      padding: 2rem 1rem;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .stat-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .stat-item:hover {
      transform: translateY(-5px);
    }
    
    .stat-item:hover::before {
      opacity: 1;
    }
    
    .stat-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #0ea5e9, #1e40af);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      color: white;
      font-size: 2rem;
      box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
    }
    
    .stat-counter {
      font-size: 3rem;
      font-weight: 800;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }
    
    .stat-description {
      color: #718096;
      font-weight: 500;
    }
    
    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .cta-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="%23ffffff" opacity="0.1"/></svg>') repeat;
      background-size: 50px 50px;
    }
    
    .cta-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
    }
    
    .cta-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      position: relative;
      z-index: 1;
    }
    
    .cta-image {
      position: relative;
      z-index: 1;
    }
    
    .cta-image img {
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
    }
    
    .cta-image:hover img {
      transform: scale(1.05);
    }
    
    /* Enhanced Footer */
    .social-links {
      display: flex;
      gap: 1rem;
    }
    
    .social-link {
      width: 45px;
      height: 45px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    
    .social-link:hover {
      background: #0ea5e9;
      color: white;
      transform: translateY(-3px);
    }
    
    .footer-links li {
      margin-bottom: 0.5rem;
    }
    
    .footer-links a {
      color: #a0aec0;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-links a:hover {
      color: white;
    }
    
    /* Floating Elements */
    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
    }
    
    .floating-shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }
    
    .shape-1 {
      width: 100px;
      height: 100px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    .shape-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }
    
    .shape-3 {
      width: 80px;
      height: 80px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(180deg);
      }
    }
    
    /* Enhanced Animations */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease;
    }
    
    .animate-on-scroll.animated {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Particle Background */
    .particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
    }
    
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      animation: particle-float 8s linear infinite;
    }
    
    @keyframes particle-float {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .role-card.featured {
        transform: none;
      }
      
      .cta-title {
        font-size: 2rem;
      }
      
      .stat-counter {
        font-size: 2rem;
      }
    }
  `]
})
export class WelcomeComponent implements AfterViewInit {
  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      text: 'SkillForge transformed my career! The AI-powered learning paths helped me master React in just 3 months.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist',
      text: 'The adaptive quizzes and real-time feedback made learning Python and ML concepts incredibly engaging.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      text: 'Amazing platform! The community features and peer collaboration took my design skills to the next level.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    if (typeof gsap !== 'undefined') {
      // Hero animations
      const tl = gsap.timeline();
      tl.from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
        .from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
        .from('.hero-stats > div', { duration: 0.8, y: 20, opacity: 0, stagger: 0.2, ease: 'power3.out' }, '-=0.3');

      // Role cards hover animation
      document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { duration: 0.3, y: -10, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { duration: 0.3, y: 0, ease: 'power2.out' });
        });
      });
    }
  }

  scrollToRoles() {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  }

  selectRole(role: string) {
    localStorage.setItem('selectedRole', role);
    this.router.navigate(['/auth/login'], { queryParams: { role } });
  }
}