-- DropForeignKey
ALTER TABLE "ApplicationPreference" DROP CONSTRAINT "ApplicationPreference_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "ApplicationPreference" ADD CONSTRAINT "ApplicationPreference_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
