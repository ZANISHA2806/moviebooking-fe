import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  email = '';
  resetToken = '';

  resetPasswordForm = this.fb.nonNullable.group({
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ]
    ],
    confirmPassword: [
      '',
      [
        Validators.required
      ]
    ]
  });

  ngOnInit(): void {
    this.email = sessionStorage.getItem('resetEmail') || '';
    this.resetToken = sessionStorage.getItem('resetToken') || '';

    if (!this.email || !this.resetToken) {
      this.router.navigate(['/forgot-password']);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const newPassword =
      this.resetPasswordForm.controls.newPassword.value;

    const confirmPassword =
      this.resetPasswordForm.controls.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage =
        'New password and confirm password must match.';
      return;
    }

    this.isLoading = true;

    const request = {
      email: this.email,
      resetToken: this.resetToken,
      newPassword,
      confirmPassword
    };

    this.authService.resetPassword(request).subscribe({
      next: (response) => {
        this.isLoading = false;

        this.successMessage =
          response || 'Password reset successfully.';

        // Clear the temporary password-reset information.
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('resetToken');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },

      error: (error) => {
        this.isLoading = false;

        console.error('Reset password error:', error);

        if (error.error) {
          if (typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else {
            this.errorMessage =
              error.error.message ||
              'Unable to reset password.';
          }
        } else {
          this.errorMessage =
            'Unable to reset password. Please try again.';
        }
      }
    });
  }
}