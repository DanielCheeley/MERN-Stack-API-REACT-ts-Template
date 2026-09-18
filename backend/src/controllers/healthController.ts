import { Request, Response, NextFunction } from "express";

export function healthController(res: Response) {
  res.json(
    {
      message: "Backend is running!"
    }
  )
}