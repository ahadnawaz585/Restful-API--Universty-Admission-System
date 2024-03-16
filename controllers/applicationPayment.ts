// Import necessary modules
import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import applicationPaymentData from '../models/applicationPayment.model.';

class ApplicationPaymentController {
  async getPayments(req: Request, res: Response) {
    try {
      const payments = await prisma.applicationPayment.findMany();
      res.status(200).json(payments);
    } catch (error) {
      console.error('Error retrieving payments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createPayment(req: Request, res: Response) {
    const validationRules = [
      check('applicationId').isInt({ min: 1 }).withMessage('Invalid Application ID.'),
      check('paymentDate').isISO8601().toDate().withMessage('Invalid Payment Date.'),
      check('bankName').isLength({ min: 1 }).withMessage('Bank Name is required.'),
      check('amountPaid').isFloat({ min: 0 }).withMessage('Invalid Amount Paid.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { applicationId, paymentDate, bankName, amountPaid } = req.body;

    try {
      const newPayment: applicationPaymentData = await prisma.applicationPayment.create({
        data: {
          applicationId,
          paymentDate,
          bankName,
          amountPaid,
        },
      });

      console.log('new payment created:', newPayment);

      return res.status(201).json({
        message: 'Payment created successfully!',
        payment: newPayment,
      });
    } catch (error) {
      console.error('Error creating payment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async clearPayments() {
    try {
      await prisma.applicationPayment.deleteMany();
      console.log('All payments deleted.');
      return true;
    } catch (error) {
      console.error('Error clearing payments:', error);
      return false;
    }
  }
  async updatePayments(req: Request, res: Response) {
    const paymentId = Number(req.params.id);
    const { applicationId,
      paymentDate,
      bankName,
      amountPaid, } = req.body;
    try {
      const updateApplicationPayments = await prisma.applicationPayment.update({
        where: { id: paymentId },
        data: {
          applicationId,
          paymentDate,
          bankName,
          amountPaid,
        }
      });
      res.status(200).json({ message: 'updated Successfully', paymentData: updateApplicationPayments });
      console.log('Payment updated successfully', updateApplicationPayments);

    } catch (error) {
      console.error('Error updating data', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteApplicationPayment(req:Request,res:Response){
    const paymentId= Number(req.params.id);
    try {
      await prisma.applicationPayment.delete({
        where : {id:paymentId},
      });
      res.status(200).json({ message: 'Data deleted successfully!' });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
     
  }

}

export default ApplicationPaymentController;
