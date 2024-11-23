import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductCategoryModel } from 'src/app/models/product_category.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-all-products',
  templateUrl: './admin-all-products.component.html',
  styleUrl: './admin-all-products.component.css',
})
export class AdminAllProductsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private categoryService: ProductCategoryService
  ) {}

  allProducts: ProductModel[];
  allCategories: any = {};

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products: ProductModel[]) => {
        this.allProducts = products;
      },
    });

    this.categoryService.getProductCategories().subscribe({
      next: (categories: ProductCategoryModel[]) => {
        categories.forEach(category => {
          this.allCategories[category.id] = category.name;
        })
      },
    });
  }
}
