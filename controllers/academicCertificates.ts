import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import academicCertificateData from '../models/academicCertificates.model';

class AcademicCertificateController {

  async getCertificates(req: Request, res: Response) {
    try {
      const certificates = await prisma.academicCertificate.findMany();
      res.status(200).json(certificates);
    } catch (error) {
      console.error('Error retrieving certificates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createCertificate(req: Request, res: Response) {
    const validationRules = [
      check('certificateName').isLength({ min: 1 }).withMessage('Certificate Name is required.'),
    ];
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    const { certificateName } = req.body; // Extract certificateName from request body
  
    try {
      const newCertificate = await prisma.academicCertificate.create({
        data: {
          certificateName: certificateName // Use certificateName to create the certificate
        },
      });
  
      console.log('New certificate created:', newCertificate);
  
      return res.status(201).json({
        message: 'Certificate created successfully!',
        certificate: newCertificate,
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  async clearCertificates() {
    try {
      await prisma.academicCertificate.deleteMany();
      console.log('All certificates deleted.');
      return true;
    } catch (error) {
      console.error('Error clearing certificates:', error);
      return false;
    }
  }

  async updateCertificates(req: Request, res: Response) {
    const certificateId = Number(req.params.id);
    const { certificateName } = req.body;
    try {
        const updateCertificates = await prisma.academicCertificate.update({
            where: { id: certificateId },
            data: { certificateName },
        });
        res.status(200).json({ message: 'certificate update successfully ', certificateData: updateCertificates });
        console.log("Program updated successfully", updateCertificates);
    } catch (error) {
        console.error('Error updating data', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


  async deleteSingleCertficate(req: Request, res: Response) {
    const certificateId = Number(req.params.id);
    try {
      await prisma.academicCertificate.delete({
        where: { id: certificateId },
      })
    } catch (error) {
      console.error('Error deleting certificate:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AcademicCertificateController;
