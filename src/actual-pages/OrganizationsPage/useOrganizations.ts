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

  const handleSave = async (organizationPid: string, name: string) => {
    const response = await fetch(`/api/organizations/${organizationPid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setOrganizations(
      organizations.map((i) => (i.pid === organizationPid ? data : i))
    );
  };

  const handleDelete = async (organizationPid: string) => {
    await fetch(`/api/organizations/${organizationPid}`, {
      method: "DELETE",
    });
    setOrganizations(organizations.filter((i) => i.pid !== organizationPid));
  };

  return {
    organizations,
    handleCreate,
    handleSave,
    handleDelete,
  };
}
