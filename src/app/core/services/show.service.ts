import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Show } from '../models/show.model';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private apiUrl = `${environment.apiUrl}/shows`;

  constructor(private http: HttpClient) {}

  getShowsByScreenId(theaterId: number, screenId: number): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/theaters/${theaterId}/screens/${screenId}`);
  }

  getShowsByMovieId(movieId: number): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/movie/${movieId}`);
  }

  getShowById(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/${id}`);
  }
}
