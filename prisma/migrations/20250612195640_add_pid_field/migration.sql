/*
  Warnings:

  - A unique constraint covering the columns `[pid]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - The required column `pid` was added to the `Instructor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "pid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_pid_key" ON "Instructor"("pid");
