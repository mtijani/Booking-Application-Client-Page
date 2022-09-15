import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MenuComponent } from './menu/menu.component';
import {  throwError } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthData } from './AuthData';
import { AuthResponse } from './AuthData';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ApiService = "http://localhost:3000/";
  private token:string ;
  private name:string;
  private isAuthenticatedd=false;
  private expirationTokenKey:string ='token-expiration';
  private authStatusListener = new Subject<boolean>();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient, private router:Router){}
  // loginUser method accepts a user object which contains
  // an email and a password and return the response that backend api sends
  // loginUser(user){
  //   return this.http.post<any>(this._loginUrl,user)
  // }
  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(this.ApiService +'users');
  }
  getPlans():Observable<any[]> {
    return this.http.get<any[]>(this.ApiService+'plantarifs')
  }
  getRooms(): Observable <any[]> {
    return this.http.get<any[]>(this.ApiService + 'rooms');
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getToken(){
    return this.token;
  }

  login(email: string,password:string){
    const authData: AuthData= {email:email,password:password};
    this.http.post<{token,name}>("http://localhost:3000/login",authData)
    .subscribe(response =>{
      const token = response.token;
      const name = response.name;
      this.token =token;
      this.saveAuthData(token,name);
      if(token){
        this.isAuthenticatedd=true;
        this.authStatusListener.next(true);
        swal("Welcome !",  "Connected Successfully","success");
        this.router.navigate(['/'])
      }



    })

  }
  // loggin(AuthData:AuthData):Observable<>{
  //   return this.http.post<>(this.ApiService+"login"+AuthData)

  // }
  isAuthenticated():boolean{
    return true;
  }
  logout(){
    this.token = null;
    this.isAuthenticatedd=false;
    this.authStatusListener.next(false);
    this.clearAuthData();
  }
  private saveAuthData(token: string, name:string){
    localStorage.setItem('token',token);
    localStorage.setItem('name',name)
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  }


  // saveToken(authResp:AuthResponse){
  //   localStorage.setItem(this.tokenKey, authResp.token);
  //   localStorage.setItem(this.expirationTokenKey, authResp.expiration);

  // }

  // SignOut(){
  //   localStorage.removeItem('id');
  //   this.router.navigate(['home']);

  // }
  // SignOut() {
  //   return this.afAuth.auth.signOut().then(() => {
  //     localStorage.removeItem('user');
  //     this.router.navigate(['home']);
  //   })
  // isloggedin(){
  //   localStorage.getItem
  // }

}
