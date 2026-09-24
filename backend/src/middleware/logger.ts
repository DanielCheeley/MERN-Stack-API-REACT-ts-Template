//import necessary modules
import {Request, Response, NextFunction} from 'express';
import debug from 'debug';

//set a logger instance for logger middleware
const logger = debug('<project-name-here>:logger');

//logRequest middleware that logs all incoming requests to the server
export function logRequest(req: Request, res: Response, next: NextFunction) {
  logger(`${req.method} ${req.url}`);
  next();
}