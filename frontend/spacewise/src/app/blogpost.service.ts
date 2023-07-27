import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blogpost } from './models/blogpost';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  private blogpostUrl = 'http://localhost:5001/api/blogposts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllBlogposts(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>(this.blogpostUrl);
  }

  getAllBlogpostsForCurrentUser(): Observable<Blogpost[]> {
    if (!this.loginService.currentUser) {
      const emptyBlogpostArray: Blogpost[] = [];
      return of(emptyBlogpostArray);
    }

    return this.http.get<Blogpost[]>(`${this.blogpostUrl}/user/${this.loginService.currentUser.id}`)
  }

  getBlogpost(id: number): Observable<Blogpost> {
    return this.http.get<Blogpost>(`${this.blogpostUrl}/${id}`);
  }

  createBlogpost(blogpost: Blogpost): Observable<Blogpost> {
    return this.http.post<Blogpost>(this.blogpostUrl, blogpost, this.httpOptions);
  }

  updateBlogpost(blogpost: Blogpost): Observable<any> {
    return this.http.put(`${this.blogpostUrl}/${blogpost.id}`, blogpost, this.httpOptions);
  }
}
