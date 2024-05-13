/*
  Warnings:

  - You are about to drop the column `users_id` on the `rankings` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `rankings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_users_id_fkey";

-- AlterTable
ALTER TABLE "rankings" DROP COLUMN "users_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
