import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-products-nav-card',
  templateUrl: './main-products-nav-card.component.html',
  styleUrls: ['./main-products-nav-card.component.css']
})
export class MainProductsNavCardComponent {
  showParams = ''

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // console.log(params['show']);
      this.showParams = params['show'];
    })
  }

  getOpacity(type: string) {

    if (!this.showParams && type === 'row') {
      return true
    }

    if (this.showParams === type) {
      return true
    }
  }
  changeQuery(type: string) {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { show: type },
      queryParamsHandling: 'merge',
    })
  }
}
