// src/middlewares/validateBody.js

import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};

/**Що робить цей код
Цей middleware-компонент, validateBody, приймає схему валідації від Joi і виконує валідацію тіла запиту (req.body).

try...catch: Блок try намагається валідувати req.body за допомогою наданої схеми. Якщо валідація проходить успішно, він викликає next(), передаючи керування наступному middleware-компоненту.

schema.validateAsync(...): Цей метод асинхронно валідує об'єкт. Параметр abortEarly: false гарантує, що Joi поверне всі помилки, а не зупиниться після першої. Це дає клієнту повну інформацію про те, які поля є недійсними.

Обробка помилок: Якщо валідація не вдається, блок catch перехоплює помилку. Він створює новий об'єкт помилки за допомогою createHttpError(400, 'Bad Request', ...). Це коректний спосіб повідомити клієнту, що запит не може бути оброблений через недійсні дані. Помилка передається до наступного middleware-компонента для централізованої обробки помилок. */
