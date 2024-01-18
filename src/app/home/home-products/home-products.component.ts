import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {
  faHeart = faHeart;
  faEye = faEye;
  faCart = faCartShopping;
  productsArr = []

  constructor(private dataService: DataService, private router: Router) { }

  isLoading = true;

  ngOnInit() {
    this.dataService.getTrendingProducts().subscribe(
      data => {
        this.productsArr = data.slice(0, 8)
        this.isLoading = false
      }

    )
  }
  onClickProduct(id, category) {
    this.router.navigate(['/collections', category, "/products", id])
  }
}
