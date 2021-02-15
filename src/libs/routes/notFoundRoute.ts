import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction ) => {
  next({
    err : 'Not Found',
    code : 404,
    message: 'error'
  });
  };
