/*
  Warnings:

  - The primary key for the `albums` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `artists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `songs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_song_id_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_album_id_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_artist_id_fkey";

-- AlterTable
ALTER TABLE "albums" DROP CONSTRAINT "albums_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "artist_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "albums_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "artists" DROP CONSTRAINT "artists_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "artists_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rankings" ALTER COLUMN "song_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "songs" DROP CONSTRAINT "songs_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "album_id" SET DATA TYPE TEXT,
ALTER COLUMN "artist_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "songs_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
