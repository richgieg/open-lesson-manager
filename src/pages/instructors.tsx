import { Instructor } from "@/types";
import { FormEvent, useEffect, useState } from "react";

export default function Instructors() {
  const [instructors, setInstructors] = useState<Instructor[] | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await fetch("/api/instructors");
      const data = await response.json();
      setInstructors(data);
    };
    fetchInstructors();
  }, []);

  if (!instructors) {
    return <>Loading...</>;
  }

  return (
    <>
      {instructors.map((instructor) => (
        <SaveDeleteForm
          key={instructor.id}
          instructor={instructor}
          instructors={instructors}
          setInstructors={setInstructors}
        />
      ))}
      <CreateForm instructors={instructors} setInstructors={setInstructors} />
    </>
  );
}

type CreateFormProps = {
  instructors: Instructor[];
  setInstructors: (instructors: Instructor[]) => void;
};

function CreateForm({ instructors, setInstructors }: CreateFormProps) {
  const [name, setName] = useState("");

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/instructors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setInstructors([...instructors, data]);
    setName("");
  };

  return (
    <form onSubmit={handleCreate}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}

type SaveDeleteFormProps = {
  instructor: Instructor;
  instructors: Instructor[];
  setInstructors: (instructors: Instructor[]) => void;
};

function SaveDeleteForm({
  instructor,
  instructors,
  setInstructors,
}: SaveDeleteFormProps) {
  const [name, setName] = useState(instructor.name);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/instructors/${instructor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setInstructors(instructors.map((i) => (i.id === instructor.id ? data : i)));
  };

  const handleDelete = async () => {
    await fetch(`/api/instructors/${instructor.id}`, {
      method: "DELETE",
    });
    setInstructors(instructors.filter((i) => i.id !== instructor.id));
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
