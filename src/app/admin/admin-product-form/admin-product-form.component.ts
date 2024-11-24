import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryModel } from 'src/app/models/product_category.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrl: './admin-product-form.component.css',
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  allCategories: any;
  product_id: number;
  selectedFileBase64: string | null = null;
  selectedFile: File | null;

  constructor(
    private fb: FormBuilder,
    private categoryService: ProductCategoryService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [{ value: 1, disabled: true }], // Read-only
      name: ['', [Validators.required, Validators.maxLength(255)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(1024)],
      category_id: [null, [Validators.required]],
      image: [null],
    });

    this.route.params.subscribe({
      next: (params) => {
        this.product_id = params.id;
      },
    });
  }

  ngOnInit(): void {
    this.categoryService.getProductCategories().subscribe({
      next: (categories: ProductCategoryModel[]) => {
        this.allCategories = categories;
      },
    });

    this.productService.getProduct(this.product_id).subscribe({
      next: (product_data) => {
        this.productForm.patchValue(product_data);
      },
    });
  }

  getDirtyValues(form: FormGroup | FormArray): any {
    const dirtyValues: any = {};
  
    // Traverse through the controls in the form
    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.controls[key];
  
      if (currentControl.dirty) {
        if (currentControl instanceof FormGroup || currentControl instanceof FormArray) {
          // Recursively get dirty values for nested FormGroups or FormArrays
          dirtyValues[key] = this.getDirtyValues(currentControl);
        } else {
          // Add the dirty value to the object
          dirtyValues[key] = currentControl.value;
        }
      }
    });
  
    return dirtyValues;
  }
  
  appendToFormData(formData: FormData, dirtyValues: any, parentKey: string = ''): void {
    // Iterate over the dirtyValues object to append data
    Object.keys(dirtyValues).forEach((key) => {
      const value = dirtyValues[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;
  
      if (value && typeof value === 'object' && !(value instanceof File)) {
        // Recursively handle nested objects (e.g., FormGroups or FormArrays)
        this.appendToFormData(formData, value, formKey);
      } else {
        // Append primitive values or files
        formData.append(formKey, value);
      }
    });
  }
  
  onSubmit() {
    const dirtyValues = this.getDirtyValues(this.productForm); // Get all changed (dirty) values
    const formData = new FormData();
  
    this.appendToFormData(formData, dirtyValues); // Append values to FormData
  
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`); // Verify the content
    });

    formData.append("id", "" + this.product_id)
    if(this.selectedFile){
      formData.append("image", this.selectedFile);
    }
  
    // Send FormData to the backend
    this.productService.updateProduct(formData).subscribe((res) => {
      console.log("done");
      this.router.navigate(['admin', "products"]);
      
    })
  }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
