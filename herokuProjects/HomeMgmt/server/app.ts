import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as compression from 'compression';

import GroceryRouter   from './routes/grocery';
import TaskRouter  from './routes/tasks';

const app: express.Application = express();

app.disable( 'x-powered-by' );

//var jwt = require( 'express-jwt' );

//var authConfig = require( 'auth-config.json' );
//var authCheck = jwt( {
//    secret: 'W1QOS7nmZ7aTRUobRPmLuuh2uzMzbxfiA7jhqi2RstoFmw0AN64OyoeLSughDNHL',
//    audience: 'yqIuoG5HNg3LJYK34iF0XBDKCs7FgGeZ'
//});

app.use( json() );
app.use( compression() );
app.use( urlencoded( { extended: true }) );

// api routes
app.use( "/api/task", TaskRouter );
app.use( '/api/grocery', GroceryRouter );

//app.use( '/api/task', authCheck, tasksRouter );
//app.use( '/api/grocery', authCheck, groceryRouter );

if ( app.get( 'env' ) === 'production' ) {

    // in production mode run application from dist folder
    app.use( express.static( path.join( __dirname, '/../client' ) ) );
}

// catch 404 and forward to error handler
app.use( function( req: express.Request, res: express.Response, next ) {
    let err = new Error( 'Not Found' );
    next( err );
});

// production error handler
// no stacktrace leaked to user
app.use( function( err: any, req: express.Request, res: express.Response, next: express.NextFunction ) {

    res.status( err.status || 500 );
    res.json( {
        error: {},
        message: err.message
    });
});

export { app }
