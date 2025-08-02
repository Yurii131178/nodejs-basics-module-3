// src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Sometheing went wrong',
    error: err.message,
  });
};
