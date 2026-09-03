import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { VerifyOtpRequest } from '../models/auth/verify-otp-request';
import { VerifyOtpResponse } from '../models/auth/verify-otp-response';
import { LoginRequest } from '../models/auth/login-request';
import { AuthResponse } from '../models/auth/auth-response';
import { RegisterRequest } from '../models/auth/register-request';
import { UserResponse } from '../models/auth/user-response';
import { ForgotPasswordRequest } from '../models/auth/forgot-password-request';
import { ResetPasswordRequest } from '../models/auth/reset-password-request';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      request
    );
  }

  register(request: RegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.apiUrl}/auth/register`,
      request
    );
  }

  forgotPassword(
  request: ForgotPasswordRequest
): Observable<string> {

  return this.http.post(
    `${this.apiUrl}/auth/forgotpassword`,
    request,
    {
      responseType: 'text'
    }
  );
  

}

verifyOtp(
  request: VerifyOtpRequest
): Observable<VerifyOtpResponse> {

  return this.http.post<VerifyOtpResponse>(
    `${this.apiUrl}/auth/verify-otp`,
    request
  );
}


resetPassword(
  request: ResetPasswordRequest
): Observable<string> {

  return this.http.post(
    `${this.apiUrl}/auth/reset-password`,
    request,
    {
      responseType: 'text'
    }
  );
}
}