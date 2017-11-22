import { Component } from '@angular/core';
import { Auth }              from '../auth/auth.service';


@Component({

    templateUrl: './home.component.html'
    
})
export class HomeComponent {
    
    
    constructor(private auth: Auth) {}

};

