import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { VerifyOtp } from './features/auth/verify-otp/verify-otp';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { MovieList } from './features/movies/movie-list/movie-list';
import { Dashboard } from './features/dashboard/dashboard';

import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AppLayout } from './layouts/app-layout/app-layout';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // =========================
  // AUTH LAYOUT
  // =========================
  {
    path: '',
    component: AuthLayout,

    children: [

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },

      {
        path: 'login',
        component: Login
      },

      {
        path: 'register',
        component: Register
      },

      {
        path: 'forgot-password',
        component: ForgotPassword
      },

      {
        path: 'verify-otp',
        component: VerifyOtp
      },

      {
        path: 'reset-password',
        component: ResetPassword
      }

    ]
  },


  // =========================
  // APP LAYOUT
  // =========================
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },
      {
  path: 'movies',
  component: MovieList
}

    ]
  },


  // =========================
  // UNKNOWN ROUTES
  // =========================
  {
    path: '**',
    redirectTo: 'login'
  }

];