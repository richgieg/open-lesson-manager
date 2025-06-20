import { Subject } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useSubjects() {
  const router = useRouter();
  const [organizationPid, setOrganizationPid] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[] | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setOrganizationPid(router.query.organizationPid as string);
    }
  }, [router]);

  useEffect(() => {
    if (!organizationPid) {
      return;
    }
    const fetchSubjects = async () => {
      const response = await fetch(
        `/api/organizations/${organizationPid}/subjects`
      );
      const data = await response.json();
      setSubjects(data);
    };
    fetchSubjects();
  }, [organizationPid]);

  if (!subjects) {
    return {
      subjects: null,
      handleCreate: null,
      handleSave: null,
      handleDelete: null,
    };
  }

  const handleCreate = async (name: string) => {
    const response = await fetch(
      `/api/organizations/${organizationPid}/subjects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const data = await response.json();
    setSubjects([...subjects, data]);
  };

  const handleSave = async (subjectPid: string, name: string) => {
    const response = await fetch(`/api/subjects/${subjectPid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setSubjects(subjects.map((i) => (i.pid === subjectPid ? data : i)));
  };

  const handleDelete = async (subjectPid: string) => {
    await fetch(`/api/subjects/${subjectPid}`, {
      method: "DELETE",
    });
    setSubjects(subjects.filter((i) => i.pid !== subjectPid));
  };

  return {
    subjects,
    handleCreate,
    handleSave,
    handleDelete,
  };
}
