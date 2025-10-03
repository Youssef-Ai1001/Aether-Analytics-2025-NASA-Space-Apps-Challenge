-- CreateTable
CREATE TABLE "public"."Forecast" (
    "id" SERIAL NOT NULL,
    "stateCode" TEXT NOT NULL,
    "forecastTime" TIMESTAMP(3) NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pm25" DOUBLE PRECISION,
    "aqi" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Forecast_stateCode_forecastTime_key" ON "public"."Forecast"("stateCode", "forecastTime");

-- AddForeignKey
ALTER TABLE "public"."Forecast" ADD CONSTRAINT "Forecast_stateCode_fkey" FOREIGN KEY ("stateCode") REFERENCES "public"."Locations"("stateCode") ON DELETE RESTRICT ON UPDATE CASCADE;
