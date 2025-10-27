import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { authGuard } from '../auth/auth.guard';

export const dashboardRoutes: Routes = [
  { path: 'student', component: DashboardComponent, canActivate: [authGuard], data: { roles: ['STUDENT'] } },
  { path: 'instructor', component: DashboardComponent, canActivate: [authGuard], data: { roles: ['INSTRUCTOR'] } },
  { path: 'admin', component: DashboardComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
  { path: '', redirectTo: 'student', pathMatch: 'full' }
];