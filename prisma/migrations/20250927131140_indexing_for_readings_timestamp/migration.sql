/*
  Warnings:

  - You are about to drop the column `zip_code` on the `Locations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Locations" DROP COLUMN "zip_code",
ADD COLUMN     "zipcode" TEXT;

-- CreateIndex
CREATE INDEX "Readings_timestamp_idx" ON "public"."Readings"("timestamp");
