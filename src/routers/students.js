import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentsController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';

//Створимо у папці src/utils файл ctrlWrapper.js, де оголосимо та експортуємо функцію-обгортку ctrlWrapper.

//Після цього можемо використати цю функцію у роутах для обгортання контролерів.

import { ctrlWrapper } from '../utils/ctrlWrapper.js'; // імпртуємо 'ctrlWrapper'
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema } from '../validation/students.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController)); // додаємо функцію-обгортку ctrlWrapper

router.get('/students/:studentId', ctrlWrapper(getStudentByIdController)); // // додаємо функцію-обгортку ctrlWrapper

router.post(
  '/students',

  validateBody(createStudentSchema),
),
  ctrlWrapper(createStudentController); // !!! новий роут для створення студентів !!!!!

router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));

router.put('/students/:studentId', ctrlWrapper(upsertStudentController));

router.patch('/students/:studentId', ctrlWrapper(patchStudentController));

export default router;
