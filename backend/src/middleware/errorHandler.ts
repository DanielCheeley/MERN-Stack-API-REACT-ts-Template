//import necessary modules
import {Request, Response, NextFunction} from 'express';

//errorHandler middleware that catches any fatal error that makes its way to the top of the error stack(used to catch unhandled errors and stop the server from crashing)
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
  next(err);
}