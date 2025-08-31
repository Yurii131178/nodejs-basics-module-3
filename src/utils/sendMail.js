import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT)),
  secure: true, // add as per convention
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};


// тут тест відправки повідомлення
// на ukr.net через термінал
// node src/utils/sendMail.js

// export const sendEmail = async () => {
//   return await transporter.sendMail({
//     subject: 'My first email',
//     to: 'yurii.kosenko@ukr.net',
//     text: 'Hello, Yurii!!!',
//     from: getEnvVar(SMTP.SMTP_FROM)
// });
// };


// await sendEmail();
