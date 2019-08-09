import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProfileImagePage } from './upload-profile-image.page';

describe('UploadProfileImagePage', () => {
  let component: UploadProfileImagePage;
  let fixture: ComponentFixture<UploadProfileImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProfileImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProfileImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
