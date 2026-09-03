import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie, MovieStatus } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  getMoviesByStatus(status: MovieStatus): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/status/${status}`);
  }

  searchMovies(title: string): Observable<Movie[]> {
    const params = new HttpParams().set('title', title);
    return this.http.get<Movie[]>(`${this.apiUrl}/search`, { params });
  }
}
