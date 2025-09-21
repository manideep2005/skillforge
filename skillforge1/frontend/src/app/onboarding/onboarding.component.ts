import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="onboarding-container">
      <div class="onboarding-header">
        <div class="logo">
          <i class="fas fa-rocket"></i>
          <span>SkillForge</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="(currentStep / totalSteps) * 100"></div>
        </div>
        <div class="step-indicator">Step {{currentStep}} of {{totalSteps}}</div>
      </div>

      <div class="onboarding-content">
        <!-- Step 1: Basic Info -->
        <div *ngIf="currentStep === 1" class="step-content">
          <div class="step-header">
            <h2>Welcome to SkillForge! 👋</h2>
            <p>Let's personalize your learning experience</p>
          </div>
          
          <form [formGroup]="onboardingForm" class="onboarding-form">
            <div class="form-group">
              <label>What's your name?</label>
              <input type="text" formControlName="name" placeholder="Enter your full name" class="form-control">
            </div>
            
            <div class="form-group">
              <label>How old are you?</label>
              <select formControlName="age" class="form-control">
                <option value="">Select your age</option>
                <option value="under-13">Under 13</option>
                <option value="13-17">13-17 years</option>
                <option value="18-25">18-25 years</option>
                <option value="26-35">26-35 years</option>
                <option value="above-35">Above 35</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>What's your current status?</label>
              <div class="radio-group">
                <label class="radio-option" [class.selected]="onboardingForm.get('status')?.value === 'school'">
                  <input type="radio" formControlName="status" value="school">
                  <div class="radio-content">
                    <i class="fas fa-school"></i>
                    <span>School Student</span>
                  </div>
                </label>
                <label class="radio-option" [class.selected]="onboardingForm.get('status')?.value === 'college'">
                  <input type="radio" formControlName="status" value="college">
                  <div class="radio-content">
                    <i class="fas fa-university"></i>
                    <span>College Student</span>
                  </div>
                </label>
                <label class="radio-option" [class.selected]="onboardingForm.get('status')?.value === 'professional'">
                  <input type="radio" formControlName="status" value="professional">
                  <div class="radio-content">
                    <i class="fas fa-briefcase"></i>
                    <span>Working Professional</span>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        <!-- Step 2: Location & Institution -->
        <div *ngIf="currentStep === 2" class="step-content">
          <div class="step-header">
            <h2>Tell us about your location 📍</h2>
            <p>This helps us provide relevant content</p>
          </div>
          
          <form [formGroup]="onboardingForm" class="onboarding-form">
            <div class="form-group">
              <label>Which state are you from?</label>
              <select formControlName="state" class="form-control" (change)="onStateChange()">
                <option value="">Select your state</option>
                <option *ngFor="let state of states" [value]="state.code">{{state.name}}</option>
              </select>
            </div>
            
            <div class="form-group" *ngIf="getStatus() === 'school'">
              <label>What's your current class?</label>
              <select formControlName="class" class="form-control">
                <option value="">Select your class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>{{getInstitutionLabel()}}</label>
              <input type="text" formControlName="institution" [placeholder]="getInstitutionPlaceholder()" class="form-control">
            </div>
          </form>
        </div>

        <!-- Step 3: Board & Preferences -->
        <div *ngIf="currentStep === 3" class="step-content">
          <div class="step-header">
            <h2>Academic Details 📚</h2>
            <p>Help us customize your curriculum</p>
          </div>
          
          <form [formGroup]="onboardingForm" class="onboarding-form">
            <div class="form-group" *ngIf="getStatus() === 'school'">
              <label>Which board are you following?</label>
              <div class="radio-group">
                <label class="radio-option" [class.selected]="onboardingForm.get('board')?.value === 'cbse'">
                  <input type="radio" formControlName="board" value="cbse">
                  <div class="radio-content">
                    <span>CBSE</span>
                  </div>
                </label>
                <label class="radio-option" [class.selected]="onboardingForm.get('board')?.value === 'icse'">
                  <input type="radio" formControlName="board" value="icse">
                  <div class="radio-content">
                    <span>ICSE</span>
                  </div>
                </label>
                <label class="radio-option" [class.selected]="onboardingForm.get('board')?.value === 'state'">
                  <input type="radio" formControlName="board" value="state">
                  <div class="radio-content">
                    <span>State Board</span>
                  </div>
                </label>
                <label class="radio-option" [class.selected]="onboardingForm.get('board')?.value === 'ib'">
                  <input type="radio" formControlName="board" value="ib">
                  <div class="radio-content">
                    <span>IB</span>
                  </div>
                </label>
              </div>
            </div>
            
            <div class="form-group" *ngIf="getStatus() === 'college'">
              <label>What's your field of study?</label>
              <select formControlName="field" class="form-control">
                <option value="">Select your field</option>
                <option value="engineering">Engineering</option>
                <option value="medicine">Medicine</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
                <option value="science">Science</option>
                <option value="law">Law</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group" *ngIf="getStatus() === 'professional'">
              <label>What's your profession?</label>
              <select formControlName="profession" class="form-control">
                <option value="">Select your profession</option>
                <option value="software">Software Developer</option>
                <option value="teacher">Teacher</option>
                <option value="doctor">Doctor</option>
                <option value="engineer">Engineer</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>What subjects interest you most?</label>
              <div class="checkbox-group">
                <label class="checkbox-option" *ngFor="let subject of getRelevantSubjects()">
                  <input type="checkbox" [value]="subject" (change)="onSubjectChange($event)">
                  <span>{{subject}}</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <!-- Navigation Buttons -->
        <div class="navigation-buttons">
          <button *ngIf="currentStep > 1" class="btn btn-secondary" (click)="previousStep()">
            <i class="fas fa-arrow-left me-2"></i>Previous
          </button>
          <button *ngIf="currentStep < totalSteps" class="btn btn-primary" (click)="nextStep()" [disabled]="!isCurrentStepValid()">
            Next<i class="fas fa-arrow-right ms-2"></i>
          </button>
          <button *ngIf="currentStep === totalSteps" class="btn btn-primary" (click)="completeOnboarding()" [disabled]="!isCurrentStepValid()">
            Complete Setup<i class="fas fa-check ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .onboarding-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
      display: flex;
      flex-direction: column;
      font-family: 'Inter', sans-serif;
    }
    
    .onboarding-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 20px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 700;
      color: #667eea;
    }
    
    .progress-bar {
      flex: 1;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      margin: 0 40px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #0ea5e9, #1e40af);
      transition: width 0.5s ease;
    }
    
    .step-indicator {
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }
    
    .onboarding-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }
    
    .step-content {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 40px;
      width: 100%;
      max-width: 600px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.5s ease-out;
    }
    
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .step-header {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .step-header h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }
    
    .step-header p {
      color: #64748b;
      font-size: 16px;
    }
    
    .form-group {
      margin-bottom: 24px;
    }
    
    .form-group label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
      font-size: 16px;
    }
    
    .form-control {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 16px;
      transition: all 0.3s ease;
      background: #f9fafb;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .radio-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
    }
    
    .radio-option {
      cursor: pointer;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
      transition: all 0.3s ease;
      background: #f9fafb;
    }
    
    .radio-option input {
      display: none;
    }
    
    .radio-option.selected {
      border-color: #667eea;
      background: #f0f4ff;
    }
    
    .radio-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      text-align: center;
    }
    
    .radio-content i {
      font-size: 24px;
      color: #667eea;
    }
    
    .radio-content span {
      font-weight: 500;
      color: #374151;
    }
    
    .checkbox-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    
    .checkbox-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #f9fafb;
    }
    
    .checkbox-option:hover {
      border-color: #667eea;
      background: #f0f4ff;
    }
    
    .navigation-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
      gap: 16px;
    }
    
    .btn {
      padding: 14px 28px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #0ea5e9, #1e40af);
      color: white;
      margin-left: auto;
    }
    
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
    
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn-secondary {
      background: #f1f5f9;
      color: #475569;
      border: 2px solid #e2e8f0;
    }
    
    .btn-secondary:hover {
      background: #e2e8f0;
    }
    
    @media (max-width: 768px) {
      .onboarding-header {
        padding: 16px 20px;
        flex-direction: column;
        gap: 16px;
      }
      
      .progress-bar {
        margin: 0;
        order: 2;
      }
      
      .step-content {
        padding: 24px;
        margin: 20px;
      }
      
      .radio-group {
        grid-template-columns: 1fr;
      }
      
      .checkbox-group {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class OnboardingComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;
  onboardingForm: FormGroup;
  selectedSubjects: string[] = [];
  
  states = [
    { code: 'AP', name: 'Andhra Pradesh' },
    { code: 'AR', name: 'Arunachal Pradesh' },
    { code: 'AS', name: 'Assam' },
    { code: 'BR', name: 'Bihar' },
    { code: 'CT', name: 'Chhattisgarh' },
    { code: 'GA', name: 'Goa' },
    { code: 'GJ', name: 'Gujarat' },
    { code: 'HR', name: 'Haryana' },
    { code: 'HP', name: 'Himachal Pradesh' },
    { code: 'JK', name: 'Jammu and Kashmir' },
    { code: 'JH', name: 'Jharkhand' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'KL', name: 'Kerala' },
    { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'MH', name: 'Maharashtra' },
    { code: 'MN', name: 'Manipur' },
    { code: 'ML', name: 'Meghalaya' },
    { code: 'MZ', name: 'Mizoram' },
    { code: 'NL', name: 'Nagaland' },
    { code: 'OR', name: 'Odisha' },
    { code: 'PB', name: 'Punjab' },
    { code: 'RJ', name: 'Rajasthan' },
    { code: 'SK', name: 'Sikkim' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'TG', name: 'Telangana' },
    { code: 'TR', name: 'Tripura' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'UT', name: 'Uttarakhand' },
    { code: 'WB', name: 'West Bengal' },
    { code: 'DL', name: 'Delhi' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.onboardingForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      status: ['', Validators.required],
      state: ['', Validators.required],
      class: [''],
      institution: ['', Validators.required],
      board: [''],
      field: [''],
      profession: [''],
      subjects: [[]]
    });
  }

  ngOnInit() {}

  nextStep() {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  previousStep() {
    this.currentStep--;
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.onboardingForm.get('name')?.valid && 
               this.onboardingForm.get('age')?.valid && 
               this.onboardingForm.get('status')?.valid);
      case 2:
        return !!(this.onboardingForm.get('state')?.valid && 
               this.onboardingForm.get('institution')?.valid);
      case 3:
        return true;
      default:
        return false;
    }
  }

  getStatus(): string {
    return this.onboardingForm.get('status')?.value || '';
  }

  getInstitutionLabel(): string {
    const status = this.getStatus();
    switch (status) {
      case 'school': return 'School Name';
      case 'college': return 'College/University Name';
      case 'professional': return 'Company Name';
      default: return 'Institution Name';
    }
  }

  getInstitutionPlaceholder(): string {
    const status = this.getStatus();
    switch (status) {
      case 'school': return 'Enter your school name';
      case 'college': return 'Enter your college/university name';
      case 'professional': return 'Enter your company name';
      default: return 'Enter institution name';
    }
  }

  getRelevantSubjects(): string[] {
    const status = this.getStatus();
    switch (status) {
      case 'school':
        return ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science', 'Physics', 'Chemistry', 'Biology'];
      case 'college':
        return ['Programming', 'Data Science', 'Web Development', 'Mobile Development', 'AI/ML', 'Cybersecurity', 'Digital Marketing', 'Finance'];
      case 'professional':
        return ['Leadership', 'Project Management', 'Data Analytics', 'Digital Marketing', 'Communication Skills', 'Technical Skills', 'Business Strategy'];
      default:
        return [];
    }
  }

  onStateChange() {
    // Handle state change if needed
  }

  onSubjectChange(event: any) {
    const subject = event.target.value;
    if (event.target.checked) {
      this.selectedSubjects.push(subject);
    } else {
      this.selectedSubjects = this.selectedSubjects.filter(s => s !== subject);
    }
    this.onboardingForm.patchValue({ subjects: this.selectedSubjects });
  }

  completeOnboarding() {
    const onboardingData = {
      ...this.onboardingForm.value,
      subjects: this.selectedSubjects
    };
    
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    localStorage.setItem('onboardingCompleted', 'true');
    
    // Navigate to registration with onboarding data
    this.router.navigate(['/auth/login'], { 
      queryParams: { 
        role: 'student',
        mode: 'register',
        onboarded: 'true'
      }
    });
  }
}