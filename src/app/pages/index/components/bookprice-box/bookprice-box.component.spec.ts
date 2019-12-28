import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookpriceBoxComponent } from './bookprice-box.component';

describe('BookpriceBoxComponent', () => {
  let component: BookpriceBoxComponent;
  let fixture: ComponentFixture<BookpriceBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookpriceBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookpriceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
