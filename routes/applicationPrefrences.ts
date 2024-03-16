import express, { Request, Response, Router } from 'express';
import ApplicationPreferenceController from '../controllers/applicationPrefrences';

class ApplicationPreferenceRoutes {
    private router: Router;
    private controller: ApplicationPreferenceController;

    constructor() {
        this.router = express.Router();
        this.controller = new ApplicationPreferenceController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/getPrefrence', this.controller.getPreferences.bind(this.controller));
        this.router.post('/createPreference', this.controller.createPreference.bind(this.controller));
        this.router.delete('/clearPreference', this.controller.clearPreferences.bind(this.controller));
        this.router.delete('/deletePreference/:id', this.controller.deleteSinglePrefrence.bind(this.controller));
        this.router.put('/updatePreference/:id', this.controller.updatePrefrence.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

export default ApplicationPreferenceRoutes;
