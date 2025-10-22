import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminReviewsService } from '../../services/admin-reviews.service';
import { ProductReview } from '../../models/product-review.model';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css']
})
export class AdminReviewsComponent implements OnInit {
  reviews: ProductReview[] = [];
  filteredReviews: ProductReview[] = [];
  searchTerm = '';
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private reviewsService: AdminReviewsService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading = true;
    this.reviewsService.getAllReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.filteredReviews = reviews;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.isLoading = false;
      }
    });
  }

  searchReviews(): void {
    if (!this.searchTerm.trim()) {
      this.filteredReviews = this.reviews;
    } else {
      this.filteredReviews = this.reviews.filter(review =>
        review.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.content?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
  }

  deleteReview(id: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewsService.deleteReview(id).subscribe({
        next: () => {
          this.loadReviews();
        },
        error: (error) => {
          console.error('Error deleting review:', error);
        }
      });
    }
  }

  verifyReview(id: number): void {
    this.reviewsService.verifyReview(id).subscribe({
      next: () => {
        this.loadReviews();
      },
      error: (error) => {
        console.error('Error verifying review:', error);
      }
    });
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }
    return stars;
  }

  get paginatedReviews(): ProductReview[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredReviews.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredReviews.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
