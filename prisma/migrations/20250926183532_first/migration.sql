-- CreateTable
CREATE TABLE "public"."Alerts" (
    "alert_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "severity" VARCHAR(20) NOT NULL,
    "triggered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) NOT NULL DEFAULT 'unread',
    "user_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Alerts_pkey" PRIMARY KEY ("alert_id")
);

-- CreateTable
CREATE TABLE "public"."Locations" (
    "location_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "geo" BYTEA,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "public"."Readings" (
    "reading_id" BIGSERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "aqi" INTEGER,
    "co2_ppm" DOUBLE PRECISION,
    "no2_ppm" DOUBLE PRECISION,
    "pm25" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "sensor_id" INTEGER NOT NULL,

    CONSTRAINT "Readings_pkey" PRIMARY KEY ("reading_id")
);

-- CreateTable
CREATE TABLE "public"."Sensors" (
    "sensor_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Sensors_pkey" PRIMARY KEY ("sensor_id")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- AddForeignKey
ALTER TABLE "public"."Alerts" ADD CONSTRAINT "Alerts_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."Locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alerts" ADD CONSTRAINT "Alerts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Readings" ADD CONSTRAINT "Readings_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "public"."Sensors"("sensor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sensors" ADD CONSTRAINT "Sensors_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."Locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;
