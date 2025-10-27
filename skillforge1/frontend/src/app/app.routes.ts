import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

import { WelcomeComponent } from './welcome/welcome.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { QuizComponent } from './quiz/quiz.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AdaptiveQuizComponent } from './adaptive-quiz/adaptive-quiz.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'search', loadComponent: () => import('./search/search.component').then(m => m.SearchComponent) },
  { path: 'courses', loadComponent: () => import('./courses/courses.component').then(m => m.CoursesComponent) },
  { path: 'quiz', component: QuizComponent },
  { path: 'adaptive-quiz', component: AdaptiveQuizComponent },
  { path: 'quiz-results', loadComponent: () => import('./quiz-results/quiz-results.component').then(m => m.QuizResultsComponent) },
  { path: 'quiz-history', loadComponent: () => import('./quiz-history/quiz-history.component').then(m => m.QuizHistoryComponent) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
  { path: 'learning-path', loadComponent: () => import('./learning-path/learning-path.component').then(m => m.LearningPathComponent) },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'instructor/courses', loadComponent: () => import('./instructor/course-management.component').then(m => m.CourseManagementComponent) },
  { path: 'instructor/students', loadComponent: () => import('./instructor/student-management.component').then(m => m.StudentManagementComponent) },
  { path: 'test-nav', loadComponent: () => import('./test-nav.component').then(m => m.TestNavComponent) },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];