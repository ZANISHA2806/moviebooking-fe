import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Seat, SeatStatus } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = `${environment.apiUrl}/seats`;

  constructor(private http: HttpClient) {}

  getSeatsByScreenId(screenId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/screen/${screenId}`);
  }

  getActiveSeatsByScreenId(screenId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/screen/${screenId}/active`);
  }

  getSeatsByScreenAndStatus(screenId: number, status: SeatStatus): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/screen/${screenId}/status/${status}`);
  }
}
