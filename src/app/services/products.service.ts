import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private apiUrl: string
  ) {}

  getAllProducts(): any {
    return this.http.get<any>(this.apiUrl + 'products');
  }

  getProduct(id: number): any {
    return this.http.get<any>(this.apiUrl + 'product/' + id);
  }

  /**
   *
   * @param category_id
   *
   * @returns observables of array products
   * @summary  added an extra property of carts for showing it as default value while adding to cart
   */
  getProductsByCategory(category_id: number): any {
    return this.http.get<any>(this.apiUrl + 'products/' + category_id).pipe(
      map((products: any) =>
        products.map((product: any) => ({
          ...product,
          cart: 1,
        }))
      )
    );
  }
}
