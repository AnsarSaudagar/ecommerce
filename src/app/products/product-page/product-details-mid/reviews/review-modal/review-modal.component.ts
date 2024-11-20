import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrl: './review-modal.component.css',
})
export class ReviewModalComponent {

  @Output() crossEmitter = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder
  ){
    document.querySelector("body").style.overflow = "hidden"
  }

  onClickCross(){
    this.crossEmitter.emit(false);
    document.querySelector("body").style.overflow = "auto"
  }
}
