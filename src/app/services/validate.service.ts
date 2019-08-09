import { Injectable } from '@angular/core';
// import { PostJobComponent } from 'app/company/components/company-dashboard/post-job/post-job.component';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if( user.confirmPassword == undefined || user.password == undefined || user.firstname == undefined || user.lastname == undefined ||user.email == undefined ){
      return false;
    }
    else{
      return true;
    }
  }

  validateProfile(user){
    if( user.phone == undefined || user.address == undefined || user.gender == undefined || user.status == undefined || user.course == undefined || user.university == undefined ){
      return false;
    }
    else{
      return true;
    }
  }


  validateInput(input){
    if(input == undefined ){
      return false;
    }
    else{
      return true;
    }
  }

  validateCareerInput(career){
    if(career.name == undefined || career.min_requirement== undefined || career.industry == undefined ){
      return false;
    }
    else{
      return true;
    }
  }

  validateJob(job){
    if(job.job_title == undefined || job.job_function == undefined || job.deadline == undefined || job.location == undefined || job.emp_type == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateCompany(company){
    if(company.name == undefined || company.comp_address == undefined || company.comp_size == undefined || company.comp_email == undefined || company.comp_industry == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateSkillInput(input){
    if(input.name == undefined || input.career == undefined ){
      return false;
    }
    else{
      return true;
    }
  }

  validateProfileInput(input){
    if(input.university == undefined || input.career == undefined ){
      return false;
    }
    else{
      return true;
    }
  }
  


  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhoneno(phone) {
    var re = /^\d{11}$/;
    return re.test(String(phone));
  }

  validateYear(year) {
    var re = /^\d{4}$/;
    return re.test(String(year));
  }

  validatePassword(password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$/;
    return re.test(String(password));
  }

  comparePassword(user) {
    if(user.password !== user.confirmPassword ){
      return false;
    }
    else{
      return true;
    }
  }
}
