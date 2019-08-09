import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyLoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}
  canActivate(): boolean{
    if( !this.auth.userType()){
      return true;
    }
    else{

      this.router.navigate(['/admin/home']);
        return false;

        // if(this.auth.userType()){
        //     this.router.navigate(['/admin/home']);
        //     return false;
        // }
        // else{
        //     this.router.navigate(['/company/dashboard']);
        //     return false;
        // }
      
    }
    
  }
}