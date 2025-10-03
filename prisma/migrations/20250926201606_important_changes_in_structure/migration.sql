/*
  Warnings:

  - You are about to drop the column `co2_ppm` on the `Readings` table. All the data in the column will be lost.
  - You are about to drop the column `no2_ppm` on the `Readings` table. All the data in the column will be lost.
  - You are about to drop the column `sensor_id` on the `Readings` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `Readings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Readings" DROP CONSTRAINT "Readings_sensor_id_fkey";

-- AlterTable
ALTER TABLE "public"."Locations" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "zip_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Readings" DROP COLUMN "co2_ppm",
DROP COLUMN "no2_ppm",
DROP COLUMN "sensor_id",
ADD COLUMN     "co" DOUBLE PRECISION,
ADD COLUMN     "location_id" INTEGER NOT NULL,
ADD COLUMN     "no2" DOUBLE PRECISION,
ADD COLUMN     "o3" DOUBLE PRECISION,
ADD COLUMN     "pm10" DOUBLE PRECISION,
ADD COLUMN     "so2" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Locations_name_idx" ON "public"."Locations"("name");

-- AddForeignKey
ALTER TABLE "public"."Readings" ADD CONSTRAINT "Readings_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."Locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;
