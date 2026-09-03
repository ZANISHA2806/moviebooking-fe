import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Theater } from '../models/theater.model';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {
  private apiUrl = `${environment.apiUrl}/theaters`;

  constructor(private http: HttpClient) {}

  getTheaterById(id: number): Observable<Theater> {
    return this.http.get<Theater>(`${this.apiUrl}/${id}`);
  }

  getActiveTheaters(): Observable<Theater[]> {
    return this.http.get<Theater[]>(`${this.apiUrl}/active`);
  }

  getTheatersByCity(city: string): Observable<Theater[]> {
    return this.http.get<Theater[]>(`${this.apiUrl}/city/${city}`);
  }
}
