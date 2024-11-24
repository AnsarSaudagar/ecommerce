import { Component, OnInit } from '@angular/core';
import { AddressModel } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css'],
})
export class AdressComponent implements OnInit {
  showAddressForm: boolean = false;

  addresses: AddressModel[];
  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.getAddresses().subscribe({
      next: (addresses : AddressModel[]) => {
        this.addresses = addresses;
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
