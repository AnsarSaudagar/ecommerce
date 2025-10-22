import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../modal.service';
import { AuthService } from 'projects/ecommerce/src/app/auth-old/auth.service';
import { UserDataService } from 'projects/ecommerce/src/app/auth-old/user-data.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
  topic = ""
  userData !: any;
  value = ""
  email = JSON.parse(localStorage.getItem('userData')).email;
  constructor(private modalService: ModalService, private authService: AuthService, private userDataService: UserDataService) { }
  @Output() closeEvent = new EventEmitter();

  check() {
    this.closeEvent.emit()
    this.value = ""

  }

  updateData() {
    this.authService.updateData(this.value, this.topic, this.userData.key, this.userData.username)
    this.value = ""
  }

  ngOnInit(): void {
    this.modalService.modalTopic.subscribe((data: string) => {
      this.topic = data
    });
    this.userDataService.getSpecificUserData(this.email).subscribe(data => {
      this.userData = data;
    })
  }
}
