import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating-view',
  templateUrl: './star-rating-view.component.html',
  styleUrl: './star-rating-view.component.css'
})
export class StarRatingViewComponent {

  @Input() rating: number = 4.5;
  @Input() totalStars: number = 5;
  @Input() activeColor: string = '#fdbc00';
  @Input() inactiveColor: string = '#e6e6e6';
  @Input() isInteractive: boolean = true;
  @Input() starSize: string = "15px";

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
}
