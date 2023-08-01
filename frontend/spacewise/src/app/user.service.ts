import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private usersUrl = 'http://localhost:5001/api/users';
  private notesUrl = this.usersUrl + '/notes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
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
