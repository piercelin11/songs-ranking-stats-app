-- CreateEnum
CREATE TYPE "rankingType" AS ENUM ('OVERALL', 'ALBUM');

-- CreateTable
CREATE TABLE "albums" (
    "id" INTEGER NOT NULL,
    "album_name" TEXT NOT NULL,
    "album_color" CHAR(7),

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" INTEGER NOT NULL,
    "song_name" TEXT NOT NULL,
    "album_id" INTEGER NOT NULL,
    "track_number" INTEGER,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rankings" (
    "id" TEXT NOT NULL,
    "date_id" TEXT NOT NULL,
    "song_id" INTEGER NOT NULL,
    "ranking" INTEGER NOT NULL,
    "users_id" TEXT NOT NULL,

    CONSTRAINT "rankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dates" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "info" TEXT,
    "user_id" TEXT NOT NULL,
    "type" "rankingType" NOT NULL,

    CONSTRAINT "date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "albums_album_name_key" ON "albums"("album_name");

-- CreateIndex
CREATE UNIQUE INDEX "songs_song_name_key" ON "songs"("song_name");

-- CreateIndex
CREATE UNIQUE INDEX "dates_id_key" ON "dates"("id");

-- CreateIndex
CREATE INDEX "dates_date_idx" ON "dates"("date");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "dates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dates" ADD CONSTRAINT "dates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
