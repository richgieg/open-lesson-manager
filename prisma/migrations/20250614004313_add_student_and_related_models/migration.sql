-- CreateEnum
CREATE TYPE "StudentBillingType" AS ENUM ('self', 'payer');

-- CreateEnum
CREATE TYPE "PaymentMethodOwnerType" AS ENUM ('student', 'payer');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "billingType" "StudentBillingType" NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "payerId" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payer" (
    "id" SERIAL NOT NULL,
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Payer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerType" "PaymentMethodOwnerType" NOT NULL,
    "payerId" INTEGER,
    "studentId" INTEGER,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_pid_key" ON "Student"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "Payer_pid_key" ON "Payer"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_payerId_key" ON "PaymentMethod"("payerId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_studentId_key" ON "PaymentMethod"("studentId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Payer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payer" ADD CONSTRAINT "Payer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Payer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
