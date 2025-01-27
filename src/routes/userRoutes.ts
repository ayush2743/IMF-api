import express from "express";
import { SignIn, SignUp } from "../controllers/userController";
import { errorHandler } from "../middlewares/errorHandler";

const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", SignUp);
router.use(errorHandler);


export default router;