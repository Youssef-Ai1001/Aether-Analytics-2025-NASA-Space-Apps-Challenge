/*
  Warnings:

  - You are about to drop the column `geo` on the `Locations` table. All the data in the column will be lost.
  - Added the required column `zip_code` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Locations" DROP COLUMN "geo",
ADD COLUMN     "zip_code" TEXT NOT NULL;
