import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  categoryArr: any = [];

  defaultCategoryImg = "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg";
  categoryImg = [
    'https://cdn.vox-cdn.com/thumbor/Y3phG98xTqqbt4KypEV-58uDE60=/0x0:1280x960/920x613/filters:focal(538x378:742x582):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63708474/20151008-everlane-retail-clothing.0.1537464045.0.jpg',
    'https://m.media-amazon.com/images/I/71H2fTuroLL._AC_UF894,1000_QL80_.jpg',
    'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg',
    'https://images-eu.ssl-images-amazon.com/images/I/81+LHxB-R3L._AC_SR462,693_.jpg',
  ];

  showSpinner = true;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getProductsCategory().subscribe(
      (data) => {
        this.categoryArr = data;
        setTimeout(() => {

          this.showSpinner = false;
        }, 500);
      },
      () => { },
      () => {
        this.categoryArr.forEach((data, i: number) => {
          console.log(data);

          if (data === 'Others') {
            this.categoryArr.splice(i, 1);
          }
        });
        this.categoryArr.push('others');
        console.log(this.categoryArr);
      }
    );
  }

  onClickCategory(category: string) {
    console.log(category);
    this.router.navigate(['/collections', category]);
    // this.router.navigate(['/collections', category], {
    //   queryParams: { show: 'row' }
    // });

  }
}
