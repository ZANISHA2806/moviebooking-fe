import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../core/services/movie.service';
import { Movie, MovieStatus } from '../../../core/models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {
  movies: Movie[] = [];
  isLoading = false;
  errorMessage = '';
  selectedStatus: MovieStatus | 'ALL' = 'ALL';
  searchQuery = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.selectedStatus === 'ALL') {
      this.movieService.getAllMovies().subscribe({
        next: (data) => {
          this.movies = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load movies';
        }
      });
    } else {
      this.movieService.getMoviesByStatus(this.selectedStatus).subscribe({
        next: (data) => {
          this.movies = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load movies';
        }
      });
    }
  }

  searchMovies(): void {
    if (!this.searchQuery.trim()) {
      this.loadMovies();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.searchMovies(this.searchQuery).subscribe({
      next: (data) => {
        this.movies = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Search failed';
      }
    });
  }

  onStatusChange(status: MovieStatus | 'ALL'): void {
    this.selectedStatus = status;
    this.searchQuery = '';
    this.loadMovies();
  }
}
