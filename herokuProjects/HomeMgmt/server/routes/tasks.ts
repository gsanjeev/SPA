import { Router, Response, Request, NextFunction } from 'express';
var mongojs = require( 'mongojs' );
var db = mongojs( 'mongodb://sanjeev:sanjeev@ds113958.mlab.com:13958/mytasklist_sanjeev' );

//let tasksRouter: Router = Router();

export class TaskRouter {
    router: Router
    constructor() {
        this.router = Router();
        this.init();
    }

    //Get All Tasks
    //tasksRouter.get( '/', function( req, res, next ) {
    public getTasks( req: Request, res: Response, next: NextFunction ) {
        var user = req.get( 'user' );
        db.tasks.find( { user: user }, function( err, tasks ) {
            if ( err ) {
                res.send( err );
            }
            res.json( tasks );
        });
    }


    //Get Single Task
    //tasksRouter.get( '/:id', function( req, res, next ) {
    public getTask( req: Request, res: Response, next: NextFunction ) {
        db.tasks.find( { _id: mongojs.ObjectId( req.params.id ) }, function( err, task ) {
            if ( err ) {
                res.send( err );
            }
            res.json( task );
        });
    }


    //Save Task
    //tasksRouter.post( '/', function( req, res, next ) {
    public saveTask( req: Request, res: Response, next: NextFunction ) {
        var task = req.body;
        if ( !task.title || !( task.isDone + '' ) ) {
            res.status( 400 );
            res.json( { "error": "Bad Data" });
        } else {

            db.tasks.save( task, function( err, task ) {
                if ( err ) {
                    res.send( err );
                }
                res.json( task );
            });

        }


    }

    //Delete Task
    //tasksRouter.delete( '/:id', function( req, res, next ) {
    public deleteTask( req: Request, res: Response, next: NextFunction ) {
        db.tasks.remove( { _id: mongojs.ObjectId( req.params.id ) }, function( err, task ) {
            if ( err ) {
                res.send( err );
            }
            res.json( task );
        });
    }

    //Update Task
    //tasksRouter.put( '/:id', function( req, res, next ) {
    public updateTask( req: Request, res: Response, next: NextFunction ) {
        var task = req.body;
        var updTask = { isDone: false, title: '', user: '' };
        if ( task.isDone ) {
            updTask.isDone = task.isDone;
        }
        updTask.user = task.user;
        updTask.title = task.title;
        if ( !updTask || !updTask.title || !updTask.user ) {
            res.status( 400 );
            res.json( { "error": "Bad Data" });
        } else {
            db.tasks.update( { _id: mongojs.ObjectId( req.params.id ) }, updTask, {}, function( err, task ) {
                if ( err ) {
                    res.send( err );
                }
                res.json( task );
            });
        }


    }

    /**
     * Attach each handler to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get( '/', this.getTasks );
        this.router.get( '/:id', this.getTask );
        this.router.post( '/', this.saveTask );
        this.router.delete( '/:id', this.deleteTask );
        this.router.put( '/:id', this.updateTask );
    }
}

//export { tasksRouter }

// Create the TaskRouter, and export Router
const taskRoutes = new TaskRouter();
taskRoutes.init();

export default taskRoutes.router;
