-- AlterTable
ALTER TABLE "public"."Readings" ADD COLUMN     "source" VARCHAR(50);

-- CreateIndex
CREATE INDEX "Users_stateCode_idx" ON "public"."Users"("stateCode");
