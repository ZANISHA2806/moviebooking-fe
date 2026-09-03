import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../models/movies/movie';
import { MovieStatus } from '../models/movies/movie-status';
import { CreateMovieRequest } from '../models/movies/create-movie-request';
import { UpdateMovieRequest } from '../models/movies/update-movie-request';

import { MovieRequest } from '../models/movies/movie-request';
import { MovieRequestStatus } from '../models/movies/movie-request-status';
import { CreateMovieRR } from '../models/movies/create-movie-rr';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8081';

  // =========================
  // MOVIES
  // =========================

  createMovie(request: CreateMovieRequest): Observable<Movie> {
    return this.http.post<Movie>(
      `${this.baseUrl}/movies`,
      request
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.baseUrl}/movies/${id}`
    );
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.baseUrl}/movies`
    );
  }

  getMoviesByStatus(status: MovieStatus): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.baseUrl}/movies/status/${status}`
    );
  }

  searchMovies(title: string): Observable<Movie[]> {
    const params = new HttpParams()
      .set('title', title);

    return this.http.get<Movie[]>(
      `${this.baseUrl}/movies/search`,
      { params }
    );
  }

  updateMovie(
    id: number,
    request: UpdateMovieRequest
  ): Observable<Movie> {
    return this.http.put<Movie>(
      `${this.baseUrl}/movies/${id}`,
      request
    );
  }

  updateMovieStatus(
    id: number,
    status: MovieStatus
  ): Observable<void> {
    const params = new HttpParams()
      .set('status', status);

    return this.http.patch<void>(
      `${this.baseUrl}/movies/${id}/status`,
      null,
      { params }
    );
  }

  // =========================
  // MOVIE REQUESTS
  // =========================

  createMovieRequest(
    request: CreateMovieRR
  ): Observable<MovieRequest> {
    return this.http.post<MovieRequest>(
      `${this.baseUrl}/movie-requests`,
      request
    );
  }

  getMovieRequestById(
    id: number
  ): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(
      `${this.baseUrl}/movie-requests/${id}`
    );
  }

  getMyMovieRequests(): Observable<MovieRequest[]> {
    return this.http.get<MovieRequest[]>(
      `${this.baseUrl}/movie-requests/my`
    );
  }

  getMyMovieRequestsByStatus(
    status: MovieRequestStatus
  ): Observable<MovieRequest[]> {
    return this.http.get<MovieRequest[]>(
      `${this.baseUrl}/movie-requests/my/status/${status}`
    );
  }

  getAllMovieRequests(): Observable<MovieRequest[]> {
    return this.http.get<MovieRequest[]>(
      `${this.baseUrl}/movie-requests`
    );
  }

  getMovieRequestsByStatus(
    status: MovieRequestStatus
  ): Observable<MovieRequest[]> {
    return this.http.get<MovieRequest[]>(
      `${this.baseUrl}/movie-requests/status/${status}`
    );
  }

  approveMovieRequest(
    id: number,
    adminComment?: string
  ): Observable<MovieRequest> {

    let params = new HttpParams();

    if (adminComment?.trim()) {
      params = params.set(
        'adminComment',
        adminComment.trim()
      );
    }

    return this.http.patch<MovieRequest>(
      `${this.baseUrl}/movie-requests/${id}/approve`,
      null,
      { params }
    );
  }

  rejectMovieRequest(
    id: number,
    adminComment?: string
  ): Observable<MovieRequest> {

    let params = new HttpParams();

    if (adminComment?.trim()) {
      params = params.set(
        'adminComment',
        adminComment.trim()
      );
    }

    return this.http.patch<MovieRequest>(
      `${this.baseUrl}/movie-requests/${id}/reject`,
      null,
      { params }
    );
  }
}