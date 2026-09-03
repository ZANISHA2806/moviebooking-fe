import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css'
})
export class BookingHistory implements OnInit {
  bookings: Booking[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.bookingService.getUserBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load bookings';
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'confirmed';
      case 'PENDING':
        return 'pending';
      case 'CANCELLED':
        return 'cancelled';
      default:
        return '';
    }
  }
}
