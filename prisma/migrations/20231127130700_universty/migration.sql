-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "citizen" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousEducation" (
    "id" SERIAL NOT NULL,
    "schoolName" TEXT NOT NULL,
    "schoolProgram" TEXT NOT NULL,
    "schoolMarks" DOUBLE PRECISION NOT NULL,
    "collegeName" TEXT NOT NULL,
    "collegeProgram" TEXT NOT NULL,
    "collegeMarks" DOUBLE PRECISION NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "PreviousEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentInformation" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "studentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LevelOfEducation" (
    "id" SERIAL NOT NULL,
    "levelName" TEXT NOT NULL,
    "mandatoryYearsOfEducation" INTEGER NOT NULL,

    CONSTRAINT "LevelOfEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "programName" TEXT NOT NULL,
    "levelOfEducationId" INTEGER NOT NULL,
    "minimumMarksRequired" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicCertificate" (
    "id" SERIAL NOT NULL,
    "certificateName" TEXT NOT NULL,

    CONSTRAINT "AcademicCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "applicationFee" DOUBLE PRECISION NOT NULL,
    "academicCertificates" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityAdmin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UniversityAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationStatusHistory" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "statusFrom" TEXT NOT NULL,
    "statusTo" TEXT NOT NULL,
    "dateOfChange" TIMESTAMP(3) NOT NULL,
    "adminId" INTEGER,

    CONSTRAINT "ApplicationStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationPayment" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "bankName" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ApplicationPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationPreference" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "ApplicationPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "studentInformation_studentId_key" ON "studentInformation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationPreference_applicationId_priority_key" ON "ApplicationPreference"("applicationId", "priority");

-- AddForeignKey
ALTER TABLE "PreviousEducation" ADD CONSTRAINT "PreviousEducation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentInformation" ADD CONSTRAINT "studentInformation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_levelOfEducationId_fkey" FOREIGN KEY ("levelOfEducationId") REFERENCES "LevelOfEducation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_academicCertificates_fkey" FOREIGN KEY ("academicCertificates") REFERENCES "AcademicCertificate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationStatusHistory" ADD CONSTRAINT "ApplicationStatusHistory_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "UniversityAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationStatusHistory" ADD CONSTRAINT "ApplicationStatusHistory_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationPayment" ADD CONSTRAINT "ApplicationPayment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationPreference" ADD CONSTRAINT "ApplicationPreference_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationPreference" ADD CONSTRAINT "ApplicationPreference_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
