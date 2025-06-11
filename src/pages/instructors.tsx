import { Instructor } from "@/types";
import { FormEvent, useEffect, useState } from "react";

export default function Instructors() {
  const [instructors, setInstructors] = useState<Instructor[] | null>();
  const [name, setName] = useState("");

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
    <>
      {instructors.map((instructor) => (
        <div key={instructor.id}>{instructor.name}</div>
      ))}
      <form onSubmit={handleCreate}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
