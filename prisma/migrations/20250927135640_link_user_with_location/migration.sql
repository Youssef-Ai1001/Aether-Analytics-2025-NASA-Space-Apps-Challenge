/*
  Warnings:

  - You are about to drop the column `location` on the `Users` table. All the data in the column will be lost.
  - Added the required column `stateCode` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "location",
ADD COLUMN     "stateCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_stateCode_fkey" FOREIGN KEY ("stateCode") REFERENCES "public"."Locations"("stateCode") ON DELETE RESTRICT ON UPDATE CASCADE;
