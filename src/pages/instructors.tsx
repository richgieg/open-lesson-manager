import { Instructor } from "@/types";
import { useEffect, useState } from "react";

export default function Instructors() {
  const [instructors, setInstructors] = useState<Instructor[] | null>();

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

  return (
    <>
      {instructors.map((instructor) => (
        <div key={instructor.id}>{instructor.name}</div>
      ))}
    </>
  );
}
