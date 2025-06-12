import { Instructor } from "@/types";
import { useState, FormEvent } from "react";

type Props = {
  instructor: Instructor;
  onSave: (pid: string, name: string) => Promise<void>;
  onDelete: (pid: string) => Promise<void>;
};

export function SaveDeleteForm({ instructor, onSave, onDelete }: Props) {
  const [name, setName] = useState(instructor.name);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(instructor.pid, name);
  };

  const handleDelete = async () => {
    await onDelete(instructor.pid);
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
