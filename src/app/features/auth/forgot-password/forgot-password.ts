import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  errorMessage = '';
  successMessage = '';

  forgotPasswordForm = this.fb.nonNullable.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ]
    ]

  });


  onSubmit(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.forgotPasswordForm.invalid) {

      this.forgotPasswordForm.markAllAsTouched();

      return;
    }

    this.isLoading = true;

    this.authService
      .forgotPassword(this.forgotPasswordForm.getRawValue())
      .subscribe({
next: (response) => {
  this.isLoading = false;

  this.successMessage =
    response || 'OTP has been sent to your email.';

  const email = this.forgotPasswordForm.controls.email.value;

  setTimeout(() => {
    this.router.navigate(['/verify-otp'], {
      queryParams: { email }
    });
  }, 1000);
},

        error: (error) => {

          this.isLoading = false;

          console.error(
            'Forgot password error:',
            error
          );

          if (error.error) {

            this.errorMessage =
              typeof error.error === 'string'
                ? error.error
                : error.error.message || 'Unable to send OTP.';

          } else {

            this.errorMessage =
              'Unable to send OTP. Please try again.';
          }

        }

      });
  }

}