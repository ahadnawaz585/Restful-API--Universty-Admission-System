import express, { Request, Response, Router } from 'express';
import LevelOfEducationController from '../controllers/levelOfEducation';

class LevelOfEducationRoutes {
    private router: Router;
    private controller: LevelOfEducationController;

    constructor() {
        this.router = express.Router();
        this.controller = new LevelOfEducationController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/getLevelsOfEducation', this.controller.getLevelsOfEducation.bind(this.controller));
        this.router.post('/createLevelOfEducation', this.controller.createLevelOfEducation.bind(this.controller));
        this.router.delete('/clearLevelsOfEducation', this.controller.clearLevelsOfEducation.bind(this.controller));
        this.router.put('/updateLevelOfEducation/:id', this.controller.updateLevelOfEducation.bind(this.controller));
        this.router.delete('/deleteLevelOfEducation/:id', this.controller.deleteSinglelevelOfEducation.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

export default LevelOfEducationRoutes;
