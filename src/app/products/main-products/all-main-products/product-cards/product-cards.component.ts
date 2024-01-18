import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDataService } from 'src/app/auth/user-data.service';
import { DataService, ProductDetails } from 'src/app/data.service';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent {
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService) { }

  faHeart = faHeart
  css = 'grid grid-col-2'
  email = ''
  userData!: any;
  cartCount = 1;
  productArr = []
  // @Input() products: any;
  category = ""
  dropDownFilter = ""

  // Pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12]
  productId!: number;
  productArrCount = []
  productArrWish = []
  url = ""
  allProducts = []
  ngOnInit(): void {
    this.dataService.getProductsByCategory().subscribe(data => {
      this.allProducts = data;
    })
    this.url = this.router.url;
    // console.log(url.split('/')[1]);
    if (this.url.split('/')[1] === 'collections') {
      this.gettingData();
    } else if (this.url.split('/')[1] === 'wishlist') {
      if (localStorage.getItem('userData')) {
        this.email = JSON.parse(localStorage.getItem('userData')).email
      }
      this.getWishlistData(this.email);
    }


    if (localStorage.getItem('userData')) {
      this.email = JSON.parse(localStorage.getItem('userData')).email
    }
    this.userDataService.getSpecificUserData(this.email).subscribe(data => {
      this.userData = data;
      console.log(this.userData);

    })
    // this.route.params.subscribe((params: Params) => {
    //   this.dataService.getProductsByCategory().subscribe((products => {
    //     this.productArr = products;
    //   }), () => {

    //   }, () => {
    //     this.productId = +params['productId'];
    //     // this.product = this.dataService.getProductById(this.productId, this.productArr)
    //     console.log(this.productId);


    //   });
    // })

  }

  gettingData() {
    this.route.params.subscribe((params: Params) => {
      this.category = params['category']
      this.route.queryParams.subscribe((params1: Params) => {
        this.dropDownFilter = params1['filterDropdown']

        this.dataService.getProductsByCategory(this.category).subscribe(data => {
          if (!this.dropDownFilter) {
            // console.log("check");

            this.productArr = data
          } else if (this.dropDownFilter) {
            if (this.dropDownFilter === 'All') {
              this.productArr = data
              console.log("all");

            } else if (this.dropDownFilter === 'best-selling') {
              this.dataService.getBestSellingProducts().subscribe(bestData => {
                this.productArr = bestData.slice(0, 30)
              })
            } else if (this.dropDownFilter === 'ascending-num') {
              this.dataService.getProductsByPrice(this.dropDownFilter).subscribe(priceData => {
                this.productArr = priceData

              })
            } else if (this.dropDownFilter === 'descending-num') {
              this.dataService.getProductsByPrice(this.dropDownFilter).subscribe(priceData => {
                this.productArr = priceData

              })
            } else if (this.dropDownFilter === 'ascending-alpha') {
              this.dataService.getProductsByAlphabet(this.dropDownFilter).subscribe(alphaData => {
                this.productArr = alphaData
              })
            } else if (this.dropDownFilter === 'descending-alpha') {
              this.dataService.getProductsByAlphabet(this.dropDownFilter).subscribe(alphaData => {
                this.productArr = alphaData
              })
            }
          }
        }, () => { }, () => {
          this.productArrCount = this.productArr.map(item => { return 1 })
          this.productArrWish = this.productArr.map((product) => {
            return false
          })
          // console.log(this.productArrWish);

        })
      })
    })
  }

  getWishlistData(email: string) {
    this.dataService.getProductsByCategory().subscribe(data => {
      this.userDataService.getUserWishlist(email, data).subscribe(wishlist => {
        this.productArr = wishlist;
      }, () => { }, () => {
        this.productArrCount = this.productArr.map(item => { return 1 })
        this.productArrWish = this.productArr.map((product) => {
          return false
        })
      })
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.gettingData()
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.gettingData();
  }

  showProduct(id: number) {
    const url = this.router.url;
    console.log(url);

    this.router.navigate([url, 'products', id])
  }
  onClickPlus(index: number) {
    this.productArrCount[index]++;
  }
  onClickMinus(index: number) {
    if (this.productArrCount[index] > 1)
      this.productArrCount[index]--;
  }

  onClickRemove(id: number) {
    this.productArr = this.userDataService.deleteItemWishlist(id, this.userData, this.allProducts)

  }

  onClickAddToCart(productId: number, index: number) {
    console.log(index);
    this.userDataService.getSpecificUserData(this.email).subscribe(data => {
      console.log(data);

      this.userDataService.addProductCart(data, productId, this.productArrCount[index])
    })
  }

  getWishCheck() {
    if (this.userData) {
      if (this.userData['wishlist'].includes(this.productId)) {
        return true;
      } else {
        return false
      }
    }
  }
  onClickHeart() {
    this.userDataService.addProductWishlist(this.userData, this.productId);
  }

}
