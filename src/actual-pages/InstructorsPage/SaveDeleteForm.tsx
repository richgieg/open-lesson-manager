import { Instructor } from "@/types";
import { useState, FormEvent } from "react";

type SaveDeleteFormProps = {
  instructor: Instructor;
  onSave: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export function SaveDeleteForm({
  instructor,
  onSave,
  onDelete,
}: SaveDeleteFormProps) {
  const [name, setName] = useState(instructor.name);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(instructor.id, name);
  };

  const handleDelete = async () => {
    await onDelete(instructor.id);
  };

  return (
    <form onSubmit={handleSave}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Save</button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </form>
  );
}
