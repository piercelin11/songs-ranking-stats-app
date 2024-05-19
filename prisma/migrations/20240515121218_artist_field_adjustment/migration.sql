/*
  Warnings:

  - Made the column `artist_id` on table `albums` required. This step will fail if there are existing NULL values in that column.
  - Made the column `artist_id` on table `songs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_artist_id_fkey";

-- AlterTable
ALTER TABLE "albums" ALTER COLUMN "artist_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "songs" ALTER COLUMN "artist_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
