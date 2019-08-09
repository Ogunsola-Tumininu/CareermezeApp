import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080';
  // url = ''
  authToken: any;
  user: any;
  usertype: any;
  isAdmin: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }


  registerUser(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`${this.url}/users/register`, user, { headers: headers })
  }

  registerCompany(company) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`${this.url}/companyusers/register`, company, { headers: headers })
  }

  registerMember(member){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/companyusers/member/register',JSON.stringify(member) , {headers: headers});
  }



  authenticateUser(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`${this.url}/users/authenticate`, user, { headers: headers })
  }

  authenticateAdmin(admin) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/adminusers/authenticate', admin, { headers: headers })
  }


  loggedIn() {
    return !!localStorage.getItem('id_token');
  }

  userType() {
    return !!localStorage.getItem('isAdmin');
  }

  isCompany() {
    return !!localStorage.getItem('permission');
  }


  getProfile() {
    this.loadToken()
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authToken })
    return this.http.get(this.url + '/users/profile', { headers: headers })
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token
  }



  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user.id);
    localStorage.setItem('isAdmin', user.isAdmin);
    this.authToken = token;
    this.user = user;
  }

  storeAdminData(token, admin) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('userId', admin.id);
    localStorage.setItem('isAdmin', admin.isAdmin);
    this.authToken = token;
    this.user = admin;
  }

  storeCompanyData(token, company) {
    // console.log(company)
    localStorage.setItem('id_token', token);
    localStorage.setItem('userId', company.id);
    localStorage.setItem('permission', company.permission);
    this.authToken = token;
    this.user = company;
  }


  logout() {
    this.authToken = null;
    this.user = null;
    this.usertype = null;
    localStorage.clear();
  }

  ngOnInit() {
    const token: string = localStorage.getItem('token');
    this.jwtHelper.isTokenExpired(token);
  }

  verifyUser(token) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.put(this.url + '/users/verify/' + token, { headers: headers })
  }

  forgotPassword(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/users/forgot-password', user, { headers: headers })
  }

  resendVerify(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/users/resend-verify', user, { headers: headers })
  }

  resetPassword(user, token) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/users/reset-password/' + token, user, { headers: headers })
  }

  verifyCompany(email, token) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.put(this.url + '/companyusers/verify-token/' + email + '/' + token, { headers: headers })
  }

  verifyMember(email, token) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.put(this.url + '/companyusers/member/verify-token/' + email + '/' + token, { headers: headers })
  }



}
