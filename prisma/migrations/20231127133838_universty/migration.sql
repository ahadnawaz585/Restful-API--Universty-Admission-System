/*
  Warnings:

  - You are about to drop the `studentInformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "studentInformation" DROP CONSTRAINT "studentInformation_studentId_fkey";

-- DropTable
DROP TABLE "studentInformation";
