import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = ''; // validation error handle
  error: { name: string; message: string } = { name: '', message: '' }; // for firbase error handle

  resetPassword = false;
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  validateForm(email, password) {
    if (email.lenght === 0) {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.lenght < 6) {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;
  }
  loginByEmail() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.auth
        .loginWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/admin-layout']);
          // alert("susscess login!")
        })
        .catch((_error) => {
          this.error = _error;
          this.router.navigate(['/login']);
        });
    }
  }
  login() {
    this.auth.login();
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP =
      /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (email.length === 0 && !EMAIL_REGEXP.test(email)) {
      return false;
    }

    return true;
  }

  sendResetEmail() {
    this.clearErrorMessage();

    this.auth
      .resetPassword(this.email)
      .then(() => (this.resetPassword = true))
      .catch((_error) => {
        this.error = _error;
      });
  }

  signOut() {
    this.auth.signOut();
  }
}
