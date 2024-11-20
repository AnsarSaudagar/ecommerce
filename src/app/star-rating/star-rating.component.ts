import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() totalStars: number = 5;
  @Input() activeColor: string = '#fdbc00';
  @Input() inactiveColor: string = '#e6e6e6';
  @Input() isInteractive: boolean = true;
  @Output() ratingChange = new EventEmitter<number>();

  get stars(): any[] {
    const fullStars = Math.floor(this.rating);
    const hasPartialStar = this.rating % 1 !== 0;
    const emptyStars = this.totalStars - fullStars - (hasPartialStar ? 1 : 0);

    const arr = [...Array(fullStars).fill('full')];

    if (hasPartialStar) {
      arr.push('partial');
    }
    arr.push(...Array(emptyStars).fill('empty'));
    return arr;
  }

  rate(star: number): void {
    if (this.isInteractive) {
      this.rating = star;
      this.ratingChange.emit(this.rating);
    }
  }
}
