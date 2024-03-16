-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
