import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blogpost } from '../models/blogpost';
import { BlogpostService } from '../blogpost.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-blogpost-view',
  templateUrl: './blogpost-view.component.html',
  styleUrls: ['./blogpost-view.component.css']
})
export class BlogpostViewComponent {
  blogpost: Blogpost | undefined;
  basePath = 'http://localhost:5001';
  imageFileName: string = 'empty.jpg';
  imagePath: string = 'http://localhost:5001/images/empty.jpg';
  belongsToUser: boolean = false;

  constructor(private route: ActivatedRoute, 
              private blogpostService: BlogpostService,
              private loginService: LoginService,
              private router: Router) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.blogpostService.getBlogpost(id).subscribe(data => {
      this.blogpost = data;
      this.imagePath = `${this.basePath}/images/${data.image}`;
      
      this.belongsToUser = loginService.currentUser?.id == this.blogpost.user?.id;
    });
  }

  onEditClicked(): void {
    this.router.navigateByUrl(`blogpost/edit/${this.blogpost?.id}`);
  }
}
