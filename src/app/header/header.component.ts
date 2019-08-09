import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  inputs: ['newProfile'],
})
export class HeaderComponent implements OnInit {

  user: any = {};

  newProfile: any;

  constructor( 
    private auth: AuthService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getProfile();
    this.user = this.newProfile;
  }

  ngOnChanges(){
    this.user = this.newProfile;
  }

  getProfile(){
    this.auth.getProfile().subscribe((profile: any) => {
      this.user = profile['user'];
      },
    err =>{

      console.log(err);
      return false;
    });
  }

}
