import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faCartShopping,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth-old/auth.service';
import { AuthenticationService } from '../auth/authentication.service';
import { CartsService } from '../services/carts.service';
import { CartSharedDataService } from '../services/cart-shared-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  faSearch = faSearch;
  faUser = faUser;
  faHeart = faHeart;
  faCart = faCartShopping;
  faHam = faBars;
  cartCount: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private cartsService: CartsService,
    private cartSharedDataService: CartSharedDataService
  ) {}

  userData!: any;
  loginCheck!: boolean;

  checkLogin() {
    this.userData = localStorage.getItem('userData');
    this.loginCheck = this.userData ? true : false;
  }

  ngDoCheck(): void {
    this.checkLogin();
  }

  ngOnInit(): void {
    this.checkLogin();
    this.authService.loginEmit.subscribe((data) => {
      console.log(data);
      this.checkLogin();
    });

    this.getCartCount();
  }

  onClickUser() {
    this.router.navigate(['/account', 'myAccount']);
  }

  onClickLogo() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.checkLogin();
    this.router.navigate(['/']);
  }
  onClickLogin() {
    this.router.navigate(['/account', 'login']);
  }

  onClickWishlist() {
    if (localStorage.getItem('userData')) {
      this.router.navigate(['/wishlist']);
    } else {
      this.router.navigate(['/account', 'login']);
    }
  }
  onClickCart() {
    if (localStorage.getItem('userData')) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/account', 'login']);
    }
  }

  /**
   * Getting the user cart count and updating the value whenever the product value is increased or decreased
   */
  getCartCount() {
    const user_id = this.authenticationService.loggedData?.id;

    this.cartsService.getCartCount(+user_id).subscribe((data: any) => {
      this.cartCount = +data.cart_count;

      this.cartSharedDataService.cartSubject.subscribe((d) => {
        if (d === 0) {
          this.cartCount = 0;
          return;
        }
        this.cartCount += +d;
      });
    });
  }
}
