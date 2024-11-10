import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { CartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  // cartCountSubject = new Subject<any>();

  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private apiUrl: string,
    @Inject("API_BASE_NODE_URL") private apiNodeUrl: string
  ) {}

  /**
   *
   * @param product_data
   * @returns
   *
   * @description it will add the product to the user cart
   */
  addProductToCart(product_data: CartModel) {
    return this.http.post(this.apiNodeUrl + 'cart', product_data);
  }

   getActiveCartProducts(user_id: number) {
    return this.http.get(this.apiUrl + 'carts/' + user_id);
  }

  getCartProductsIdByCategory(user_id: number, category_id: number) {
    return this.http.get(`${this.apiUrl}carts/${user_id}/${category_id}`).pipe(
      map((carts: any) => {
        return carts.map((cart) => cart.product_id);
      })
    );
  }

  deleteSingleProductCart(user_id: number, product_id: number) {
    return this.http.delete(`${this.apiUrl}carts/${user_id}/${product_id}`);
  }

  updateCartCount(cart_id: number, count: number) {
    return this.http.patch(this.apiUrl + 'carts/' + cart_id, {
      count: count,
    });
  }

  getCartCount(user_id: number) {
    return this.http.get(this.apiUrl + 'cart-count/' + user_id);
  }

  deleteFullUserCart(user_id: number) {
    return this.http.delete(this.apiUrl + 'carts/' + user_id);
  }
}
