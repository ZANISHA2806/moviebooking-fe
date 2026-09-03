export interface UpdateMovieRequest {
  title: string;
  description: string;
  language: string;
  genre: string;
  durationMinutes: number;
  certification: string;
  releaseDate: string;
  posterUrl?: string;
  trailerUrl?: string;
}