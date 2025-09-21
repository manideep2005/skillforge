import { Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'search', loadComponent: () => import('./search/search.component').then(m => m.SearchComponent) },
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