import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn!: boolean;
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    // auth.getUserDetails();
   }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewSession();
    }
  }

  onLogout() {
    this.auth.logout();
  }

}
