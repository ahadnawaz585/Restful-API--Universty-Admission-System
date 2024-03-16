import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import PreviousEducationData from '../models/educationalHistory.model';

class PreviousEducationController {
  async getPreviousEducation(req: Request, res: Response) {
    try {
      const educationHistory = await prisma.previousEducation.findMany();
      res.status(200).json(educationHistory);
    } catch (error) {
      console.error('Error retrieving education history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createPreviousEducation(req: Request, res: Response) {
    const validationRules = [
      check('schoolName').isLength({ min: 1 }).withMessage('School name is required.'),
      check('schoolProgram').isLength({ min: 1 }).withMessage('School program is required.'),
      check('schoolMarks').isFloat({ min: 0 }).withMessage('Invalid school marks.'),
      check('collegeName').isLength({ min: 1 }).withMessage('College name is required.'),
      check('collegeProgram').isLength({ min: 1 }).withMessage('College program is required.'),
      check('collegeMarks').isFloat({ min: 0 }).withMessage('Invalid college marks.'),
      check('studentId').isInt({ min: 1 }).withMessage('Invalid student ID.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      schoolName,
      schoolProgram,
      schoolMarks,
      collegeName,
      collegeProgram,
      collegeMarks,
      studentId,
    } = req.body;

    try {
      const newEducationRecord: PreviousEducationData = await prisma.previousEducation.create({
        data: {
          schoolName,
          schoolProgram,
          schoolMarks,
          collegeName,
          collegeProgram,
          collegeMarks,
          studentId,
        },
      });

      console.log('New education history created:', newEducationRecord);

      return res.status(201).json({
        message: 'Education history created successfully!',
        educationHistory: newEducationRecord,
      });
    } catch (error) {
      console.error('Error creating education history:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async clearPreviousEducation(req: Request, res: Response) {
    try {
      await prisma.previousEducation.deleteMany();
      console.log('All education history deleted.');
      res.status(200).json({ message: 'All education history deleted.' });
    } catch (error) {
      console.error('Error clearing education history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updatePreviousEducation(req: Request, res: Response) {
    const educationId = Number(req.params.id);
    const {
      schoolName,
      schoolProgram,
      schoolMarks,
      collegeName,
      collegeProgram,
      collegeMarks,
      studentId,
    } = req.body;

    try {
      const updatedEducation = await prisma.previousEducation.update({
        where: { id: educationId },
        data: {
          schoolName,
          schoolProgram,
          schoolMarks,
          collegeName,
          collegeProgram,
          collegeMarks,
          studentId,
        },
      });

      res.status(200).json({ message: 'Education history updated successfully!', educationHistory: updatedEducation });
      console.log('Education history updated successfully', updatedEducation);
    } catch (error) {
      console.error('Error updating education history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteSingleEducation(req: Request, res: Response) {
    const educationId = Number(req.params.id);

    try {
      await prisma.previousEducation.delete({
        where: { id: educationId },
      });
      res.status(200).json({ message: 'Education history deleted successfully!' });
      console.log("Education history deleted successfully");
      
    } catch (error) {
      console.error('Error deleting education history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default PreviousEducationController;
