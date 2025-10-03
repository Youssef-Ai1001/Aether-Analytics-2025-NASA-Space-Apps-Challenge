/*
  Warnings:

  - You are about to drop the column `co` on the `Readings` table. All the data in the column will be lost.
  - You are about to drop the column `so2` on the `Readings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Readings" DROP COLUMN "co",
DROP COLUMN "so2";
