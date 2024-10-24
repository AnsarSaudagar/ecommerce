import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { CartsService } from 'src/app/services/carts.service';
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
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartsService: CartsService
  ) {}

  ngOnInit(): void {
    this.getProductsCategoryWise();
  }

  /**
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

  /**
   * 
   * @param product_id
   * @returns 
   * 
   * @description If the user is logged in then it will add the product to cart or else will navigate to login page 
   */
  onClickAddToCart(product_id: number) {
    if (!this.authenticationService.loggedData) {
      this.router.navigate(['account', 'login']);
      return;
    }

    const user = this.authenticationService.loggedData;
    const cartData ={
        user_id: user.id,
        product_id: product_id,
    }

    this.cartsService.addProductToCart(cartData);
  }
}
