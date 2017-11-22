import { Component } from '@angular/core';
import { Auth }      from './auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.template.html'
})

export class LoginComponent {
  constructor(private auth: Auth) {}
};
