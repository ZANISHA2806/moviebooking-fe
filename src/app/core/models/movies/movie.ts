import { MovieStatus } from './movie-status';

export interface Movie {
  id: number;
  title: string;
  description: string;
  language: string;
  genre: string;
  durationMinutes: number;
  certification: string;
  releaseDate: string;
  posterUrl: string | null;
  trailerUrl: string | null;
  status: MovieStatus;
  displayStatus: string | null;
  createdAt: string;
  updatedAt: string;
}