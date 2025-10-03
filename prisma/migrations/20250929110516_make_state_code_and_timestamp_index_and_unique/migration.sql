/*
  Warnings:

  - A unique constraint covering the columns `[stateCode,timestamp]` on the table `Readings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Readings_timestamp_idx";

-- CreateIndex
CREATE INDEX "Readings_stateCode_timestamp_idx" ON "public"."Readings"("stateCode", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Readings_stateCode_timestamp_key" ON "public"."Readings"("stateCode", "timestamp");
