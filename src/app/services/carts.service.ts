import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private apiUrl: string
  ) {}


  /**
   * 
   * @param product_data 
   * @returns 
   * 
   * @description it will add the product to the user cart
   */
  addProductToCart(product_data: any) {
    return this.http.post(this.apiUrl + 'add-cart', product_data).subscribe();
  }
}
