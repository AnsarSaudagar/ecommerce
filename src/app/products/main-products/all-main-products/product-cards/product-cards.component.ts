import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css'],
})
export class ProductCardsComponent implements OnInit {
  faHeart = null;
  email = '';
  userData!: any;
  cartCount = 1;
  productArr: any = [];
  category = '';
  dropDownFilter = '';

  // Pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  productId!: number;
  productArrCount = [];
  productArrWish = [];
  url = '';
  allProducts = [];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductsCategoryWise();
  }

  /**
   * 
   * 
   * @description Fetching the data for showing products category wise with the help of category id from URL
   */
  getProductsCategoryWise() {
    this.productArr = this.route.paramMap.pipe(
      switchMap((params) => {
        const categoryId = +params.get('category_id');
        return this.productsService.getProductsByCategory(categoryId);
      })
    );
  }

  /**
   * 
   * @param id 
   * 
   * @description this function will redirect to specific product page
   */
  showProduct(id: number) {
    this.router.navigate(['products', id]);
  }
}
