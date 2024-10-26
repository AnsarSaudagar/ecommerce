import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private cartsService: CartsService,
    private cdr: ChangeDetectorRef
  ) {}

  cartProducts: any;

  ngOnInit(): void {
    const userId = +this.authenticationService.loggedData.id;

    this.cartsService.getActiveCartProducts(userId).subscribe((carts) => {
      this.cartProducts = carts;
    });
  }

  onClickOperator(cart_id: number, count: number) {
    this.cartsService
      .updateCartCount(cart_id, count)
      .subscribe((count_value: any) => {
        this.cartProducts.map((product) => {
          if (+product.cart_id === cart_id) {
            product.count = count_value.count;
          }
        });
      });
  }
}
