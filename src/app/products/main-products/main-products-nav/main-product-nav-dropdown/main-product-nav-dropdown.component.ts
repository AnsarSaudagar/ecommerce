import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-products-nav-dropdown',
  templateUrl: './main-product-nav-dropdown.component.html',
  styleUrls: ['./main-product-nav-dropdown.component.css']
})
export class MainProductNavDropdownComponent {
  faDown = faAngleDown
  faUp = faAngleUp
  count = 0;
  dropdownMain!: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      // console.log(params['filterDropdown']);
      switch (params['filterDropdown']) {
        case undefined:
          this.dropdownMain = 'All'
          break;
        case 'All':
          this.dropdownMain = 'All'
          break;
        case 'best-selling':
          this.dropdownMain = 'Best Selling'
          break;
        case 'ascending-alpha':
          this.dropdownMain = 'Alphabetically, A-Z'
          break;
        case 'descending-alpha':
          this.dropdownMain = 'Alphabetically, Z-A'
          break;
        case 'ascending-num':
          this.dropdownMain = 'Prize, low to high'
          break;
        case 'descending-num':
          this.dropdownMain = 'Prize, low to high'
          break;
      }


    })
  }

  getArrows() {
    if (this.count === 1 || this.count % 2 !== 0) {
      return this.faDown;
    } else {
      return this.faUp;
    }
  }
  increaseCount() {
    this.count++;
  }

  changeQuery(type: string, text: string) {
    // this.dropdownMain = text
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { filterDropdown: type },
      queryParamsHandling: 'merge',
    })
  }
}
