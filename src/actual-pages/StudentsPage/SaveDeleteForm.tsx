import { Student } from "@/types";
import Link from "next/link";
import { useState, FormEvent } from "react";

type Props = {
  student: Student;
  onSave: (studentPid: string, name: string) => Promise<void>;
  onDelete: (studentPid: string) => Promise<void>;
};

export function SaveDeleteForm({ student, onSave, onDelete }: Props) {
  const [name, setName] = useState(student.name);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(student.pid, name);
  };

  const handleDelete = async () => {
    await onDelete(student.pid);
  };

  return (
    <form onSubmit={handleSave}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Save</button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      {student.billingType === "self" && (
        <Link href={`/students/${student.pid}/payment-method`}>
          PaymentMethod
        </Link>
      )}
      {student.billingType === "payer" && (
        <Link href={`/students/${student.pid}/payer`}>Payer</Link>
      )}
    </form>
  );
}
