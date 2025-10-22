import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReview } from '../models/product-review.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminReviewsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all reviews
  getAllReviews(): Observable<ProductReview[]> {
    return this.http.get<ProductReview[]>(`${this.apiUrl}/product-reviews`);
  }

  // Get single review
  getReview(id: number): Observable<ProductReview> {
    return this.http.get<ProductReview>(`${this.apiUrl}/product-reviews/${id}`);
  }

  // Get reviews by product
  getReviewsByProduct(productId: number): Observable<ProductReview[]> {
    return this.http.get<ProductReview[]>(`${this.apiUrl}/products/${productId}/reviews`);
  }

  // Update review
  updateReview(id: number, review: ProductReview): Observable<ProductReview> {
    return this.http.put<ProductReview>(`${this.apiUrl}/product-reviews/${id}`, review);
  }

  // Delete review
  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product-reviews/${id}`);
  }

  // Verify review
  verifyReview(id: number): Observable<ProductReview> {
    return this.http.patch<ProductReview>(`${this.apiUrl}/product-reviews/${id}/verify`, {});
  }
}
