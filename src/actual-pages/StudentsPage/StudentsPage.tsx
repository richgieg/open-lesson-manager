import { CreateForm } from "./CreateForm";
import { SaveDeleteForm } from "./SaveDeleteForm";
import { useStudents } from "./useStudents";

export function StudentsPage() {
  const { students, handleCreate, handleSave, handleDelete } = useStudents();

  if (!students) {
    return <>Loading...</>;
  }

  return (
    <>
      {students.map((student) => (
        <SaveDeleteForm
          key={student.id}
          student={student}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
      <CreateForm onCreate={handleCreate} />
    </>
  );
}
