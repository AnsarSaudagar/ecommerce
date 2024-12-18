import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  awsProductUrl :string;
  constructor(
    private productService: ProductsService,
    private categoryService: ProductCategoryService,
    private router: Router,
    @Inject('S3_BUCKET_URL') awsUrl: string
  ) {
    // console.log(awsUrl);
    this.awsProductUrl = awsUrl;
    
  }

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
        categories.forEach((category) => {
          this.allCategories[category.id] = category.name;
        });
      },
    });
  }

  onClickName(product_id: number) {
    this.router.navigate(['/admin/products/' + product_id]);
  }
}
