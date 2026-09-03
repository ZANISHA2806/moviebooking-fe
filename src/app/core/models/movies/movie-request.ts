import { MovieRequestStatus } from './movie-request-status';

export interface MovieRequest {
  id: number;
  managerId: number;
  theaterId: number;
  title: string;
  description: string;
  language: string;
  genre: string;
  durationMinutes: number;
  certification: string;
  releaseDate: string;
  posterUrl: string | null;
  trailerUrl: string | null;
  status: MovieRequestStatus;
  adminId: number | null;
  adminComment: string | null;
  reviewedAt: string | null;
  createdAt: string;
}