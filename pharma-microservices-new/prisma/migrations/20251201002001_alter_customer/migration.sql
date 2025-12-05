/*
  Warnings:

  - You are about to drop the column `user` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_user_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "user",
ADD COLUMN     "adm" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cpf_key" ON "Customer"("cpf");
