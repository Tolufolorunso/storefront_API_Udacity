import { NextFunction, Request, Response } from 'express';

class CustomError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function globalErrorHandler(error: CustomError, req: Request, res: Response, _next: NextFunction) {
  // console.log(15, error.status, error.message);
  const status = error.status || 500;
  const message = error.message || 'something went wrong';

  res.status(status).json({
    status: false,
    message,
  });
}

// export CustomError

export { globalErrorHandler, CustomError };
