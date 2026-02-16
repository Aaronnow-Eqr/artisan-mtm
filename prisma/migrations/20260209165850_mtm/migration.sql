/*
  Warnings:

  - You are about to drop the column `discountCents` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `fabricId` on the `OrderItem` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SizeOption" AS ENUM ('XS', 'S', 'M', 'L', 'XL');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discountCents";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "fabricId",
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "size" "SizeOption";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
