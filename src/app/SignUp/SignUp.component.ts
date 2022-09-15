import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css'],
})
export class SignUpComponent implements OnInit {
  form : FormGroup;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  captcha: string;                                // empty = not yet proven to be a human, anything else = human
  email: string;

  constructor(private http: HttpClient,
    public router: Router,
    private formBuilder:FormBuilder,
    private _snackBar: MatSnackBar
    ) {
      this.captcha = '';
      this.email = '';


  }
  hide = true;

  ngOnInit() {
    this.form = this.formBuilder.group ({
      name:['', {
        validators: [Validators.required, Validators.minLength(3)]
      }],
      Lastname:['', {
        validators: [Validators.required]
      }],
      email:['', {
        validators: [Validators.required, Validators.email]
      }],
      PhoneNumber:['', {
         validators: [Validators.required, Validators.minLength(8)]
      }],
      Password:['', {
        validators: [Validators.required, Validators.minLength(5)]
      }],
      Gender:['male', {
         validators: [Validators.required]
      }],


      DateOfBirth:['', {
         validators: [Validators.required]
      }],
      recaptcha:['', {
         validators: [Validators.required]
      }],

    });
    this.form.markAllAsTouched();

  }
  openSnackBar() {
    this._snackBar.open('Regestration done with success', 'OK');
  }
  saveChanges(){}
  OnlyNumberAllower(event):boolean{
    const charCode = (event.which)?event.which: event.keyCode;

    if(charCode>31 && (charCode<48 || charCode>57))
    {
      // console.log('Char code restricted is '+charCode)
      return false;
    }

    return true;

    }
    resolved(captchaResponse: string) {
      this.captcha = captchaResponse;
      console.log('resolved captcha with response: ' + this.captcha);
    }
    onsaveChanges(){

    }
    getErrorRecaptcha(){
      const field7 = this.form.get('recaptcha');
      if(field7.hasError('required')){
        return 'Recaptcha is required';
      }
      return '';
    }
    getErrorDateOFB(){
      const field6 = this.form.get('DateOfBirth');
      if(field6.hasError('required')){
        return 'Date of birth is required';
      }
      return '';
    }
    getErrorPhoneNumber(){
      const field4 = this.form.get('PhoneNumber');
      if(field4.hasError('required')){
        return 'Phone Number is required'
      }
      if(field4.hasError('minLength')){
        return 'Must be 8 digits'
      }
      return '';
    }
    getErrorGender(){
      const field5 = this.form.get('Gender');
      if(field5.hasError('Gender')){
        return 'Pleaser Select your gender'
      }
      return '';
    }

    getErrorEmail(){
      const field3 = this.form.get('email');
      if(field3.hasError('email')){
        return 'Invalid email form';
      }
      if(field3.hasError('required')){
        return 'Email is required';
      }
      return '';
    }

    getErrorPassword(){
      const field = this.form.get('Password')
      if (field.hasError('minLength')){
        return ' Password must have 5 characters at least';
      }
      if(field.hasError('required')){
        return 'Password is required';
      }
      return '';
    }
    getErrorName(){
      const field = this.form.get('name');
       const field2 = this.form.get('Lastname')
      if (field.hasError('required')){

        return 'Field is Required';
       }
       if (field.hasError('MinLength')){
        return 'Min Length is 3';

       }


      return '' ;
    }

    getErrorLastName(){
      const field2 = this.form.get('Lastname');
      if (field2.hasError('required')){
           return 'Last Name is Required'
         }


         return '' ;
    }


    submitForm(value: string,value2: string,value3: string,value4: string,value5: string, value6 : string, value7:Date) {
      const body = { name : value ,  Lastname : value2 , email : value3, PhoneNumber : value4   ,password : value5 , Gender : this.form.value.Gender, DateOfBirth:value7 }

      console.log(body);
      this.http.post('http://127.0.0.1:3000/users/', body , this.httpOptions).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)

    )
    // alert("welcome new member!");

    this.router.navigate(['/Login']);
    // console.log(this.form.value);


  }
    }




