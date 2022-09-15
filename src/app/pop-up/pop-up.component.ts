import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
    plans =[];
    selectedValue: string;
  selectedCar: string;


  foods: Food[] = [

  ];



    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    id ;
    details =[] as any;
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }


    constructor(

      private http: HttpClient,
      public router: Router,

    ) {}

  ngOnInit() {
    this.id = localStorage.getItem('id');

    this.http.get<any[]>('http://127.0.0.1:3000/rooms/'+ this.id , this.httpOptions).subscribe((res: any)=>{
      this.details= res;
      console.log(this.details.Plantarif);
      this.foods=this.details.Plantarif;
    })


  }


}
