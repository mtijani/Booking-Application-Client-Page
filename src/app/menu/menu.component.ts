import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../Login/Login.component';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  private authListener: Subscription;

  userIsAuthenticated = false;


    name='';

  constructor( private router:Router, private authService: AuthService) { }


  ngOnInit() {
    this.authListener = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;


    });
    this.name = localStorage.getItem("name");


  }
  onLogout(){
    this.authService.logout();


  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }

  // isLoggedIn(){
  //   return JSON.parse(localStorage.getItem("id"));

  // }
  get isLoggedIn(): boolean {
  // this.name=localStorage.name
  // this.Lastname=localStorage.Lastname
   return localStorage.length==0 ? true : false;

  }

  logOut(){
    // localStorage.removeItem("_id");
    // localStorage.removeItem("name");
    localStorage.clear();
    this.router.navigate(['/Login'])
    // console.log(localStorage)


  }

  get doubleCheck() : boolean{
    return localStorage.length==0;
  }
  // localStorage.setItem("id", prop["_id"]);


}
