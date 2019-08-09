import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import { ShareModule } from '../shared.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule,
    ReactiveFormsModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
