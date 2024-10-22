import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  productArr = [];
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

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetching the data for showing products category wise
    this.route.params.subscribe(queryParams => {
        const categoryId = +queryParams.category_id;
        this.productsService.getProductsByCategory(categoryId).subscribe(products => {
            this.productArr = products;
        }) 
    });
  }
}
