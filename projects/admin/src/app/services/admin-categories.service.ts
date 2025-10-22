import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategoryModel } from '../models/product-category.model';
import { environment } from 'projects/ecommerce/src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService {
  private apiUrl = environment.backendJavaUrl + "admin";

  constructor(private http: HttpClient) {}

  // Get all categories
  getAllCategories(): Observable<ProductCategoryModel[]> {
    return this.http.get<ProductCategoryModel[]>(`${this.apiUrl}/product-categories`);
  }

  // Get single category
  getCategory(id: number): Observable<ProductCategoryModel> {
    return this.http.get<ProductCategoryModel>(`${this.apiUrl}/product-categories/${id}`);
  }

  // Create new category
  createCategory(category: FormData): Observable<ProductCategoryModel> {
    return this.http.post<ProductCategoryModel>(`${this.apiUrl}/product-categories`, category);
  }

  // Update category
  updateCategory(id: number, category: FormData): Observable<ProductCategoryModel> {
    return this.http.put<ProductCategoryModel>(`${this.apiUrl}/product-categories/${id}`, category);
  }

  // Delete category
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product-categories/${id}`);
  }

  // Upload category image
  uploadCategoryImage(file: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{url: string}>(`${this.apiUrl}/product-categories/upload-image`, formData);
  }
}
