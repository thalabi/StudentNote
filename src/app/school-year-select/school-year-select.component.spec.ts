import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearSelectComponent } from './school-year-select.component';

describe('SchoolYearSelectComponent', () => {
  let component: SchoolYearSelectComponent;
  let fixture: ComponentFixture<SchoolYearSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
