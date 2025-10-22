import { Component, Inject, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategoryModel } from '../models/product_category.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  categoryArr: ProductCategoryModel[] = [];

  defaultCategoryImg: string =
    'https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg';

  showSpinner: boolean = true;
  s3_folder_path: string = "/category-images/";

  constructor(
    private dataService: DataService,
    private router: Router,
    private productCategoryService: ProductCategoryService,
    @Inject("S3_BUCKET_URL") private s3BucketUrl: string
  ) {
 
  }

  ngOnInit(): void {
    this.productCategoryService.getProductCategories().subscribe({
      next: (category: ProductCategoryModel[]) => {
        this.categoryArr = category;
      },
      error: (error: object) => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.showSpinner = false;
        }, 500);
      },
    });
  }

  onClickCategory(category_id: number) {
    this.router.navigate(['/collections', category_id]);
  }
}
