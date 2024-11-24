import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { map, switchMap, tap } from 'rxjs';
import { UserDataService } from 'src/app/auth-old/user-data.service';
import { DataService, ProductDetails } from 'src/app/data.service';
import { ProductModel } from 'src/app/models/product.model';
import { CartSharedDataService } from 'src/app/services/cart-shared-data.service';
import { CartsService } from 'src/app/services/carts.service';
import { ProductReviewService } from 'src/app/services/product-review.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  reviewData!: {
    rating_count: number;
    average_rating: number;
  };

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private userDataService: UserDataService,

    // New product service
    private productsService: ProductsService,
    private cartService: CartsService,
    private cartSharedService: CartSharedDataService,
    private productReviewService: ProductReviewService,
    private router: Router,
  ) {

    this.route.params.subscribe({
      next: (params) => {
        this.productId = +params.product_id;
      },
    });
  }

  productId!: number;
  productArr: ProductDetails[];

  product: ProductDetails = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
      image: '',
      creationAt: new Date(),
      updatedAt: new Date(),
    },
    images: [],
    creationAt: new Date(),
    updatedAt: new Date(),
    viewCount: 0,
    discount: 0,
    purchaseCount: 0,
    size: [],
    countStocks: 0,
    sale: 0,
    color: [],
    gender: '',
    reviews: [],
  };
  faHeart = faHeart;
  productCount = 1;
  userData: any = {
    address: [],
    cart: [],
    email: '',
    firstName: '',
    key: '',
    lastName: '',
    password: '',
    username: '',
    wishlist: [],
  };
  // userDataLocal = this.userData;
  userEmail: string = '';

  imgArr = [
    'https://demo-kalles-4-1.myshopify.com/cdn/shop/products/20046729-1-offwhite.jpg?v=1652169256&width=600',
    'https://demo-kalles-4-1.myshopify.com/cdn/shop/products/20046729-2.jpg?v=1652169256&width=600',
    'https://demo-kalles-4-1.myshopify.com/cdn/shop/products/20046729-3.jpg?v=1652169256&width=600',
    'https://demo-kalles-4-1.myshopify.com/cdn/shop/products/20046729-4.jpg?v=1652169256&width=600',
  ];
  imgArrStyle = [true, false, false, false];
  mainImg = this.imgArr[0];

  // New code

  productData: ProductModel = {
    id: 0,
    name: '',
    price: 0,
    category_id: 0,
  };

  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      this.userEmail = JSON.parse(localStorage.getItem('userData')).email;
    }

    this.userDataService
      .getSpecificUserData(this.userEmail)
      .subscribe((data) => {
        this.userData = data;
        console.log(this.userData);
      });

    this.route.params.subscribe((params: Params) => {
      this.dataService.getProductsByCategory().subscribe(
        (products) => {
          this.productArr = products;
        },
        () => {},
        () => {
          this.productId = +params['productId'];
          this.product = this.dataService.getProductById(
            this.productId,
            this.productArr
          );
        }
      );
    });

    // New code

    this.getProductData();

    this.productReviewService.countAvgReview$.subscribe({
      next: (reviewData: any) => {
        this.reviewData = reviewData;
      },
    });

    this.productReviewService.getAvgRatingAndCount(this.productId);
  }

  onClickHeart() {
    this.userDataService.addProductWishlist(this.userData, this.productId);
  }

  clickSubImg(index: number) {
    this.mainImg = this.imgArr[index];
    this.imgArrStyle = [false, false, false, false];
    this.imgArrStyle[index] = true;
  }

  addProduct() {
    this.productCount++;
  }

  removeProduct() {
    if (this.productCount > 1) {
      this.productCount--;
    }
  }

  getWishCheck() {
    if (this.userData) {
      if (this.userData['wishlist'].includes(this.productId)) {
        return true;
      } else {
        return false;
      }
    }
  }

  onClickAddCart() {

    const user_id = JSON.parse(localStorage.getItem("userData"))?.id;

    if(!user_id){
      this.router.navigate(['account', 'login']);
    }

    this.cartService
      .createOrUpdateCart(this.productData.id, this.productCount)
      .subscribe({
        complete: () => {
          this.cartSharedService.sendData(this.productCount);
          this.cartService.getCartCount(user_id)
        },
      });
  }

  // New backend codes integration

  /** Fetching the data and displaying */
  getProductData() {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.productsService.getProduct(+params.get('product_id'))
        ),
        tap((product: ProductModel) => (this.productData = product))
      )
      .subscribe();
  }

  onClickReviews() {
    const element = document.querySelector('#midSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.productReviewService.showReviewSubject.next(true)
  }
}
