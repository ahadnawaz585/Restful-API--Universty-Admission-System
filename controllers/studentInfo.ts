import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import studentInformationData from '../models/studentInformstion.model';

class studentInfoController {
  async getInfo(req: Request, res: Response) {
    try {
      const infoData = await prisma.studentInformation.findMany();
      res.status(200).json(infoData);
    } catch (error) {
      console.error('Error retrieving students information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  async createInfo(req:Request,res:Response){
    const validationRules = [
      check('phone').isString().notEmpty(),
      check('email').isEmail(),
      check('address').isString().notEmpty(),
      check('studentId').isInt({ min: 1 }).withMessage('Invalid Student ID.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { phone, email, address, studentId } = req.body;
    console.log("the value of phone ",phone);
    try {
      const newInfo:studentInformationData = await prisma.studentInformation.create({
        data:{phone,email,address,studentId}
      });
      console.log("new info is created",newInfo);
      return res.status(201).json({
        message:'info created successfully',
        information :newInfo,
      })  
    } catch (error) {
      console.error('Error creating education history:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async clearInfo() {
    try {
      await prisma.studentInformation.deleteMany();
      console.log("information deleted successfully");
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateInformation(req: Request, res: Response) {
    const infoId = Number(req.params.id);
    const { phone, email, address, studentId } = req.body;
    try {
      const updatedInformation: studentInformationData = await prisma.studentInformation.update({
        where: { id: infoId },
        data: {
          phone,
          email,
          address,
          studentId
        }
      });
      res.status(200).json({ message: 'Info updated successfully!', information:updatedInformation });
      console.log('information updated successfully', updatedInformation);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteSingleInfo(req:Request,res:Response){
    const infoId = Number(req.params.id);
    try {
      await prisma.studentInformation.delete({
        where:{id:infoId}
      });
      res.status(200).json({ message: 'Information deleted successfully!' });
      console.log("information deleted successfully");

    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default studentInfoController;