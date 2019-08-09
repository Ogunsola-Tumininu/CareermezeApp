import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { load } from '@angular/core/src/render3/instructions';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { userInfo } from 'os';
import { AlertButton } from '@ionic/core';
import { AlertController } from '@ionic/angular';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File){}
}
@Component({
  selector: 'app-upload-profile-image',
  templateUrl: './upload-profile-image.component.html',
  styleUrls: ['./upload-profile-image.component.scss']
})
export class UploadProfileImageComponent implements OnInit {

  fileToUpload: File = null;// hold our file
  imageUrl: String ; 
  originalWidth: String = '';
  user: any = "";

  showWait: boolean = false;

  constructor(private thisDialogRef: MatDialogRef<UploadProfileImageComponent>,
              private userService: UserService,
              private auth: AuthService,
              private router: Router,
              private alertController: AlertController,
              private location: Location,)
               {
                thisDialogRef.disableClose = true;
               }

  ngOnInit() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.imageUrl = this.user.profileImage;
      },
    err =>{
      console.log(err);
      return false;
    });
  }

  onCloseCancel(){
    this.thisDialogRef.close(this.user);
  }


  /**
   * this is used to trigger the input
   */ 
  openInput(){ 
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }

  fileChange(files: FileList) {
    // if (files.length > 0) {
      // this.fileToUpload = files[0];
      // var readers = new FileReader();
      // readers.onload = (event:any) => {
      //   this.originalImageUrl = event.target.result
      // }
      // readers.readAsDataURL(this.fileToUpload);  
      // }

    
    
    const fileName = files[0].name;
    console.log(files[0])
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event:any) => {
        const img = new Image();
        img.src = event.target.result;
        this.imageUrl = img.src;
        img.onload = () => {
                const elem = document.createElement('canvas');
                var height;
                var width;
                if(img.height>5000 ){
                  height = img.height/30;
                  width = img.width/30;
                }

                if(img.height<=5000 && img.height>=4000 ){
                  height = img.height/25;
                  width = img.width/25;
                }

                if(img.height<=4000 && img.height>=3000 ){
                  height = img.height/20;
                  width = img.width/20;
                }
                if(img.height<=3000 && img.height>=2000 ){
                  height = img.height/15;
                  width = img.width/15;
                }
                if(img.height<=2000 && img.height>=1000 ){
                  height = img.height/10;
                  width = img.width/10;
                }
                if(img.height<=1000 && img.height>=700 ){
                  height = img.height/4;
                  width = img.width/4;
                }
                if(img.height<=700 && img.height>=400 ){
                  height = img.height/3;
                  width = img.width/3;
                }        
                if(img.height<400 ){
                  height = img.height/2;
                  width = img.width/2;
                }

                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                // img.width and img.height will give the original dimensions
                ctx.drawImage(img, 0, 0, width, height);
                ctx.canvas.toBlob((blob) => {
                  this.fileToUpload  = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                }, 'image/jpeg', 1);
                
            },
            reader.onerror = error => console.log(error);
            //console.log(files[0]);        
    };
  }



   /**
   * this is used to perform the actual upload
   */
   upload() {
    console.log('sending this to server', this.fileToUpload);
    this.showWait = true;
    // console.log(this.user);
    this.userService.uploadImage( this.fileToUpload).subscribe((data: any) => {
      this.user = data.user;
        this.fileToUpload = null;
        this.showWait = false;
        this.thisDialogRef.close(this.user);
        // location.reload();

      },
      error =>{
        this.presentAlert('Error!', "Updating Profile's Image")
        this.showWait = false;
        this.thisDialogRef.close(this.user)
        // this.router.navigate(['/user/dashboard']);
      }
    ) 
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }


}

