import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private apiUrl: string
  ) {}

  getProductCategories(): any {
    return this.http.get<any>(this.apiUrl + 'product-categories');
  }
}
