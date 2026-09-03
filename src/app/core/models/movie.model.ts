export enum MovieStatus {
  UPCOMING = 'UPCOMING',
  NOW_SHOWING = 'NOW_SHOWING',
  COMPLETED = 'COMPLETED'
}

export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  genre: string;
  rating: number;
  duration: number;
  releaseDate: string;
  posterUrl: string;
  status: MovieStatus;
}

export interface CreateMovieRequest {
  title: string;
  synopsis: string;
  genre: string;
  rating: number;
  duration: number;
  releaseDate: string;
  posterUrl: string;
}

export interface UpdateMovieRequest {
  title?: string;
  synopsis?: string;
  genre?: string;
  rating?: number;
  duration?: number;
  releaseDate?: string;
  posterUrl?: string;
}
