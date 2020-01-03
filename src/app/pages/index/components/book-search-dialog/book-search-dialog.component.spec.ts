import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchDialogComponent } from './book-search-dialog.component';

describe('BookSearchDialogComponent', () => {
  let component: BookSearchDialogComponent;
  let fixture: ComponentFixture<BookSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
