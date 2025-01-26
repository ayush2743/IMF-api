import { Request, Response } from "express";
import { Prisma, PrismaClient, UserRole, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUp, signIn } from "../services/userService";

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const user = await signUp(name, email, password, role);
    res.json(user);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(400).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: error.message });
  }
}

export const SignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields" });
    }
    const token = await signIn(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}