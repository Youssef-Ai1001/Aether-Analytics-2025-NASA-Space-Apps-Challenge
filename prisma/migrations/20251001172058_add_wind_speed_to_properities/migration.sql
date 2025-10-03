-- AlterTable
ALTER TABLE "public"."Readings" ADD COLUMN     "windSpeed" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Users_name_idx" ON "public"."Users"("name");
