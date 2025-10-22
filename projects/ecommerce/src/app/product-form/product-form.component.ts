// src/app/product-form/product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.maxLength(1024)]],
      category_id: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Product Data:', this.productForm.value);
      // Perform your API call or other logic here
    } else {
      console.log('Form is invalid');
    }
  }

  get formControls() {
    return this.productForm.controls;
  }
}
