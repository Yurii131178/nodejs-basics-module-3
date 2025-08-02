import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
// import crypto from 'node:crypto';

import studentsRouter from './routers/students.js';

import { getEnvVar } from './utils/getEnvVar.js';

// import { getAllStudents, getStudentById } from './services/students.js';

// ========================== Middlewares ========================== //
/**у файлі server.js імпортуємо наші middleware та додамо за допомогою app.use. */

// Імпортуємо middleware
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors()); // або одразу після оголошення app !!!

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(studentsRouter);

  //додамо middleware за допомогою app.use. -->

  app.use(notFoundHandler);
  app.use(errorHandler);

  // !!!хендлери помилок ми забрали в middlewares!!!!

  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went really wrong',
  //     error: err.message,
  //   });
  // });

  // app.use((req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
