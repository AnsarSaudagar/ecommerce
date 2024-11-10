import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { CartModel } from 'src/app/models/cart.model';
import { CartSharedDataService } from 'src/app/services/cart-shared-data.service';
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

  cartProductIds: any = [];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartsService: CartsService,
    private cartSharedDataService: CartSharedDataService
  ) {}

  ngOnInit(): void {
    this.getProductsCategoryWise();
    // this.getCartCategoryWise();
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
   * @param id
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
    const cartData : CartModel = {
      user_id: +user.id,
      product_id: product_id,
    };

    // Sending data for increasing cart count 
    this.cartSharedDataService.sendData(1);

    // when product is added we are calling the function to handle the add to cart button
    this.cartsService.addProductToCart(cartData).subscribe({
      complete: () => this.getCartCategoryWise(),
    });
  }

  /**
   * 
   * @param product_id 
   * 
   * 
   */
  onClickRemoveFromCart(product_id: number) {
    const user_id = +this.authenticationService.loggedData.id;

    // Sending data for decreasing 
    this.cartSharedDataService.sendData(-1);

    this.cartsService.deleteSingleProductCart(user_id, product_id).subscribe({
      complete: () => this.getCartCategoryWise(),
    });
  }

  /**
   * @description It will fetch the ids of the products which are in carts and assign it to array for using this in template
   */
  getCartCategoryWise() {
    const user_id = +this.authenticationService.loggedData.id;

    let category_id: number;
    this.route.params.subscribe((param) => {
      category_id = +param.category_id;
    });

    this.cartsService
      .getCartProductsIdByCategory(user_id, category_id)
      .subscribe((ids: number[]) => {
        this.cartProductIds = ids;
      });
  }
}
