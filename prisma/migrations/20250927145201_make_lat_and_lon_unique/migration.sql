/*
  Warnings:

  - A unique constraint covering the columns `[latitude]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[longitude]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Locations_latitude_key" ON "public"."Locations"("latitude");

-- CreateIndex
CREATE UNIQUE INDEX "Locations_longitude_key" ON "public"."Locations"("longitude");
