import { Component } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../models/blogpost';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  blogposts: Blogpost[] = [];
  
  constructor(private blogpostService: BlogpostService,
              private router: Router) {
    this.blogpostService.getAllBlogposts().subscribe((data) => {
      this.blogposts = data.length >= 6 ? data.slice(-6) : data;
    });
  }
}
