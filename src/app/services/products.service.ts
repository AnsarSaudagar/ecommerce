import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): any {
    return this.http.get<any>(environment.backendUrl + 'products');
  }

  getProduct(id: number): any {
    return this.http.get<any>(environment.backendUrl + 'product/' + id);
  }

  getProductsByCategory(category_id: number): any {
    return this.http.get<any>(
      environment.backendUrl + 'products/' + category_id
    );
  }
}
