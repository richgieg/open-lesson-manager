import { CreateForm } from "./CreateForm";
import { SaveDeleteForm } from "./SaveDeleteForm";
import { useInstructors } from "./useInstructors";

export function InstructorsPage() {
  const { instructors, handleCreate, handleSave, handleDelete } =
    useInstructors();

  if (!instructors) {
    return <>Loading...</>;
  }

  return (
    <>
      {instructors.map((instructor) => (
        <SaveDeleteForm
          key={instructor.id}
          instructor={instructor}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
      <CreateForm onCreate={handleCreate} />
    </>
  );
}
