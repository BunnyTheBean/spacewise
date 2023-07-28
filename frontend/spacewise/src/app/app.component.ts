import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpaceWise';
  loggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.loginEvent.subscribe(loggedInStatus => {
      this.loggedIn = loggedInStatus;
    });
  }

  logout(): void {
    this.loginService.currentUser = null;
    this.loginService.loginEvent.emit(false);

    const url = this.router.url.toLowerCase()
    if (url.includes('edit') || url.includes('create')) {
      this.router.navigateByUrl('/home')
    }
  }
}
