import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserDataService } from '../auth/user-data.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService) { }

  products = []
  email = ""
  showSpinner = true;

  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      this.email = JSON.parse(localStorage.getItem('userData')).email
    }

    this.dataService.getProductsByCategory().subscribe(data => {
      // this.showSpinner = true;
      this.products = data;
    }, () => { }, () => {
      this.userDataService.getUserWishlist(this.email, this.products).subscribe(data => {
        // console.log(data);

      }, () => { }, () => {
        setTimeout(() => {
          this.showSpinner = false;
        }, 800);
      });
    });
  }
}
