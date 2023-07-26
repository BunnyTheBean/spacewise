import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blogpost } from './models/blogpost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  private blogpostUrl = 'http://localhost:5001/api/blogposts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  createBlogpost(blogpost: Blogpost): Observable<Blogpost> {
    return this.http.post<Blogpost>(this.blogpostUrl, blogpost, this.httpOptions);
  }
}
