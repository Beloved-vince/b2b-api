/*
  Warnings:

  - You are about to drop the column `image` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" BYTEA;
