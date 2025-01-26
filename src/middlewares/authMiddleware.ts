import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "heeloo" as string;

export interface RequestWithUserId extends Request {
  user: object; 
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    (req as RequestWithUserId).user = decoded;
    next();

  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

