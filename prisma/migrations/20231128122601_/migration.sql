/*
  Warnings:

  - You are about to drop the column `academicCertificateId` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `programFee` on the `Program` table. All the data in the column will be lost.
  - Added the required column `academicCertificates` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_academicCertificateId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "academicCertificates" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "academicCertificateId",
DROP COLUMN "programFee";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_academicCertificates_fkey" FOREIGN KEY ("academicCertificates") REFERENCES "AcademicCertificate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
