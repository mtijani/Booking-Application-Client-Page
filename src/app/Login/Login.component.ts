import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AuthService } from '../auth.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import swal from 'sweetalert';
import * as bcrypt from 'bcryptjs'
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  access:boolean=false;
  loginUserData = [] as any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private router:Router,
     private formBuilder:FormBuilder,
     private ApiService : AuthService
     ) { }
  form : FormGroup;
  hide=true;
  ngOnInit(): void {
    this.form = this.formBuilder.group ({
      email:['', {
        validators: [Validators.required, Validators.email]
      }],
      Password:['', {
        validators: [Validators.required]
      }],

    });
    this.form.markAllAsTouched();
    this.ApiService.getUsers().subscribe(
      (res : any[])=>
      {this.loginUserData =res;}
    )

  }
  saveChanges(){

  }
  onLogin(email :string,password:string){
    this.ApiService.login(email=this.form.value.email,password= this.form.value.Password);
    // console.log(this.form.value.email);
    // this.router.navigate["/"];


  }
  submitForm(value: string,value2: string) {

    let acces:boolean = false;
    let email='';
    let id='';
    let name='';
    let Lastname='';






    let evilResponseProps = Object.values(this.loginUserData);
    let myObj_serialized = JSON.stringify(this.loginUserData);






    for (var prop of this.loginUserData) {







    if (prop["email"] == value && prop["password"] == value2 ){

    email=value;
    id=prop["_id"];
    name=prop["name"];
    Lastname=prop["Lastname"]


    acces = true;


    }
    }

      if (acces == true){
        // localStorage.setItem("id", prop["_id"]);
        // localStorage.setItem("name",prop["name"])
        // console.log(prop)
         localStorage.setItem("email",email);
         localStorage.setItem("id",id);
         localStorage.setItem("name",name);
         localStorage.setItem("Lastname",Lastname);
        // console.log(prop["email"])

        //  console.log(localStorage)
          //  alert("welcome  member!");
          swal("Welcome !",  "Connected Successfully","success");


          this.router.navigate(['/']);


      }
      else{
        // alert("invalid login or password");
        swal("Check again !",  "invalid Email or password","error");

      }

      return false;
    }

  // loginUsers(){
  //   this._auth.loginUser(this.loginUserData) // when we subscribe we either get the response data
  //   // or an error
  //   .subscribe(
  //     res=>console.log(res),
  //     err=>console.log(err)
  //   )
  // }

  getErrorPassword(){
    const field2=this.form.get('Password');
    // if (field2.hasError('min')){
    //   return 'Enter a longer Password';
    // }
    // if (field2.hasError('max')){
    //   return 'Password has reached maximum'
    // }
    if (field2.hasError('required')){
      return 'Password is Required'
    }
    return '';

  }
  getErrorName(){
    const field = this.form.get('email');
    if (field.hasError('required')){

      // return 'Field Required';
     }



    return '' ;
          }
   }
