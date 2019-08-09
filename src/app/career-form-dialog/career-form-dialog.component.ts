import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-career-form-dialog',
  templateUrl: './career-form-dialog.component.html',
  styleUrls: ['./career-form-dialog.component.scss'],
})
export class CareerFormDialogComponent implements OnInit {

   // form value holder
  
   sVal: String = "6";
   career: any = new Object();
   careerName: string = '';
   skillname: String = "";
   proficiency:String = "";
   selectedSkills: any = new Object();  
 
   
   // function variables
 
   skills: Skill[]=[];
   careers: any= [];
   industries: any[] = [];
   skill: [String];
   user: any = new Object();
   
   careerskills: [any];
   user_profile : any;
   allCareer: addcareer[] = [];

   showWait: boolean = false;

  constructor(private thisDialogRef: MatDialogRef<CareerFormDialogComponent>,
                    private auth: AuthService,
                    private userService: UserService,
                    private router: Router,
                    private _platform: Platform,) { 
                      thisDialogRef.disableClose = true;
                    }

  ngOnInit() {

    this.fetchUser();
    this.fetchIndustries();
    // this.fetchCareer();

  }

  fetchUser(){
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.allCareer = this.user.career
      //console.log(this.user);
      },
    err =>{
      console.log(err);
      return false;
    });
  }

  // fetch Industries
  fetchIndustries(){
    this.userService.getIndustry()
      .subscribe((data: any[]) => {
        this.industries = data
      })
  }

  // // fetch Careers
  // fetchCareer(){
  //   this.adminInput.getCareer()
  //     .subscribe((data: Career[]) => {
  //       this.careers = data
  //     })
  // }
  

  // push career chosen to an array
  pushCareer(){
    this.allCareer.push( new addcareer(this.career.name, this.skills));
    this.skills = [];
    // this.careerName = '';
 
    }

  onCareerChange(career){
    this.skills = [];
    this.careerskills = career.skills
    //console.log(this.careerskills);
    let allSelCareerSkills = this.careerskills;
    for(let i=0; i<allSelCareerSkills.length; i++){
      this.skills.push( new Skill( allSelCareerSkills[i].name, "0", allSelCareerSkills[i].link, allSelCareerSkills[i].duration));
    }
    // this.careerName = career.name;
    
  }

  onIndustryChange(industry){
     // getting all careers base on the industry
     this.userService.getCareerByIndustry(industry)
     .subscribe(resCareerData =>{
        this.careers = resCareerData;
     } );
  }


 

  onCloseCancel(){
    this.thisDialogRef.close(this.user);
  }

  onCareerSubmit() {
    for (let i = 0; i < this.allCareer.length; i++) {
      if (this.allCareer[i].name == this.career.name) {
        // this.toastr.error('Please select another. Thanks', 'You have chosen this career path', { timeOut: 3000 });
        return false;
      }
    }

    if (!this.career.name) {
      // this.toastr.error('Please choose a career and a skill with your proficiency', 'Oops', { timeOut: 3000 });
      return false;
    }
    else {
      this.pushCareer();

      this.user_profile = {
        career: this.allCareer,
      };
      this.showWait = true;

      this.userService.addCareer(this.user_profile).subscribe(data => {
        if (data) {
          // this.toastr.success('Successfully.', 'Career Path Added', { timeOut: 3000 });
          this.showWait = false;
          this.user = data;
          this.career = {}
          this.fetchUser();
          this.thisDialogRef.close(this.user);
          this.router.navigate(['/user/career']);
          //location.reload();

        }
        else {
          // this.toastr.error('Try again later.', 'Something went wrong.', { timeOut: 3000 });
          this.showWait = false;
          this.router.navigate(['/user/career']);
        }
      })
    }

  }

  formatLabel(value: number | null) {
    if (!value) {
      return "B";
    }

    if (value == 1) {
      return "B";
    }

    if (value == 2) {
      return "I";
    }

    if (value == 3) {
      return "E";
    }

  }

  onInputChange(event: any, proficiency) {
    if(event.value == 1){
      proficiency= "Beginner";
    }
    else if(event.value == 2){
      proficiency = "Intermediate";
    }
    else if(event.value == 3 ){
      proficiency = "Expert";
    }
    else{
      proficiency = "Beginner";
    }
      
    // console.log(event);
  }

  trackByIndex(index: number, odj:any): any{
    return ;
  }

}

export class addcareer {
  constructor(public name: String, public skills:Skill[] ) {}
}

export class Skill {
  constructor(public name: String, public proficiency: String, public link:String, public duration:String) {}
}
