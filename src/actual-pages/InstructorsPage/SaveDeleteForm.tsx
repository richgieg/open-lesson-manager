import { Instructor } from "@/types";
import Link from "next/link";
import { useState, FormEvent } from "react";

type Props = {
  instructor: Instructor;
  onSave: (instructorPid: string, name: string) => Promise<void>;
  onDelete: (instructorPid: string) => Promise<void>;
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
      <Link href={`/instructors/${instructor.pid}/subjects`}>Subjects</Link>
    </form>
  );
}
