import { Organization } from "@/types";
import Link from "next/link";
import { useState, FormEvent } from "react";

type Props = {
  organization: Organization;
  onSave: (organizationPid: string, name: string) => Promise<void>;
  onDelete: (organizationPid: string) => Promise<void>;
};

export function SaveDeleteForm({ organization, onSave, onDelete }: Props) {
  const [name, setName] = useState(organization.name);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(organization.pid, name);
  };

  const handleDelete = async () => {
    await onDelete(organization.pid);
  };

  return (
    <form onSubmit={handleSave}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Save</button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <Link href={`/organizations/${organization.pid}/subjects`}>Subjects</Link>
      <Link href={`/organizations/${organization.pid}/instructors`}>
        Instructors
      </Link>
      <Link href={`/organizations/${organization.pid}/students`}>Students</Link>
      <Link href={`/organizations/${organization.pid}/payers`}>Payers</Link>
    </form>
  );
}
