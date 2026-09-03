import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css'
})
export class VerifyOtp {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  email = '';

  verifyOtpForm = this.fb.nonNullable.group({
    otp: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]
    ]
  });

  ngOnInit(): void {
    this.email =
      this.route.snapshot.queryParamMap.get('email') || '';

    if (!this.email) {
      this.router.navigate(['/forgot-password']);
    }
  }

  onSubmit(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.verifyOtpForm.invalid) {
      this.verifyOtpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const request = {
      email: this.email,
      otp: this.verifyOtpForm.controls.otp.value
    };

    this.authService.verifyOtp(request).subscribe({
      next: (response) => {
        this.isLoading = false;

        this.successMessage =
          response.message || 'OTP verified successfully.';

        /*
         * Keep the reset token only for this password-reset flow.
         * sessionStorage is cleared when the browser session ends.
         */
        sessionStorage.setItem('resetEmail', this.email);
        sessionStorage.setItem(
          'resetToken',
          response.resetToken
        );

        setTimeout(() => {
          this.router.navigate(['/reset-password']);
        }, 1000);
      },

      error: (error) => {
        this.isLoading = false;

        console.error('Verify OTP error:', error);

        if (error.error) {
          if (typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else {
            this.errorMessage =
              error.error.message || 'Invalid or expired OTP.';
          }
        } else {
          this.errorMessage =
            'Unable to verify OTP. Please try again.';
        }
      }
    });
  }
}