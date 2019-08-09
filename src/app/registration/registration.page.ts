import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registerForm: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;

  id: String;
  firstname: String;
  lastname: String;
  username: String;
  password: String;
  confirmPassword: String;
  email: String;
  terms: boolean;

  showWait: boolean = false;

  constructor(
    private validateService: ValidateService,
    private auth: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.showWait = false;
    this.registerForm = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
      terms: '',
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm.get('password').valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('confirmPassword').updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  onRegisterSubmit() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      name: this.firstname + " " + this.lastname,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    // Reguired Field
    if (!this.validateService.validateRegister(user)) {
      this.presentAlert('Error!', 'Please fill in all fields')
      // this.toastr.error('Error sending form', 'Please fill in all fields', { timeOut: 3000 } );
      return false;
    }

    // Reguired Email
    if (!this.validateService.validateEmail(user.email)) {
      console.log('Please use a valid email ');
      this.presentAlert('Error!', 'Please use a valid email')
      // this.toastr.error('Error sending form', 'Please use a valid email', { timeOut: 3000 } );
      return false;
    }

    // Compare Field
    if (!this.validateService.comparePassword(user)) {
      console.log('Password not matched');
      this.presentAlert('Error!', 'Password not matched')
      // this.toastr.error('Error sending form', 'Password not matched', { timeOut: 3000 } );

      return false;
    }

    // Validate Password Field
    if (!this.validateService.validatePassword(user.password)) {
      console.log('Password not validated');
      this.presentAlert('Error!', 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 50.')
      // this.toastr.error('Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 50.', 'Error sending form', { timeOut: 10000 } );

      return false;
    }

    // Compare Field
    if (this.terms === false) {
      this.presentAlert('Error!', 'Please read and tick terms & conditions ')
      // this.toastr.error('Error sending form', 'Password not matched', { timeOut: 3000 } );

      return false;
    }

    this.showWait = true;
    // Register User
    this.auth.registerUser(user).subscribe((data: any) => {
      if (data.success) {
        this.presentAlert('Registered Successfully', data['msg'])
        // this.toastr.success(data['msg'], 'Registered Successfully', {timeOut: 6000});
        this.showWait = false;
        this.router.navigate(['/login']);
      }
      else {
        this.presentAlert('Error!', data['msg'])
        // this.toastr.error(data['msg'], 'Registration Failed', {timeOut: 3000});
        this.showWait = false;
        this.router.navigate(['/registration']);
      }
    })
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
      buttons: ['OK']
    })

    await alert.present()
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }


}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('confirmPassword');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { 'passwordsNotMatching': true };
};

