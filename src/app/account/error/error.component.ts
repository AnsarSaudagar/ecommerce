import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  faError = faExclamationCircle
  @Input() formMain: FormGroup;

  ngOnit() {
    console.log(this.formMain);

  }
}
