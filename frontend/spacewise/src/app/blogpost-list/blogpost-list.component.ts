import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Blogpost, BlogpostCategory } from '../models/blogpost';
import { BlogpostService } from '../blogpost.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnDestroy {
  title: string = '';
  blogposts: Blogpost[] = [];
  navigationSubscription: Subscription;
  isSearchList: boolean = false;

  constructor(private router: Router, private blogpostService: BlogpostService, private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.initialize();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private initialize(): void {
    const url = this.router.url.split('?')[0].toLowerCase();
    
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
      case '/home':
        this.initializeHome()
        break;
      default:
        this.initializeDefault();
    }
  }

  private initializeHome(): void {
    this.blogpostService.getAllBlogposts().subscribe((data) => {
      this.blogposts = data.length >= 6 ? data.slice(-6).reverse() : data.reverse();
    });
  }

  private initializeMyPosts(): void {
    this.title = "Meine Blogposts";
    this.blogpostService.getAllBlogpostsForCurrentUser().subscribe(posts => {
      this.blogposts = posts.reverse();
    });
  }

  private initializeAllPosts(): void {
    this.title = "Alle Blogposts";
    this.blogpostService.getAllBlogposts().subscribe(posts => {
      this.blogposts = posts.reverse();
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
    const keywords = this.route.snapshot.queryParamMap.get('searchString')?.split(' ') ?? [];
    
    this.title = "Suchergebnisse für: ";
    for (let keyword of keywords) {
      this.title += keyword + ' ';
    }
    this.title = this.title.trim();
    this.isSearchList = true;

    this.blogpostService.getOrderedBlogpostsForKeywords(keywords).subscribe(posts => {
      this.blogposts = posts;

      if (this.blogposts.length == 0) {
        this.title = "Leider gab es keine Treffer."
        const tips = document.getElementById('search-tips') as HTMLElement;
        tips.style.display = "block";
      }
    });
  }

  private fillBlogpostsForCategory(category: number): void {
    this.blogpostService.getAllBlogpostsForCategory(category).subscribe(posts => {
      this.blogposts = posts.reverse();
    });
  }

  private initializeDefault(): void {
    this.title = "-";
  }
}
