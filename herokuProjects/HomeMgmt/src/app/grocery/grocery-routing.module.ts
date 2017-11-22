import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroceryListComponent }    from './grocery-list.component';
import { GroceryItemDetailComponent }  from './grocery-item-detail.component';

import { AuthGuard }      from '../auth/auth-gaurd.service';


const groceryRoutes: Routes = [
  { path: 'grocery-list',  component: GroceryListComponent, canActivate: [AuthGuard] },
  { path: 'grocery-item/:id', component: GroceryItemDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(groceryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GroceryRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/