import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CareerFormDialogComponent } from '../career-form-dialog/career-form-dialog.component';
import { UpdateSkillComponent } from '../update-skill/update-skill.component';
import { DelCareerComponent } from '../del-career/del-career.component';


@Component({
  selector: 'app-career',
  templateUrl: './career.page.html',
  styleUrls: ['./career.page.scss'],
})
export class CareerPage implements OnInit {

  user: any = new Object();
  allCareer: any = [];
  user_profile: any = new Object();

  constructor( private dialog: MatDialog,
                private auth: AuthService,
                private userService: UserService,
                private router: Router) { }

  ngOnInit() {
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

  openDelDialog(career){
    let dialogRef = this.dialog.open(DelCareerComponent, {
      width: '350px',
      data: {career: career
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      //this.fetchCareer();
      //console.log(`Dialog Closed: ${result}`);
      
    })
  }

  openUpdateSkillDialog(careerID,skill){
    let dialogRef = this.dialog.open(UpdateSkillComponent, {
      width: '550px',
      data: {
        skill: skill,
        careerId: careerID
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      //this.fetchCareer();
      //console.log(`Dialog Closed: ${result}`);
      
    })
  }

  openDialog(){
    let dialogRef = this.dialog.open(CareerFormDialogComponent, {
      width: '1000px',
      // data: { : id,
      //      fetch: this.dataSource
      //   }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.user = result
      // console.log(`Dialog Closed: ${result}`);
      
    })
  }

  delCareer(input){
    for(let i=0; i<this.allCareer.length; i++){
      if(this.allCareer[i].name === input){
        this.allCareer.splice(i,1);
      }
    }

    this.user_profile= {
      career: this.allCareer,
    };
  
    this.userService.addCareer(this.user_profile).subscribe( data => {
      if(data){
        // this.toastr.success('Successfully.', 'Career Deleted', { timeOut: 3000 } );
        this.user = data;
        //this.router.navigate(['/user/career']);
        //location.reload();
        
      }
      else{
        // this.toastr.error('Try again later.','Something went wrong.',  { timeOut: 3000 } );
        // this.router.navigate(['/user/career']);
      }
   })
  }

  updatePeference(id){
    let career = {
      preferred: true,
    };
  
    this.userService.updatePreferredCareer(career, id ).subscribe( data => {
      if(data['success']){
        // this.toastr.success('Successfully.', 'Preferred career selected', { timeOut: 3000 } );
        this.user = data['user'];
        //this.router.navigate(['/user/career']);
        // location.reload();
        
      }
      else{
        // this.toastr.error('Try again later.','Something went wrong.',  { timeOut: 3000 } );
        this.router.navigate(['/user/career']);
      }
  })
  }

}
