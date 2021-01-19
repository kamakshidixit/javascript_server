import { Request, Response, NextFunction } from 'express';

export default ( err, req: Request, res: Response, next: NextFunction ) => {
      console.log(err);
      res.send(
          {
            error: err.err,
            status: err.code,
            message: err. message || 'Error',
            timestamp: new Date()
          }
      );
};
