import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent {
  showReviewModal: boolean = false;

  onClickWriteReview(){
    this.showReviewModal = true;
  }

  hideReviewModal(modalStatus : boolean){
    this.showReviewModal = modalStatus;
  }
}
