import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ]
    ],

    password: [
      '',
      [
        Validators.required
      ]
    ]
  });

  onSubmit(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.getRawValue())
      .subscribe({

        next: (response) => {

  this.isLoading = false;

  localStorage.setItem(
    'accessToken',
    response.accessToken
  );

  localStorage.setItem(
    'tokenType',
    response.tokenType
  );

  localStorage.setItem(
    'user',
    JSON.stringify(response.user)
  );

  this.successMessage =
    `Welcome ${response.user.firstName}!`;

  console.log('Login response:', response);

  this.router.navigate(['/dashboard']);
},

        error: (error) => {

          this.isLoading = false;

          console.error('Login error:', error);

          if (error.error?.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage =
              'Login failed. Please check your email and password.';
          }
        }

      });
  }

}