import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductReview } from 'src/app/models/product_review.model';
import { ProductReviewService } from 'src/app/services/product-review.service';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  showReviewModal: boolean = false;
  productReviews: ProductReview[];
  product_id: number;
  count: number;
  average: number;

  constructor(
    private productReviewsService: ProductReviewService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe({
      next: (params) => {
        this.product_id = params.product_id;
      },
    });
  }

  ngOnInit(): void {
    this.productReviewsService.reviews$.subscribe({
      next: (reviews: ProductReview[]) => {
        this.productReviews = reviews;
        this.count = reviews.length;
        let sum = 0;
        this.productReviews.forEach((review) => {
          sum += review.rating;
        });

        this.average = +(sum / this.count).toFixed(1);
      },
    });

    this.productReviewsService.getProductReviews(this.product_id);
  }

  onClickWriteReview() {
    this.showReviewModal = true;
  }

  hideReviewModal(modalStatus: boolean) {
    this.showReviewModal = modalStatus;
  }

  onClickReviewAction(review_id: number, action: string) {
    this.productReviewsService.likeDislikeReview(review_id, action).subscribe({
      next: (data) => {
        this.productReviewsService.getProductReviews(this.product_id);
      },
    });
  }
}
