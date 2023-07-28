import { Component } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  constructor(private blogpostService: BlogpostService, private router: Router) {}

  searchBarControl = new FormControl('');

  onSearch(): void {
    const searchString = this.searchBarControl.value ?? '';

    if (!searchString) {
      this.router.navigateByUrl('/blogpost/list/allPosts');
      return;
    }

    this.router.navigate(["/blogpost/list/search"], {
      queryParams: {
        searchString: searchString
      }
    });
  }
}
