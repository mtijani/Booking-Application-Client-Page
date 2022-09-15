import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking_Screen',
  templateUrl: './booking_Screen.component.html',
  styleUrls: ['./booking_Screen.component.css']
})
export class Booking_ScreenComponent implements OnInit {
  selectedValue: string;
  selectedCar: string;

  plans = [

  ];
  id = 1;
  data:any;
  ItemsArray = [] as  any;
  RoomName :string;
  From :Date;
  To :Date;
  totalDays : any;
  Price:number;
  AllPlans =[] as any;
  PlanPrice :any;
  entredValue:string;
  totalAmount:number;
  image:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private dialogRef : MatDialog,
    private formBuilder:FormBuilder,

    private http: HttpClient,
    private restApiService: AuthService,
    private actRoute: ActivatedRoute,
     public router: Router) {
      this.id = this.actRoute.snapshot.params.id;

     }
     form : FormGroup;


  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/rooms/'+ this.id , this.httpOptions).subscribe((res: any)=>{
      this.data= res;
      this.RoomName=this.data.RoomName;
      this.From=this.data.From;
      this.To=this.data.To;
      this.calculateDiff();
      this.Price=this.data.Price;
      this.image=this.data.ImageUrl;
      this.plans=this.data.Plantarif;
      this.form = this.formBuilder.group ({
        Plan:['', {
        }],
      })


    });

  }

  getPrice(){
    this.restApiService.getPlans().subscribe((res: any[])=>{
      // this.entredValue=this.form.value.Plan
      // this.PlanPrice = this.AllPlans[this.entredValue];

         for(let i=0;i<res.length;i++){
          if(res[i].Plan==this.form.value.Plan){
             this.PlanPrice=res[i].Prix;

            return this.totalAmount=this.Price*this.totalDays+this.PlanPrice

          }


       }


    })

  }
  getPlanFromUser(){
    console.log(this.form.value.Plan);
  }
  calculateDiff(){
    let date = new Date(this.From);
    let currentDate = new Date(this.To);

    this.totalDays = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    console.log(this.totalDays);
    return this.totalDays;


  }


}
