import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminCategoriesService } from '../../services/admin-categories.service';
import { ProductCategoryModel } from '../../models/product-category.model';
import { environment } from 'projects/ecommerce/src/environments/environment.development';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isEditMode = false;
  categoryId: number | null = null;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private categoriesService: AdminCategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  initializeForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: ['']
    });
  }

  checkEditMode(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') ? 
      +this.route.snapshot.paramMap.get('id')! : null;
    
    if (this.categoryId) {
      this.isEditMode = true;
      this.loadCategory(this.categoryId);
    }
  }

  loadCategory(id: number): void {
    this.isLoading = true;
    this.categoriesService.getCategory(id).subscribe({
      next: (category) => {
        this.categoryForm.patchValue({
          name: category.name
        });
        
        if (category.image) {
          this.imagePreview = `${environment.aws_s3_bucket_url}/category-images/${category.image}`;
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading category:', error);
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
    this.categoryForm.patchValue({ image: null });
  }

  onSubmit(): void {
    if (this.categoryForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = new FormData();
      formData.append('name', this.categoryForm.value.name);
      
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      const request = this.isEditMode 
        ? this.categoriesService.updateCategory(this.categoryId!, formData)
        : this.categoriesService.createCategory(formData);

      request.subscribe({
        next: (category) => {
          this.router.navigate(['/admin/categories']);
        },
        error: (error) => {
          console.error('Error saving category:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/categories']);
  }
}
