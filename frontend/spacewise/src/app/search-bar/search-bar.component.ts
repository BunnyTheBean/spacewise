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
    this.blogpostService.searchBarBuffer = this.searchBarControl.value ?? '';
    this.router.navigateByUrl("/blogpost/list/search");
  }
}
