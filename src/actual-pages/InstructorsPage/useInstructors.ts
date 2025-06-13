import { Instructor } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useInstructors() {
  const router = useRouter();
  const [organizationPid, setOrganizationPid] = useState<string | null>(null);
  const [instructors, setInstructors] = useState<Instructor[] | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setOrganizationPid(router.query.organizationPid as string);
    }
  }, [router]);

  useEffect(() => {
    if (!organizationPid) {
      return;
    }
    const fetchInstructors = async () => {
      const response = await fetch(
        `/api/organizations/${organizationPid}/instructors`
      );
      const data = await response.json();
      setInstructors(data);
    };
    fetchInstructors();
  }, [organizationPid]);

  if (!instructors) {
    return {
      instructors: null,
      handleCreate: null,
      handleSave: null,
      handleDelete: null,
    };
  }

  const handleCreate = async (name: string) => {
    const response = await fetch(
      `/api/organizations/${organizationPid}/instructors`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
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
