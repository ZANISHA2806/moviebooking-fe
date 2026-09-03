import { UserResponse } from './user-response';

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: UserResponse;
}