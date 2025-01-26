import { Request, Response } from "express";
import * as GadgetService from "../services/gadgetService";
import { GadgetStatus } from "@prisma/client";


export const getGadgets = async (req: Request, res: Response) => {
  try {

    const status = req.query.status as GadgetStatus;

    
    const gadgetsWithProbability = await GadgetService.getAllGadgets(status);
    res.json(gadgetsWithProbability);
  } catch (error: any) {
    res.status(error.message.includes("No gadgets found") ? 404 : 500)
      .json({ error: error.message });
  }
};

export const createGadget = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
    } else {
      const newGadget = await GadgetService.createGadget(name);
      res.status(201).json(newGadget);
    }
  } catch (error: any) {
    res.status(error.message.includes("already exists") ? 409 : 500)
      .json({ error: error.message });
  }
};

export const updateGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    if (!id) {
      res.status(400).json({ error: "ID is required" });
    } else if (!name && !status) {
      res.status(400).json({ error: "Name or Status is required" });
    } else {
      const data: { name?: string; status?: GadgetStatus } = {};
      if (name) data.name = name;
      if (status) data.status = status;

      const updatedGadget = await GadgetService.updateGadget(id, data);
      res.json(updatedGadget);
    }
  } catch (error: any) {
    res.status(error.message.includes("not found") ? 404 : 500)
      .json({ error: error.message });
  }
};

export const deleteGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "ID is required" });
    } else {
      const updatedGadget = await GadgetService.deleteGadget(id);
      res.json(updatedGadget);
    }
  } catch (error: any) {
    res.status(error.message.includes("not found") ? 404 : 500)
      .json({ error: error.message });
  }
};

export const selfDestructGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { confirmationcode } = req.body;

    if (!id) {
      res.status(400).json({ error: "ID is required" });
    } else if (!confirmationcode) {
      res.status(400).json({ error: "Confirmation code is required" });
    } else {
      const updatedGadget = await GadgetService.selfDestructGadget(id, confirmationcode);
      res.json(updatedGadget);
    }
  } catch (error: any) {
    if (error.message === "Gadget not found") {
      res.status(404).json({ error: error.message });
    } else if (error.message === "Invalid confirmation code") {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
