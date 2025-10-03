/*
  Warnings:

  - You are about to alter the column `max_lat` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `DoublePrecision`.
  - You are about to alter the column `max_lon` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `DoublePrecision`.
  - You are about to alter the column `min_lat` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `DoublePrecision`.
  - You are about to alter the column `min_lon` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "public"."Locations" ALTER COLUMN "max_lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "max_lon" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "min_lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "min_lon" SET DATA TYPE DOUBLE PRECISION;
