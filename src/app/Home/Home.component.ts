import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  ItemsArray = [] as  any;
  FiltredType:string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private dialogRef : MatDialog,
    private http: HttpClient,
    private restApiService: AuthService,
    private formbuilder : FormBuilder ,
     public router: Router) { }

  ngOnInit() {
    this.form=this.formbuilder.group({
      type:'',
      price:''
    })
    // this.check();

    this.restApiService.getRooms().subscribe((res: any[])=>{
      // console.log(res);
      this.ItemsArray= res;


    });

    localStorage.getItem('id');

  }
  check(type:string){
    type=this.form.value.type;

    if(type==''){
      this.restApiService.getRooms().subscribe((res: any[])=>{
        this.ItemsArray= res;

      });

    }
    else{
      this.restApiService.getRooms().subscribe((res: any[])=>{
        this.ItemsArray= res;
        this.ItemsArray = this.ItemsArray.filter(item => item.Type === this.form.value.type);
        if(this.ItemsArray==''){
          this.restApiService.getRooms().subscribe((res: any[])=>{
            this.ItemsArray= res;

          });
          swal("Check again !",  "Type"+"  " +type+"  " +"Is not an actual type (Double, Single or Luxe)","error");
        }

      });


    }




  }


  RemoveId(id){
    // localStorage.removeItem('id');
    localStorage.setItem('id',id);




  }
  openDialog(id) {

    const dialogRef = this.dialogRef.open(PopUpComponent);
    // console.log(id);
    localStorage.setItem('id',id);
    console.log(localStorage.getItem('id'))

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    // localStorage.removeItem('id');
  }
}


