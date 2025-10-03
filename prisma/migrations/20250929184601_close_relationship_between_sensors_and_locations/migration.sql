/*
  Warnings:

  - You are about to drop the column `location_name` on the `Sensors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Sensors" DROP CONSTRAINT "Sensors_location_name_fkey";

-- AlterTable
ALTER TABLE "public"."Sensors" DROP COLUMN "location_name",
ADD COLUMN     "locationsLocation_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Sensors" ADD CONSTRAINT "Sensors_locationsLocation_id_fkey" FOREIGN KEY ("locationsLocation_id") REFERENCES "public"."Locations"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;
