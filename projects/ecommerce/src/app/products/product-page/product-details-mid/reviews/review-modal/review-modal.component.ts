import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductReview } from 'projects/ecommerce/src/app/models/product_review.model';
import { ProductReviewService } from 'projects/ecommerce/src/app/services/product-review.service';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrl: './review-modal.component.css',
})
export class ReviewModalComponent {
  @Output() crossEmitter = new EventEmitter<boolean>();
  reviewForm: FormGroup;
  isSubmitted: boolean = false;
  product_id : number;
  user_id: number;

  constructor(
    private fb: FormBuilder,
    private productReviewService: ProductReviewService,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(routes => {
      this.product_id = +routes.product_id
    })

    this.user_id = JSON.parse(localStorage.getItem("userData"))?.id;

    // For handling background when modal is active
    document.querySelector('body').style.overflow = 'hidden';

    // Review form
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      title: [null],
      content: [null],
    });
  }

  onClickCross() {
    this.crossEmitter.emit(false);
    document.querySelector('body').style.overflow = 'auto';
  }

  onSubmitReview() {
    this.isSubmitted = true;

    if (this.reviewForm.valid) {

      const review : ProductReview = {
        ...this.reviewForm.value,
        product_id: this.product_id,
        user_id : this.user_id ? this.user_id : null
      }

      this.productReviewService.submitNewReview(review).subscribe({
        complete: () => {
          this.reviewForm.reset();
          this.isSubmitted = false;
          this.onClickCross();
          this.productReviewService.getProductReviews(this.product_id);
          this.productReviewService.getAvgRatingAndCount(this.product_id);
        },
      });
      
    }
  }

  getValidationCondition(input_type: string) {
    if (
      (!this.reviewForm?.get(input_type).valid &&
        this.reviewForm?.get(input_type).touched) ||
      (!this.reviewForm.valid &&
        this.isSubmitted &&
        !this.reviewForm?.get(input_type).valid)
    ) {
      return {
        'border-[#db2020]': true,
        'border-[#bfbfbf]': false,
      };
    }
    return {
      'border-[#db2020]': false,
      'border-[#bfbfbf]': true,
    };
  }
}
