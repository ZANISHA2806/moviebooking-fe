import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { User, UpdateProfileRequest, ChangePasswordRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {
  user: User | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  isLoadingProfile = false;
  isLoadingPassword = false;
  successMessage = '';
  errorMessage = '';
  activeTab: 'profile' | 'password' = 'profile';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.initializeForms();
  }

  initializeForms(): void {
    this.profileForm = this.fb.group({
      firstName: [this.user?.firstName || '', [Validators.required]],
      lastName: [this.user?.lastName || '', [Validators.required]],
      phone: [this.user?.phone || '', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoadingProfile = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request: UpdateProfileRequest = this.profileForm.value;
    this.userService.updateProfile(request).subscribe({
      next: (updatedUser) => {
        this.isLoadingProfile = false;
        this.user = updatedUser;
        this.authService.setCurrentUser(updatedUser);
        this.successMessage = 'Profile updated successfully';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.isLoadingProfile = false;
        this.errorMessage = error.error?.message || 'Failed to update profile';
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }

    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoadingPassword = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request: ChangePasswordRequest = {
      currentPassword: this.passwordForm.value.currentPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    this.userService.changePassword(request).subscribe({
      next: () => {
        this.isLoadingPassword = false;
        this.successMessage = 'Password changed successfully';
        this.passwordForm.reset();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.isLoadingPassword = false;
        this.errorMessage = error.error?.message || 'Failed to change password';
      }
    });
  }
}
