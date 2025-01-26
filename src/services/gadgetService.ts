import { Prisma, PrismaClient, GadgetStatus } from "@prisma/client";
import { generateCodename } from "../utils/generateCodename";
import { generateConfirmationCode } from "../utils/generateConfirmationCode";

const prisma = new PrismaClient();

export const getAllGadgets = async (status : GadgetStatus) => {

  let gadgets = [];
  if(status) {
    gadgets = await prisma.gadget.findMany({
      where: { status },
    });
  } else {
    gadgets = await prisma.gadget.findMany();
  }
  

  if (!gadgets.length) {
    throw new Error("No gadgets found");
  }

  return gadgets.map((gadget) => ({
    ...gadget,
    missionSuccessProbability: `${Math.floor(Math.random() * 101)}%`,
  }));
};

export const createGadget = async (name: string) => {
  const codename = generateCodename();
  const confirmationcode = generateConfirmationCode();

  try {
    return await prisma.gadget.create({
      data: { name, codename, confirmationcode },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error("A gadget with this name already exists");
      }
    }
    throw error;
  }
};

export const updateGadget = async (
  id: string, 
  data: { name?: string; status?: GadgetStatus }
) => {
  return await prisma.gadget.update({
    where: { id },
    data,
  });
};

export const deleteGadget = async (id: string) => {
  return await prisma.gadget.update({
    where: { id },
    data: {
      status: "Decommissioned",
      decommissionedAt: new Date(),
    },
  });
};

export const selfDestructGadget = async (id: string, confirmationcode: string) => {
  const gadget = await prisma.gadget.findUnique({
    where: { id },
  });

  if (!gadget) {
    throw new Error("Gadget not found");
  }

  if (gadget.confirmationcode !== Number(confirmationcode)) {
    throw new Error("Invalid confirmation code");
  }

  return await prisma.gadget.update({
    where: { id },
    data: { status: "Destroyed" },
  });
};