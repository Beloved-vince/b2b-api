/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
