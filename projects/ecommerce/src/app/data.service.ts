import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, filter, Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment.development';

export interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: {
    id: number,
    name: string,
    image: string,
    creationAt: Date,
    updatedAt: Date,
  };
  images: string[];
  creationAt: Date;
  updatedAt: Date;  
  viewCount?: number;
  discount?: number;
  purchaseCount?: number;
  size?: string[];
  countStocks?: number;
  sale?: number;
  color?: string[];
  gender?: string;
  reviews?: {
    username: string;
    star: number;
    email?: string;
    reviewTitle: string;
    reviewContent: string;
    reviewImages?: string[];
    like: number;
    dislike: number;
  }[]
}

@Injectable({
  providedIn: 'root'
})


export class DataService {


  productArr!: ProductDetails[];
  constructor(private http: HttpClient) { }

  private fetchProducts(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${environment.firebaseDataUrl}products.json`).
      pipe(map(
        (resData) => {
          const productsArr: ProductDetails[] = [];
          for (const key in resData) {
            productsArr.push({
              ...resData[key], reviews: [
                {
                  username: 'ansar',
                  reviewTitle: "Amazing Product",
                  reviewContent: 'This products look amazing',
                  like: 20,
                  star: 5,
                  dislike: 10
                },
                {
                  username: 'Aarti',
                  reviewTitle: "Good Product",
                  reviewContent: 'nice built',
                  like: 10,
                  star: 4,
                  dislike: 6
                },
              ]
            });
          }
          return productsArr.slice(0, 200);
        }
      ))
  }


  getProductsByCategory(category?: string) {
    return this.fetchProducts().pipe(
      map((data: ProductDetails[]) => {
        // console.log(data);
        if (!category) {

          return data;
        }
        const filterArr = data.filter((product) => {

          if (product.category.name.toLocaleLowerCase() === category.toLocaleLowerCase()) {
            return true;
          }
        })
        return filterArr
      })
    )
  }

  getTrendingProducts() {
    return this.getProductsByCategory().pipe(
      map((product) => {
        product.sort((a, b) => {
          return b.viewCount - a.viewCount
        })
        return product
      })
    )
  }

  getProductsByPrice(type: string) {
    return this.getProductsByCategory().pipe(
      map((product) => {
        product.sort((a, b) => {
          if (type === 'ascending-num') {
            return a.price - b.price
          } else if (type === 'descending-num') {

            return b.price - a.price
          }
        })
        return product
      })
    )
  }

  getBestSellingProducts() {
    return this.getProductsByCategory().pipe(
      map((product) => {
        product.sort((a, b) => {
          return b.purchaseCount - a.purchaseCount
        })
        return product
      })
    )
  }

  getProductsCategory() {
    return this.fetchProducts().pipe(
      map((data) => {
        const categoryArr = [...new Set(data.map(item => item.category.name))]

        return categoryArr
      })
    )
  }

  getProductsByAlphabet(type: string) {
    return this.getProductsByCategory().pipe(
      map(data => {
        if (type === 'ascending-alpha') {
          data.sort((a, b) => a.title.localeCompare(b.title))
        } else if (type === 'descending-alpha') {
          data.sort((a, b) => b.title.localeCompare(a.title))

        }
        return data
      })
    )
  }

  getProductById(productId: number, productArr: ProductDetails[]): ProductDetails {
    return productArr.find(p => p.id === productId)
  }

}
