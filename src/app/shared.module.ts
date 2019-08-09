import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FriendsAndGroupsComponent } from './friends-and-groups/friends-and-groups.component';
import { VanciesComponent } from './vancies/vancies.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [
      HeaderComponent,
      FriendsAndGroupsComponent,
      VanciesComponent,
      LoadingComponent
    ],
  exports: [
      HeaderComponent,
      FriendsAndGroupsComponent,
      VanciesComponent,
      RouterModule,
      LoadingComponent
    ]
})
export class ShareModule {}