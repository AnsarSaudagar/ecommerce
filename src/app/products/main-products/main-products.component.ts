import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.css']
})
export class MainProductsComponent {
  url: string = ""

  constructor(private router: Router) { }

  ngOnInit(): void {
    const url = this.router.url;
    // console.log(url.split('/')[1]);
    this.url = url.split('/')[1];
  }
}
