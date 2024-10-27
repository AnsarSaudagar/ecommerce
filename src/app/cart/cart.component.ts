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
    const userId = +this.authenticationService.loggedData.id;

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

    this.cartsService
      .updateCartCount(cart_id, count)
      .subscribe((count_value: any) => {
        this.cartProducts.map((product) => {
          if (+product.cart_id === cart_id) {
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
      total += +prod.price * prod.count;
    });
    this.originalPrice = total;
    this.totalPrice = this.originalPrice - this.discount + this.tax;
  }
}
