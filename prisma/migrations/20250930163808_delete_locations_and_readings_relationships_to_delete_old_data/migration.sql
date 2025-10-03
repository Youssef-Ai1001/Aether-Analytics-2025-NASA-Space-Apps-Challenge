/*
  Warnings:

  - You are about to drop the column `stateCode` on the `Readings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Readings" DROP CONSTRAINT "Readings_stateCode_fkey";

-- DropIndex
DROP INDEX "public"."Readings_stateCode_timestamp_idx";

-- DropIndex
DROP INDEX "public"."Readings_stateCode_timestamp_key";

-- AlterTable
ALTER TABLE "public"."Readings" DROP COLUMN "stateCode";
