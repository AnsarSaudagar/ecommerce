import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth-old/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faSearch = faSearch;
  faUser = faUser;
  faHeart = faHeart;
  faCart = faCartShopping
  faHam = faBars

  constructor(private router: Router, private authService: AuthService) { }

  userData !: any;
  loginCheck !: boolean;

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
      this.checkLogin()
    })
  }

  onClickUser() {
    this.router.navigate(['/account', 'myAccount'])
  }

  onClickLogo() {
    this.router.navigate(['/'])
  }

  logout() {
    this.authService.logout()
    this.checkLogin()
    this.router.navigate(['/'])
  }
  onClickLogin() {
    this.router.navigate(['/account', 'login'])
  }

  onClickWishlist() {
    if (localStorage.getItem('userData')) {
      this.router.navigate(['/wishlist'])
    } else {
      this.router.navigate(['/account', 'login'])

    }
  }
  onClickCart() {
    if (localStorage.getItem('userData')) {
      this.router.navigate(['/cart'])
    } else {
      this.router.navigate(['/account', 'login'])
    }
  }
}
