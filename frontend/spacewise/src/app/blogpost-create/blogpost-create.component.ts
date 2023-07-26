import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent {
  basePath = 'http://localhost:5001';
  imagePath: string = 'http://localhost:5001/images/empty.jpg';
  showUpload: boolean = true;
  blogpostForm: FormGroup;
  categories: string[] = ['Himmelskörper', 'Physik', 'Technik', 'Anderes'];

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
        this.showUpload = false;
      });
    }
  }
}
