import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrl: './review-modal.component.css',
})
export class ReviewModalComponent {
  @Output() crossEmitter = new EventEmitter<boolean>();
  reviewForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {
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

    if(this.reviewForm.valid){
      console.log(this.reviewForm.value);
      
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
