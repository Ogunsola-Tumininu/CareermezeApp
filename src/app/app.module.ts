import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { JwtModule,} from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';
// import {TimeAgoPipe} from 'time-ago-pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

import { MatInputModule,
  MatButtonModule,
  MatCardModule, 
  MatTooltipModule,
  MatSnackBarModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule, 
  MatSortModule,
  MatOptionModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatStepperModule,
  MatDatepickerModule,
  MatTabsModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatSliderModule,
} from '@angular/material'
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from './shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    
  ],

  entryComponents: [],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:10255', 'localhost:4200'],
          blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    ShareModule,
    
    // Material
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSortModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatStepperModule,
    MatTabsModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatSliderModule,
    BrowserAnimationsModule,
    
  ],

  providers: [
    ValidateService, 
    AuthService, 
    AuthGuard, 
    UserService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
