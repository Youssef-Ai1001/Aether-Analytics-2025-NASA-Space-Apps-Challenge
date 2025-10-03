/*
  Warnings:

  - You are about to drop the column `name` on the `Sensors` table. All the data in the column will be lost.
  - Added the required column `lat` to the `Sensors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `Sensors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Sensors" DROP COLUMN "name",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lon" DOUBLE PRECISION NOT NULL;
