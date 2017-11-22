import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard }  from './auth/auth-gaurd.service';
import {HomeComponent} from './home/home.component';
import {TasksComponent} from './tasks/tasks.component';
import {CookingVideoComponent} from './video/cooking-video.component';
import {LoginComponent} from './login.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'task-list', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'cooking-video', component: CookingVideoComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}