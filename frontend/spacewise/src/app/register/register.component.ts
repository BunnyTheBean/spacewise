import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = new FormControl('');
  password = new FormControl('');

  constructor(private userService: UserService) { }

  public register(): void {
    if (!this.username.value || !this.password.value) {
      console.error("Empty inputs on register!");
    }
    
    const user: User = {
      username: this.username.value!,
      password: this.password.value!
    }

    this.userService.registerUser(user).subscribe(user => {
      console.log("TEST REGISTER");
      console.log(user);
    });
  }
}