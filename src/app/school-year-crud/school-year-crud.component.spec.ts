import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearCrudComponent } from './school-year-crud.component';

describe('SchoolYearCrudComponent', () => {
  let component: SchoolYearCrudComponent;
  let fixture: ComponentFixture<SchoolYearCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
