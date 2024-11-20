import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconBadgeComponent } from './navbar/icon-badge/icon-badge.component';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { MyaccountComponent } from './account/myaccount/myaccount.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './account/error/error.component';
import { HomeComponent } from './home/home.component';
import { HomeCategoryComponent } from './home/home-category/home-category.component';
import { HomeMainComponent } from './home/home-main/home-main.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeTrendingComponent } from './home/home-trending/home-trending.component';
import { HomeProductsComponent } from './home/home-products/home-products.component';
import { CollectionsComponent } from './collections/collections.component';
import { HeaderBottomComponent } from './header-bottom/header-bottom.component';
import { ProductsComponent } from './products/products.component';
import { MainProductsComponent } from './products/main-products/main-products.component';
import { MainProductsNavComponent } from './products/main-products/main-products-nav/main-products-nav.component';
import { AllMainProductsComponent } from './products/main-products/all-main-products/all-main-products.component';
import { MainProductsNavCardComponent } from './products/main-products/main-products-nav/main-products-nav-card/main-products-nav-card.component';
import { MainProductNavDropdownComponent } from './products/main-products/main-products-nav/main-product-nav-dropdown/main-product-nav-dropdown.component';
import { ProductCardsComponent } from './products/main-products/all-main-products/product-cards/product-cards.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IconComponent } from './icon/icon.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { ProductPageComponent } from './products/product-page/product-page.component';
import { ProductDetailsComponent } from './products/product-page/product-details/product-details.component';
import { ProductDetailsMidComponent } from './products/product-page/product-details-mid/product-details-mid.component';
import { DescriptionComponent } from './products/product-page/product-details-mid/description/description.component';
import { CustomTabComponent } from './products/product-page/product-details-mid/custom-tab/custom-tab.component';
import { ReviewsComponent } from './products/product-page/product-details-mid/reviews/reviews.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DashboardComponent } from './account/myaccount/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateModalComponent } from './account/myaccount/dashboard/update-modal/update-modal.component';
import { DashboardPipe } from './account/myaccount/dashboard.pipe';
import { AdressComponent } from './account/myaccount/adress/adress.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { environment } from 'src/environments/environment.development';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from "./account/myaccount/adress/address-form/address-form.component";
import { ProductFormComponent } from './product-form/product-form.component';
import { ReviewModalComponent } from './products/product-page/product-details-mid/reviews/review-modal/review-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { StarRatingViewComponent } from './star-rating-view/star-rating-view.component';


const appRoutes = [
  { path: '', component: HomeComponent },
  {
    path: 'account', component: AccountComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'myAccount',
        component: MyaccountComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'adress', component: AdressComponent },
          { path: '', component: DashboardComponent }
        ]
      }
    ]
  },
  {
    path: 'collections', component: CollectionsComponent
  },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'collections/:category_id', component: ProductsComponent
  },
  {
    path: 'products/:product_id', component: ProductPageComponent
  },
  {
    path: 'product-form', component: ProductFormComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IconBadgeComponent,
    AccountComponent,
    LoginComponent,
    SignupComponent,
    MyaccountComponent,
    FooterComponent,
    ErrorComponent,
    HomeComponent,
    HomeCategoryComponent,
    HomeMainComponent,
    HomeTrendingComponent,
    HomeProductsComponent,
    CollectionsComponent,
    HeaderBottomComponent,
    ProductsComponent,
    MainProductsComponent,
    MainProductsNavComponent,
    AllMainProductsComponent,
    MainProductsNavCardComponent,
    MainProductNavDropdownComponent,
    ProductCardsComponent,
    ProductDetailsComponent,
    IconComponent,
    SocialMediaComponent,
    ProductDetailsMidComponent,
    ProductPageComponent,
    DescriptionComponent,
    CustomTabComponent,
    ReviewsComponent,
    DashboardComponent,
    UpdateModalComponent,
    DashboardPipe,
    AdressComponent,
    WishlistComponent,
    CartComponent,
    SpinnerComponent,
    AddressFormComponent,
    ProductFormComponent,
    ReviewModalComponent,
    StarRatingComponent,
    StarRatingViewComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: 'API_BASE_URL',
      useValue: environment.backendUrl
    },
    {
      provide: 'API_BASE_NODE_URL',
      useValue: environment.backendNodeUrl
    },
    {
      provide: "S3_BUCKET_URL",
      useValue: environment.aws_s3_bucket_url
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
