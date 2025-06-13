import { useState, FormEvent } from "react";

type Props = {
  onCreateLink: (pid: string) => Promise<void>;
};

export function CreateLinkForm({ onCreateLink }: Props) {
  const [pid, setPid] = useState("");

  const handleCreateLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onCreateLink(pid);
    setPid("");
  };

  return (
    <form onSubmit={handleCreateLink}>
      <input value={pid} onChange={(e) => setPid(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
