import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: String;
  showWait: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  onForgotSubmit(){
    
    const user = {
    email: this.email
  };
  
  this.showWait = true;

  this.auth.forgotPassword(user).subscribe(data => {
    if (data['success']){
      // this.toastr.success(data['msg'], 'Successful', {timeOut: 5000});
      this.showToast("Successful. " + data['msg'])
      this.showWait = false;
      this.router.navigate(['/login']);
    }
    else{
      // this.toastr.error( data['msg'], 'Invalid Email.',  { timeOut: 5000 } );
      this.presentAlert("Error !","Invalid " + data['msg'])
      this.showWait = false;
      this.router.navigate(['/forgot-password']);
      }
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
      message: content,
      cssClass: 'warning',
			buttons: ['OK']
		})

		await alert.present()
  }

}
