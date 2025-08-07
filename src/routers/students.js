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
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js'; // валідатори схеми з обов'язковими полями і не дуже
import { isValidId } from '../middlewares/isValidId.js'; // валідатор id

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController)); // додаємо функцію-обгортку ctrlWrapper

router.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
); // // додаємо функцію-обгортку ctrlWrapper

router.post(
  // !!! новий роут для створення студентів !!!!!
  '/students',
  validateBody(createStudentSchema), // додаємо middleware validationBody пристворенні сутності
  ctrlWrapper(createStudentController),
);

router.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);

router.put(
  '/students/:studentId',
  isValidId,
  validateBody(createStudentSchema), // додаємо middleware validationBody при оновленні сутності
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema), // додаємо middleware validationBody при оновленні сутності
  ctrlWrapper(patchStudentController),
);

export default router;
