import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'vacancies',
  templateUrl: './vancies.component.html',
  styleUrls: ['./vancies.component.scss'],
})
export class VanciesComponent implements OnInit {

  userProfile: any;
  course: any[] = [];
  jobs: any[] = [];
  skillJobs: any[] = [];
  skills:any[] = [];

  constructor(
    private auth: AuthService,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.getUserProfile()
  }

  getUserProfile(){
    this.auth.getProfile().subscribe(profile => {
        this.userProfile = profile['user'];
        let allSkill = this.userProfile.career[0].skills
        for(var i=0; i<allSkill.length; i++){
          this.skills.push(allSkill[i].name);
        }
        this.getJobsByCourse();
        // this.getJobsBySkill(this.skills);
        
      },
      err =>{
        console.log(err);
        return false;
      });
  }

  getJobsByCourse(){
    this.course.push(this.userProfile.course);
    let input = {
      course: this.course
    }

    this.userService.getJobByCourse(input).subscribe((data: any) =>{
      this.jobs = data;
      this.jobs = this.jobs.slice(0,4);
    })
  }

   // getJobsBySkill(skillArray){
  //   let input = {
  //     skills: skillArray 
  //   }

  //   this.userService.getJobBySkill(input).subscribe((data: any) =>{
  //     this.skillJobs = data;
  //     this.skillJobs = this.skillJobs.slice(0,2);
  //   })
  // }

}
