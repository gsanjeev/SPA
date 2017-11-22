import { Router, Response, Request, NextFunction } from 'express';
var mongojs = require( 'mongojs' );
var db = mongojs( 'mongodb://sanjeev:sanjeev@ds113958.mlab.com:13958/mytasklist_sanjeev' );

export class GroceryRouter {
    router: Router
    constructor() {
        this.router = Router();
        this.init();
    }

    //Get All Grocery Items '/item'
    public getGroceryItems( req: Request, res: Response, next: NextFunction ) {
        db.groceryItems.find( function( err, groceryItems ) {
            if ( err ) {
                res.send( err );
            }
            res.json( groceryItems );
        });
    }



    //Get All Grocery List
    public getGroceryList( req: Request, res: Response, next: NextFunction ) {
        //console.log('grocery.grocerList');
        var user = req.get( 'user' );
        //console.log('grocery.user');
        console.log( user );
        db.groceryList.find( { user: user }, function( err, groceryList ) {
            if ( err ) {
                res.send( err );
            }
            res.json( groceryList );
        });
    }


    //Get Single Grocery List Item 
    public getGroceryListItem( req: Request, res: Response, next: NextFunction ) {
        db.groceryList.find( { _id: mongojs.ObjectId( req.params.id ) }, function( err, groceryListItem ) {
            if ( err ) {
                res.send( err );
            }
            res.json( groceryListItem );
        });
    }


    //Save groceryListItem 
    public saveListItem( req: Request, res: Response, next: NextFunction ) {
        var groceryListItem = req.body;

        if ( !groceryListItem.name ) {
            res.status( 400 );
            res.json( { "error": "Bad Data" });
        } else {

            db.groceryList.save( groceryListItem, function( err, groceryListItem ) {
                if ( err ) {
                    res.send( err );
                }
                res.json( groceryListItem );

            });

        }
    }

    //Delete GroceryListItem 
    public deleteGroceryListItem( req: Request, res: Response, next: NextFunction ) {
        db.groceryList.remove( { _id: mongojs.ObjectId( req.params.id ) }, function( err, groceryListItem ) {
            if ( err ) {
                res.send( err );
            }
            res.json( groceryListItem );
        });
    }

    //Update GroceryListItem 
    public updateGroceryListItem( req: Request, res: Response, next: NextFunction ) {
        var groceryListItem = req.body;
        if ( !groceryListItem.name || !groceryListItem.user ) {
            res.status( 400 );
            res.json( { "error": "Bad Data" });
        } else {
            var updGroceryListItem = { name: '', qty: 0, unit: '', user: '', isPurchased: false, description: '' };

            updGroceryListItem.name = groceryListItem.name;
            updGroceryListItem.user = groceryListItem.user;
            updGroceryListItem.qty = groceryListItem.qty;
            if ( groceryListItem.unit ) {
                updGroceryListItem.unit = groceryListItem.unit;
            }
            if ( groceryListItem.description ) {
                updGroceryListItem.description = groceryListItem.description;
            }
            updGroceryListItem.isPurchased = groceryListItem.isPurchased;
            db.groceryList.update( { _id: mongojs.ObjectId( req.params.id ) }, updGroceryListItem, {}, function( err, updGroceryListItem ) {
                if ( err ) {
                    res.send( err );
                }
                res.json( updGroceryListItem );

            });
        }
    }
    
    /**
     * Attach each handler to one of the Express.Router's
     * endpoints.
     */
    init() {
      this.router.get('/item', this.getGroceryItems);
      this.router.get('/', this.getGroceryList);
      this.router.get('/:id', this.getGroceryListItem);
      this.router.post('/', this.saveListItem);
      this.router.delete('/:id', this.deleteGroceryListItem);
      this.router.put('/:id', this.updateGroceryListItem);
    }


}
//export { groceryRouter }

// Create the GroceryRouter, and export Router
const groceryRoutes = new GroceryRouter();
groceryRoutes.init();

export default groceryRoutes.router;

