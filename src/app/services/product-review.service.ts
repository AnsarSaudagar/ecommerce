import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductReview } from '../models/product_review.model';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  constructor(
    private http: HttpClient,
    @Inject('API_BASE_NODE_URL') private apiNodeUrl: string
  ) {}

  getProductReviews(product_id: number){
    return this.http.get(this.apiNodeUrl + "product-review/" + product_id);
  }

  submitNewReview(review_details: ProductReview){
    return this.http.post(this.apiNodeUrl + 'product-review/add', review_details);
  }
}
