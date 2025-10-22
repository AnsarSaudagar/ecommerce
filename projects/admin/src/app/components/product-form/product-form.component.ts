import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminProductsService } from '../../services/admin-products.service';
import { AdminCategoriesService } from '../../services/admin-categories.service';
import { ProductModel } from '../../models/product.model';
import { ProductCategoryModel } from '../../models/product-category.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  categories: ProductCategoryModel[] = [];
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isEditMode = false;
  productId: number | null = null;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private productsService: AdminProductsService,
    private categoriesService: AdminCategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      category_id: ['', Validators.required],
      image: ['']
    });
  }

  checkEditMode(): void {
    this.productId = this.route.snapshot.paramMap.get('id') ? 
      +this.route.snapshot.paramMap.get('id')! : null;
    
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.productsService.getProduct(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          description: product.description,
          category_id: product.category_id
        });
        
        if (product.image) {
          this.imagePreview = product.image;
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.isLoading = false;
      }
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;
    this.productForm.patchValue({ image: null });
  }

  onSubmit(): void {
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('price', this.productForm.value.price);
      formData.append('description', this.productForm.value.description || '');
      formData.append('category_id', this.productForm.value.category_id);
      
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      const request = this.isEditMode 
        ? this.productsService.updateProduct(this.productId!, formData)
        : this.productsService.createProduct(formData);

      request.subscribe({
        next: (product) => {
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('Error saving product:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
  }
}
