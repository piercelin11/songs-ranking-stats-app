-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "rankingType" ADD VALUE 'FRIENDLY_MATCH';
ALTER TYPE "rankingType" ADD VALUE 'CHAMPIONSHIP';
ALTER TYPE "rankingType" ADD VALUE 'OVERALL';

-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_song_id_fkey";

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
