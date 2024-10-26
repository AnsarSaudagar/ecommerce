import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(
    private authenticationService: AuthenticationService,
    private cartsService: CartsService
  ){}

  ngOnInit() : void{
    const userId = +this.authenticationService.loggedData.id;

    this.cartsService.getActiveCartProducts(userId).subscribe(products => {
      console.log(products);
    })
    
  }
}
