/*
  Warnings:

  - A unique constraint covering the columns `[stateCode,timestamp]` on the table `Readings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stateCode` to the `Readings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Readings" ADD COLUMN     "stateCode" VARCHAR(5) NOT NULL;

-- CreateIndex
CREATE INDEX "Readings_stateCode_timestamp_idx" ON "public"."Readings"("stateCode", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Readings_stateCode_timestamp_key" ON "public"."Readings"("stateCode", "timestamp");

-- AddForeignKey
ALTER TABLE "public"."Readings" ADD CONSTRAINT "Readings_stateCode_fkey" FOREIGN KEY ("stateCode") REFERENCES "public"."Locations"("stateCode") ON DELETE RESTRICT ON UPDATE CASCADE;
