import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { YoutubePlayerModule } from 'ng2-youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { GroceryModule } from './grocery/grocery.module';

import { AuthModule } from './auth/auth.module';

import { AppComponent }  from './app.component';

import {TasksComponent} from './tasks/tasks.component';
import {LoginComponent} from './login.component';
import {HomeComponent} from './home/home.component';

import {TaskService} from './tasks/task.service';
import {CookingVideoService} from './video/cooking-video.service';

import { CookingVideoComponent, VideoFilter } from './video/cooking-video.component';

@NgModule({
  imports: [ AuthModule, BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, AppRoutingModule, YoutubePlayerModule,
             GroceryModule],
  declarations: [ AppComponent, TasksComponent, LoginComponent, HomeComponent, CookingVideoComponent, VideoFilter ],
  providers:[TaskService, CookingVideoService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
