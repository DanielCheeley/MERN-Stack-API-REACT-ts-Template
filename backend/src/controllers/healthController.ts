import { Request, Response, NextFunction } from 'express';

export function getServerHealth(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ message: 'Server health check: OK' });
  } catch (error) {
    next(error);
  }
}