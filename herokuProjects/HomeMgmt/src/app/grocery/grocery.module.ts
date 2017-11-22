import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { GroceryListComponent }    from './grocery-list.component';
import { GroceryItemDetailComponent }  from './grocery-item-detail.component';

import { GroceryService } from './grocery.service';

import { GroceryRoutingModule } from './grocery-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GroceryRoutingModule
  ],
  declarations: [
    GroceryListComponent,
    GroceryItemDetailComponent
  ],
  providers: [
    GroceryService
  ]
})
export class GroceryModule {}
