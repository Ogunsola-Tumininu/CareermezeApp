// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { map } from 'rxjs/operators';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Observable} from 'rxjs'
// @Injectable({
//   providedIn: 'root'
// })
// export class CompanyService {

//   url = 'http://localhost:8080';
//   //  url = ''

//   id = localStorage.getItem('userId');

//   constructor(
//     private http: HttpClient,
//     private Http: Http
//   ) { }

//   requestOTP(email){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/companyusers/request-otp',JSON.stringify(email) , {headers: headers});
//   }

//   requestMemberOTP(email){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/companyusers/member/request-otp',JSON.stringify(email) , {headers: headers});
//   }

//   getCompanyInfo(token){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.get(this.url +'/companyusers/company/' + token, {headers: headers});
//   }

//   getMemberCompanyInfo(token){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.get(this.url +'/companyusers/company/member/' + token, {headers: headers});
//   }

//   getOneCompany(id){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.get(this.url +'/companyusers/company/one/' + id, {headers: headers});
//   }

//   getCompanyByName(name){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/companyusers/company/name', name, {headers: headers});
//   }

//   updateCompany(id, company){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.put(this.url +'/companyusers/profile/update/' + id, JSON.stringify(company), {headers: headers});
//   }

//   public uploadLogo(image: File, id):Observable<Response>{
//     const formData = new FormData();
//     formData.append('img', image);
//     return this.Http.post(this.url +'/companyusers/upload/'+ id, formData)
//   }

//   postJob(job){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/companyusers/' + job.company_id + '/job/add', JSON.stringify(job), {headers: headers});
//   }


//   updateJob(job){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.put(this.url +'/companyusers/job/update/' + job._id, JSON.stringify(job), {headers: headers});
//   }

//   allJobs(companyId){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.get(this.url +'/companyusers/' + companyId +'/jobs', {headers: headers});
//   }

//   getJob(id){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.get(this.url +'/companyusers/job/' + id, {headers: headers});
//   }

//   getApplicantsInfo(applicants){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/companyusers/job/applicants/all', applicants, {headers: headers});
//   }

//   sendMemberLink(link){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/companyusers/member/send-link',JSON.stringify(link) , {headers: headers});
//   } 

  



// }
