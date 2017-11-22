import {Injectable} from '@angular/core';

import{Http, Headers} from '@angular/http';
import{AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {GroceryItem} from './grocery-item';

@Injectable()
export class GroceryService {
    
    constructor(private http:AuthHttp) {
        console.log('Grocery Service Initialized...');
    }
    
    getGroceryItems() {
        return this.http.get('/api/grocery/item')
            .map(res =>res.json());
    }
    
    getGroceryList() {
        
        var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        //console.log('GroceryService.userProfile');
        //console.log(userProfile);
        //console.log(userProfile.email);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('user', userProfile.email);
        return this.http.get('/api/grocery', {headers: headers})
            .map(res =>res.json());
    }
    
    getGroceryListItem(id:string) {
        console.log('id');
        console.log(id);
        return this.http.get('/api/grocery/'+id)
            .map(res =>res.json()[0]);
    }
    
    addGroceryListItem(newGroceryListItem:GroceryItem) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/grocery', JSON.stringify(newGroceryListItem), {headers: headers})
            .map(res => res.json());
    }
    
    deleteGroceryListItem (id:string){
        return this.http.delete('/api/grocery/'+id)
            .map(res => res.json());
    }
    
    updateGroceryListItem(groceryListItem:GroceryItem) {
        console.log("GroceryService.updateGroceryListItem()");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/grocery/' +groceryListItem._id, JSON.stringify(groceryListItem), {headers: headers})
            .map(res => res.json());
    }
    
}