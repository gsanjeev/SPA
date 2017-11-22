import {Injectable} from '@angular/core';

import{Http, Headers} from '@angular/http';
import{AuthHttp} from 'angular2-jwt';

import 'rxjs/add/operator/map';
import {Task} from './task';

@Injectable()
export class TaskService {
    constructor(private http:AuthHttp) {
        console.log('Task Service Initialized...');
    }
    
    getTasks() {
        console.log("getTasks()");
        var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('user', userProfile.email);
        console.log("getTasks()");
        return this.http.get('/api/task', {headers: headers})
            .map(res =>res.json());
    }
    
    addTask(newTask:Task) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/task', JSON.stringify(newTask), {headers: headers})
            .map(res => res.json());
    }
    
    deleteTask (id:string){
        return this.http.delete('/api/task/'+id)
            .map(res => res.json());
    }
    
    updateStatus(task:Task) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/task/' +task._id, JSON.stringify(task), {headers: headers})
            .map(res => res.json());
    }
    
}