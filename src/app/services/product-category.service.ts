import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) {

   }

  getProductCategories() : any{
    return this.http.get<any>(environment.backendUrl + "product-categories");
  }

}
