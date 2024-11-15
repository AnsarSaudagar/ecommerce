import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { CartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  // cartCountSubject = new Subject<any>();

  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private apiUrl: string,
    @Inject('API_BASE_NODE_URL') private apiNodeUrl: string
  ) {}

  /**
   *
   * @param product_data
   * @returns
   *
   * @description it will add the product to the user cart
   */
  addProductToCart(product_data: CartModel): Observable<CartModel> {
    return this.http.post<CartModel>(this.apiNodeUrl + 'cart', product_data);
  }

  getActiveCartProducts(user_id: number): Observable<CartModel[]> {
    return this.http.get<CartModel[]>(this.apiNodeUrl + 'cart/' + user_id);
  }

  getCartProductsIdByCategory(
    user_id: number,
    category_id: number
  ): Observable<number[]> {
    return this.http
      .get<CartModel[]>(`${this.apiNodeUrl}cart/${user_id}/${category_id}`)
      .pipe(
        map((carts: CartModel[]) => {
          return carts.map((cart: CartModel) => cart.product_id);
        })
      );
  }

  // deleteSingleProductCart(cart_id : number) {
  //   return this.http.delete(`${this.apiNodeUrl}cart/${cart_id}`);
  // }
  deleteSingleProductCart(user_id: number, product_id: number) {
    return this.http.delete(`${this.apiNodeUrl}cart/${user_id}/${product_id}`);
  }

  updateCartCount(cart_id: number, count: number, update_type: number) {
    return this.http.patch(this.apiNodeUrl + 'cart/' + cart_id, {
      count: count,
      update_type: update_type,
    });
  }

  getCartCount(user_id: number) {
    return this.http.get(this.apiNodeUrl + 'cart/count/' + user_id);
  }

  deleteFullUserCart(user_id: number) {
    return this.http.delete(this.apiNodeUrl + 'cart/delete/' + user_id);
  }

  createOrUpdateCart(product_id: number, count: number) {
    const token = JSON.parse(localStorage.getItem('userData'))._token;
    
    return this.http.post(
      this.apiNodeUrl + 'cart/action/' + product_id,
      {
        count: count,
      },
    );
  }
}
