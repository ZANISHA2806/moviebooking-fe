export enum ShowStatus {
  OPEN = 'OPEN',
  CANCELLED = 'CANCELLED',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED'
}

export interface Show {
  id: number;
  movieId: number;
  theaterId: number;
  screenId: number;
  startTime: string;
  endTime: string;
  price: number;
  status: ShowStatus;
}

export interface CreateShowRequest {
  movieId: number;
  startTime: string;
  endTime: string;
  price: number;
}

export interface UpdateShowRequest {
  movieId?: number;
  startTime?: string;
  endTime?: string;
  price?: number;
}
