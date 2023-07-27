import { EventEmitter, Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: User | null = null;
  remainingErrorsToThrow: number = 2;
  loginEvent = new EventEmitter<boolean>();
  
  private loginUrl = 'http://localhost:5001/api/users/login';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user, this.httpOptions);
  }
}
