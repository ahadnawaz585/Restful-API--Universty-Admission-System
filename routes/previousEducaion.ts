import express, { Request, Response, Router } from 'express';
import PreviousEducationController from '../controllers/previousEducationHistory';

class PreviousEducationRoutes {
    private router: Router;
    private controller: PreviousEducationController;

    constructor() {
        this.router = express.Router();
        this.controller = new PreviousEducationController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/getPreviousEducation', this.controller.getPreviousEducation.bind(this.controller));
        this.router.post('/createPreviousEducation', this.controller.createPreviousEducation.bind(this.controller));
        this.router.delete('/clearPreviousEducation', this.controller.clearPreviousEducation.bind(this.controller));
        this.router.put('/updatePreviousEducation/:id', this.controller.updatePreviousEducation.bind(this.controller));
        this.router.delete('/deletePreviousEducation/:id', this.controller.deleteSingleEducation.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

export default PreviousEducationRoutes;
