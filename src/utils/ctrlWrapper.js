//Створимо у папці src/utils файл ctrlWrapper.js, де оголосимо та експортуємо функцію-обгортку ctrlWrapper.

// src/utils/ctrlWrapper.js

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
