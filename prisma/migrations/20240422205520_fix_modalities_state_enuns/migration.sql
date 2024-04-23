/*
  Warnings:

  - The values [BeachTennis,BeachVolleyball,Footvolley,None] on the enum `Modalities` will be removed. If these variants are still used in the database, this will fail.
  - The values [Available,Reserved,DayUse,Maintenance] on the enum `State` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Modalities_new" AS ENUM ('BEACHTENNIS', 'BEACHVOLLEYBALL', 'FOOTVOLEY', 'NONE');
ALTER TABLE "arena" ALTER COLUMN "modalities" DROP DEFAULT;
ALTER TABLE "arena" ALTER COLUMN "modalities" TYPE "Modalities_new" USING ("modalities"::text::"Modalities_new");
ALTER TYPE "Modalities" RENAME TO "Modalities_old";
ALTER TYPE "Modalities_new" RENAME TO "Modalities";
DROP TYPE "Modalities_old";
ALTER TABLE "arena" ALTER COLUMN "modalities" SET DEFAULT 'NONE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "State_new" AS ENUM ('AVAILABLE', 'RESERVED', 'DAYUSE', 'MAINTENANCE');
ALTER TABLE "arena" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "arena" ALTER COLUMN "state" TYPE "State_new" USING ("state"::text::"State_new");
ALTER TYPE "State" RENAME TO "State_old";
ALTER TYPE "State_new" RENAME TO "State";
DROP TYPE "State_old";
ALTER TABLE "arena" ALTER COLUMN "state" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "arena" ALTER COLUMN "modalities" SET DEFAULT 'NONE',
ALTER COLUMN "state" SET DEFAULT 'AVAILABLE';
