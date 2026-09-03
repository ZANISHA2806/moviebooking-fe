export enum ShowSeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  RESERVED = 'RESERVED'
}

export interface ShowSeat {
  id: number;
  showId: number;
  seatId: number;
  status: ShowSeatStatus;
}
