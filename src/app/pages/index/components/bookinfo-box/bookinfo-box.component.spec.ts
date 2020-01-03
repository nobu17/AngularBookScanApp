import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinfoBoxComponent } from './bookinfo-box.component';

describe('BookinfoBoxComponent', () => {
  let component: BookinfoBoxComponent;
  let fixture: ComponentFixture<BookinfoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookinfoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookinfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
