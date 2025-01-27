import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";


export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  console.log(err);

  if(err instanceof JsonWebTokenError) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (err.name === "NotFoundError") {
    res.status(404).json({ error: err.message });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if(err.message.includes("Unique constraint failed on the fields: (`name`)")) {
      res.status(400).json({ error: "This Gadget already exists" });
      return;
    }
    else if(err.message.includes("Unique constraint failed on the fields: (`email`)")) {
      res.status(400).json({ error: "This Email already exists" });
      return;
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    if (err.message.includes("Invalid value for argument `status`")) {
      res.status(400).json({ error: "Invalid Status" });
      return;
    }
    else if(err.message.includes("Invalid value for argument `role`")) {
      res.status(400).json({ error: "Invalid Role" });
      return;
    }
  }

  res.status(500).json({ error: "Internal Server Error" });

  next();
};