import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedIn: boolean = false;
  
  constructor(private loginService: LoginService) {
    if (loginService.currentUser) {
      this.loggedIn = true;
    }
  }

  public logout(): void {
    this.loginService.currentUser = null;
    this.loggedIn = false;
  }
}
