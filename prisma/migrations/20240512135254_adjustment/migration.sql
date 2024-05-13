/*
  Warnings:

  - A unique constraint covering the columns `[album_id,track_number]` on the table `songs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[album_id,song_name]` on the table `songs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "dates" DROP CONSTRAINT "dates_user_id_fkey";

-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_date_id_fkey";

-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_song_id_fkey";

-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_users_id_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_album_id_fkey";

-- DropIndex
DROP INDEX "songs_song_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "songs_album_id_track_number_key" ON "songs"("album_id", "track_number");

-- CreateIndex
CREATE UNIQUE INDEX "songs_album_id_song_name_key" ON "songs"("album_id", "song_name");

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dates" ADD CONSTRAINT "dates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
