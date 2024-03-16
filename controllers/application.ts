
import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import applicationData from '../models/application.model';

class ApplicationController {
  async getApplications(req: Request, res: Response) {
    try {
      const applications = await prisma.application.findMany();
      res.status(200).json(applications);
    } catch (error) {
      console.error('Error retrieving applications:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createApplication(req: Request, res: Response) {
    const validationRules = [
      check('studentId').isInt({ min: 1 }).withMessage('Invalid Student ID.'),
      check('applicationDate').isISO8601().toDate().withMessage('Invalid Application Date.'),
      check('applicationFee').isFloat({ min: 0 }).withMessage('Invalid Application Fee.'),
      check('status').isIn(['Pending', 'Approved', 'Rejected']).withMessage('Invalid Status.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      studentId,
      applicationDate,
      applicationFee,
      status,
    }:applicationData = req.body;

    const allowedStatus = ['Pending', 'Approved', 'Rejected'];

    if (!allowedStatus.includes(status)) {
      return res.status(422).json({ error: 'Invalid status provided.' });
    }

    try {
      const newApplication: applicationData = await prisma.application.create({
        data: {
          studentId,
          applicationDate,
          applicationFee,
          status,
        },
      });

      console.log('new application created:', newApplication);

      return res.status(201).json({
        message: 'Application created successfully!',
        application: newApplication,
      });
    } catch (error) {
      console.error('Error creating application:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateApplicationStatus(req: Request, res: Response) {
    const applicationId = Number(req.params.id);
    const { status } = req.body;
  
    const allowedStatus = ['Pending', 'Approved', 'Rejected'];
  
    if (!allowedStatus.includes(status)) {
      return res.status(422).json({ error: 'Invalid status provided.' });
    }
  
    try {
      const updatedApplication = await prisma.application.update({
        where: { id: applicationId },
        data: { status }, 
      });
  
      res.status(200).json({ message: 'Application status updated successfully', ApplicationData: updatedApplication });
      console.log('Application status updated successfully', updatedApplication);
    } catch (error) {
      console.error('Error updating application status', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  async clearApplications() {
    try {
      await prisma.application.deleteMany();
      console.log('All applications deleted.');
      return true;
    } catch (error) {
      console.error('Error clearing applications:', error);
      return false;
    }
  }

  async deleteApplication(req: Request, res: Response) {
    const applicationId = Number(req.params.id); 
    try {
      await prisma.application.delete({
        where: { id: applicationId },
      });
      res.status(200).json({ message: 'Application deleted successfully!' });
    } catch (error) {
      console.error('Error deleting application:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateApplication(req: Request, res: Response) {
    const applicationId = Number(req.params.id); 
    const { studentId,  applicationDate, applicationFee} = req.body;

    try {
      const updatedApplication = await prisma.application.update({
        where: { id: applicationId },
        data: { studentId, applicationDate, applicationFee},
      });
      res.status(200).json({ message: 'Application updated successfully', ApplicationData: updatedApplication });
      console.log("Application updated successfully", updatedApplication);
    } catch (error) {
      console.error('Error updating data', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ApplicationController;
