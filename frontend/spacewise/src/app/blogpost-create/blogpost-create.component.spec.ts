import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostCreateComponent } from './blogpost-create.component';

describe('BlogpostCreateComponent', () => {
  let component: BlogpostCreateComponent;
  let fixture: ComponentFixture<BlogpostCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogpostCreateComponent]
    });
    fixture = TestBed.createComponent(BlogpostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
