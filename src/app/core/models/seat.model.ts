export enum SeatCategory {
  ECONOMY = 'ECONOMY',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  VIP = 'VIP'
}

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  BLOCKED = 'BLOCKED'
}

export interface Seat {
  id: number;
  screenId: number;
  rowNumber: string;
  seatNumber: string;
  category: SeatCategory;
  status: SeatStatus;
}

export interface CreateSeatRequest {
  screenId: number;
  rowNumber: string;
  seatNumber: string;
  category: SeatCategory;
}

export interface UpdateSeatRequest {
  category?: SeatCategory;
}

export interface GenerateSeatsRequest {
  rows: number;
  seatsPerRow: number;
  category: SeatCategory;
}
