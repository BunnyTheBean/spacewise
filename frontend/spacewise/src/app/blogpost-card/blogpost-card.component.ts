import { Component, Input } from '@angular/core';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-blogpost-card',
  templateUrl: './blogpost-card.component.html',
  styleUrls: ['./blogpost-card.component.css']
})
export class BlogpostCardComponent {
  @Input()
  blogpost?: Blogpost;
}
