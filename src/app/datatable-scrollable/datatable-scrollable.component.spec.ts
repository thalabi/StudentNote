import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableScrollableComponent } from './datatable-scrollable.component';

describe('DatatableScrollableComponent', () => {
  let component: DatatableScrollableComponent;
  let fixture: ComponentFixture<DatatableScrollableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableScrollableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
