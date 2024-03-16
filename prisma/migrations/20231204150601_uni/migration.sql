-- DropForeignKey
ALTER TABLE "ApplicationPayment" DROP CONSTRAINT "ApplicationPayment_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "ApplicationPayment" ADD CONSTRAINT "ApplicationPayment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
