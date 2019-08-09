import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditProfilePage } from './edit-profile.page';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: EditProfilePage
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
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatIconModule
  ],
  providers: [  
    MatDatepickerModule,  
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
