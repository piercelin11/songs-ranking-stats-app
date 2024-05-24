/*
  Warnings:

  - You are about to drop the column `artist_id` on the `songs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_artist_id_fkey";

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "artist_id";
