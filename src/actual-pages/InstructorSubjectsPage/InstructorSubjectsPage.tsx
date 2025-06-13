import { CreateLinkForm } from "./CreateLinkForm";
import { DeleteLinkForm } from "./DeleteLinkForm";
import { useInstructorSubjects } from "./useInstructorSubjects";

export function InstructorSubjectsPage() {
  const { instructorSubjects, handleCreateLink, handleDeleteLink } =
    useInstructorSubjects();

  if (!instructorSubjects) {
    return <>Loading...</>;
  }

  return (
    <>
      {instructorSubjects.map((subject) => (
        <DeleteLinkForm
          key={subject.id}
          subject={subject}
          onDeleteLink={handleDeleteLink}
        />
      ))}
      <CreateLinkForm onCreateLink={handleCreateLink} />
    </>
  );
}
