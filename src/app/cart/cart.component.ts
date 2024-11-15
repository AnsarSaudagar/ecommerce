import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { CartsService } from '../services/carts.service';
import { CartSharedDataService } from '../services/cart-shared-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private cartsService: CartsService,
    private cartSharedDataService: CartSharedDataService
  ) {}

  cartProducts: any;
  discount: number = 100;
  tax: number = 18;
  originalPrice: number = 0;
  totalPrice: number = 0;

  ngOnInit(): void {

    const userId = +JSON.parse(localStorage.getItem("userData"))?.id;

    this.cartsService.getActiveCartProducts(userId).subscribe((carts: any) => {
      this.cartProducts = carts;

      this.calculateTotalPrice();
    });
  }

  /**
   *
   * @param cart_id
   * @param count
   * @param current_count
   *
   * It will increase/decrease the cart count of the specific product
   */
  onClickOperator(cart_id: number, count: number, current_count: number) {
    if (current_count === 1 && count === -1) return;

    this.cartSharedDataService.sendData(count);

    const update_type = 2; // Update enum for calculation 
    this.cartsService
      .updateCartCount(cart_id, count, update_type)
      .subscribe((count_value: any) => {
        this.cartProducts.map((product) => {
          if (+product.id === +cart_id) {
            product.count = count_value.count;
            this.calculateTotalPrice();
          }
        });
      });
  }

  /**
   * Calculating the total price
   */
  calculateTotalPrice() {
    let total = 0;

    this.cartProducts.forEach((prod) => {
      total += +prod.product.price * prod.count;
    });
    this.originalPrice = total;
    this.totalPrice = this.originalPrice - this.discount + this.tax;
  }

  /**
   *
   * @param product_id
   *
   * Removing the product from the cart list and updating the cart list
   */
  onClickRemoveCart(product_id: number) {
    const userId = +JSON.parse(localStorage.getItem("userData"))?.id;

    this.cartsService.deleteSingleProductCart(userId, product_id).subscribe({
      complete: this.filterProductList(product_id),
    });
  }

  /**
   *
   * @param product_id
   *
   * helper function for filtering the cart list
   */
  private filterProductList(product_id: number) {
    return () => {
      this.cartProducts = this.cartProducts.filter((prod) => {
        return prod.product_id !== product_id;
      });
      
      this.calculateTotalPrice();
    };
  }

  /**
   * Removing all the cart products
   */
  onClickDeleteAll() {
    const userId = +this.authenticationService.loggedData?.id;

    this.cartsService.deleteFullUserCart(userId).subscribe({
      complete: () => {
        this.cartProducts = [];
        this.cartSharedDataService.sendData(0);
      },
    });
  }
}
