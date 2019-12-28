import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbnInputComponent } from './isbn-input.component';

describe('IsbnInputComponent', () => {
  let component: IsbnInputComponent;
  let fixture: ComponentFixture<IsbnInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsbnInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsbnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
