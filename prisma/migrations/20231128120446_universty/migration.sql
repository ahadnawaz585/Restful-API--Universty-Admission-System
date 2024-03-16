/*
  Warnings:

  - You are about to drop the `_ApplicationToProgram` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ApplicationToProgram" DROP CONSTRAINT "_ApplicationToProgram_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToProgram" DROP CONSTRAINT "_ApplicationToProgram_B_fkey";

-- DropTable
DROP TABLE "_ApplicationToProgram";
