import express, { Request, Response, Router } from 'express';
import ApplicationPaymentController from '../controllers/applicationPayment';

class ApplicationPaymentRoutes {
    private router: Router;
    private controller: ApplicationPaymentController;

    constructor() {
        this.router = express.Router();
        this.controller = new ApplicationPaymentController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/getPayment', this.controller.getPayments.bind(this.controller));
        this.router.post('/createPayment', this.controller.createPayment.bind(this.controller));
        this.router.delete('/clearPayment', this.controller.clearPayments.bind(this.controller));
        this.router.delete('/deletePayment/:id', this.controller.deleteApplicationPayment.bind(this.controller));
        this.router.put('/updatePayment/:id', this.controller.updatePayments.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

export default ApplicationPaymentRoutes;
