import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedIn: boolean = false;
  blogposts: Blogpost[] = [];
  
  constructor(private loginService: LoginService,
              private blogpostService: BlogpostService) {
    if (loginService.currentUser) {
      this.loggedIn = true;
    }

    this.blogpostService.getAllBlogposts().subscribe((data) => {
      this.blogposts = data;
      console.log(data);
    });
  }

  public logout(): void {
    this.loginService.currentUser = null;
    this.loggedIn = false;
  }
}
