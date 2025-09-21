import { Routes } from '@angular/router';
import { TestDashboardComponent } from './components/test-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard.component';
import { InstructorDashboardComponent } from './components/instructor-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';

export const dashboardRoutes: Routes = [
  { path: 'student', component: StudentDashboardComponent },
  { path: 'instructor', component: InstructorDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '', redirectTo: 'student', pathMatch: 'full' }
];