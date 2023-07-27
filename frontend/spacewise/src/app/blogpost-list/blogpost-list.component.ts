import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Blogpost } from '../models/blogpost';
import { BlogpostService } from '../blogpost.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent {
  title: string = '';
  blogposts: Blogpost[] = [];

  constructor(private router: Router, private blogpostService: BlogpostService) {
    const url = router.url.toLowerCase();
    this.initialize(url);
  }

  private initialize(url: string): void {
    switch(url) {
      case '/blogpost/list/myposts':
        this.initializeMyPosts();
        break;
      default:
        this.initializeDefault();
    }
  }

  private initializeMyPosts(): void {
    this.title = "Meine Blogposts";
    this.blogpostService.getAllBlogpostsForCurrentUser().subscribe(posts => {
      this.blogposts = posts;
    });
  }

  private initializeDefault(): void {
    this.title = "-";
  }
}
