import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SpaceWise';
  loggedIn: boolean = false;
  flyoutIsOpen: boolean = false;
  private notesInput = new Subject<string>();

  constructor(public loginService: LoginService, private router: Router, private userService: UserService) {
    this.loginService.loginEvent.subscribe(loggedInStatus => {
      this.loggedIn = loggedInStatus;
    });
  }

  ngOnInit(): void {
    this.notesInput.pipe(
      debounceTime(1000), 
      distinctUntilChanged()
    ).subscribe((notesValue: string) => {
      if (!this.loginService.currentUser) {
        return;
      }

      this.userService.updateNotesForUser(this.loginService.currentUser.id!, notesValue).subscribe();
    });
  }

  logout(): void {
    this.loginService.currentUser = null;
    this.loginService.loginEvent.emit(false);

    const url = this.router.url.toLowerCase()
    if (url.includes('edit') || url.includes('create')) {
      this.router.navigateByUrl('/home')
    }
  }

  toggleFlyout(): void {
    this.flyoutIsOpen = !this.flyoutIsOpen;

    const body = document.getElementsByTagName("body")[0] as HTMLElement;
    body.className = this.flyoutIsOpen ? "squished-body" : "";
  }

  triggerNotesInput(value: string) {
    this.notesInput.next(value);
  }
}
