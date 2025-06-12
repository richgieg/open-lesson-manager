import { CreateForm } from "./CreateForm";
import { SaveDeleteForm } from "./SaveDeleteForm";
import { useOrganizations } from "./useOrganizations";

export function OrganizationsPage() {
  const { organizations, handleCreate, handleSave, handleDelete } =
    useOrganizations();

  if (!organizations) {
    return <>Loading...</>;
  }

  return (
    <>
      {organizations.map((organization) => (
        <SaveDeleteForm
          key={organization.id}
          organization={organization}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
      <CreateForm onCreate={handleCreate} />
    </>
  );
}
