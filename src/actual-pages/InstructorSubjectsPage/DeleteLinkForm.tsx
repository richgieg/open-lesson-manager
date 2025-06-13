import { Subject } from "@/types";

type Props = {
  subject: Subject;
  onDeleteLink: (pid: string) => Promise<void>;
};

export function DeleteLinkForm({ subject, onDeleteLink }: Props) {
  const handleDeleteLink = async () => {
    await onDeleteLink(subject.pid);
  };

  return (
    <div>
      <span>{subject.name}</span>
      <button type="button" onClick={handleDeleteLink}>
        DeleteLink
      </button>
    </div>
  );
}
