-- CreateTable
CREATE TABLE "studentInformation" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "studentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "studentInformation_studentId_key" ON "studentInformation"("studentId");

-- AddForeignKey
ALTER TABLE "studentInformation" ADD CONSTRAINT "studentInformation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
