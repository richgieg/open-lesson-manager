import { Subject } from "@/types";
import { useState, FormEvent } from "react";

type Props = {
  subject: Subject;
  onSave: (subjectPid: string, name: string) => Promise<void>;
  onDelete: (subjectPid: string) => Promise<void>;
};

export function SaveDeleteForm({ subject, onSave, onDelete }: Props) {
  const [name, setName] = useState(subject.name);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(subject.pid, name);
  };

  const handleDelete = async () => {
    await onDelete(subject.pid);
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
