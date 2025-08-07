// src/validation/students.js

import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
});

/**Використання методів валідації: після визначення схеми ви можете використовувати на ній методи валідації, такі як validate або validateAsync, для перевірки об'єктів даних на відповідність цій схемі. */

const dataToValidate = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 12,
  gender: 'mail',
  avgMark: 10.2,
};

const validationResult = createStudentSchema.validate(dataToValidate);

if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
}
