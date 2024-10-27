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

  ngOnInit(): void {
    const userId = +this.authenticationService.loggedData.id;

    this.cartsService.getActiveCartProducts(userId).subscribe((carts) => {
      this.cartProducts = carts;
    });
  }

  onClickOperator(cart_id: number, count: number, current_count: number) {

    if(current_count === 1 && count === -1) return;

    this.cartSharedDataService.sendData(count);
    
    this.cartsService
      .updateCartCount(cart_id, count)
      .subscribe((count_value: any) => {
        this.cartProducts.map((product) => {
          if (+product.cart_id === cart_id ) {
            product.count = count_value.count;
          }
        });
      });
  }
}
