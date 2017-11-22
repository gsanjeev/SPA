import { Component } from '@angular/core';
import { Auth }              from './auth/auth.service';

@Component({

    selector: 'my-app',
    templateUrl: './app.component.html'
    
})
export class AppComponent {
  constructor(private auth: Auth) {}
};

