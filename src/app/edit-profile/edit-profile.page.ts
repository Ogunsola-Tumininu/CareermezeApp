import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { FormBuilder, FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';
import { ValidateService } from '../services/validate.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController, ToastController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // constructor(private _formBuilder: FormBuilder) {}

  // ngOnInit() {
  //   this.firstFormGroup = this._formBuilder.group({
  //     firstCtrl: ['', Validators.required]
  //   });
  //   this.secondFormGroup = this._formBuilder.group({
  //     secondCtrl: ['', Validators.required]
  //   });
  // }

  // form value holder

  firstname: String = "";
  lastname: String = "";
  phone: String = "";
  gender: String = "";
  dob: any = "";
  address: String = "";
  about: String = "";
  status: String = "";
  qualification = "";
  grade: String = "";
  level: String = "";
  cgpa: String = "";
  course: String = "";
  certification: String = "";
  training: String = "";
  university: String;
  trainingYear: String = "";
  certYear: String = "";



  // function variables
  showTraining: Boolean = false;
  showCert: Boolean = false;
  universities: any;
  certifications: any;
  user: any = new Object();
  courses: any;
  user_profile: any;
  allTraining: Trainings[] = [];
  allCert: Certifications[] = [];
  startDate = new Date(1995, 0, 1);

  showWait: boolean = false;



  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */

  constructor(
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private validate: ValidateService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl:NavController) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }


  /**
   * On init
   */
  ngOnInit(): void {
    this.showTraining = false;
    this.showCert = false;
    // this.showCareer = false;
    // this.showAllCareer = false;

    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.course = this.user.course;
      this.phone = this.user.phone;
      this.gender = this.user.gender;
      this.dob = this.user.dob;
      this.address = this.user.address;
      this.about = this.user.about;
      this.status = this.user.status;
      this.qualification = this.user.qualification;
      this.grade = this.user.class;
      this.level = this.user.year;
      this.cgpa = this.user.cgpa;
      this.course = this.user.course;
      this.allCert = this.user.certifications;
      this.allTraining = this.user.trainings;
      // this.allCareer = this.user.career
      this.university = this.user.university
      // this.showAllCareer = true;
      if (this.allCert.length > 0) {
        this.showCert = true;
      }
      if (this.allTraining.length > 0) {
        this.showTraining = true;
      }
      //console.log(this.user);


    },
      err => {
        console.log(err);
        return false;
      });


    // getting all courses in data base
    this.userService.getCourse()
      .subscribe(resCourseData => {
        this.courses = resCourseData;
        // console.log(this.courses)
      });



    // getting all universities in data base
    this.userService.getUniversity()
      .subscribe(resUniversityData => {
        this.universities = resUniversityData;
        //  console.log(this.universities);
      });


    // getting all certification in data base
    this.userService.getCertification()
      .subscribe(resCertificationData => {
        this.certifications = resCertificationData;
        // console.log(this.universities);
      });


  }
  /**
    * On destroy
    */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------




  //  push training chosen to an array, 
  pushTrainings() {
    if (this.training == '' || this.trainingYear == "") {
      // this.toastr.error('Please enter the training and the year', 'Oops', { timeOut: 3000 });
      this.presentAlert('Error!', 'Please enter the training and the year')
      return false
    }

    // Validate year
    if (!this.validate.validateYear(this.trainingYear)) {
      // this.toastr.error('Year must be 4 digits.', 'Oops', { timeOut: 4000 });
      this.presentAlert('Error!', 'Year must be 4 digits.')
      return false;
    }

    this.showTraining = true;
    this.allTraining.push(new Trainings(this.training, this.trainingYear));
    this.training = '';
    this.trainingYear = "";

  }

  //  Push certifications chosen to an array
  pushCert() {

    if (this.certification == '' || this.certYear == "") {
      // this.toastr.error('Please enter certification and the year', 'Oops', { timeOut: 3000 });
      this.presentAlert('Error!', 'Please enter certification and the year')
      return false;
    }
    // Validate validate
    if (!this.validate.validateYear(this.certYear)) {
      // this.toastr.error('Year must be 4 digits.', 'Error adding certification', { timeOut: 4000 });
      this.presentAlert('Error!', 'Year must be 4 digits.')
      return false;
    }


    this.showCert = true;
    this.allCert.push(new Certifications(this.certification, this.certYear));
    this.certification = '';
    this.certYear = "";

  }

  delCert(cert) {
    for (let i = 0; i < this.allCert.length; i++) {
      if (this.allCert[i].name === cert) {
        this.allCert.splice(i, 1);
      }
    }
    if (!this.allCert.length) {
      this.showCert = false;
    }
  }

  delTraining(input) {
    for (let i = 0; i < this.allTraining.length; i++) {
      if (this.allTraining[i].name === input) {
        this.allTraining.splice(i, 1);
      }
    }
    if (!this.allTraining.length) {
      this.showTraining = false;
    }
  }




  onProfileSubmit() {

    this.user_profile = {
      phone: this.phone,
      gender: this.gender,
      dob: this.dob,
      address: this.address,
      about: this.about,
      status: this.status,
      qualification: this.qualification,
      class: this.grade,
      year: this.level,
      cgpa: this.cgpa,
      course: this.course,
      certifications: this.allCert,
      trainings: this.allTraining,
      //career: this.allCareer,
      university: this.university,

    };

    // Validate phone number Field
    if (!this.validate.validatePhoneno(this.phone)) {
      console.log('Phone no not validated');
      // this.toastr.error('Phone number must be 11 digits.', 'Error sending form', { timeOut: 10000 });
      this.presentAlert('Error!', 'Phone number must be 11 digits..')

      return false;
    }

    // Validate phone number Field
    if (!this.validate.validateProfile(this.user)) {
      console.log('Profile not validated');
      // this.toastr.error('Please fill all * field', 'Error sending form', { timeOut: 10000 });
      this.presentAlert('Error!', 'Please fill all * field.')

      return false;
    }

    this.showWait = true;

    // console.log(this.user._id)
    this.userService.addProfile(this.user._id, this.user_profile).subscribe(data => {
      if (data) {
        // this.toastr.success('Successfully.', 'Profile Updated', { timeOut: 3000 });
        this.showToast('Profile Updated Successfully')
        this.showWait = false;
        this.navCtrl.navigateRoot('/tabs/profile');
        this.user = data;
        //location.reload();
      }
      else {
        // this.toastr.error('Try again later.', 'Something went wrong.', { timeOut: 3000 });
        this.presentAlert('Error!', 'Try again later.')
        this.showWait = false;
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

export class Trainings {
  constructor(public name: String, public year: String) { }
}

export class Certifications {
  constructor(public name: String, public year: String) { }
}
