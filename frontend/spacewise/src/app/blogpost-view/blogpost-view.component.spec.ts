import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostViewComponent } from './blogpost-view.component';

describe('BlogpostViewComponent', () => {
  let component: BlogpostViewComponent;
  let fixture: ComponentFixture<BlogpostViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogpostViewComponent]
    });
    fixture = TestBed.createComponent(BlogpostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
