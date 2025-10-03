/*
  Warnings:

  - A unique constraint covering the columns `[latitude,longitude]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Locations_latitude_key";

-- DropIndex
DROP INDEX "public"."Locations_longitude_key";

-- CreateIndex
CREATE UNIQUE INDEX "Locations_latitude_longitude_key" ON "public"."Locations"("latitude", "longitude");
