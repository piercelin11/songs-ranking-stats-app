-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "artist_id" INTEGER;

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "artist_id" INTEGER;

-- CreateTable
CREATE TABLE "artists" (
    "id" INTEGER NOT NULL,
    "artist_name" TEXT NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artists_artist_name_key" ON "artists"("artist_name");

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
