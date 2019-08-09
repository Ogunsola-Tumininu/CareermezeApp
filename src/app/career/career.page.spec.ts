import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerPage } from './career.page';

describe('CareerPage', () => {
  let component: CareerPage;
  let fixture: ComponentFixture<CareerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
