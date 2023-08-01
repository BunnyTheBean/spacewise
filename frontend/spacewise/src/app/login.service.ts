import { EventEmitter, Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationColour, NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: User | null = null;
  loginEvent = new EventEmitter<boolean>();
  
  private loginUrl = 'http://localhost:5001/api/users/login';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user, this.httpOptions).pipe(
      catchError((error) => {
        let message = "Es ist ein unbekannter Fehler aufgetreten. Versuchen Sie es bitte erneut."
        if (error.status == 401) {
          message = "Die eingegebenen Daten sind leider nicht korrekt.";
        }

        if (error.status == 0) {
          message = "Der Server ist gerade nicht erreichbar.";
        }

        this.notificationService.showNotification(
          message,
          NotificationColour.red,
          7000
        );

        return throwError(error);
      })
    );;
  }
}
