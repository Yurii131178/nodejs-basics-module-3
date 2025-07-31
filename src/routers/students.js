import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentsController,
} from '../conrollers/students.js';
// import { getAllStudents, getStudentById } from '../services/students.js';

const router = Router();

router.get('/students', getStudentsController);
router.get('/students/:studentId', getStudentByIdController);

// router.get('/students', async (req, res) => {
//   const students = await getAllStudents();

//   res.status(200).json({
//     data: students,
//   });
// });

// router.get('/students/:studentId', async (req, res, next) => {
//   const { studentId } = req.params;
//   const student = await getStudentById(studentId);

//   // Відповідь, якщо контакт не знайдено
//   if (!student) {
//     res.status(404).json({
//       message: 'Student not found',
//     });
//     return;
//   }

//   // Відповідь, якщо контакт знайдено
//   res.status(200).json({
//     data: student,
//   });
// });

export default router;
