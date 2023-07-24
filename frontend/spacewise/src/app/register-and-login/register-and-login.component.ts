import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register-and-login.component.html',
  styleUrls: ['./register-and-login.component.css']
})
export class RegisterAndLoginComponent {
  username = new FormControl('');
  password = new FormControl('');
  isLogin: boolean = false;
  buttonText: string = 'Registrieren';

  constructor(private userService: UserService, private route: ActivatedRoute) {
    const urlPath = route.snapshot.url[0].path.toLowerCase();
    if (urlPath == 'login') {
      this.isLogin = true;
      this.buttonText = 'Einloggen';
    }
  }

  public buttonClicked(): void {
    if (this.isLogin) {
      this.login();
    } else {
      this.register();
    }
  }

  private login(): void {
    if (!this.username.value || !this.password.value) {
      console.error("Empty inputs on login!");
    }

    const user = this.getUserFromForm();

    this.userService.login(user).subscribe(user => {
      console.log(user);
    });
  }

  private register(): void {
    if (!this.username.value || !this.password.value) {
      console.error("Empty inputs on register!");
    }
    
    const user = this.getUserFromForm();

    this.userService.registerUser(user).subscribe(_ => {
      this.username.setValue('');
      this.password.setValue('');
    });
  }

  private getUserFromForm(): User {
    return {
      username: this.username.value!,
      password: this.password.value!
    }
  }
}