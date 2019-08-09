import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { ValidateService } from '../services/validate.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  expiry = false;
  email: String;
  password: String;

  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    public toastController: ToastController,
    private validate: ValidateService,
    private _formBuilder: FormBuilder,
    private location: Location) { 
     
    }

  // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        
    }

    

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    };


    if(!this.email || !this.password){
      this.showToast("Please fill all fields to login ");
      return false;
    }

     // Reguired Email
     if (!this.validate.validateEmail(this.email)){
      console.log('Please use a valid email ');
      this.showToast("Please use a valid email");
      return false;
    }
    
    this.auth.authenticateUser(user).subscribe( data => {
      if(data['success']){
        var use = localStorage.getItem('user')
        this.auth.storeUserData(data['token'], data['user']);
        this.showToast("Welcome to Careermeze.\nA place where we help to grow your career. ");
        // this.toastr.success( 'A place where we help to grow your career.', 'Welcome to Careermeze',  { timeOut: 5000 } );
        this.router.navigate(['/tabs/home']);
      }
      else{
        if (data['expired']){
          this.expiry = true;
          this.showToast("Invalid login details.\n " + data['msg'] );
          // this.toastr.error( data['msg'], 'Invalid login details.',  { timeOut: 5000 } );
          this.router.navigate(['/login']);
        }
        else{
          this.showToast("Invalid login details.\n " + data['msg'] )
          // this.toastr.error( data['msg'], 'Invalid login details.',  { timeOut: 5000 } );
          this.router.navigate(['/login']);
        }
      }
    });
  }

  onResendLink(){
      const user = {
      email: this.email,
    };
    
    
    this.auth.resendVerify(user).subscribe(data => {
      if (data['success']){
        // this.toastr.success(data['msg'], 'Link Sent', {timeOut: 5000})
        this.showToast("Link sent.\n " + data['msg'] )
        this.router.navigate(['/login']);
        location.reload()
      }
      else{
        // this.toastr.error( data['msg'], 'Something went wrong',  { timeOut: 5000 } );
        this.showToast("Something went wrong.\n " + data['msg'] )
        this.router.navigate(['/login']);
        location.reload()
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

}
