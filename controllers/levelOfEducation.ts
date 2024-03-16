
import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import levelOfEducationData from '../models/levelOfEducation.model';

class LevelOfEducationController {
  async getLevelsOfEducation(req: Request, res: Response) {
    try {
      const levelsOfEducation = await prisma.levelOfEducation.findMany();
      res.status(200).json(levelsOfEducation);
    } catch (error) {
      console.error('Error retrieving levels of education:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createLevelOfEducation(req: Request, res: Response) {
    const validationRules = [
      check('levelName').isLength({ min: 1 }).withMessage('Level Name is required.'),
      check('mandatoryYearsOfEducation').isInt({ min: 1 }).withMessage('Invalid Mandatory Years of Education.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { levelName, mandatoryYearsOfEducation } = req.body;

    try {
      const newLevelOfEducation: levelOfEducationData = await prisma.levelOfEducation.create({
        data: {
          levelName,
          mandatoryYearsOfEducation,
        },
      });

      console.log('new level of education created:', newLevelOfEducation);

      return res.status(201).json({
        message: 'Level of education created successfully!',
        levelOfEducation: newLevelOfEducation,
      });
    } catch (error) {
      console.error('Error creating level of education:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async clearLevelsOfEducation() {
    try {
      await prisma.levelOfEducation.deleteMany();
      console.log('All levels of education deleted.');
      return true;
    } catch (error) {
      console.error('Error clearing levels of education:', error);
      return false;
    }
  }
  async updateLevelOfEducation(req: Request, res: Response) {
    const levelId = Number(req.params.id);
    const { levelName, mandatoryYearsOfEducation } = req.body;

    try {
      const updatedLevelOfEducation = await prisma.levelOfEducation.update({
        where: { id: levelId },
        data: { levelName, mandatoryYearsOfEducation },
      });
      res.status(200).json({ message: 'Level update successfully!', levelOfEducationData: updatedLevelOfEducation });
      console.log("Level of Education updated successfully", updatedLevelOfEducation);
    } catch(error){
      console.error('Error updating data',error);
      res.status(500).json({error:'Internal Server Error'});
    }
  }

  async deleteSinglelevelOfEducation(req:Request,res:Response){
    const levelId = Number(req.params.id);
    try {
      await prisma.levelOfEducation.delete({
        where:{id:levelId},
      });
      res.status(200).json({message:'Data deleted successfully!'});
    } catch (error) {
      console.error('Error deleting student:',error);
      res.status(500).json({error:'Internal Server Error'});
    }
  }
}

export default LevelOfEducationController;
