import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Blogpost, BlogpostCategory } from '../models/blogpost';
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
      case '/blogpost/list/allposts':
        this.initializeAllPosts();
        break;
      case '/blogpost/list/celestialbodies':
        this.initializeCelestialBodies();
        break;
      case '/blogpost/list/physics':
        this.initializePhysics();
        break;
      case '/blogpost/list/technology':
        this.initializeTechnology();
        break;
      case '/blogpost/list/other':
        this.initializeOther();
        break;
      case '/blogpost/list/search':
        this.initializeSearch();
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

  private initializeAllPosts(): void {
    this.title = "Alle Blogposts";
    this.blogpostService.getAllBlogposts().subscribe(posts => {
      this.blogposts = posts;
    });
  }

  private initializeCelestialBodies(): void {
    this.title = "Blogposts über Himmelskörper";
    this.fillBlogpostsForCategory(BlogpostCategory.CelestialBodies);
  }

  private initializePhysics(): void {
    this.title = "Blogposts über Physik";
    this.fillBlogpostsForCategory(BlogpostCategory.Physics);
  }

  private initializeTechnology(): void {
    this.title = "Blogposts über Technik";
    this.fillBlogpostsForCategory(BlogpostCategory.Technology);
  }

  private initializeOther(): void {
    this.title = "Blogposts über Andere Themen";
    this.fillBlogpostsForCategory(BlogpostCategory.Other);
  }

  private initializeSearch(): void {
    
  }

  private fillBlogpostsForCategory(category: number): void {
    this.blogpostService.getAllBlogpostsForCategory(category).subscribe(posts => {
      this.blogposts = posts;
    });
  }

  private initializeDefault(): void {
    this.title = "-";
  }
}
