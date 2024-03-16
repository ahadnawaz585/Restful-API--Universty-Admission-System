import express, { Request, Response, Router } from 'express';
import ApplicationStatusController from '../controllers/applicationStatus';

class ApplicationStatusRoutes {
    private router: Router;
    private controller: ApplicationStatusController;

    constructor() {
        this.router = express.Router();
        this.controller = new ApplicationStatusController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/getStatusHistory', this.controller.getStatusHistory.bind(this.controller));
        this.router.post('/createStatusHistory', this.controller.createStatusHistory.bind(this.controller));
        this.router.delete('/clearStatusHistory', this.controller.clearStatusHistory.bind(this.controller));
        this.router.delete('/deleteStatusHistory/:id', this.controller.deleteSingleStatus.bind(this.controller));
        this.router.put('/updateStatusHistory/:id', this.controller.updateStatusHistory.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

export default ApplicationStatusRoutes;
