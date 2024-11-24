import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { UserDataService } from 'src/app/auth-old/user-data.service';
import { AuthService } from 'src/app/auth-old/auth.service';
import { ModalService } from './modal.service';
import { UserService } from 'src/app/auth/user.service';
import { User } from 'src/app/auth/user';
import { UserModel } from 'src/app/models/user.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  faTick = faCheckCircle;
  show: any = false;
  localData = JSON.parse(localStorage.getItem('userData'));
  email = this.localData.email;
  data = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
    key: '',
  };
  modalTopic = '';
  showSpinner = true;

  // new 

  userData : UserModel;
  fullName: string;

  constructor(
    private userDataService: UserDataService,
    private auth: AuthService,
    private modalService: ModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (user: UserModel) => {
        this.userData = user;
        this.fullName = user.first_name + " " + user.last_name;
      },
      complete: () => {
        this.showSpinner = false;
      },
    });
  }

  showModal() {
    if (!this.show) {
      return true;
    } else {
      return false;
    }
  }
  clickUpdate(name: string) {
    this.show = true;
    this.modalTopic = name;
    this.getModalTopic(name);
    this.modalService.modalTopic.next(name);
  }

  closeModal() {
    this.show = false;
    console.log('checking');
    this.userDataService.getSpecificUserData(this.email).subscribe((data) => {
      this.data = data;
    });
  }

  onDeleteAccount() {
    this.auth.deleteAccount(
      this.localData._token,
      this.data.key,
      this.data.username
    );
  }

  getModalTopic(topic: string) {
    this.modalTopic = topic;
  }
}
