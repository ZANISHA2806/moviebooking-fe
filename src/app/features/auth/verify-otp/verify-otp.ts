import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { VerifyOtpRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css'
})
export class VerifyOtp implements OnInit {
  verifyForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  email = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.verifyForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.verifyForm.invalid || !this.email) {
      this.errorMessage = 'Please enter a valid OTP';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request: VerifyOtpRequest = {
      email: this.email,
      otp: this.verifyForm.value.otp
    };

    this.authService.verifyOtp(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/reset-password'], {
          queryParams: {
            email: this.email,
            resetToken: response.resetToken
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Invalid OTP. Please try again.';
      }
    });
  }
}
