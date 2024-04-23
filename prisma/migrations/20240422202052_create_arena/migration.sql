-- CreateEnum
CREATE TYPE "Modalities" AS ENUM ('BeachTennis', 'BeachVolleyball', 'Footvolley', 'None');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('Available', 'Reserved', 'DayUse', 'Maintenance');

-- CreateTable
CREATE TABLE "arena" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "modalities" "Modalities" NOT NULL DEFAULT 'None',
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "capacity" INTEGER,
    "state" "State" NOT NULL DEFAULT 'Available',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "arena_pkey" PRIMARY KEY ("id")
);
