import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-old/auth.service';
import { UserDataService } from 'src/app/auth-old/user-data.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-all-main-products',
  templateUrl: './all-main-products.component.html',
  styleUrls: ['./all-main-products.component.css']
})
export class AllMainProductsComponent implements OnInit {

  productsArr: any = []

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService) { }

  showSpinner = true;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.dataService.getProductsByCategory().subscribe((products => {
        this.productsArr = products;
        // console.log(this.productsArr);
        setTimeout(() => {
          this.showSpinner = false;

        }, 500);

      }));
    })
  }
}
