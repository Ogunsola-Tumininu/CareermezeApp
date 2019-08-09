import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any = new Object();
  careerSkills: any
  careerName: String = "";
  careerDesc: String = "";
  min_req: String = "";
  career: any = []
  percentageComplete: any = [];
  total: any;
  active: any = [];

  constructor(
    private userService: UserService,
    private auth: AuthService,
    // private router: Router,
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    // this.getProfile();
  }

  ionViewWillEnter(){
    this.getProfile();
  }

  getProfile(){
    this.auth.getProfile().subscribe((profile: any) => {
      this.user = profile['user'];
      if(this.user.career.length>0){
        this.careerName = profile['user'].career[0].name;
        this.getCareer(this.careerName);
        // console.log(this.careerName)
        this.careerSkills = profile['user'].career[0].skills;
        // console.log(this.careerSkills)
        for(var i = 0; i < this.careerSkills.length; i++){
          if(this.careerSkills[i].proficiency !== '3'){
            this.percentageComplete.push('Not Expert');
            }
          if(i==0)
            this.active.push(true);
          else
            this.active.push(false);
  
  
          }
          this.total = (this.careerSkills.length - this.percentageComplete.length) / this.careerSkills.length * 100;
          // console.log(this.percentageComplete)
       }
     
      },
    err =>{

      console.log(err);
      return false;
    });
  }
  showSkill(career, index){
    this.getCareer(career.name);
    this.careerSkills = career.skills;
    this.careerName = career.name;
    this.careerDesc = "";
    this.min_req = "";
    this.active = [];
    this.percentageComplete = [];
    for(var i = 0; i < this.careerSkills.length; i++){
      if(this.careerSkills[i].proficiency !== '3'){
        this.percentageComplete.push('Not Expert');
      }
      if(i==index)
        this.active.push(true);
      else
        this.active.push(false);
    }
    
    this.total = (this.careerSkills.length - this.percentageComplete.length) / this.careerSkills.length * 100;
    if(this.total == 0){
      this.total = 10;
    }
  }

  getCareer(name){
    this.userService.getCareer(name).subscribe((data: any) => {
      // console.log(data)
      this.careerDesc = data.description;
      this.min_req = data.min_requirement;
      },
    err =>{

      console.log(err);
      return false;
    });
  }

  trackByIndex(index: number, odj:any): any{
    return ;
  }

}
