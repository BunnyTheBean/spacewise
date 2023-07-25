import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent {
  basePath = 'http://localhost:5001';
  imagePath: string = 'http://localhost:5001/images/x.jpg';  

  constructor(private http: HttpClient) { }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const file = input.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("formfile", file);
      
      this.http.post<string>("http://localhost:5001/api/images", formData).subscribe(fileName =>  {
        this.imagePath = `${this.basePath}/images/${fileName}`;
      });
    }
  }
}
