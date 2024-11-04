import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProductCategoryModel } from '../models/product_category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private apiUrl: string,
    @Inject('API_BASE_NODE_URL') private apiNodeUrl: string
  ) {}

  getProductCategories(): Observable<ProductCategoryModel[]> {
    return this.http.get<ProductCategoryModel[]>(
      this.apiNodeUrl + 'product-category'
    );
  }
}
