import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GroceryItem }  from './grocery-item';
import { GroceryService }  from './grocery.service';


@Component({
  
    templateUrl:'grocery-item-detail.component.html',
    animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class GroceryItemDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  groceryListItem: GroceryItem = {_id: '', name:'', qty:0, unit:'',user:'',isPurchased: false,description:''};


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groceryService: GroceryService
  ) {

  }

  ngOnInit() {
      this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.groceryService.getGroceryListItem(params['id']))
      .subscribe((groceryListItem: GroceryItem) => {
          this.groceryListItem = groceryListItem
          console.log('After retriving:');
          console.log(groceryListItem);
          console.log(this.groceryListItem);
      });
  }


  gotoGroceryList() {
    let groceryListItemId = this.groceryListItem ? this.groceryListItem._id : null;
    // Pass along the groceryListItemId if available
    // so that the GroceryList component can select that GroceryListItem.
    this.router.navigate(['/grocery-list', { id: groceryListItemId, foo: 'foo' }]);
  }
  

  updateGroceryListItem(){
      var updGroceryListItem = {
              name: this.groceryListItem.name,
              description: this.groceryListItem.description,
              qty: this.groceryListItem.qty,
              unit: this.groceryListItem.unit,
              user: this.groceryListItem.user,
              id:this.groceryListItem._id,
              isPurchased: this.groceryListItem.isPurchased
      };
      this.groceryService.updateGroceryListItem(this.groceryListItem)
          .subscribe(data => {
              console.log(this.groceryListItem);
              console.log(data);
              this.gotoGroceryList();
          });
  }
}

