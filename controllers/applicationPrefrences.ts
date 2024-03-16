// Import necessary modules
import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import applicationPreferenceData from '../models/applicationPrefrences.model';

class ApplicationPreferenceController {
  async getPreferences(req: Request, res: Response) {
    try {
      const preferences = await prisma.applicationPreference.findMany();
      res.status(200).json(preferences);
    } catch (error) {
      console.error('Error retrieving preferences:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createPreference(req: Request, res: Response) {
    const validationRules = [
      check('applicationId').isInt({ min: 1 }).withMessage('Invalid Application ID.'),
      check('programId').isInt({ min: 1 }).withMessage('Invalid Program ID.'),
      check('priority').isInt({ min: 1 }).withMessage('Invalid Priority.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { applicationId, programId, priority } = req.body;

    try {
      const newPreference: applicationPreferenceData = await prisma.applicationPreference.create({
        data: {
          applicationId,
          programId,
          priority,
        },
      });

      console.log('new preference created:', newPreference);

      return res.status(201).json({
        message: 'Preference created successfully!',
        preference: newPreference,
      });
    } catch (error) {
      console.error('Error creating preference:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async clearPreferences() {
    try {
      await prisma.applicationPreference.deleteMany();
      console.log('All preferences deleted.');
      return true;
    } catch (error) {
      console.error('Error clearing preferences:', error);
      return false;
    }
  }

  async updatePrefrence(req: Request, res: Response) {
    const preferenceId = Number(req.params.id);
    const { applicationId, programId, priority } = req.body;

    try {
      const updatedPrefrence = await prisma.applicationPreference.update({
        where: { id: preferenceId },
        data: { applicationId, programId, priority }
      });
      res.status(200).json({ message: 'updated Successfully', prefrenceData: updatedPrefrence });
      console.log('Prefrenece updated successfully', updatedPrefrence);
    } catch (error) {
      console.error('Error updating data', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteSinglePrefrence(req: Request, res: Response) {
    const preferenceId = Number(req.params.id);
    try {
      await prisma.applicationPreference.delete({
        where: { id: preferenceId }
      });
      res.status(200).json({ message: 'Data deleted successfully!' });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ApplicationPreferenceController;
