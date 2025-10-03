/*
  Warnings:

  - You are about to drop the column `location_id` on the `Alerts` table. All the data in the column will be lost.
  - Added the required column `stateCode` to the `Alerts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Alerts" DROP CONSTRAINT "Alerts_location_id_fkey";

-- DropIndex
DROP INDEX "public"."Locations_name_idx";

-- AlterTable
ALTER TABLE "public"."Alerts" DROP COLUMN "location_id",
ADD COLUMN     "stateCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Readings" ALTER COLUMN "source" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "Alerts_stateCode_idx" ON "public"."Alerts"("stateCode");

-- CreateIndex
CREATE INDEX "Locations_stateCode_idx" ON "public"."Locations"("stateCode");

-- AddForeignKey
ALTER TABLE "public"."Alerts" ADD CONSTRAINT "Alerts_stateCode_fkey" FOREIGN KEY ("stateCode") REFERENCES "public"."Locations"("stateCode") ON DELETE RESTRICT ON UPDATE CASCADE;
