import { Payer } from "@/types";
import Link from "next/link";
import { useState, FormEvent } from "react";

type Props = {
  payer: Payer;
  onSave: (payerPid: string, name: string) => Promise<void>;
  onDelete: (payerPid: string) => Promise<void>;
};

export function SaveDeleteForm({ payer, onSave, onDelete }: Props) {
  const [name, setName] = useState(payer.name);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(payer.pid, name);
  };

  const handleDelete = async () => {
    await onDelete(payer.pid);
  };

  return (
    <form onSubmit={handleSave}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Save</button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <Link href={`/payers/${payer.pid}/payment-method`}>PaymentMethod</Link>
    </form>
  );
}
