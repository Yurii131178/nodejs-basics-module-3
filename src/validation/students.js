// src/validation/students.js

// import Joi from 'joi';

// export const createStudentSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   age: Joi.number().integer().min(6).max(16).required(),
//   gender: Joi.string().valid('male', 'female', 'other').required(),
//   avgMark: Joi.number().min(2).max(12).required(),
//   onDuty: Joi.boolean(),
// });

/**Використання методів валідації: після визначення схеми ви можете використовувати на ній методи валідації, такі як validate або validateAsync, для перевірки об'єктів даних на відповідність цій схемі. */

// const dataToValidate = {
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   age: 12,
//   gender: 'mail',
//   avgMark: 10.2,
// };

// const validationResult = createStudentSchema.validate(dataToValidate);

// if (validationResult.error) {
//   console.error(validationResult.error.message);
// } else {
//   console.log('Data is valid!');
// }

// Кастомізація помилок при роботі з Joi
// У Joi ви можете кастомізувати повідомлення про помилки для кожного правила валідації та для конкретних умов. Це дозволяє вам надати більш інформативні повідомлення для ваших користувачів або розробників, які обробляють ці помилки.
// Ось приклад кастомізації повідомлень про помилки для різних умов в схемі:

// Оголошення схеми з кастомізованими повідомленнями

//...........................................................
import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  age: Joi.number().integer().min(6).max(16).required().messages({
    'number.base': 'Age should be a number',
    'number.integer': 'Age must be an integer',
    'number.min': 'age must be at least {#limit}',
    'number.max': 'age must be at most {#limit}',
    'any.required': 'Age is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be one of male, female, or other',
    'any.required': 'Gender is required',
  }),
  avgMark: Joi.number().min(2).max(12).required().messages({
    'number.base': 'Average mark must be a number',
    'number.min': 'Average mark must be at least {#limit}',
    'number.max': 'Average mark must be at most {#limit}',
    'any.required': 'Average mark is required',
  }),
  onDuty: Joi.boolean().messages({
    'boolean.base': 'onDuty must be a boolean value',
  }),
}).unknown(false); // ЗАБОРОНИТИ зайві поля

//створимо Joi схему для валідації об’єкта студента при його оновленні:

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(6).max(16),
  gender: Joi.string().valid('male', 'female', 'other'),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});

const dataToValidate = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 12,
  gender: 'male',
  avgMark: 10.2,
};

//Важливо вказати { abortEarly: false } при виклику методу validate, щоб отримати всі можливі помилки валідації, а не першу з них:
const validationResult = createStudentSchema.validate(dataToValidate, {
  abortEarly: false,
});

if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
}
//..............................................................................
/**В цьому прикладі ми використовуємо метод .messages() для кожного правила в схемі, щоб визначити свої власні повідомлення про помилки для різних умов. Тобто, правило string.base стосується .string(), string.min стосується .min(), що слідує за .string() тощо. */

//..................................
//..................................
