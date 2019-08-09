import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { MatIconModule, MatCardModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { UploadProfileImageComponent } from '../upload-profile-image/upload-profile-image.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents:[
    UploadProfileImageComponent
  ],
  declarations: [
    ProfilePage,
    UploadProfileImageComponent
  ]
})
export class ProfilePageModule {}
