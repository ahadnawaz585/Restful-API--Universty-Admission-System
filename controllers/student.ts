
import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import prisma from '../prisma/prisma';
import studentData from '../models/student.model';


class StudentController {
  async getStudents(req: Request, res: Response) {
    try {
      const students = await prisma.student.findMany();
      res.status(200).json(students);
    } catch (error) {
      console.error('Error retrieving students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createStudent(req: Request, res: Response) {
    const validationRules = [
      check('name').isLength({ min: 1 }).withMessage('Name is required.'),
      check('fatherName').isLength({ min: 1 }).withMessage('Father name is required.'),
      check('picture').isURL().withMessage('Invalid picture URL format.'),
      check('gender').isLength({ min: 1 }).withMessage('gender is required.'),
      check('age').isInt({ min: 1 }).withMessage('Age must be a valid number.'),
      check('dob').isISO8601().toDate().withMessage('Invalid date format for date of birth.'),
      check('citizen').isLength({ min: 1 }).withMessage('Citizenship information is required.'),
      check('religion').isLength({ min: 1 }).withMessage('Religion information is required.'),
      check('address').isLength({ min: 1 }).withMessage('Address information is required.'),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, fatherName,  picture, age, dob, citizen, religion, address } = req.body;

    try {
      const newStudent = await prisma.student.create({
        data: {
          name,
          fatherName,
          picture,
          age,
          dob,
          citizen,
          religion,
          address,
        },
      });
    
      console.log('New student created:', newStudent);
    
      return res.status(201).json({
        message: 'Student created successfully!',
        student: newStudent,
      });
    } catch (error) {
      console.error('Error creating student:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async clearStudents() {
    try {
      await prisma.student.deleteMany();
      console.log('All students deleted.');
      return true;
    } catch (error) {
      console.error('Error clearing students:', error);
      return false;
    }
  }
  async updateStudent(req: Request, res: Response) {
    const studentId = Number(req.params.id);
    const { name, fatherName,  picture, age, dob, citizen, religion, address } = req.body;

    try {
      const updatedStudent:studentData = await prisma.student.update({
        where: { id: studentId },
        data: {
          name,
          fatherName,
          picture,
          age: Number(age),
          dob: new Date(dob),
          citizen,
          religion,
          address,
        },
      });
      

      res.status(200).json({ message: 'Student updated successfully!', student: updatedStudent });
      console.log('Student updated successfully', updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteSingleStudent(req: Request, res: Response) {
    const studentId = Number(req.params.id);

    try {
      await prisma.student.delete({
        where: { id: studentId },
      });
      res.status(200).json({ message: 'Student deleted successfully!' });
      console.log("student deleted successfully");

    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default StudentController;
