-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_date_id_fkey";

-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_song_id_fkey";

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "dates"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
