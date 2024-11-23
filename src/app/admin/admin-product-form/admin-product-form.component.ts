import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryModel } from 'src/app/models/product_category.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrl: './admin-product-form.component.css',
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  allCategories: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: ProductCategoryService
  ) {
    this.productForm = this.fb.group({
      id: [{ value: 1, disabled: true }], // Read-only
      name: ['', [Validators.required, Validators.maxLength(255)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(1024)],
      category_id: [null, [Validators.required]],
      image: [
        null,
      ],
    });
  }

  ngOnInit(): void {
    this.categoryService.getProductCategories().subscribe({
      next: (categories: ProductCategoryModel[]) => {
        this.allCategories = categories;
      },
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.getRawValue();
      console.log('Form Submitted:', productData);
    }
  }
}
