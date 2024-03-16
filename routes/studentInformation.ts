import express, { Request, Response, Router } from 'express';
import studentInfoController from '../controllers/studentInfo';

class studentInformationRoutes {
  private router: Router;
  private controller: studentInfoController;

  constructor() {
    this.router = express.Router();
    this.controller = new studentInfoController();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get('/getStudentInformation', this.controller.getInfo.bind(this.controller));
    this.router.post('/createStudentInformation', this.controller.createInfo.bind(this.controller));
    this.router.delete('/deleteStudentInformation', this.controller.clearInfo.bind(this.controller));
    this.router.delete('/deleteStudentInformation/:id', this.controller.deleteSingleInfo.bind(this.controller));
    this.router.put('/updateStudentInformation/:id', this.controller.updateInformation.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

export default studentInformationRoutes;
