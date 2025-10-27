import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardApiService } from '../services/dashboard-api.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <!-- Header -->
      <div class="settings-header">
        <div class="header-content">
          <div class="user-info">
            <div class="user-details">
              <h1>{{userProfile.name || 'User'}}</h1>
              <p>{{userProfile.email}}</p>
              <span class="user-role">{{userRole}}</span>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-outline" (click)="exportData()">📥 Export Data</button>
            <button class="btn-primary" (click)="saveAllSettings()">💾 Save All</button>
          </div>
        </div>
      </div>

      <div class="settings-layout">
        <!-- Sidebar Navigation -->
        <nav class="settings-nav">
          <div class="nav-section">
            <h3>Personal</h3>
            <button *ngFor="let tab of personalTabs" 
                    [class.active]="activeTab === tab.id"
                    (click)="setActiveTab(tab.id)"
                    class="nav-item">
              <span class="nav-icon">{{tab.icon}}</span>
              <span class="nav-label">{{tab.label}}</span>
              <span *ngIf="tab.badge" class="nav-badge">{{tab.badge}}</span>
            </button>
          </div>
          
          <div class="nav-section">
            <h3>Learning</h3>
            <button *ngFor="let tab of learningTabs" 
                    [class.active]="activeTab === tab.id"
                    (click)="setActiveTab(tab.id)"
                    class="nav-item">
              <span class="nav-icon">{{tab.icon}}</span>
              <span class="nav-label">{{tab.label}}</span>
            </button>
          </div>
          
          <div class="nav-section">
            <h3>System</h3>
            <button *ngFor="let tab of systemTabs" 
                    [class.active]="activeTab === tab.id"
                    (click)="setActiveTab(tab.id)"
                    class="nav-item">
              <span class="nav-icon">{{tab.icon}}</span>
              <span class="nav-label">{{tab.label}}</span>
            </button>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="settings-content">
          <!-- Profile Tab -->
          <div *ngIf="activeTab === 'profile'" class="settings-panel">
            <div class="panel-header">
              <h2>👤 Profile & Personal Information</h2>
              <p>Manage your personal details and public profile</p>
            </div>
            
            <div class="profile-section">
              
              <div class="form-grid">
                <div class="form-group">
                  <label>Full Name *</label>
                  <input type="text" [(ngModel)]="userProfile.name" class="form-input" placeholder="Enter your full name">
                </div>
                
                <div class="form-group">
                  <label>Email Address *</label>
                  <input type="email" [(ngModel)]="userProfile.email" class="form-input" readonly>
                  <small class="form-hint">Email cannot be changed. Contact support if needed.</small>
                </div>
                
                <div class="form-group">
                  <label>Professional Title</label>
                  <input type="text" [(ngModel)]="userProfile.title" class="form-input" placeholder="e.g., Software Developer">
                </div>
                
                <div class="form-group">
                  <label>Location</label>
                  <input type="text" [(ngModel)]="userProfile.location" class="form-input" placeholder="City, Country">
                </div>
                
                <div class="form-group full-width">
                  <label>Bio</label>
                  <textarea [(ngModel)]="userProfile.bio" class="form-textarea" rows="4" 
                           placeholder="Tell us about yourself, your interests, and goals..."></textarea>
                  <small class="form-hint">{{userProfile.bio?.length || 0}}/500 characters</small>
                </div>
                
                <div class="form-group">
                  <label>Website</label>
                  <input type="url" [(ngModel)]="userProfile.website" class="form-input" placeholder="https://yourwebsite.com">
                </div>
                
                <div class="form-group">
                  <label>LinkedIn</label>
                  <input type="url" [(ngModel)]="userProfile.linkedin" class="form-input" placeholder="LinkedIn profile URL">
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Tab -->
          <div *ngIf="activeTab === 'skills'" class="settings-panel">
            <div class="panel-header">
              <h2>🎯 Skills & Expertise</h2>
              <p>Showcase your skills and track your progress</p>
            </div>
            
            <div class="skills-section">
              <div class="add-skill">
                <input type="text" [(ngModel)]="newSkill.name" placeholder="Add a new skill" class="skill-input">
                <select [(ngModel)]="newSkill.category" class="skill-select">
                  <option value="">Select Category</option>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Business">Business</option>
                </select>
                <button (click)="addSkill()" class="btn-primary">Add Skill</button>
              </div>
              
              <div class="skills-grid">
                <div *ngFor="let skill of userProfile.skills" class="skill-card">
                  <div class="skill-header">
                    <h4>{{skill.name}}</h4>
                    <button (click)="removeSkill(skill)" class="remove-btn">×</button>
                  </div>
                  <div class="skill-category">{{skill.category}}</div>
                  <div class="skill-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" [style.width.%]="skill.level"></div>
                    </div>
                    <span class="progress-text">{{skill.level}}%</span>
                  </div>
                  <input type="range" min="0" max="100" [(ngModel)]="skill.level" class="skill-slider">
                </div>
              </div>
            </div>
          </div>

          <!-- Preferences Tab -->
          <div *ngIf="activeTab === 'preferences'" class="settings-panel">
            <div class="panel-header">
              <h2>🎨 Learning Preferences</h2>
              <p>Customize your learning experience</p>
            </div>
            
            <div class="preferences-grid">
              <div class="preference-card">
                <h3>🌙 Theme</h3>
                <div class="theme-options">
                  <div *ngFor="let theme of themes" 
                       [class.active]="selectedTheme === theme.id"
                       (click)="setTheme(theme.id)"
                       class="theme-option">
                    <div class="theme-preview" [style.background]="theme.preview"></div>
                    <span>{{theme.name}}</span>
                  </div>
                </div>
              </div>
              
              <div class="preference-card">
                <h3>🌍 Language</h3>
                <select [(ngModel)]="selectedLanguage" class="form-select">
                  <option *ngFor="let lang of languages" [value]="lang.code">{{lang.name}}</option>
                </select>
              </div>
              
              <div class="preference-card">
                <h3>📚 Learning Goals</h3>
                <div class="goals-list">
                  <div *ngFor="let goal of learningGoals" class="goal-item">
                    <label class="checkbox-label">
                      <input type="checkbox" [(ngModel)]="goal.selected">
                      <span class="checkmark"></span>
                      {{goal.label}}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notifications Tab -->
          <div *ngIf="activeTab === 'notifications'" class="settings-panel">
            <div class="panel-header">
              <h2>🔔 Notification Settings</h2>
              <p>Control how and when you receive notifications</p>
            </div>
            
            <div class="notifications-grid">
              <div *ngFor="let category of notificationCategories" class="notification-category">
                <h3>{{category.title}}</h3>
                <div class="notification-items">
                  <div *ngFor="let item of category.items" class="notification-item">
                    <div class="notification-info">
                      <h4>{{item.title}}</h4>
                      <p>{{item.description}}</p>
                    </div>
                    <div class="notification-controls">
                      <label class="toggle">
                        <input type="checkbox" [(ngModel)]="item.email">
                        <span class="slider"></span>
                      </label>
                      <span class="control-label">Email</span>
                      <label class="toggle">
                        <input type="checkbox" [(ngModel)]="item.push">
                        <span class="slider"></span>
                      </label>
                      <span class="control-label">Push</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Tab -->
          <div *ngIf="activeTab === 'security'" class="settings-panel">
            <div class="panel-header">
              <h2>🔐 Security & Privacy</h2>
              <p>Manage your account security and privacy settings</p>
            </div>
            
            <div class="security-sections">
              <div class="security-card">
                <h3>Password</h3>
                <div class="form-group">
                  <label>Current Password</label>
                  <input type="password" [(ngModel)]="passwordForm.current" class="form-input">
                </div>
                <div class="form-group">
                  <label>New Password</label>
                  <input type="password" [(ngModel)]="passwordForm.new" class="form-input">
                </div>
                <div class="form-group">
                  <label>Confirm Password</label>
                  <input type="password" [(ngModel)]="passwordForm.confirm" class="form-input">
                </div>
                <button class="btn-primary">Update Password</button>
              </div>
              
              <div class="security-card">
                <h3>Two-Factor Authentication</h3>
                <div class="security-option">
                  <div class="option-info">
                    <h4>Enable 2FA</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" [(ngModel)]="securitySettings.twoFactorEnabled">
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              
              <div class="security-card">
                <h3>Login Sessions</h3>
                <div class="session-list">
                  <div *ngFor="let session of activeSessions" class="session-item">
                    <div class="session-info">
                      <h4>{{session.device}}</h4>
                      <p>{{session.location}} • {{session.lastActive}}</p>
                    </div>
                    <button class="btn-outline small" *ngIf="!session.current">Revoke</button>
                    <span class="current-badge" *ngIf="session.current">Current</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Integrations Tab -->
          <div *ngIf="activeTab === 'integrations'" class="settings-panel">
            <div class="panel-header">
              <h2>🔗 Integrations & Connections</h2>
              <p>Connect your account with external services</p>
            </div>
            
            <div class="integrations-grid">
              <div *ngFor="let integration of integrations" class="integration-card">
                <div class="integration-header">
                  <div class="integration-icon">{{integration.icon}}</div>
                  <div class="integration-info">
                    <h3>{{integration.name}}</h3>
                    <p>{{integration.description}}</p>
                  </div>
                  <div class="integration-status">
                    <span [class]="'status ' + integration.status">{{integration.status}}</span>
                  </div>
                </div>
                <div class="integration-actions">
                  <button class="btn-primary" *ngIf="integration.status === 'disconnected'">Connect</button>
                  <button class="btn-outline" *ngIf="integration.status === 'connected'">Configure</button>
                  <button class="btn-outline danger" *ngIf="integration.status === 'connected'">Disconnect</button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Data & Storage Tab -->
          <div *ngIf="activeTab === 'data'" class="settings-panel">
            <div class="panel-header">
              <h2>💾 Data & Storage Management</h2>
              <p>Manage your data, backups, and storage preferences</p>
            </div>
            
            <div class="data-sections">
              <div class="data-card">
                <h3>Storage Usage</h3>
                <div class="storage-overview">
                  <div class="storage-item">
                    <span class="storage-label">Course Progress</span>
                    <div class="storage-bar">
                      <div class="storage-fill" style="width: 65%"></div>
                    </div>
                    <span class="storage-size">2.3 GB</span>
                  </div>
                  <div class="storage-item">
                    <span class="storage-label">Certificates</span>
                    <div class="storage-bar">
                      <div class="storage-fill" style="width: 25%"></div>
                    </div>
                    <span class="storage-size">890 MB</span>
                  </div>
                  <div class="storage-item">
                    <span class="storage-label">Profile Data</span>
                    <div class="storage-bar">
                      <div class="storage-fill" style="width: 10%"></div>
                    </div>
                    <span class="storage-size">156 MB</span>
                  </div>
                </div>
              </div>
              
              <div class="data-card">
                <h3>Data Export & Backup</h3>
                <div class="data-actions">
                  <button class="btn-primary">📥 Export All Data</button>
                  <button class="btn-outline">🔄 Create Backup</button>
                  <button class="btn-outline">📋 Download Report</button>
                </div>
              </div>
              
              <div class="data-card danger">
                <h3>⚠️ Danger Zone</h3>
                <div class="danger-actions">
                  <div class="danger-item">
                    <div class="danger-info">
                      <h4>Clear All Progress</h4>
                      <p>Reset all course progress and achievements</p>
                    </div>
                    <button class="btn-danger">Clear Progress</button>
                  </div>
                  <div class="danger-item">
                    <div class="danger-info">
                      <h4>Delete Account</h4>
                      <p>Permanently delete your account and all data</p>
                    </div>
                    <button class="btn-danger">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Advanced Tab -->
          <div *ngIf="activeTab === 'advanced'" class="settings-panel">
            <div class="panel-header">
              <h2>⚙️ Advanced Settings</h2>
              <p>Advanced configuration and developer options</p>
            </div>
            
            <div class="advanced-sections">
              <div class="advanced-card">
                <h3>Performance</h3>
                <div class="advanced-options">
                  <div class="advanced-option">
                    <div class="option-info">
                      <h4>Hardware Acceleration</h4>
                      <p>Use GPU acceleration for better performance</p>
                    </div>
                    <label class="toggle">
                      <input type="checkbox" [(ngModel)]="advancedSettings.hardwareAcceleration">
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="advanced-option">
                    <div class="option-info">
                      <h4>Preload Content</h4>
                      <p>Preload course content for faster access</p>
                    </div>
                    <label class="toggle">
                      <input type="checkbox" [(ngModel)]="advancedSettings.preloadContent">
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="advanced-card">
                <h3>Developer Options</h3>
                <div class="advanced-options">
                  <div class="advanced-option">
                    <div class="option-info">
                      <h4>Debug Mode</h4>
                      <p>Enable debug information and logs</p>
                    </div>
                    <label class="toggle">
                      <input type="checkbox" [(ngModel)]="advancedSettings.debugMode">
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="advanced-option">
                    <div class="option-info">
                      <h4>Beta Features</h4>
                      <p>Access experimental features and updates</p>
                    </div>
                    <label class="toggle">
                      <input type="checkbox" [(ngModel)]="advancedSettings.betaFeatures">
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 100vh;
      padding: 20px;
    }
    
    .settings-header {
      background: white;
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .user-details h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 4px;
    }
    
    .user-details p {
      color: #64748b;
      margin-bottom: 8px;
    }
    
    .user-role {
      background: linear-gradient(135deg, #1e293b, #334155);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .header-actions {
      display: flex;
      gap: 12px;
    }
    
    .btn-primary, .btn-secondary, .btn-outline {
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #1e293b, #334155);
      color: white;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(30, 41, 59, 0.3);
    }
    
    .btn-outline {
      background: transparent;
      color: #1e293b;
      border: 2px solid #1e293b;
    }
    
    .btn-outline:hover {
      background: #1e293b;
      color: white;
    }
    
    .settings-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 30px;
    }
    
    .settings-nav {
      background: white;
      border-radius: 16px;
      padding: 24px;
      height: fit-content;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    
    .nav-section {
      margin-bottom: 32px;
    }
    
    .nav-section h3 {
      color: #64748b;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 16px;
      background: transparent;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 8px;
      text-align: left;
    }
    
    .nav-item:hover {
      background: #f8fafc;
    }
    
    .nav-item.active {
      background: linear-gradient(135deg, #1e293b, #334155);
      color: white;
    }
    
    .nav-icon {
      font-size: 1.2rem;
    }
    
    .nav-label {
      flex: 1;
      font-weight: 500;
    }
    
    .nav-badge {
      background: #ef4444;
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 10px;
    }
    
    .settings-content {
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    
    .settings-panel {
      padding: 40px;
    }
    
    .panel-header {
      margin-bottom: 32px;
    }
    
    .panel-header h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }
    
    .panel-header p {
      color: #64748b;
      font-size: 1.1rem;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-group.full-width {
      grid-column: 1 / -1;
    }
    
    .form-group label {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }
    
    .form-input, .form-textarea, .form-select {
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    .form-input:focus, .form-textarea:focus, .form-select:focus {
      outline: none;
      border-color: #1e293b;
      box-shadow: 0 0 0 3px rgba(30, 41, 59, 0.1);
    }
    
    .form-hint {
      color: #64748b;
      font-size: 0.9rem;
      margin-top: 4px;
    }
    
    .skills-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .add-skill {
      display: flex;
      gap: 12px;
      align-items: end;
    }
    
    .skill-input, .skill-select {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .skill-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 20px;
    }
    
    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .skill-header h4 {
      font-weight: 600;
      color: #1e293b;
    }
    
    .remove-btn {
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    
    .skill-category {
      color: #64748b;
      font-size: 0.9rem;
      margin-bottom: 12px;
    }
    
    .skill-progress {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    
    .progress-bar {
      flex: 1;
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #1e293b, #334155);
    }
    
    .progress-text {
      font-weight: 600;
      color: #1e293b;
    }
    
    .skill-slider {
      width: 100%;
    }
    
    .preferences-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    
    .preference-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #e2e8f0;
    }
    
    .preference-card h3 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
    }
    
    .theme-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    
    .theme-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .theme-option.active {
      background: #1e293b;
      color: white;
    }
    
    .theme-preview {
      width: 40px;
      height: 40px;
      border-radius: 8px;
    }
    
    .goals-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .goal-item {
      display: flex;
      align-items: center;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    
    .notifications-grid {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    
    .notification-category h3 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
    }
    
    .notification-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .notification-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: #f8fafc;
      border-radius: 12px;
    }
    
    .notification-info h4 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }
    
    .notification-info p {
      color: #64748b;
      font-size: 0.9rem;
    }
    
    .notification-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .toggle {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }
    
    .toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    
    input:checked + .slider {
      background-color: #1e293b;
    }
    
    input:checked + .slider:before {
      transform: translateX(26px);
    }
    
    .control-label {
      font-size: 0.9rem;
      color: #64748b;
    }
    
    .security-sections {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    
    .security-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #e2e8f0;
    }
    
    .security-card h3 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 20px;
    }
    
    .security-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .option-info h4 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }
    
    .option-info p {
      color: #64748b;
      font-size: 0.9rem;
    }
    
    .session-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .session-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f8fafc;
      border-radius: 12px;
    }
    
    .session-info h4 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }
    
    .session-info p {
      color: #64748b;
      font-size: 0.9rem;
    }
    
    .current-badge {
      background: #10b981;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .btn-outline.small {
      padding: 6px 12px;
      font-size: 0.8rem;
    }
    
    .integrations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }
    
    .integration-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #e2e8f0;
    }
    
    .integration-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }
    
    .integration-icon {
      font-size: 2.5rem;
    }
    
    .integration-info {
      flex: 1;
    }
    
    .integration-info h3 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }
    
    .integration-info p {
      color: #64748b;
      font-size: 0.9rem;
    }
    
    .integration-status .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .status.connected {
      background: #dcfce7;
      color: #166534;
    }
    
    .status.disconnected {
      background: #fef2f2;
      color: #991b1b;
    }
    
    .integration-actions {
      display: flex;
      gap: 12px;
    }
    
    .data-sections {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    
    .data-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #e2e8f0;
    }
    
    .data-card.danger {
      background: #fef2f2;
      border: 2px solid #fecaca;
    }
    
    .data-card h3 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 20px;
    }
    
    .storage-overview {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .storage-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .storage-label {
      min-width: 120px;
      font-weight: 500;
      color: #1e293b;
    }
    
    .storage-bar {
      flex: 1;
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .storage-fill {
      height: 100%;
      background: linear-gradient(135deg, #1e293b, #334155);
    }
    
    .storage-size {
      min-width: 80px;
      text-align: right;
      font-weight: 600;
      color: #64748b;
    }
    
    .data-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .danger-actions {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .danger-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: white;
      border-radius: 12px;
      border: 2px solid #fecaca;
    }
    
    .danger-info h4 {
      font-weight: 600;
      color: #991b1b;
      margin-bottom: 4px;
    }
    
    .danger-info p {
      color: #dc2626;
      font-size: 0.9rem;
    }
    
    .btn-danger {
      padding: 8px 16px;
      background: #dc2626;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-danger:hover {
      background: #991b1b;
      transform: translateY(-1px);
    }
    
    .btn-outline.danger {
      color: #dc2626;
      border-color: #dc2626;
    }
    
    .btn-outline.danger:hover {
      background: #dc2626;
      color: white;
    }
    
    .advanced-sections {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    
    .advanced-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #e2e8f0;
    }
    
    .advanced-card h3 {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 20px;
    }
    
    .advanced-options {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .advanced-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: white;
      border-radius: 12px;
    }
  `]
})
export class SettingsComponent implements OnInit {
  activeTab = 'profile';
  userRole = '';
  
  personalTabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '🎯', badge: '5' }
  ];
  
  learningTabs = [
    { id: 'preferences', label: 'Preferences', icon: '🎨' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' }
  ];
  
  systemTabs = [
    { id: 'security', label: 'Security', icon: '🔐' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'data', label: 'Data & Storage', icon: '💾' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' }
  ];

  userProfile: any = {
    name: '',
    email: '',
    title: '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    avatar: '',
    skills: []
  };
  
  newSkill = { name: '', category: '', level: 50 };
  
  passwordForm = {
    current: '',
    new: '',
    confirm: ''
  };
  
  securitySettings = {
    twoFactorEnabled: false
  };
  
  activeSessions = [
    { device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: '2 minutes ago', current: true },
    { device: 'iPhone 14', location: 'San Francisco, CA', lastActive: '1 hour ago', current: false },
    { device: 'Chrome Browser', location: 'New York, NY', lastActive: '2 days ago', current: false }
  ];
  
  integrations = [
    { name: 'GitHub', icon: '🐙', description: 'Connect your GitHub account for code projects', status: 'connected' },
    { name: 'LinkedIn', icon: '💼', description: 'Share achievements on LinkedIn', status: 'disconnected' },
    { name: 'Google Drive', icon: '📁', description: 'Sync course materials with Google Drive', status: 'connected' },
    { name: 'Slack', icon: '💬', description: 'Get notifications in Slack', status: 'disconnected' },
    { name: 'Zoom', icon: '📹', description: 'Join live sessions directly', status: 'connected' }
  ];
  
  advancedSettings = {
    hardwareAcceleration: true,
    preloadContent: false,
    debugMode: false,
    betaFeatures: true
  };

  themes = [
    { id: 'light', name: 'Light', preview: 'linear-gradient(45deg, #fff, #f8f9fa)' },
    { id: 'dark', name: 'Dark', preview: 'linear-gradient(45deg, #212529, #343a40)' },
    { id: 'blue', name: 'Ocean', preview: 'linear-gradient(45deg, #007bff, #0056b3)' }
  ];

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ];
  
  learningGoals = [
    { label: 'Complete 1 course per month', selected: true },
    { label: 'Earn 3 certificates this year', selected: false },
    { label: 'Learn a new programming language', selected: true },
    { label: 'Build a portfolio project', selected: false }
  ];
  
  notificationCategories = [
    {
      title: 'Course Updates',
      items: [
        { title: 'New course available', description: 'Get notified when new courses match your interests', email: true, push: false },
        { title: 'Course completion', description: 'Celebrate when you complete a course', email: true, push: true }
      ]
    },
    {
      title: 'Learning Progress',
      items: [
        { title: 'Daily reminders', description: 'Gentle nudges to keep learning', email: false, push: true },
        { title: 'Weekly summary', description: 'Your learning progress summary', email: true, push: false }
      ]
    }
  ];

  selectedTheme = 'light';
  selectedLanguage = 'en';

  constructor(private dashboardApi: DashboardApiService) {}

  ngOnInit() {
    this.loadUserData();
    this.loadUserProfile();
  }
  
  loadUserData() {
    this.userProfile.name = localStorage.getItem('userName') || 'User';
    this.userProfile.email = localStorage.getItem('userEmail') || '';
    this.userRole = localStorage.getItem('userRole') || 'STUDENT';
  }
  
  loadUserProfile() {
    this.dashboardApi.getUserProfile().subscribe({
      next: (profile) => {
        if (profile) {
          this.userProfile = { ...this.userProfile, ...profile };
        }
      },
      error: (error) => {
        console.error('Error loading profile:', error);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  
  addSkill() {
    if (this.newSkill.name && this.newSkill.category) {
      this.userProfile.skills.push({ ...this.newSkill, level: 50 });
      this.newSkill = { name: '', category: '', level: 50 };
    }
  }
  
  removeSkill(skill: any) {
    const index = this.userProfile.skills.indexOf(skill);
    if (index > -1) {
      this.userProfile.skills.splice(index, 1);
    }
  }
  
  setTheme(themeId: string) {
    this.selectedTheme = themeId;
  }
  
  changeAvatar() {
    // Avatar change functionality
  }
  
  saveAllSettings() {
    // Save all settings to backend
    console.log('Saving settings:', this.userProfile);
  }
  
  exportData() {
    // Export user data
    console.log('Exporting data');
  }
}