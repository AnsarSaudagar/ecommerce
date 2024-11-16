import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  // standalone: true,
  // imports: [],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
  addressForm: FormGroup;

  @Output() cancelEmitter = new EventEmitter<any>();

  constructor(private fb: FormBuilder){
    this.addressForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: [null, [Validators.required]],
      phone_number: [null, [Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  inputClass : string = "border h-10 w-full mt-4 indent-2 focus:outline-none"

  onSubmitNewAdress(){
    console.log(this.addressForm.valid);
    
  }
  
  onClickCancel(){
    this.cancelEmitter.emit();
  }
}
