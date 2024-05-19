/*
  Warnings:

  - The primary key for the `dates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `dates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `date_id` on the `rankings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_date_id_fkey";

-- AlterTable
ALTER TABLE "dates" DROP CONSTRAINT "date_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "date_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rankings" DROP COLUMN "date_id",
ADD COLUMN     "date_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "dates_id_key" ON "dates"("id");

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
