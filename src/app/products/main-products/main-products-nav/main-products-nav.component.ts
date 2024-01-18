import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-products-nav',
  templateUrl: './main-products-nav.component.html',
  styleUrls: ['./main-products-nav.component.css']
})
export class MainProductsNavComponent {
  faFilter = faFilter

}
