import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelCareerPage } from './del-career.page';

describe('DelCareerPage', () => {
  let component: DelCareerPage;
  let fixture: ComponentFixture<DelCareerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelCareerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelCareerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
