import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductReview } from '../models/product_review.model';
import { BehaviorSubject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  private reviewSubject = new BehaviorSubject<ProductReview[]>([]);
  public reviews$ = this.reviewSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('API_BASE_NODE_URL') private apiNodeUrl: string
  ) {}

  getProductReviews(product_id: number){
    return this.http.get<ProductReview[]>(this.apiNodeUrl + "product-review/" + product_id).pipe(
      tap(reviews => this.reviewSubject.next(reviews)),
      catchError((error) => {
        console.error('Error fetching data', error);
        throw error;
      })
    ).subscribe();
  }

  submitNewReview(review_details: ProductReview){
    return this.http.post(this.apiNodeUrl + 'product-review/add', review_details);
  }
}
