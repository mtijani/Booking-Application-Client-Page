import { Component, OnInit } from '@angular/core';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-ReCaptcha',
  templateUrl: './ReCaptcha.component.html',
  styleUrls: ['./ReCaptcha.component.css']
})
export class ReCaptchaComponent implements OnInit {
  captcha: string;                                // empty = not yet proven to be a human, anything else = human
  email: string;

  constructor() {
      this.captcha = '';
      this.email = '';
  }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
      this.captcha = captchaResponse;
      console.log('resolved captcha with response: ' + this.captcha);
  }
}
