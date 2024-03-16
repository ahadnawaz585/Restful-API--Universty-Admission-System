import express, { Request, Response, Router } from 'express';
import UniversityAdminController from '../controllers/universtyAdmin';

class UniversityAdminRoutes {
    private router: Router;
    private controller: UniversityAdminController;

    constructor() {
        this.router = express.Router();
        this.controller = new UniversityAdminController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/getAdmin', this.controller.getAdmins.bind(this.controller));
        this.router.post('/createAdmin', this.controller.createAdmin.bind(this.controller));
        this.router.delete('/clearAdmin', this.controller.clearAdmins.bind(this.controller));
        this.router.put('/updateAdmin/:id', this.controller.updateAdmin.bind(this.controller));
        this.router.delete('/deleteAdmin/:id', this.controller.deleteAdmin.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

export default UniversityAdminRoutes;
