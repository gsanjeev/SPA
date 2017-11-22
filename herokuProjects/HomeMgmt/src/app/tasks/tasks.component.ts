import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';
@Component( {
    templateUrl: './tasks.component.html'
})
export class TasksComponent {
    tasks: Task[];
    title: string;
    keymap = {
        enter: 13
    };
    constructor( private taskService: TaskService ) {
        console.log("constructor-getTasks()");
        this.taskService.getTasks()
            .subscribe( tasks => {
                this.tasks = tasks;
            });
    }
    

    
    addTask( $event ) {
        // if enter pressed
        if ( $event.which === this.keymap.enter ) {
            if ( $event.target.value !== '' ) {
                this.createNewTask( $event );
            }
        }
    }
    
    createNewTask( event: any ) {
        event.preventDefault();
        var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );

        var newTask = {
            title: this.title,
            user: userProfile.email,
            _id: '',
            isDone: false,
        }
        console.log( newTask );
        this.taskService.addTask( newTask )
            .subscribe( task => {
                this.tasks.push( task );
                console.log( task );
                this.title = '';
            });
    }
    deleteTask( id: string ) {
        var tasks = this.tasks;
        this.taskService.deleteTask( id )
            .subscribe( data => {
                if ( data.n == 1 ) {
                    for ( var i = 0; i < tasks.length; i++ ) {
                        if ( tasks[i]._id == id ) {
                            tasks.splice( i, 1 );
                        }
                    }
                }
            })
    }

    updateStatus( task: Task ) {
        var task = {
            title: task.title,
            user: task.user,
            _id: task._id,
            isDone: !task.isDone
        };
        this.taskService.updateStatus( task )
            .subscribe( data => {
                task.isDone = !task.isDone;
            });
    }

}
