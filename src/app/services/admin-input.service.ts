// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { map } from 'rxjs/operators';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Observable} from 'rxjs'
// import { University } from '../admin.module';
// import { Course } from '../admin.module';
// import { Industry } from '../admin.module';
// import { Career } from '../admin.module';
// import { Skill } from '../admin.module';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminInputService {

//   input: any
//   url = 'http://localhost:8080';
//   //  url = ''

//   constructor(
//     private http: HttpClient,
//     private Http: Http) { }

//   sendLink(link){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/companyusers/send-link',JSON.stringify(link) , {headers: headers});
//   } 

//   addUniversity(input){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/university/add',JSON.stringify(input) , {headers: headers});
//   } 
//   addCourse(input){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/course/add',JSON.stringify(input) , {headers: headers});
//   }

//   addIndustry(input){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/industry/add',JSON.stringify(input) , {headers: headers});
//   }

//   addSkills(input){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/skill/add',JSON.stringify(input) , {headers: headers});
//   }
//   addCertification(input){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/certification/add',JSON.stringify(input) , {headers: headers});
//   }
//   addCareer(input){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/career/add',JSON.stringify(input) ,{headers: headers});
//   }
//   addSkill(id, skill){
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/career/'+ id +'/skill/add', JSON.stringify(skill) , {headers: headers});
//   }
  

//   getCareer(): Observable<Career[]>{
//     return this.http.get<Career[]>(this.url +'/adminusers/career');
//   }

//   getCareerByIndustry(industryName): Observable<Career>{
//     return this.http.get<Career>(this.url +'/adminusers/career/industry/' + industryName);
//   }

//   getOneCareer(careerID): Observable<Career>{
//     return this.http.get<Career>(this.url +'/adminusers/career/' + careerID);
//   }

//   getSkill(): Observable<Skill[]>{
//     return this.http.get<Skill[]>(this.url +'/adminusers/skill');
//   }

//   getUniversity(): Observable<University[]>{
//     return this.http.get<University[]>(this.url +'/adminusers/university');
//   }

//   getCourse(): Observable<Course[]>{
//     return this.http.get<Course[]>(this.url +'/adminusers/course');
//   }

//   getIndustry(): Observable<Industry[]>{
//     return this.http.get<Industry[]>(this.url +'/adminusers/industry');
//   }
//   getCertification(){
//     return this.http.get(this.url +'/adminusers/certification');
//   }
  

//   deleteCareer(career: any) {
//     return this.http.get(this.url +'/adminusers/career/delete/' + career)
//   }

//   deleteSkill(career_id: string, skill_id: string) {
//     return this.http.get(this.url +'/adminusers/career/' + career_id + '/skill/delete/' + skill_id)
//   }

//   deleteFormSkill(id: any) {
//     return this.http.get(this.url +'/adminusers/skill/delete/' + id);
//   }


//   deleteUniversity(id: any) {
//     return this.http.get(this.url +'/adminusers/university/delete/' + id);
//   }

//   deleteCourse(id: any) {
//     return this.http.get(this.url +'/adminusers/course/delete/' + id);
//   }

//   deleteIndustry(id: any) {
//     return this.http.get(this.url +'/adminusers/industry/delete/' + id);
//   }

//   deleteCertification(id: any) {
//     return this.http.get(this.url +'/adminusers/certification/delete/' + id);
//   }

//   updateSkill(career_id: string, skill: any, skill_id) {
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/career/' + career_id + '/skill/update/' + skill_id, JSON.stringify(skill) , {headers: headers})
//   }

//   updateOneSkill( skill: any) {
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/skill/update/' + skill.id, JSON.stringify(skill), {headers: headers})
//   }

//   updateCertification(cert: any) {
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/certification/update/' + cert.id, JSON.stringify(cert), {headers: headers})
//   }

//   updateCareer(career: any) {
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/career/update/' + career.id, JSON.stringify(career), {headers: headers})
//   }

//   updateUniversity(university: any) {
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/university/update/' + university.id, JSON.stringify(university), {headers: headers})
//   }

//   updateCourse(course: any) {
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/course/update/' + course.id, JSON.stringify(course), {headers: headers})
//   }

//   updateIndustry(industry: any) {
//     let headers = new HttpHeaders({'Content-Type': 'application/json'});
//     return this.http.post(this.url +'/adminusers/industry/update/' + industry.id, JSON.stringify(industry), {headers: headers})
//   }

//   getCareerSkills(career: any){
//     return this.http.get(this.url +'/adminusers/career/' + career +'/skill' )
//     .pipe(map((response: Response) => response.json()));
//   }

//   uploadUniversity(csv: File):Observable<Response>{
//     const formData = new FormData();
//     formData.append('csv', csv);
//     return this.Http.post(this.url +'/adminusers/uniupload', formData)
//   }

//   uploadSkill(csv: File):Observable<Response>{
//     const formData = new FormData();
//     formData.append('csv', csv);
//     return this.Http.post(this.url +'/adminusers/skillupload', formData)
//   }
//   uploadCert(csv: File):Observable<Response>{
//     const formData = new FormData();
//     formData.append('csv', csv);
//     return this.Http.post(this.url +'/adminusers/certupload', formData)
//   }
//   uploadCareer(csv: File):Observable<Response>{
//     const formData = new FormData();
//     formData.append('csv', csv);
//     return this.Http.post(this.url +'/adminusers/careerupload', formData)
//   }

//   uploadCourse(csv: File):Observable<Response>{
//     const formData = new FormData();
//     formData.append('csv', csv);
//     return this.Http.post(this.url +'/adminusers/courseupload', formData)
//   }

//   uploadIndustry(csv: File):Observable<Response>{
//     const formData = new FormData();
//     formData.append('csv', csv);
//     return this.Http.post(this.url +'/adminusers/industryupload', formData)
//   }

// }
