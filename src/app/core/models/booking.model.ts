export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED'
}

export interface SeatInfo {
  seatId: number;
  rowNumber: string;
  seatNumber: string;
}

export interface Booking {
  id: number;
  bookingReference: string;
  userId: number;
  showId: number;
  seats: SeatInfo[];
  totalPrice: number;
  status: BookingStatus;
  bookingDate: string;
  paymentStatus: PaymentStatus;
}

export interface CreateBookingRequest {
  showId: number;
  seatIds: number[];
  totalPrice: number;
}
