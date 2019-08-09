import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerFormDialogPage } from './career-form-dialog.page';

describe('CareerFormDialogPage', () => {
  let component: CareerFormDialogPage;
  let fixture: ComponentFixture<CareerFormDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerFormDialogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerFormDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
