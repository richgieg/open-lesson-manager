import { Organization } from "@/types";
import { useEffect, useState } from "react";

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[] | null>(
    null
  );

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await fetch("/api/organizations");
      const data = await response.json();
      setOrganizations(data);
    };
    fetchOrganizations();
  }, []);

  if (!organizations) {
    return {
      organizations: null,
      handleCreate: null,
      handleSave: null,
      handleDelete: null,
    };
  }

  const handleCreate = async (name: string) => {
    const response = await fetch("/api/organizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setOrganizations([...organizations, data]);
  };

  const handleSave = async (pid: string, name: string) => {
    const response = await fetch(`/api/organizations/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setOrganizations(organizations.map((i) => (i.pid === pid ? data : i)));
  };

  const handleDelete = async (pid: string) => {
    await fetch(`/api/organizations/${pid}`, {
      method: "DELETE",
    });
    setOrganizations(organizations.filter((i) => i.pid !== pid));
  };

  return {
    organizations,
    handleCreate,
    handleSave,
    handleDelete,
  };
}
