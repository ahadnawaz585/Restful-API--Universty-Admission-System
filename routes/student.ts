import express, { Request, Response, Router } from 'express';
import StudentController from '../controllers/student';

class StudentRoutes {
    private router: Router;
    private controller: StudentController;

    constructor() {
        this.router = express.Router();
        this.controller = new StudentController();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/getStudent', this.controller.getStudents.bind(this.controller));
        this.router.post('/createStudent', this.controller.createStudent.bind(this.controller));
        this.router.delete('/clearStudent', this.controller.clearStudents.bind(this.controller));
        this.router.put('/updateStudent/:id', this.controller.updateStudent.bind(this.controller));
        this.router.delete('/deleteStudent/:id', this.controller.deleteSingleStudent.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

export default StudentRoutes;
