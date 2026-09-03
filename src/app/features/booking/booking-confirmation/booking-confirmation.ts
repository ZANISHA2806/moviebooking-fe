import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css'
})
export class BookingConfirmation implements OnInit {
  booking: Booking | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookingId = params.get('bookingId');
      if (bookingId) {
        this.loadBooking(Number(bookingId));
      }
    });
  }

  loadBooking(bookingId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.bookingService.getBookingById(bookingId).subscribe({
      next: (data) => {
        this.booking = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load booking details';
      }
    });
  }
}
