import express from "express";
import {
  getGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
  selfDestructGadget

} from "../controllers/gadgetController";

import { errorHandler } from "../middlewares/errorHandler";


const router = express.Router();

router.get("/", getGadgets);
router.post("/", createGadget);
router.patch("/:id", updateGadget);
router.delete("/:id", deleteGadget);
router.post("/:id/self-destruct", selfDestructGadget);
router.use(errorHandler);

export default router;
