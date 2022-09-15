import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './SignUp/SignUp.component';
import { HomeComponent } from './Home/Home.component';
import { RoomFilterComponent } from './roomFilter/roomFilter.component';
import { Booking_ScreenComponent } from './booking_Screen/booking_Screen.component';
import { LoginComponent } from './Login/Login.component';
import { PopUpComponent } from './pop-up/pop-up.component';
const routes: Routes = [
  {path:'SignUp', component:SignUpComponent},
  {path:'Home',component:HomeComponent},
  {path :'', component:HomeComponent},
  {path:'roomFilter', component:RoomFilterComponent},
  {path:'BookingScreen/:id',component:Booking_ScreenComponent },
  {path:'Login', component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
