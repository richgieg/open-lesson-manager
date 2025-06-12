import { CreateForm } from "./CreateForm";
import { SaveDeleteForm } from "./SaveDeleteForm";
import { useSubjects } from "./useSubjects";

export function SubjectsPage() {
  const { subjects, handleCreate, handleSave, handleDelete } = useSubjects();

  if (!subjects) {
    return <>Loading...</>;
  }

  return (
    <>
      {subjects.map((subject) => (
        <SaveDeleteForm
          key={subject.id}
          subject={subject}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
      <CreateForm onCreate={handleCreate} />
    </>
  );
}
