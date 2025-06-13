import { Subject } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useInstructorSubjects() {
  const router = useRouter();
  const [instructorPid, setInstructorPid] = useState<string | null>(null);
  const [instructorSubjects, setInstructorSubjects] = useState<
    Subject[] | null
  >(null);

  useEffect(() => {
    if (router.isReady) {
      setInstructorPid(router.query.pid as string);
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
      setInstructorSubjects(data);
    };
    fetchInstructorSubjects();
  }, [instructorPid]);

  if (!instructorSubjects) {
    return {
      instructorSubjects: null,
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
    setInstructorSubjects([...instructorSubjects, data]);
  };

  const handleDeleteLink = async (subjectPid: string) => {
    await fetch(`/api/instructors/${instructorPid}/subjects/${subjectPid}`, {
      method: "DELETE",
    });
    setInstructorSubjects(
      instructorSubjects.filter((i) => i.pid !== subjectPid)
    );
  };

  return {
    instructorSubjects,
    handleCreateLink,
    handleDeleteLink,
  };
}
