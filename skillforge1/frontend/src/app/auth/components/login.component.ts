import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <!-- Background Elements -->
      <div class="auth-bg">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="particles">
          <div class="particle" *ngFor="let p of particles" [style.left.%]="p.x" [style.animation-delay.s]="p.delay"></div>
        </div>
      </div>
      
      <div class="container-fluid h-100">
        <div class="row h-100">
          <!-- Left Side - Branding -->
          <div class="col-lg-6 d-none d-lg-flex auth-branding">
            <div class="branding-content">
              <div class="brand-logo">
                <i class="fas fa-rocket"></i>
                <h1>SkillForge</h1>
              </div>
              <h2 class="brand-title">Welcome to the Future of Learning</h2>
              <p class="brand-subtitle">Join millions of learners worldwide and transform your career with AI-powered education.</p>
              
              <div class="features-list">
                <div class="feature-item">
                  <i class="fas fa-brain"></i>
                  <span>AI-Powered Personalization</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-chart-line"></i>
                  <span>Real-time Progress Tracking</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-users"></i>
                  <span>Global Learning Community</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-certificate"></i>
                  <span>Industry-Recognized Certificates</span>
                </div>
              </div>
              
              <div class="testimonial-mini">
                <div class="testimonial-content">
                  <div class="stars">
                    <i class="fas fa-star" *ngFor="let star of [1,2,3,4,5]"></i>
                  </div>
                  <p>"SkillForge completely transformed my career path. The AI recommendations were spot-on!"</p>
                  <div class="author">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" alt="Sarah">
                    <span>Sarah J., Software Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Side - Auth Form -->
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <div class="auth-card">
              <div class="auth-header">
                <div class="auth-logo d-lg-none">
                  <i class="fas fa-rocket"></i>
                  <span>SkillForge</span>
                </div>
                <h2 class="auth-title">{{isLogin ? 'Welcome Back!' : 'Create Account'}}</h2>
                <p class="auth-subtitle">{{isLogin ? 'Sign in to continue your learning journey' : 'Start your AI-powered learning adventure'}}</p>
                
                <div *ngIf="selectedRole" class="role-badge">
                  <i class="fas" [class.fa-user-graduate]="selectedRole === 'student'" 
                      [class.fa-chalkboard-teacher]="selectedRole === 'instructor'"
                      [class.fa-cogs]="selectedRole === 'admin'"></i>
                  <span>{{selectedRole | titlecase}} {{isLogin ? 'Login' : 'Registration'}}</span>
                </div>
              </div>
              
              <form [formGroup]="authForm" (ngSubmit)="onSubmit()" class="auth-form">
                <div class="form-group" *ngIf="!isLogin">
                  <label class="form-label">Full Name</label>
                  <div class="input-group">
                    <span class="input-icon">
                      <i class="fas fa-user"></i>
                    </span>
                    <input type="text" formControlName="name" placeholder="Enter your full name" class="form-control">
                  </div>
                  <div class="form-error" *ngIf="authForm.get('name')?.invalid && authForm.get('name')?.touched">
                    <i class="fas fa-exclamation-circle"></i>
                    Name is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <div class="input-group">
                    <span class="input-icon">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <input type="email" formControlName="email" placeholder="Enter your email" class="form-control">
                  </div>
                  <div class="form-error" *ngIf="authForm.get('email')?.invalid && authForm.get('email')?.touched">
                    <i class="fas fa-exclamation-circle"></i>
                    Valid email is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Password</label>
                  <div class="input-group">
                    <span class="input-icon">
                      <i class="fas fa-lock"></i>
                    </span>
                    <input [type]="showPassword ? 'text' : 'password'" formControlName="password" placeholder="Enter your password" class="form-control">
                    <span class="password-toggle" (click)="togglePassword()">
                      <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
                    </span>
                  </div>
                  <div class="form-error" *ngIf="authForm.get('password')?.invalid && authForm.get('password')?.touched">
                    <i class="fas fa-exclamation-circle"></i>
                    Password is required
                  </div>
                </div>
                
                <div class="form-options" *ngIf="isLogin">
                  <label class="checkbox-container">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#" class="forgot-password">Forgot Password?</a>
                </div>
                
                <button type="submit" [disabled]="authForm.invalid" class="btn-primary">
                  <span *ngIf="!isLoading">{{isLogin ? 'Sign In' : 'Create Account'}}</span>
                  <span *ngIf="isLoading">
                    <i class="fas fa-spinner fa-spin me-2"></i>Processing...
                  </span>
                </button>
                
                <div class="divider">
                  <span>or</span>
                </div>
                
                <div class="social-login">
                  <button type="button" class="btn-social btn-google">
                    <i class="fab fa-google"></i>
                    Continue with Google
                  </button>
                  <button type="button" class="btn-social btn-github">
                    <i class="fab fa-github"></i>
                    Continue with GitHub
                  </button>
                </div>
              </form>
              
              <div class="auth-footer">
                <p class="switch-mode">
                  <span *ngIf="isLogin">Don't have an account? </span>
                  <span *ngIf="!isLogin">Already have an account? </span>
                  <a href="#" (click)="toggleMode(); $event.preventDefault()" class="switch-link">
                    {{isLogin ? 'Sign Up' : 'Sign In'}}
                  </a>
                </p>
                <p class="back-link">
                  <a href="#" (click)="goBack(); $event.preventDefault()">
                    <i class="fas fa-arrow-left me-2"></i>Back to Role Selection
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      position: relative;
      min-height: 100vh;
      overflow: hidden;
    }
    
    .auth-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: -1;
    }
    
    .floating-shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      animation: float 6s ease-in-out infinite;
    }
    
    .shape-1 {
      width: 80px;
      height: 80px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    .shape-2 {
      width: 120px;
      height: 120px;
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }
    
    .shape-3 {
      width: 60px;
      height: 60px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .particles {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(255,255,255,0.6);
      border-radius: 50%;
      animation: particleFloat 8s linear infinite;
    }
    
    @keyframes particleFloat {
      0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
      }
    }
    
    .auth-branding {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .branding-content {
      max-width: 500px;
    }
    
    .brand-logo {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
    }
    
    .brand-logo i {
      font-size: 48px;
      margin-right: 16px;
      color: #fff;
    }
    
    .brand-logo h1 {
      font-size: 36px;
      font-weight: 700;
      margin: 0;
    }
    
    .brand-title {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 16px;
      line-height: 1.2;
    }
    
    .brand-subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 40px;
      line-height: 1.6;
    }
    
    .features-list {
      margin-bottom: 40px;
    }
    
    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      font-size: 16px;
    }
    
    .feature-item i {
      width: 24px;
      margin-right: 16px;
      color: #fff;
    }
    
    .testimonial-mini {
      background: rgba(255,255,255,0.1);
      padding: 24px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }
    
    .stars {
      margin-bottom: 12px;
    }
    
    .stars i {
      color: #ffd700;
      margin-right: 4px;
    }
    
    .testimonial-content p {
      font-style: italic;
      margin-bottom: 16px;
      line-height: 1.5;
    }
    
    .author {
      display: flex;
      align-items: center;
    }
    
    .author img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
    }
    
    .auth-card {
      background: white;
      padding: 48px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 480px;
      margin: 40px;
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .auth-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }
    
    .auth-logo i {
      font-size: 32px;
      color: #667eea;
      margin-right: 12px;
    }
    
    .auth-logo span {
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }
    
    .auth-title {
      font-size: 28px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }
    
    .auth-subtitle {
      color: #666;
      font-size: 16px;
      margin-bottom: 24px;
    }
    
    .role-badge {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
    }
    
    .role-badge i {
      margin-right: 8px;
    }
    
    .form-group {
      margin-bottom: 24px;
    }
    
    .form-label {
      display: block;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .input-icon {
      position: absolute;
      left: 16px;
      color: #999;
      z-index: 2;
    }
    
    .form-control {
      width: 100%;
      padding: 16px 16px 16px 48px;
      border: 2px solid #e1e5e9;
      border-radius: 12px;
      font-size: 16px;
      transition: all 0.3s ease;
      background: #f8f9fa;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #0ea5e9;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .password-toggle {
      position: absolute;
      right: 16px;
      color: #999;
      cursor: pointer;
      z-index: 2;
      transition: color 0.3s ease;
    }
    
    .password-toggle:hover {
      color: #667eea;
    }
    
    .form-error {
      display: flex;
      align-items: center;
      color: #dc3545;
      font-size: 14px;
      margin-top: 8px;
    }
    
    .form-error i {
      margin-right: 8px;
    }
    
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    
    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      color: #666;
    }
    
    .checkbox-container input {
      margin-right: 8px;
    }
    
    .forgot-password {
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }
    
    .forgot-password:hover {
      text-decoration: underline;
    }
    
    .btn-primary {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 24px;
    }
    
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    
    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
    
    .divider {
      text-align: center;
      margin: 24px 0;
      position: relative;
    }
    
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e1e5e9;
    }
    
    .divider span {
      background: white;
      padding: 0 16px;
      color: #999;
      font-size: 14px;
    }
    
    .social-login {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .btn-social {
      flex: 1;
      padding: 12px;
      border: 2px solid #e1e5e9;
      border-radius: 12px;
      background: white;
      color: #333;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .btn-social i {
      margin-right: 8px;
    }
    
    .btn-google:hover {
      border-color: #db4437;
      color: #db4437;
    }
    
    .btn-github:hover {
      border-color: #333;
      color: #333;
    }
    
    .auth-footer {
      text-align: center;
    }
    
    .switch-mode {
      margin-bottom: 16px;
      color: #666;
      font-size: 14px;
    }
    
    .switch-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }
    
    .switch-link:hover {
      text-decoration: underline;
    }
    
    .back-link a {
      color: #999;
      text-decoration: none;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
    }
    
    .back-link a:hover {
      color: #667eea;
    }
    
    @media (max-width: 768px) {
      .auth-card {
        margin: 20px;
        padding: 32px 24px;
      }
      
      .brand-title {
        font-size: 24px;
      }
      
      .auth-title {
        font-size: 24px;
      }
      
      .social-login {
        flex-direction: column;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  selectedRole: string = '';
  isLogin: boolean = true;
  showPassword: boolean = false;
  isLoading: boolean = false;
  particles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'] || localStorage.getItem('selectedRole') || '';
      this.isLogin = params['mode'] !== 'register';
      
      // If coming from onboarding, set to register mode
      if (params['onboarded'] === 'true') {
        this.isLogin = false;
        this.authForm.get('name')?.setValidators([Validators.required]);
        this.authForm.get('name')?.updateValueAndValidity();
        
        // Pre-fill name from onboarding data
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        if (onboardingData.name) {
          this.authForm.patchValue({ name: onboardingData.name });
        }
      }
    });
    this.generateParticles();
  }
  
  generateParticles() {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        delay: Math.random() * 8
      });
    }
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      this.authForm.get('name')?.setValidators([Validators.required]);
      // For student registration, redirect to onboarding first
      if (this.selectedRole === 'student') {
        this.router.navigate(['/onboarding'], { 
          queryParams: { 
            role: this.selectedRole,
            mode: 'register'
          }
        });
        return;
      }
    } else {
      this.authForm.get('name')?.clearValidators();
    }
    this.authForm.get('name')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.valid) {
      const formData = this.authForm.value;
      
      // Real authentication validation
      const validCredentials: {[key: string]: string} = {
        'student@test.com': 'password123',
        'instructor@test.com': 'password123', 
        'admin@test.com': 'password123',
        'manideep.gonugunta1802@gmail.com': '123456789'
      };
      
      // Use real backend authentication
      if (this.isLogin) {
        this.authService.login(formData).subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.role);
            localStorage.setItem('userEmail', response.email);
            localStorage.setItem('userName', response.name);
            this.redirectBasedOnRole(response.role);
          },
          error: (error) => {
            alert('Invalid credentials! Please check your email and password.');
          }
        });
      } else {
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        const registerData = {
          ...formData,
          role: this.selectedRole.toUpperCase(),
          ...onboardingData // Include onboarding data in registration
        };
        this.authService.register(registerData).subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.role);
            localStorage.setItem('userEmail', response.email);
            localStorage.setItem('userName', response.name);
            // Clear onboarding data after successful registration
            localStorage.removeItem('onboardingData');
            this.redirectBasedOnRole(response.role);
          },
          error: (error) => {
            alert('Registration failed! Email might already exist.');
          }
        });
      }

    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  redirectBasedOnRole(role: string) {
    console.log('Redirecting to role:', role);
    const route = role === 'STUDENT' ? '/dashboard/student' : 
                  role === 'INSTRUCTOR' ? '/dashboard/instructor' : 
                  role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/student';
    
    console.log('Navigating to:', route);
    this.router.navigateByUrl(route);
  }
}