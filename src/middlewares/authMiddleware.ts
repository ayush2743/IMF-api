import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ValidationError } from "../utils/error";

const JWT_SECRET = process.env.JWT_SECRET || "";

interface User {
  id: number;
  name: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new ValidationError("Authentication Token required");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as User;

    req.user = decoded;
    next();

  } catch (error) {
    next(error);
  }
};

