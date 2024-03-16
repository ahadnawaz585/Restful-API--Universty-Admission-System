
import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import universityAdminData from '../models/universtyAdmin.model';

class UniversityAdminController {
  async getAdmins(req: Request, res: Response) {
    try {
      const admins = await prisma.universityAdmin.findMany();
      res.status(200).json(admins);
    } catch (error) {
      console.error('Error retrieving admins:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createAdmin(req: Request, res: Response) {
    const validationRules = [
      check('name').isLength({ min: 1 }).withMessage('Name is required.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const newAdmin:universityAdminData = await prisma.universityAdmin.create({
        data: {
          name
        },
      });

      console.log('New admin created:', newAdmin);

      return res.status(201).json({
        message: 'Admin created successfully!',
        admin: newAdmin,
      });
    } catch (error) {
      console.error('Error creating admin:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async clearAdmins() {
    try {
      await prisma.universityAdmin.deleteMany();
      console.log('All admins deleted.');
      return true;
    } catch (error) {
      console.error('Error clearing admins:', error);
      return false;
    }
  }

  async updateAdmin(req: Request, res: Response) {
    const adminId = Number(req.params.id);
    const { name } = req.body;

    try {
      const updatedAdmin = await prisma.universityAdmin.update({
        where: { id: adminId },
        data: { name },
      });

      if (!updatedAdmin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      console.log('Admin updated successfully:', updatedAdmin);

      return res.status(200).json({
        message: 'Admin updated successfully!',
        admin: updatedAdmin,
      });
    } catch (error) {
      console.error('Error updating admin:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteAdmin(req:Request, res:Response){
    const adminId = Number(req.params.id);
    try {
      await prisma.universityAdmin.delete({
        where : {id:adminId},
      });
      res.status(200).json({message:'Data deleted successfully!'});
    } catch (error) {
      console.error('Error deleting program:',error);
      res.status(500).json({error:'Internal Server Error'});
    }
  }
}

export default UniversityAdminController;
