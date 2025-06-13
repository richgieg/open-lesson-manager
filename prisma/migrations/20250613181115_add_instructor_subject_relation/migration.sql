-- CreateTable
CREATE TABLE "_InstructorToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_InstructorToSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InstructorToSubject_B_index" ON "_InstructorToSubject"("B");

-- AddForeignKey
ALTER TABLE "_InstructorToSubject" ADD CONSTRAINT "_InstructorToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToSubject" ADD CONSTRAINT "_InstructorToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
