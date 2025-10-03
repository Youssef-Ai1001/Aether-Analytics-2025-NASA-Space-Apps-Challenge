/*
  Warnings:

  - Added the required column `name` to the `Sensors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Sensors" ADD COLUMN     "name" TEXT NOT NULL;
