import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, CreateBookingRequest } from '../models/booking.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  createBooking(request: CreateBookingRequest): Observable<Booking> {
    const user = this.authService.getCurrentUser();
    const headers = new HttpHeaders().set('X-User-Id', user?.id.toString() || '');
    return this.http.post<Booking>(this.apiUrl, request, { headers });
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  getBookingByReference(reference: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/reference/${reference}`);
  }

  getUserBookings(): Observable<Booking[]> {
    const user = this.authService.getCurrentUser();
    const headers = new HttpHeaders().set('X-User-Id', user?.id.toString() || '');
    return this.http.get<Booking[]>(`${this.apiUrl}/user`, { headers });
  }
}
