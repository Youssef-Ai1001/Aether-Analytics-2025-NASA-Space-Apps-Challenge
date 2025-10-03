/*
  Warnings:

  - You are about to drop the column `latitude` on the `Locations` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Locations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Locations_latitude_longitude_key";

-- AlterTable
ALTER TABLE "public"."Locations" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "max_latitude" DECIMAL(9,6),
ADD COLUMN     "max_longitude" DECIMAL(9,6),
ADD COLUMN     "min_latitude" DECIMAL(9,6),
ADD COLUMN     "min_longitude" DECIMAL(9,6);
