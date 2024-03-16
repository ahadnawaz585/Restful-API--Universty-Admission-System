/*
  Warnings:

  - You are about to drop the column `academicCertificates` on the `Application` table. All the data in the column will be lost.
  - Added the required column `academicCertificateId` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programFee` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_academicCertificates_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "academicCertificates";

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "academicCertificateId" INTEGER NOT NULL,
ADD COLUMN     "programFee" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_academicCertificateId_fkey" FOREIGN KEY ("academicCertificateId") REFERENCES "AcademicCertificate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
