import { CreateLinkForm } from "./CreateLinkForm";
import { DeleteLinkForm } from "./DeleteLinkForm";
import { useAvailableSubjects } from "./useAvailableSubjects";
import { useLinkedSubjects } from "./useLinkedSubjects";

export function InstructorSubjectsPage() {
  const { linkedSubjects, handleCreateLink, handleDeleteLink } =
    useLinkedSubjects();
  const availableSubjects = useAvailableSubjects();

  if (!linkedSubjects || !availableSubjects) {
    return <>Loading...</>;
  }

  return (
    <>
      {linkedSubjects.map((subject) => (
        <DeleteLinkForm
          key={subject.id}
          subject={subject}
          onDeleteLink={handleDeleteLink}
        />
      ))}
      {availableSubjects.length > 0 && (
        <CreateLinkForm
          availableSubjects={availableSubjects}
          onCreateLink={handleCreateLink}
        />
      )}
    </>
  );
}
