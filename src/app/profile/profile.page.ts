import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core'
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material';
import { UploadProfileImageComponent } from '../upload-profile-image/upload-profile-image.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any = new Object();
  cert: any = 0;
  conn: any = 0;
  training: any = 0;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,) {
      
  }

  

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.training = this.user.trainings.length;
      this.cert = this.user.certifications.length;
      this.conn = this.user.friends.length;
      //console.log(this.user);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  openDialog(){
    let dialogRef = this.dialog.open(UploadProfileImageComponent, {
      width: '300px',
      // data: {id : id,
      //      fetch: this.dataSource
      //   }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.ionViewWillEnter();
      this.router.navigateByUrl('/tabs/home', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/tabs/profile"])); 
    })
  }

}
