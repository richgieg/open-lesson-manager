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

  const handleCreate = async (name: string) => {
    const response = await fetch("/api/instructors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setInstructors([...instructors, data]);
  };

  const handleSave = async (id: number, name: string) => {
    const response = await fetch(`/api/instructors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setInstructors(instructors.map((i) => (i.id === id ? data : i)));
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/instructors/${id}`, {
      method: "DELETE",
    });
    setInstructors(instructors.filter((i) => i.id !== id));
  };

  return (
    <>
      {instructors.map((instructor) => (
        <SaveDeleteForm
          key={instructor.id}
          instructor={instructor}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
      <CreateForm onCreate={handleCreate} />
    </>
  );
}

type CreateFormProps = {
  onCreate: (name: string) => Promise<void>;
};

function CreateForm({ onCreate }: CreateFormProps) {
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

type SaveDeleteFormProps = {
  instructor: Instructor;
  onSave: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

function SaveDeleteForm({ instructor, onSave, onDelete }: SaveDeleteFormProps) {
  const [name, setName] = useState(instructor.name);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(instructor.id, name);
  };

  const handleDelete = async () => {
    await onDelete(instructor.id);
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
