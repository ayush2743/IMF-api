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
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ValidationError("Authentication Token required");
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new ValidationError("Invalid token format. Use 'Bearer <token>'");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as User;

    req.user = decoded;
    next();

  } catch (error) {
    next(error);
  }
};

