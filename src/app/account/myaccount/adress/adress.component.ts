import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css'],
})
export class AdressComponent implements OnInit {
  showAddressForm: boolean = false;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.getAddresses().subscribe({
      next: (address) => {
        console.log(address);
      },
    });
  }

  onClickNewAddress() {
    this.showAddressForm = !this.showAddressForm;
  }
  onCancelEmitter() {
    this.showAddressForm = !this.showAddressForm;
  }
}
