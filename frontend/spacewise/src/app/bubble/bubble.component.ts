import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']
})
export class BubbleComponent implements OnInit {
  @Input()
  colour: number = 0; // number from 0 to 8, representing primary, 4 tints, and 4 shades

  @Input()
  radius: number = 0;

  colourString: string = '';

  ngOnInit(): void {
    switch(this.colour) {
      case 0:
        this.colourString = 'var(--primary)';
        break;
      case 1:
        this.colourString = 'var(--primary-tint-1)';
        break;
      case 2:
        this.colourString = 'var(--primary-tint-2)';
        break;
      case 3:
        this.colourString = 'var(--primary-tint-3)';
        break;
      case 4:
        this.colourString = 'var(--primary-tint-4)';
        break;
      case 5:
        this.colourString = 'var(--primary-shade-1)';
        break;        
      case 6:
        this.colourString = 'var(--primary-shade-2)';
        break;
      case 7:
        this.colourString = 'var(--primary-shade-3)';
        break;
      case 8:
        this.colourString = 'var(--primary-shade-4)';
        break;
      default:
        this.colourString = 'var(--primary)';
        break;
    }
  }
}


