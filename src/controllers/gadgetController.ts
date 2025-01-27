import { NextFunction, Request, Response } from "express";
import * as GadgetService from "../services/gadgetService";
import { GadgetStatus } from "@prisma/client";
import { NotFoundError, ValidationError } from "../utils/error";


export const getGadgets = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const status = req.query.status as GadgetStatus;

    const gadgetsWithProbability = await GadgetService.getAllGadgets(status);

    res.json(gadgetsWithProbability);
  } catch (error) {
    next(error);
  }
};

export const createGadget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ValidationError("Name is required");
    } else {
      const newGadget = await GadgetService.createGadget(name);
      res.status(201).json(newGadget);
    }
  } catch (error) {
    next(error);
  }
};

export const updateGadget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    if (!id) {
      throw new ValidationError("ID is required");
    } else if (!name && !status) {
      throw new ValidationError("Name or status is required");
    } else {
      const data: { name?: string; status?: GadgetStatus } = {};
      if (name) data.name = name;
      if (status) data.status = status;

      const updatedGadget = await GadgetService.updateGadget(id, data);
      res.json(updatedGadget);
    }
  } catch (error) {
    next(error)
  }
};

export const deleteGadget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID is required");
    } else {
      const updatedGadget = await GadgetService.deleteGadget(id);
      res.json(updatedGadget);
    }
  } catch (error) {
    next(error)
  }
};

export const selfDestructGadget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { confirmationcode } = req.body;

    if (!id) {
      throw new ValidationError("ID is required");
    } else if (!confirmationcode) {
      throw new ValidationError("Confirmation code is required");
    } else {
      const updatedGadget = await GadgetService.selfDestructGadget(id, confirmationcode);
      res.json(updatedGadget);
    }
  } catch (error) {
    next(error);
  }
};
