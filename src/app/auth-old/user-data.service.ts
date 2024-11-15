import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProductDetailsComponent } from '../products/product-page/product-details/product-details.component';
import { DataService, ProductDetails } from '../data.service';
import { AuthService } from './auth.service';
import { CartsService } from '../services/carts.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private data: DataService,
    private cartService: CartsService,
  ) {}

  getAllUsersData() {
    const userArr = [];
    return this.http.get(environment.firebaseMainUrl + '/users.json').pipe(
      map((data) => {
        for (let key in data) {
          let newObj = data[key];
          for (let key1 in newObj) {
            newObj[key1]['key'] = key;
          }
          userArr.push(newObj);
        }
        return userArr;
      })
    );
  }

  getUsernames() {
    const usernameArr = [];
    return this.getAllUsersData().pipe(
      map((data) => {
        data.forEach((user) => {
          for (let key in user) {
            usernameArr.push(key);
          }
        });
        return usernameArr;
      })
    );
  }
  getUserEmails() {
    const emailsArr = [];
    return this.getAllUsersData().pipe(
      map((data) => {
        data.forEach((user) => {
          for (let key in user) {
            emailsArr.push(user[key].email);
          }
        });
        return emailsArr;
      })
    );
  }

  getSpecificUserData(email: string) {
    let data: any;
    return this.getAllUsersData().pipe(
      map((users) => {
        users.forEach((user) => {
          for (let key in user) {
            if (user[key].email === email) {
              data = user[key];
            }
          }
        });
        return data;
      })
    );
  }

  // checkUser(name: string, password: string) {

  // }

  getUserKey(email: string) {
    let mainKey: any;
    this.getAllUsersData()
      .pipe(
        map((users) => {
          users.forEach((user) => {
            for (let key in user) {
              // console.log(user[key]);
              if (user[key].email === email) {
                mainKey = user[key].key;
              }
            }
          });
          return mainKey;
        })
      )
      .subscribe((data) => console.log(data));
  }

  addProductWishlist(userData: any, productId: number) {
    if (localStorage.getItem('userData')) {
      if (userData['wishlist'].includes(productId)) {
        userData['wishlist'].splice(userData['wishlist'].indexOf(productId), 1);
      } else {
        userData['wishlist'].push(productId);
      }

      this.authService.updateFullUser(
        userData.key,
        userData.username,
        userData
      );
    }
  }

  addProductCart(userData: any, productId: number, quantity: number) {
    const product = `product${productId}`;
    if (localStorage.getItem('userData')) {
      console.log(userData.cart);

      if (userData['cart'].length === 1) {
        userData['cart'].push({ [product]: quantity });
        this.authService.updateFullUser(
          userData.key,
          userData.username,
          userData
        );
      } else {
        this.getSpecificUserData(userData.email).subscribe((data) => {
          let filteredCart = data.cart.filter((item) =>
            item.hasOwnProperty(product)
          );
          console.log(filteredCart);
          data['cart'].forEach((item: any, index: number) => {
            if (item.hasOwnProperty(product)) {
              data['cart'][index][product] = quantity;
              this.authService.updateFullUser(
                userData.key,
                userData.username,
                data
              );
            }
          });
          if (filteredCart.length === 0) {
            data['cart'].push({ [product]: quantity });
            this.authService.updateFullUser(
              userData.key,
              userData.username,
              data
            );
          }
        });
      }
    }
  }

  getUserWishlist(email: string, productData: any) {
    let wishArr = [];
    // let mainArr = []

    return this.getSpecificUserData(email).pipe(
      map((data) => {
        console.log(data);

        wishArr = data.wishlist;

        let res = productData.filter((item) => wishArr.includes(item.id));

        return res;
      })
    );
  }

  deleteItemWishlist(productId: number, userData: any, productData: any) {
    const wishlist = userData.wishlist;

    let newWishlist = wishlist.filter((item: number) => {
      if (item !== productId) {
        return item;
      }
    });
    userData.wishlist = newWishlist;
    this.authService.updateFullUser(userData.key, userData.username, userData);

    let res = productData.filter((item: any) =>
      userData.wishlist.includes(item.id)
    );
    return res;
  }
}
