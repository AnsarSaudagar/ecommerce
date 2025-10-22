import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE_NODE_URL') private apiNodeUrl: string
  ) {}

  /**
   *
   * @returns An observable with all the products
   */
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiNodeUrl + 'products');
  }

  /**
   *
   * @param id
   * @returns An observable with a single product data stored
   */
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      this.apiNodeUrl + 'products/get-product/' + id
    );
  }

  /**
   *
   * @param category_id
   *
   * @returns observables of array products
   * @summary  added an extra property of carts for showing it as default value while adding to cart
   */
  getProductsByCategory(category_id: number): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(this.apiNodeUrl + 'products/' + category_id)
      .pipe(
        map((products: ProductModel[]) =>
          products.map((product: ProductModel) => ({
            ...product,
            cart: 1,
          }))
        )
      );
  }

  updateProduct(product_details: any) {
  
    return this.http.patch(
      this.apiNodeUrl + 'products/update',
      product_details,
    );
  }
}
