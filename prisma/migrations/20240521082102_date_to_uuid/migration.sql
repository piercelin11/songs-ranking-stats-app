/*
  Warnings:

  - The primary key for the `dates` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_date_id_fkey";

-- AlterTable
ALTER TABLE "dates" DROP CONSTRAINT "date_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "date_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "dates_id_seq";

-- AlterTable
ALTER TABLE "rankings" ALTER COLUMN "date_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
