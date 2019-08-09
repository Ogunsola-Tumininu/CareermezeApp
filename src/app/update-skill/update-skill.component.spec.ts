import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSkillPage } from './update-skill.page';

describe('UpdateSkillPage', () => {
  let component: UpdateSkillPage;
  let fixture: ComponentFixture<UpdateSkillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSkillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSkillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
