import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import AcademicCertificateRoutes from './routes/academicCertificates';
import ApplicationRoutes from './routes/application';
import ApplicationPaymentRoutes from './routes/applicationPayment';
import ApplicationPreferenceRoutes from './routes/applicationPrefrences';
import ApplicationStatusRoutes from './routes/applicationStatus';
import LevelOfEducationRoutes from './routes/levelOfEducation';
import ProgramRoutes from './routes/program';
import StudentRoutes from './routes/student';
import UniversityAdminRoutes from './routes/universtyAdmin';
import PreviousEducationRoutes from './routes/previousEducaion';
import studentInformationRoutes from './routes/studentInformation';

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.accessControl();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.startServer();
        this.handleNotFound();
    }

    private accessControl() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    private initializeMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initializeRoutes(): void {
        const Certificate = new AcademicCertificateRoutes().getRouter();
        const Application = new ApplicationRoutes().getRouter();
        const ApplicationPayment = new ApplicationPaymentRoutes().getRouter();
        const ApplicationPreference = new ApplicationPreferenceRoutes().getRouter();
        const ApplicationStatus = new ApplicationStatusRoutes().getRouter();
        const LevelOfEducation = new LevelOfEducationRoutes().getRouter();
        const Program = new ProgramRoutes().getRouter();
        const Student = new StudentRoutes().getRouter();
        const UniversityAdmin = new UniversityAdminRoutes().getRouter();
        const previousEducation = new PreviousEducationRoutes().getRouter();
        const studentInformation = new studentInformationRoutes().getRouter();

        this.app.use('/api/certificate', Certificate);
        this.app.use('/api/application', Application);
        this.app.use('/api/applicationPayment', ApplicationPayment);
        this.app.use('/api/applicationPreference', ApplicationPreference);
        this.app.use('/api/applicationStatus', ApplicationStatus);
        this.app.use('/api/levelOfEducation', LevelOfEducation);
        this.app.use('/api/program', Program);
        this.app.use('/api/student', Student);
        this.app.use('/api/Admin', UniversityAdmin);
        this.app.use('/api/previousEducation', previousEducation);
        this.app.use('/api/studentInformation',studentInformation );
    }

    private startServer(): void {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(` Server is running on port ${port}`);
        });
    }

    private handleNotFound() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).send('Not Found');
        });
    }
}

new App();
