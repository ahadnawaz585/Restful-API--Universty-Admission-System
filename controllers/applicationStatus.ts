import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma'; // Import your Prisma client
import applicationStatusHistoryData from '../models/applicationStatusHistory.model';

class ApplicationStatusHistoryController {
  // Remove the static statusHistory array

  async getStatusHistory(req: Request, res: Response) {
    try {
      const statusHistory = await prisma.applicationStatusHistory.findMany();
      res.status(200).json(statusHistory);
    } catch (error) {
      console.error('Error retrieving status history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createStatusHistory(req: Request, res: Response) {
    const validationRules = [
      check('applicationId').isInt({ min: 1 }).withMessage('Invalid Application ID.'),
      check('statusFrom').isLength({ min: 1 }).withMessage('Status From is required.'),
      check('statusTo').isLength({ min: 1 }).withMessage('Status To is required.'),
      check('dateOfChange').isISO8601().toDate().withMessage('Invalid Date of Change.'),
      check('adminId').optional({ nullable: true }).isInt({ min: 1 }).withMessage('Invalid Admin ID.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { applicationId, statusFrom, statusTo, dateOfChange, adminId } = req.body;

    try {
      const newStatusHistory: applicationStatusHistoryData = await prisma.applicationStatusHistory.create({
        data: {
          applicationId,
          statusFrom,
          statusTo,
          dateOfChange,
          adminId,
        },
      });

      console.log('new status history created:', newStatusHistory);

      return res.status(201).json({
        message: 'Status history created successfully!',
        statusHistory: newStatusHistory,
      });
    } catch (error) {
      console.error('Error creating status history:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async clearStatusHistory() {
    try {
      await prisma.applicationStatusHistory.deleteMany();
      console.log('All status history deleted.');
      return true;
    } catch (error) {
      console.error('Error clearing status history:', error);
      return false;
    }
  }

  async updateStatusHistory(req: Request, res: Response) {
    const statusId = Number(req.params.id);
    const { applicationId, statusFrom, statusTo, dateOfChange, adminId } = req.body;
    try {
      const updatedStatus = await prisma.applicationStatusHistory.update({
        where: { id: statusId },
        data: { applicationId, statusFrom, statusTo, dateOfChange, adminId },
      });
      res.status(200).json({message:'Program updated successfully!',historyData:updatedStatus});
      console.log("History updated successfully",updatedStatus);
    } catch (error) {
      console.error('Error updating data', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteSingleStatus(req: Request, res: Response) {
    const statusId = Number(req.params.id);
    try {
      await prisma.applicationStatusHistory.delete({
        where: { id: statusId },
      });
      res.status(200).json({ message: 'Data deleted successfully!' });
    } catch (error) {
      console.error('Error deleting program:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ApplicationStatusHistoryController;
