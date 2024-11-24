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
  inputClass : string = "border h-10 w-full mt-4 indent-2 focus:outline-none"

  @Output() cancelEmitter = new EventEmitter<any>();

  constructor(private fb: FormBuilder){
    this.addressForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: [null, [Validators.required]],
      phone_number: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      is_default: [false]
    });
  }

  onSubmitNewAdress(){
    if(this.addressForm.valid){
      this.addressForm.reset();
    }
  }
  
  onClickCancel(){
    this.cancelEmitter.emit();
  }
}
