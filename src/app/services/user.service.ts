import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8080';
  //  url =''
  id = localStorage.getItem('userId');

  constructor(private http: HttpClient,
               private Http: Http) { }

  public uploadImage(image: File):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/users/upload/'+ this.id, formData)
  }

  // updateImage(image: File) {
  //   const formData = new FormData();
  //   formData.append('img', image);

  //   let headers = new HttpHeaders({'Content-Type': ''})
  //   return this.http.post(this.url +'/users/upload/'+ this.id, formData)
  // }

  getUniversity(){
    return this.http.get(this.url +'/adminusers/university');
  }

  getCourse(){
    return this.http.get(this.url +'/adminusers/course');
  }
  
  getCertification(){
    return this.http.get(this.url +'/adminusers/certification');
  }

  getIndustry(): Observable<any[]>{
        return this.http.get<any[]>(this.url +'/adminusers/industry');
      }

  getAllCareer(){
    return this.http.get(this.url +'/adminusers/career');
  }

  getCareerByIndustry(industryName){
        return this.http.get(this.url +'/adminusers/career/industry/' + industryName);
      }

  addProfile(id, input){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/profile/update/' + id, JSON.stringify(input), {headers: headers});
  }

  addCareer(input){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/users/career/update/' + this.id, JSON.stringify(input), {headers: headers});
  }

  getCareer(name){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/career/' + name, {headers: headers});
  }

  getCareerById(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/career/id/' + id, {headers: headers});
  }

  deleteCareer(input){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/' + this.id + '/career/delete/' + input._id, {headers: headers});
  }

  updateCareer(input:any, id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/' + this.id + '/career/update/' + id, JSON.stringify(input), {headers: headers});
  }

  updatePreferredCareer(input:any, id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/' + this.id + '/career/preference/' + id, JSON.stringify(input), {headers: headers});
  }

  getCareerSkills(input){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/career/skills', JSON.stringify(input), {headers: headers});
  }

  deleteSkill(careerId, skillId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/' + this.id + '/career/'+ careerId +'/skill/delete/' + skillId ,  {headers: headers});
  }

  updateSkill(careerId, skill:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/' + this.id + '/career/'+ careerId +'/skill/update/' + skill._id, JSON.stringify(skill),   {headers: headers});
  }

  getUsers(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/all',   {headers: headers});
  }

  getAUser(input){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/' + input,   {headers: headers});
  }

  sendRequest( recId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/req/' + this.id + '/rec/' + recId + '/add',   {headers: headers});
  }

  searchText(text){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let searchWord ={  searchText: text }
    return this.http.post(this.url +'/users/search', JSON.stringify(searchWord),   {headers: headers});
  }

  searchGroup(group){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let searchGroup ={  searchText: group }
    return this.http.post(this.url +'/users/group/search', JSON.stringify(searchGroup),   {headers: headers});
  }

  getAllRequest(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // return this.http.get(this.url +'/users/friendship/rec/' + this.id,   {headers: headers});

    return Observable.interval(5000).flatMap(() => {
      return this.http.get(this.url +'/users/friendship/rec/' + this.id,   {headers: headers});
    });
      
  }

  getRequest(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/friendship/rec/' + this.id,   {headers: headers});
  }

  getUserFriends(friends:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/friends/profile/all', JSON.stringify(friends),  {headers: headers});
  }

  getAcceptedFriends(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/friendship/accepted/' + id,   {headers: headers});
  }

  getAcceptedWithoutLimitFriends(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/friendship/withoutLimit/accepted/' + this.id,   {headers: headers});
  }

  acceptRequest(reqId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url + '/users/friendship/' + reqId + '/accept/' + this.id,   {headers: headers});
  }

  rejectRequest(reqId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url + '/users/friendship/' + reqId + '/reject/' + this.id,   {headers: headers});
  }

  deleteFriendship(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url + '/users/friendship/delete/' + this.id +'/' + id,   {headers: headers});
  }

  deleteFriendFromUserList(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url + '/users/friendship/'+ this.id +'/delete/' + id,   {headers: headers});
  }

  pushFriend(reqId, friend:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/friendship/' + reqId + '/updatelist/' + this.id, JSON.stringify(friend),   {headers: headers});
  }

  uploadGroupImage(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/users/group/upload/'+ id, formData)
  }

  addGroup(group:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/group/add', JSON.stringify(group),   {headers: headers});
  }

  groupRequest(request:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/group/request', JSON.stringify(request),   {headers: headers});
  }

  rejectGroup(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url + '/users/' + this.id +'/group/request/delete',  {headers: headers});
  }

  allGroupRequests(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url + '/users/group/request/' + this.id,  {headers: headers});
    
  }

  updateGroupRequests(requestId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/group/request/' + requestId +'/update',  {headers: headers});
    
  }

  // groupRequests(){
  //   let headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   // return this.http.get(this.url + '/users/group/request/' + this.id,  {headers: headers});
  //   return Observable.interval(100000).flatMap(() => {
  //     return this.http.get(this.url +'/users/group/request/' + this.id,   {headers: headers});
  //   });
  // }

  pushGroup(groupId, userId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/'+ userId +'/group/' + groupId + '/updatelist',   {headers: headers});
  }

  getGroup(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/group/' + id,   {headers: headers});
  }

  allGroups(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/all/group',   {headers: headers});
  }

  getUserGroup(groups){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/groups/all', JSON.stringify(groups),  {headers: headers});
  }

  updateGroupMember(id, input:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/group/' + id + '/member/add', JSON.stringify(input),   {headers: headers});
  }

  removeGroupMember(groupId, memberId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/group/' + groupId +'/remove/' + memberId,   {headers: headers});
  }

  removeGroupFromList(groupId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/group/' + this.id +'/delete/' + groupId,   {headers: headers});
  }

  allGroupPosts(group){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    console.log('group posts')
    return this.http.post(this.url +'/users/group/posts/all', JSON.stringify(group),  {headers: headers});
  }

  allPosts(authors){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/all/post/' + this.id, JSON.stringify(authors),  {headers: headers});
  }
  

  sendPost(post:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/post', JSON.stringify(post),   {headers: headers});
  }

  uploadPostImage(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/users/post/upload/image/'+ id, formData)
  }

  addComment(comment:any, postId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/post/'+ postId + '/comment/add', JSON.stringify(comment),   {headers: headers});
  }
  uploadCommentImage(image: File, postId, commId):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/users/post/' + postId + '/comment/'+ commId + "/image", formData)
  }

  likePost(postId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/'  + this.id + '/post/'+ postId + '/like/add',   {headers: headers});
  }

  unLikePost(postId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/'  + this.id + '/post/'+ postId + '/unlike',   {headers: headers});
  }

  likeComment(postId, commId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/'  + this.id + '/post/'+ postId +'/comment/' + commId + '/like',   {headers: headers});
  }

  unLikeComment(postId, commId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/'  + this.id + '/post/'+ postId +'/comment/' + commId + '/unlike',   {headers: headers});
  }


  replyComment(reply:any, postId, commId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + '/users/post/'+ postId +'/comment/' + commId + '/reply',  JSON.stringify(reply), {headers: headers});
  }

  getJobByCourse(course){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/job/course',  JSON.stringify(course), {headers: headers});
  } 

  getJobBySkill(skill){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/users/job/skill', JSON.stringify(skill), {headers: headers});
  } 

  getJobDetail(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/companyusers/job/'+ id, {headers: headers});
  }

  apply(id, applicant){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/users/job/apply/'+ id, JSON.stringify(applicant), {headers: headers});
  }
  

  

  


  
  
}
