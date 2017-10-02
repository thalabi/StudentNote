import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearStudentsComponent } from './school-year-students.component';

describe('SchoolYearStudentsComponent', () => {
  let component: SchoolYearStudentsComponent;
  let fixture: ComponentFixture<SchoolYearStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
