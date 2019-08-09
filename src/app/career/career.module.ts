import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CareerPage } from './career.page';
import { DelCareerComponent } from '../del-career/del-career.component';
import { CareerFormDialogComponent } from '../career-form-dialog/career-form-dialog.component';
import { UpdateSkillComponent } from '../update-skill/update-skill.component';
import { MatButtonModule, MatDialogModule, MatCardModule } from '@angular/material';
import { ShareModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: CareerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents:[
    DelCareerComponent,
    CareerFormDialogComponent,
    UpdateSkillComponent
  ],
  declarations: [
    CareerPage,
    DelCareerComponent,
    CareerFormDialogComponent,
    UpdateSkillComponent
  ]
})
export class CareerPageModule {}
