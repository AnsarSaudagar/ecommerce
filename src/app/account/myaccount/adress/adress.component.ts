import { Component } from '@angular/core';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent {
  showAddressForm : boolean= true;

  onClickNewAddress(){
    this.showAddressForm = !this.showAddressForm;
  }
  onCancelEmitter(){
    this.showAddressForm = !this.showAddressForm;
  }
}
