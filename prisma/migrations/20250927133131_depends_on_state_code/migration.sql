/*
  Warnings:

  - You are about to drop the column `location_id` on the `Readings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stateCode]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stateCode` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateCode` to the `Readings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Readings" DROP CONSTRAINT "Readings_location_id_fkey";

-- AlterTable
ALTER TABLE "public"."Locations" ADD COLUMN     "stateCode" VARCHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Readings" DROP COLUMN "location_id",
ADD COLUMN     "stateCode" VARCHAR(5) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Locations_stateCode_key" ON "public"."Locations"("stateCode");

-- AddForeignKey
ALTER TABLE "public"."Readings" ADD CONSTRAINT "Readings_stateCode_fkey" FOREIGN KEY ("stateCode") REFERENCES "public"."Locations"("stateCode") ON DELETE RESTRICT ON UPDATE CASCADE;
