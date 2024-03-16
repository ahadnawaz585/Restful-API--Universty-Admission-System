import express, { Request, Response, Router } from 'express';
import ProgramController from '../controllers/program';

class ProgramRoutes {
    private router: Router;
    private controller: ProgramController;

    constructor() {
        this.router = express.Router();
        this.controller = new ProgramController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/getProgram', this.controller.getPrograms.bind(this.controller));
        this.router.post('/createProgram', this.controller.createProgram.bind(this.controller));
        this.router.delete('/clearProgram', this.controller.clearPrograms.bind(this.controller));
        this.router.put('/updateProgram/:id', this.controller.updateProgram.bind(this.controller));
        this.router.delete('/deleteProgram/:id', this.controller.deleteSingleProgram.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

export default ProgramRoutes;
