import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentsController,
  createStudentController,
  deleteStudentController,
} from '../controllers/students.js';

//Створимо у папці src/utils файл ctrlWrapper.js, де оголосимо та експортуємо функцію-обгортку ctrlWrapper.

//Після цього можемо використати цю функцію у роутах для обгортання контролерів.

import { ctrlWrapper } from '../utils/ctrlWrapper.js'; // імпртуємо 'ctrlWrapper'

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController)); // додаємо функцію-обгортку ctrlWrapper

router.get('/students/:studentId', ctrlWrapper(getStudentByIdController)); // // додаємо функцію-обгортку ctrlWrapper

router.post('/students', ctrlWrapper(createStudentController)); // !!! новий роут для створення студентів !!!!!

router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));

export default router;
