import { Payer } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function usePayers() {
  const router = useRouter();
  const [organizationPid, setOrganizationPid] = useState<string | null>(null);
  const [payers, setPayers] = useState<Payer[] | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setOrganizationPid(router.query.organizationPid as string);
    }
  }, [router]);

  useEffect(() => {
    if (!organizationPid) {
      return;
    }
    const fetchPayers = async () => {
      const response = await fetch(
        `/api/organizations/${organizationPid}/payers`
      );
      const data = await response.json();
      setPayers(data);
    };
    fetchPayers();
  }, [organizationPid]);

  if (!payers) {
    return {
      payers: null,
      handleCreate: null,
      handleSave: null,
      handleDelete: null,
    };
  }

  const handleCreate = async (name: string) => {
    const response = await fetch(
      `/api/organizations/${organizationPid}/payers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const data = await response.json();
    setPayers([...payers, data]);
  };

  const handleSave = async (payerPid: string, name: string) => {
    const response = await fetch(`/api/payers/${payerPid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setPayers(payers.map((i) => (i.pid === payerPid ? data : i)));
  };

  const handleDelete = async (payerPid: string) => {
    await fetch(`/api/payers/${payerPid}`, {
      method: "DELETE",
    });
    setPayers(payers.filter((i) => i.pid !== payerPid));
  };

  return {
    payers,
    handleCreate,
    handleSave,
    handleDelete,
  };
}
