-- DropForeignKey
ALTER TABLE "ApplicationStatusHistory" DROP CONSTRAINT "ApplicationStatusHistory_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "ApplicationStatusHistory" ADD CONSTRAINT "ApplicationStatusHistory_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
