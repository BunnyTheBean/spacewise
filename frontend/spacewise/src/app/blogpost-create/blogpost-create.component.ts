import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Blogpost, BlogpostCategory, BlogpostSection } from '../models/blogpost';
import { LoginService } from '../login.service';
import { BlogpostService } from '../blogpost.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  isEditing: boolean;
  existingPost: Blogpost | undefined;

  constructor(private http: HttpClient, 
      private fb: FormBuilder, 
      private loginService: LoginService,
      private blogpostService: BlogpostService,
      private router: Router,
      private route: ActivatedRoute) {
    this.blogpostForm = fb.group({
      category: [this.categories[0]],
      sections: fb.array([ ])
    });

    this.addSection();
    this.blogpostForm.get('category')?.setValue(0);

    const url = this.router.url;
    this.isEditing = /^\/blogpost\/edit\/.*/.test(url);
    if (this.isEditing) {
      this.fillWithExistingPost();
    }
  }

  private fillWithExistingPost(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.blogpostService.getBlogpost(id).subscribe(data => {
      this.existingPost = data;

      this.blogpostForm.get('category')?.setValue(this.existingPost.category);
      
      const sectionsArray = this.fb.array<FormGroup>([]);
      for (let section of this.existingPost.sections!) {
        sectionsArray.push(this.fb.group({
          title: [section.title],
          content: [section.content]
        }));
      }
      this.blogpostForm.setControl('sections', sectionsArray);

      this.setImage(this.existingPost.image!);
    });
  }

  onUpdate(): void {
    const blogpost = this.getBlogpostFromForm();
    blogpost.id = this.existingPost?.id;

    this.blogpostService.updateBlogpost(blogpost).subscribe(() => {
      this.router.navigateByUrl(`/blogpost/view/${blogpost.id}`);
    });
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

  removeSection(): void {
    if (this.sections.length > 1) this.sections.removeAt(-1);
  }

  onCreate(): void {
    const blogpost = this.getBlogpostFromForm();

    this.blogpostService.createBlogpost(blogpost).subscribe((newBlogpost) => {
      this.router.navigateByUrl(`/blogpost/view/${newBlogpost.id}`);
    })
  }

  private getBlogpostFromForm(): Blogpost {
    const formValue = this.blogpostForm.value;
    const sections = formValue.sections as BlogpostSection[];
    const category = formValue.category as BlogpostCategory;

    const blogpost: Blogpost = {
      sections: sections,
      category: category,
      image: this.imageFileName,
      user: this.loginService.currentUser!
    };
    return blogpost;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const file = input.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("formfile", file);
      
      this.http.post<string>("http://localhost:5001/api/images", formData).subscribe(fileName =>  {
        this.setImage(fileName);
      });
    }
  }

  private setImage(fileName: string) {
    this.imageFileName = fileName;  
    this.imagePath = `${this.basePath}/images/${fileName}`;
    this.showUpload = false;
  }

  removeImage(): void {
    this.setImage('empty.jpg');
    this.showUpload = true;
  }
}
