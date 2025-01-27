import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ValidationError } from "../utils/error";

const JWT_SECRET = process.env.JWT_SECRET || "";

export interface RequestWithUserId extends Request {
  user: object; 
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new ValidationError("Authentication Token required");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    (req as RequestWithUserId).user = decoded;
    next();

  } catch (error) {
    next(error);
  }
};

