import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService) {}
  logout() {
    this.auth.signOut();
  }
  ngOnInit(): void {}
}
