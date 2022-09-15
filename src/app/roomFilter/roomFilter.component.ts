import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-roomFilter',
  templateUrl: './roomFilter.component.html',
  styleUrls: ['./roomFilter.component.css']
})
export class RoomFilterComponent implements OnInit {
  ItemsArray=[];

  constructor(private formbuilder : FormBuilder , private restApiService : AuthService) { }

  form: FormGroup;

  ngOnInit():void {
    this.form=this.formbuilder.group({
      type:'Double',
      price:''
    })
    this.check();
  }
  check(){
    this.restApiService.getRooms().subscribe((res: any[])=>{
      // console.log(res);
      this.ItemsArray= res;
      for(let item in this.ItemsArray){
        console.log(this.ItemsArray[item].Type);
        if(this.form.value.type==this.ItemsArray[item].Type){
          return true;
        }

      }



    });
  }

}
