/*
  Warnings:

  - A unique constraint covering the columns `[album_name,artist_id]` on the table `albums` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "albums_album_name_artist_id_key" ON "albums"("album_name", "artist_id");
