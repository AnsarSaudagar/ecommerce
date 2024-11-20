import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductReview } from 'src/app/models/product_review.model';
import { ProductReviewService } from 'src/app/services/product-review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  showReviewModal: boolean = false;
  productReviews: ProductReview[];
  product_id: number;

  constructor(
    private productReviewsService: ProductReviewService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe({
      next: (params) => {
        this.product_id = params.product_id;        
      }
    })
  }

  ngOnInit(): void {
    this.productReviewsService.getProductReviews(this.product_id).subscribe({
      next: (reviews : ProductReview[]) =>{
        console.log(reviews);
        
        this.productReviews = reviews;
      }
    })
  }

  onClickWriteReview() {
    this.showReviewModal = true;
  }

  hideReviewModal(modalStatus: boolean) {
    this.showReviewModal = modalStatus;
  }
}
