/*
  Warnings:

  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_userId_fkey";

-- DropIndex
DROP INDEX "User_clerkId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
