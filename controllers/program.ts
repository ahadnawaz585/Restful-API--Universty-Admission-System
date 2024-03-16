import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import ProgramData from '../models/program.model';

class ProgramController {
  async getPrograms(req: Request, res: Response) {
    try {
      const programs = await prisma.program.findMany();
      res.status(200).json(programs);
    } catch (error) {
      console.error('Error retrieving programs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createProgram(req: Request, res: Response) {
    const validationRules = [
      check('programName').isLength({ min: 1 }).withMessage('Program Name is required.'),
      check('levelOfEducationId').isInt({ min: 1 }).withMessage('Invalid Level of Education ID.'),
      check('minimumMarksRequired').isFloat({ min: 0 }).withMessage('Invalid Minimum Marks Required.'),
      check('academicCertificateId').isInt({ min: 1 }).withMessage('Certificate ID invalid'),
      check('programFee').isInt({ min: 0 }).withMessage('Program fee Required.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

   const { programName, levelOfEducationId, minimumMarksRequired, academicCertificateId, programFee } = req.body;

  try {

    const newProgram = await prisma.program.create({
      data: {
        programName,
        levelOfEducationId,
        academicCertificateId,
        programFee,
        minimumMarksRequired,
      },
    });
    
    return res.status(201).json({
      message: 'Program created successfully!',
      program: newProgram,
    });
  } catch (error) {
    console.error('Error creating program:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

  async clearPrograms(req: Request, res: Response) {
    try {
      await prisma.program.deleteMany();
      console.log('All programs deleted.');
      return res.status(200).json({ message: 'All programs deleted.' });
    } catch (error) {
      console.error('Error clearing programs:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateProgram(req: Request, res: Response) {
    const programId = Number(req.params.id);
    const { programName, levelOfEducationId, minimumMarksRequired, academicCertificateId, programFee } = req.body;

    try {
      const updatedProgram = await prisma.program.update({
        where: { id: programId },
        data: {
          programName,
          levelOfEducationId,
          minimumMarksRequired,
          academicCertificateId,
          programFee,
        },
      });
      
      return res.status(200).json({
        message: 'Program updated successfully!',
        programData: updatedProgram,
      });
    } catch (error) {
      console.error('Error updating program:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteSingleProgram(req: Request, res: Response) {
    const programId = Number(req.params.id);
    try {
      await prisma.program.delete({
        where: { id: programId },
      });
      return res.status(200).json({ message: 'Program deleted successfully!' });
    } catch (error) {
      console.error('Error deleting program:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ProgramController;
