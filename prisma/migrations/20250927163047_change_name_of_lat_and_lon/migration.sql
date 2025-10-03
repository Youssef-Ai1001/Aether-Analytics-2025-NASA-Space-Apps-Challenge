/*
  Warnings:

  - You are about to drop the column `max_latitude` on the `Locations` table. All the data in the column will be lost.
  - You are about to drop the column `max_longitude` on the `Locations` table. All the data in the column will be lost.
  - You are about to drop the column `min_latitude` on the `Locations` table. All the data in the column will be lost.
  - You are about to drop the column `min_longitude` on the `Locations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Locations" DROP COLUMN "max_latitude",
DROP COLUMN "max_longitude",
DROP COLUMN "min_latitude",
DROP COLUMN "min_longitude",
ADD COLUMN     "max_lat" DECIMAL(9,6),
ADD COLUMN     "max_lon" DECIMAL(9,6),
ADD COLUMN     "min_lat" DECIMAL(9,6),
ADD COLUMN     "min_lon" DECIMAL(9,6);
