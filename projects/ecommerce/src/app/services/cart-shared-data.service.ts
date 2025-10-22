import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartSharedDataService {

  public cartSubject = new Subject<any>();
  constructor() { }

  sendData(count: number){
    this.cartSubject.next(count);
  }
}
