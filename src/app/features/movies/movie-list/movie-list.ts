import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Movie } from '../../../core/models/movies/movie';
import { MovieService } from '../../../core/services/movie.service';
import { MovieStatus } from '../../../core/models/movies/movie-status';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList {

  private readonly movieService = inject(MovieService);

  movies: Movie[] = [];
  allMovies: Movie[] = [];

  searchTitle = '';
  selectedStatus: MovieStatus | 'ALL' = 'ALL';

  isLoading = false;
  errorMessage = '';

  readonly MovieStatus = MovieStatus;

  readonly defaultPoster = 'assets/images/default-movie-poster.jpg';

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.allMovies = movies;
        this.movies = movies;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;

        this.errorMessage =
          error?.error?.message ||
          'Unable to load movies. Please try again.';
      }
    });
  }

  search(): void {
    const title = this.searchTitle.trim();

    if (!title) {
      this.applyStatusFilter();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.searchMovies(title).subscribe({
      next: (movies) => {
        this.allMovies = movies;
        this.applyStatusFilter();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;

        this.errorMessage =
          error?.error?.message ||
          'Unable to search movies. Please try again.';
      }
    });
  }

  filterByStatus(): void {
    this.applyStatusFilter();
  }

  private applyStatusFilter(): void {
    if (this.selectedStatus === 'ALL') {
      this.movies = this.allMovies;
      return;
    }

    this.movies = this.allMovies.filter(
      movie => movie.status === this.selectedStatus
    );
  }

  clearSearch(): void {
    this.searchTitle = '';
    this.loadMovies();
  }

  getPosterUrl(movie: Movie): string {
    return movie.posterUrl?.trim() || this.defaultPoster;
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src.endsWith(this.defaultPoster)) {
      return;
    }

    image.src = this.defaultPoster;
  }
}