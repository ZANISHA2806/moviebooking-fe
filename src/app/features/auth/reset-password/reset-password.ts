import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ResetPasswordRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {
  resetForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  email = '';
  resetToken = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.resetToken = params['resetToken'] || '';
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }

    if (this.resetForm.value.newPassword !== this.resetForm.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request: ResetPasswordRequest = {
      email: this.email,
      resetToken: this.resetToken,
      newPassword: this.resetForm.value.newPassword
    };

    this.authService.resetPassword(request).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Password reset successfully! Please login with your new password.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
      }
    });
  }
}
