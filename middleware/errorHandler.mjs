import { CustomError } from '../customError.mjs';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: 'An unexpected error occurred' });
};

export default errorHandler;