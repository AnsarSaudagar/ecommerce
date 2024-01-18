import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details-mid',
  templateUrl: './product-details-mid.component.html',
  styleUrls: ['./product-details-mid.component.css']
})
export class ProductDetailsMidComponent {
  tabsArr = [true, false, false]

  clickTab(num: number) {
    this.tabsArr = [false, false, false]
    this.tabsArr[num] = true;
  }
}
