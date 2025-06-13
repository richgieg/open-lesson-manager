import { Subject } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useLinkedSubjects() {
  const router = useRouter();
  const [instructorPid, setInstructorPid] = useState<string | null>(null);
  const [linkedSubjects, setLinkedSubjects] = useState<Subject[] | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setInstructorPid(router.query.instructorPid as string);
    }
  }, [router]);

  useEffect(() => {
    if (!instructorPid) {
      return;
    }
    const fetchInstructorSubjects = async () => {
      const response = await fetch(
        `/api/instructors/${instructorPid}/subjects`
      );
      const data = await response.json();
      setLinkedSubjects(data);
    };
    fetchInstructorSubjects();
  }, [instructorPid]);

  if (!linkedSubjects) {
    return {
      linkedSubjects: null,
      handleCreateLink: null,
      handleDeleteLink: null,
    };
  }

  const handleCreateLink = async (subjectPid: string) => {
    const response = await fetch(
      `/api/instructors/${instructorPid}/subjects/${subjectPid}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    if (!linkedSubjects.find((s) => s.pid === subjectPid)) {
      setLinkedSubjects([...linkedSubjects, data]);
    }
  };

  const handleDeleteLink = async (subjectPid: string) => {
    await fetch(`/api/instructors/${instructorPid}/subjects/${subjectPid}`, {
      method: "DELETE",
    });
    setLinkedSubjects(linkedSubjects.filter((i) => i.pid !== subjectPid));
  };

  return {
    linkedSubjects,
    handleCreateLink,
    handleDeleteLink,
  };
}
