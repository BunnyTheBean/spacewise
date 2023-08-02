import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from './user.service';
import { NotificationColour, NotificationService } from './notification.service';

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
  navigationSubscription: Subscription;
  linkIds: string[] = [
    'allPosts', 'celestialBodies', 'physics', 'technology', 'other'
  ];

  @ViewChild('notesBox')
  notesBox!: ElementRef;

  constructor(public loginService: LoginService, 
              private router: Router, 
              private userService: UserService,
              private notificationService: NotificationService) {
    this.loginService.loginEvent.subscribe(loggedInStatus => {
      this.loggedIn = loggedInStatus;
      
      if (loggedInStatus) {
        this.updateNotepadWithUserNotes();
      }
    });

    this.navigationSubscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.setNavigationLinkStyleForUrl();
      }
    });
  }

  private setNavigationLinkStyleForUrl(): void {
    const url = this.router.url.toLowerCase();

    for (let linkId of this.linkIds) {
      const linkElement = document.getElementById(linkId);
      if (!linkElement) continue;
      linkElement.className = '';
      if (url.includes(linkId.toLowerCase())) {
        linkElement.className = 'selected';
      }
    }
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

  private updateNotepadWithUserNotes() {
    if (!this.loginService.currentUser) return;

    this.userService.getNotesForUser(this.loginService.currentUser.id!).subscribe(notes => {
      let currentNotes = this.notesBox.nativeElement.value;

      if (currentNotes.trim() == '') {
        this.notesBox.nativeElement.value = notes;
        return;
      }

      if (notes.trim() == '') {
        this.notesBox.nativeElement.value = currentNotes;
        return;
      }

      if (notes.trim() != currentNotes.trim()) {
        currentNotes = `NEU:\n${currentNotes}\n\nALT:\n${notes}`.trim();
        this.notesBox.nativeElement.value = currentNotes;
        this.userService.updateNotesForUser(this.loginService.currentUser!.id!, currentNotes).subscribe();
      }
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

  closeNotification(): void {
    this.notificationService.closeNotification();
  }
}
