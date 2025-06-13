import { Subject } from "@/types";
import { useState, FormEvent } from "react";

type Props = {
  availableSubjects: Subject[];
  onCreateLink: (subjectPid: string) => Promise<void>;
};

export function CreateLinkForm({ availableSubjects, onCreateLink }: Props) {
  const [pid, setPid] = useState(availableSubjects[0].pid);

  const handleCreateLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onCreateLink(pid);
  };

  return (
    <form onSubmit={handleCreateLink}>
      <select value={pid} onChange={(e) => setPid(e.target.value)}>
        {availableSubjects.map((s) => (
          <option key={s.id} value={s.pid}>
            {s.name}
          </option>
        ))}
      </select>
      <button type="submit">CreateLink</button>
    </form>
  );
}
