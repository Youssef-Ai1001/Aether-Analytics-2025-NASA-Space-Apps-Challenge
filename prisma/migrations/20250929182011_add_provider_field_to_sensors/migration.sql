/*
  Warnings:

  - A unique constraint covering the columns `[sensor_id,provider]` on the table `Sensors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `Sensors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Sensors" ADD COLUMN     "provider" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sensors_sensor_id_provider_key" ON "public"."Sensors"("sensor_id", "provider");
