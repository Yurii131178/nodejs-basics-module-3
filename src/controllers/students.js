// src/controllers/students.js

import { getAllStudents, getStudentById } from '../services/students.js';

// export const getStudentsController = async (req, res) => {
//   const students = await getAllStudents();

//   res.json({
//     status: 200,
//     message: 'Successfully found students!',
//     data: students,
//   });
// };

/**================Обробка помилок====================

// export const getStudentByIdController = async (req, res) => {
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
//   res.json({
//     status: 200,
//     message: `Successfully found student with id ${studentId}!`,
//     data: student,
//   });
// };

/////////////////////////////////////////
/**================Обробка помилок====================
У контролері getStudentByIdController функція getStudentById поверне null, якщо не був знайдений студент за вказаним ідентифікатором. Цей випадок обов’язково потрібно опрацювати у коді.

Поки що буде достатньо перевірити наявність значення у змінній student і, якщо там null, викликати next з об'єктом помилки, яка містить повідомлення про те, що студент не був знайдений.

Доповнимо код контролера getStudentByIdController параметром next і створенням об’єкта помилки, якщо студента не знайдено: */

// src/controllers/students.js
//.........................................................
export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  // Код який був до цього
  // if (!student) {
  //   res.status(404).json({
  //     message: "Student not found",
  //   });
  //   return;
  // }

  // А тепер додаємо базову обробку помилки замість res.status(404)
  if (!student) {
    next(new Error('Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
//.....................................................
/**============Обгортка обробки помилок=====================


Будь-який запит у базу даних це асинхронна операція, яка може бути відхилена з помилкою. Тому необхідно обгорнути виклики таких функцій у блок try...catch. Взагалі, будь-які асинхронні операції бажано обгортати в цей блок, оскільки є вірогідність, що вони можуть впасти з помилкою, і тоді вебсервер також впаде, оскільки ми матимемо unhandledRejection — необроблене відхилення промісу.

Логічним місцем використання try...catch буде контролер, наприклад, ось так: */

//.......................................
// src/controllers/students.js

export const getStudentsController = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

//.......................................
