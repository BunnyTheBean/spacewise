import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostCardComponent } from './blogpost-card.component';

describe('BlogpostCardComponent', () => {
  let component: BlogpostCardComponent;
  let fixture: ComponentFixture<BlogpostCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogpostCardComponent]
    });
    fixture = TestBed.createComponent(BlogpostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
