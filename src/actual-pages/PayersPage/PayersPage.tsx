import { CreateForm } from "./CreateForm";
import { SaveDeleteForm } from "./SaveDeleteForm";
import { usePayers } from "./usePayers";

export function PayersPage() {
  const { payers, handleCreate, handleSave, handleDelete } = usePayers();

  if (!payers) {
    return <>Loading...</>;
  }

  return (
    <>
      {payers.map((payer) => (
        <SaveDeleteForm
          key={payer.id}
          payer={payer}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
      <CreateForm onCreate={handleCreate} />
    </>
  );
}
