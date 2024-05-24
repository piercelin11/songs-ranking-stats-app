/*
  Warnings:

  - Made the column `album_name` on table `albums` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "albums" ALTER COLUMN "album_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "songs" ALTER COLUMN "album_id" DROP NOT NULL;
