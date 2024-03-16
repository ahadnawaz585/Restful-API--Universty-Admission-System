/*
  Warnings:

  - You are about to drop the column `programId` on the `Application` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_programId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "programId";

-- CreateTable
CREATE TABLE "_ApplicationToProgram" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationToProgram_AB_unique" ON "_ApplicationToProgram"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationToProgram_B_index" ON "_ApplicationToProgram"("B");

-- AddForeignKey
ALTER TABLE "_ApplicationToProgram" ADD CONSTRAINT "_ApplicationToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToProgram" ADD CONSTRAINT "_ApplicationToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
