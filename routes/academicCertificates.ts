import express, { Request, Response, NextFunction, Router } from 'express';
import AcademicCertificateController from '../controllers/academicCertificates';

class AcademicCertificateRoutes {
    private router: Router;
    private controller: AcademicCertificateController;

    constructor() {
        this.router = express.Router();
        this.controller = new AcademicCertificateController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
   
        this.router.get('/getCertificate', this.controller.getCertificates.bind(this.controller));
        this.router.post('/createCertificate', this.controller.createCertificate.bind(this.controller));
        this.router.delete('/clearCertificate', this.controller.clearCertificates.bind(this.controller));
        this.router.put('/updateCertificate/:id', this.controller.updateCertificates.bind(this.controller));
        this.router.delete('/deleteCertificate/:id', this.controller.deleteSingleCertficate.bind(this.controller));
    }
    
    getRouter(){
        return this.router;
    }
}

export default AcademicCertificateRoutes;
