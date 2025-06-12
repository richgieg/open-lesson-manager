import { Instructor } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useInstructors() {
  const router = useRouter();
  const [pid, setPid] = useState<string | null>(null);
  const [instructors, setInstructors] = useState<Instructor[] | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setPid(router.query.pid as string);
    }
  }, [router]);

  useEffect(() => {
    if (!pid) {
      return;
    }
    const fetchInstructors = async () => {
      const response = await fetch(`/api/organizations/${pid}/instructors`);
      const data = await response.json();
      setInstructors(data);
    };
    fetchInstructors();
  }, [pid]);

  if (!instructors) {
    return {
      instructors: null,
      handleCreate: null,
      handleSave: null,
      handleDelete: null,
    };
  }

  const handleCreate = async (name: string) => {
    const response = await fetch(`/api/organizations/${pid}/instructors`, {
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
