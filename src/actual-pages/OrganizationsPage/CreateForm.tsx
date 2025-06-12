import { useState, FormEvent } from "react";

type Props = {
  onCreate: (name: string) => Promise<void>;
};

export function CreateForm({ onCreate }: Props) {
  const [name, setName] = useState("");

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onCreate(name);
    setName("");
  };

  return (
    <form onSubmit={handleCreate}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
