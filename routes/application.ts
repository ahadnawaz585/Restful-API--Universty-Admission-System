import express, { Request, Response, NextFunction, Router } from 'express';
import ApplicationController from '../controllers/application';

class applicationRoutes{
    private router: Router;
    private controller: ApplicationController;

    constructor(){
        this.router = express.Router();
        this.controller = new ApplicationController();
        this.initializeRoutes();
    }
    initializeRoutes(): void { 
        this.router.get('/getApplication', this.controller.getApplications.bind(this.controller));
        this.router.post('/createApplication', this.controller.createApplication.bind(this.controller));
        this.router.delete('/clearApplication', this.controller.clearApplications.bind(this.controller));
        this.router.put('/updateApplication/:id', this.controller.updateApplication.bind(this.controller));
        this.router.delete('/deleteApplication/:id', this.controller.deleteApplication.bind(this.controller));
        this.router.put('/updateApplicationStatus/:id', this.controller.updateApplicationStatus.bind(this.controller));
    }
    getRouter(){
        return this.router;
    }
}
export default applicationRoutes;