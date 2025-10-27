import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';


export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Require authentication
  if (!token) {
    // Redirect to login with return URL
    return router.parseUrl(`/auth?mode=login&returnUrl=${encodeURIComponent(state.url)}`);
  }

  // Optional role-based access control
  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = localStorage.getItem('userRole');
    if (!userRole || !allowedRoles.includes(userRole)) {
      // If role mismatch, redirect to home or an unauthorized page
      return router.parseUrl('/');
    }
  }

  return true;
};
