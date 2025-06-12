import { Instructor } from "@/types";
import { useEffect, useState } from "react";

export function useInstructors() {
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
    return {
      instructors: null,
      handleCreate: null,
      handleSave: null,
      handleDelete: null,
    };
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

  const handleSave = async (pid: string, name: string) => {
    const response = await fetch(`/api/instructors/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setInstructors(instructors.map((i) => (i.pid === pid ? data : i)));
  };

  const handleDelete = async (pid: string) => {
    await fetch(`/api/instructors/${pid}`, {
      method: "DELETE",
    });
    setInstructors(instructors.filter((i) => i.pid !== pid));
  };

  return {
    instructors,
    handleCreate,
    handleSave,
    handleDelete,
  };
}
