import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpaceWise';

  constructor(private router: Router) {}

  slowNavigate(route: string): void {
    const delay = 500 + Math.floor(Math.random()*3000);
    console.log(delay);
    console.log(route);
    setTimeout(() => {
      this.router.navigateByUrl(route);
    }, delay);
  }
}
