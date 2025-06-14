import { Student } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useStudents() {
  const router = useRouter();
  const [organizationPid, setOrganizationPid] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[] | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setOrganizationPid(router.query.organizationPid as string);
    }
  }, [router]);

  useEffect(() => {
    if (!organizationPid) {
      return;
    }
    const fetchStudents = async () => {
      const response = await fetch(
        `/api/organizations/${organizationPid}/students`
      );
      const data = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, [organizationPid]);

  if (!students) {
    return {
      students: null,
      handleCreate: null,
      handleSave: null,
      handleDelete: null,
    };
  }

  const handleCreate = async (name: string) => {
    const response = await fetch(
      `/api/organizations/${organizationPid}/students`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const data = await response.json();
    setStudents([...students, data]);
  };

  const handleSave = async (studentPid: string, name: string) => {
    const response = await fetch(`/api/students/${studentPid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setStudents(students.map((i) => (i.pid === studentPid ? data : i)));
  };

  const handleDelete = async (studentPid: string) => {
    await fetch(`/api/students/${studentPid}`, {
      method: "DELETE",
    });
    setStudents(students.filter((i) => i.pid !== studentPid));
  };

  return {
    students,
    handleCreate,
    handleSave,
    handleDelete,
  };
}
