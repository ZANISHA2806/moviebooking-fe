import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  baseUrl: environment.apiUrl,
  endpoints: {
    auth: '/auth',
    users: '/users',
    movies: '/movies',
    theaters: '/theaters',
    shows: '/shows',
    seats: '/seats',
    showSeats: '/show-seats',
    bookings: '/bookings',
    payments: '/payments'
  }
};
