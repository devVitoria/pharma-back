/*
  Warnings:

  - You are about to drop the column `orderId` on the `CustomProduct` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CustomProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomProduct" DROP CONSTRAINT "CustomProduct_orderId_fkey";

-- AlterTable
ALTER TABLE "CustomProduct" DROP COLUMN "orderId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomProduct" ADD CONSTRAINT "CustomProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
