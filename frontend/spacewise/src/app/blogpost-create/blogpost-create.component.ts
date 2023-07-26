import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Blogpost, BlogpostCategory, BlogpostSection } from '../models/blogpost';
import { LoginService } from '../login.service';
import { BlogpostService } from '../blogpost.service';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent {
  basePath = 'http://localhost:5001';
  imageFileName: string = 'empty.jpg';
  imagePath: string = 'http://localhost:5001/images/empty.jpg';
  showUpload: boolean = true;
  blogpostForm: FormGroup;
  categories: string[] = ['Himmelskörper', 'Physik', 'Technik', 'Anderes'];

  constructor(private http: HttpClient, 
      private fb: FormBuilder, 
      private loginService: LoginService,
      private blogpostService: BlogpostService) {
    this.blogpostForm = fb.group({
      category: [this.categories[0]],
      sections: fb.array([ ])
    });

    this.addSection();
    this.blogpostForm.get('category')?.setValue(0);
  }

  get sections(): FormArray {
    return this.blogpostForm.get('sections') as FormArray;
  }

  addSection(): void {
    this.sections.push(this.fb.group({
      title: [''],
      content: ['']
    }));
  }

  onCreate(): void {
    const formValue = this.blogpostForm.value;
    const sections = formValue.sections as BlogpostSection[];
    const category = formValue.category as BlogpostCategory;

    const blogpost: Blogpost = {
      sections: sections,
      category: category,
      image: this.imageFileName,
      user: this.loginService.currentUser!
    };

    this.blogpostService.createBlogpost(blogpost).subscribe((x) => {
      console.log(x);
    })
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const file = input.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("formfile", file);
      
      this.http.post<string>("http://localhost:5001/api/images", formData).subscribe(fileName =>  {
        this.imagePath = `${this.basePath}/images/${fileName}`;
        this.imageFileName = fileName;
        this.showUpload = false;
      });
    }
  }
}
