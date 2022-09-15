import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { HomeComponent } from './Home/Home.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import {footerComponent} from './footer/footer.component'
import { RoomFilterComponent } from './roomFilter/roomFilter.component';
import { Booking_ScreenComponent } from './booking_Screen/booking_Screen.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import {RecaptchaFormsModule} from 'ng-recaptcha'
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'
import { ReCaptchaComponent } from './ReCaptcha/ReCaptcha.component';
import { LoginComponent } from './Login/Login.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
      MenuComponent,
      SignUpComponent,
      HomeComponent,
      PopUpComponent,
      footerComponent,
      RoomFilterComponent,
      Booking_ScreenComponent,
      ReCaptchaComponent,
      LoginComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RecaptchaModule,
    HttpClientModule,
    RecaptchaFormsModule,
    SweetAlert2Module,




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
