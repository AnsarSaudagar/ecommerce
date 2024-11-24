import { Component, OnInit } from '@angular/core';
import { ProductReviewService } from 'src/app/services/product-review.service';

@Component({
  selector: 'app-product-details-mid',
  templateUrl: './product-details-mid.component.html',
  styleUrls: ['./product-details-mid.component.css']
})
export class ProductDetailsMidComponent implements OnInit{
  tabsArr = [true, false, false]

  constructor(
    private productReviewService: ProductReviewService
  ){}

  ngOnInit() : void{
    this.productReviewService.showReviewSubject.subscribe({
      next: (data)=>{
        this.clickTab(2);
      },
    })
  }

  clickTab(num: number) {
    this.tabsArr = [false, false, false]
    this.tabsArr[num] = true;
  }
}
