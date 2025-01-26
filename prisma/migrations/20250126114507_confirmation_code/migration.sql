/*
  Warnings:

  - Added the required column `confirmationcode` to the `Gadget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gadget" ADD COLUMN     "confirmationcode" INTEGER NOT NULL;
