import { Subject } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useAvailableSubjects() {
  const router = useRouter();
  const [instructorPid, setInstructorPid] = useState<string | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[] | null>(
    null
  );

  useEffect(() => {
    if (router.isReady) {
      setInstructorPid(router.query.pid as string);
    }
  }, [router]);

  useEffect(() => {
    if (!instructorPid) {
      return;
    }
    const fetchAvailableSubjects = async () => {
      const response = await fetch(
        `/api/instructors/${instructorPid}/available-subjects`
      );
      const data = await response.json();
      setAvailableSubjects(data);
    };
    fetchAvailableSubjects();
  }, [instructorPid]);

  return availableSubjects;
}
