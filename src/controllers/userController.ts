import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/userService";
import { NotFoundError, ValidationError } from "../utils/error";

export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw new ValidationError("Name, Email, Password and Role required"); 
    }

    const {user, token} = await UserService.signUp(name, email, password, role);

    res.json({message: "SignUp successful!", user, token});
  } catch (error) {
    next(error)
  }
}

export const SignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email and Password required");
    }
    const token = await UserService.signIn(email, password);
    res.json({message: "SignIn successful!", token});
  } catch (error) {
    next(error)
  }
}