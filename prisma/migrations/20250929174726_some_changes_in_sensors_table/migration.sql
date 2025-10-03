/*
  Warnings:

  - You are about to drop the column `location_id` on the `Sensors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location_name` to the `Sensors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Sensors" DROP CONSTRAINT "Sensors_location_id_fkey";

-- AlterTable
ALTER TABLE "public"."Sensors" DROP COLUMN "location_id",
ADD COLUMN     "location_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Locations_name_key" ON "public"."Locations"("name");

-- AddForeignKey
ALTER TABLE "public"."Sensors" ADD CONSTRAINT "Sensors_location_name_fkey" FOREIGN KEY ("location_name") REFERENCES "public"."Locations"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
