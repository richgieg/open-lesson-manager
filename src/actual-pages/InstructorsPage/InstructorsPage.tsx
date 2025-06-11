import { Instructor } from "@/types";
import { useEffect, useState } from "react";
import { CreateForm } from "./CreateForm";
import { SaveDeleteForm } from "./SaveDeleteForm";

export function InstructorsPage() {
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
