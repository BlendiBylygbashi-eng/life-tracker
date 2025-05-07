/*
  Warnings:

  - You are about to drop the `DailyEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GymExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GymSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplementLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GymExercise" DROP CONSTRAINT "GymExercise_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "GymSession" DROP CONSTRAINT "GymSession_entryId_fkey";

-- DropForeignKey
ALTER TABLE "SupplementLog" DROP CONSTRAINT "SupplementLog_entryId_fkey";

-- DropTable
DROP TABLE "DailyEntry";

-- DropTable
DROP TABLE "GymExercise";

-- DropTable
DROP TABLE "GymSession";

-- DropTable
DROP TABLE "SupplementLog";

-- CreateTable
CREATE TABLE "daily_entry" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeInOffice" DOUBLE PRECISION NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "bodyWeight" DOUBLE PRECISION,
    "gripStrength" DOUBLE PRECISION,
    "activities" TEXT,
    "improvements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplement_log" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "supplementName" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL,

    CONSTRAINT "supplement_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_session" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "gym_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_exercise" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "gym_exercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gym_session_entryId_key" ON "gym_session"("entryId");

-- AddForeignKey
ALTER TABLE "supplement_log" ADD CONSTRAINT "supplement_log_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "daily_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_session" ADD CONSTRAINT "gym_session_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "daily_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_exercise" ADD CONSTRAINT "gym_exercise_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "gym_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
