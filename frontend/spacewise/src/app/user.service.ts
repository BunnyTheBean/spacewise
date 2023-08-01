import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable, catchError, of, throwError } from 'rxjs';
import { NotificationColour, NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  private usersUrl = 'http://localhost:5001/api/users';
  private notesUrl = this.usersUrl + '/notes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      catchError((error) => {
        let message = "Es ist ein unbekannter Fehler aufgetreten. Versuchen Sie es bitte erneut."
        
        if (error.status == 409) {
          message = `Der Name "${user.username}" scheint bereits vergeben zu sein.`;
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
    );
  }

  getNotesForUser(userId: number): Observable<string> {
    return this.http.get<string>(`${this.notesUrl}/${userId}`);
  }

  updateNotesForUser(userId: number, newNotes: string): Observable<any> {
    const user: User = {
      id: userId,
      notes: newNotes
    };

    return this.http.put(this.notesUrl, user, this.httpOptions);
  }
}
