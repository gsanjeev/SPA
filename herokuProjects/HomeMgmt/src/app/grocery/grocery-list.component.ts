import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import {GroceryService} from './grocery.service';
import {GroceryItem} from './grocery-item';
@Component({

    selector: 'grocery',
    templateUrl: './grocery-list.component.html',
    styles: [
             `
             .item-selected-class {
                background-color: #CFD8DC;
                color: white;
             }
             `]
})
export class GroceryListComponent { 
    groceryItems: GroceryItem[];
    groceryList: GroceryItem[];
    newGroceryListItem= {_id: '', name:'', qty:0, unit:'',user:'',isPurchased: false,description:''};
    private selectedId: string;

    constructor(private groceryService:GroceryService,
            private route: ActivatedRoute,
            private router: Router        
    
    )
    {
        this.groceryService.getGroceryItems()
        .subscribe(groceryItems => {
            this.groceryItems = groceryItems;  
            //console.log(groceryItems);
        });
        
        this.groceryService.getGroceryList()
        .subscribe(groceryList => {
            this.groceryList = groceryList; 
            //console.log(groceryList);
        });
        
    }
 
    ngOnInit() {
        this.route.params
              .subscribe(params => 
                  this.selectedId = params['id']);
      }


      isSelected(groceryListItem: GroceryItem) { 
          return groceryListItem._id === this.selectedId;         

      }
    
    addGroceryListItem(event:any) {
        var userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        console.log('grocery-list.userProfile');
        console.log(userProfile);
        console.log(userProfile.email);
        event.preventDefault();       
        this.newGroceryListItem.user = userProfile.email;
        this.groceryService.addGroceryListItem(this.newGroceryListItem)
            .subscribe(groceryListItem => {
                this.groceryList.push(groceryListItem);
            });
    }
    
    deleteGroceryListItem(_id:string){
        var groceryList = this.groceryList;
        this.groceryService.deleteGroceryListItem(_id)
            .subscribe(data => {
                if(data.n == 1){
                    for(var i = 0; i < groceryList.length; i++) {
                        if(groceryList[i]._id == _id) {
                            groceryList.splice(i,1);
                        }
                    }
                }
            })
    }

    
    
    onSelect(groceryListItem:GroceryItem) {
        this.router.navigate(['/grocery-item', groceryListItem._id]);
      }
    
}
