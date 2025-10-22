import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { environment } from 'projects/ecommerce/src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  private apiUrl = environment.backendJavaUrl + "admin";

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}/products`);
  }

  // Get single product
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/products/${id}`);
  }

  // Create new product
  createProduct(product: FormData): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.apiUrl}/products`, product);
  }

  // Update product
  updateProduct(id: number, product: FormData): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.apiUrl}/products/${id}`, product);
  }

  // Delete product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  // Upload product image
  uploadProductImage(file: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{url: string}>(`${this.apiUrl}/products/upload-image`, formData);
  }
}
