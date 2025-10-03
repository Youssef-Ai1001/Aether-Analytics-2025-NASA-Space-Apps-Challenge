/*
  Warnings:

  - You are about to drop the column `locationsLocation_id` on the `Sensors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Sensors" DROP CONSTRAINT "Sensors_locationsLocation_id_fkey";

-- AlterTable
ALTER TABLE "public"."Sensors" DROP COLUMN "locationsLocation_id";
