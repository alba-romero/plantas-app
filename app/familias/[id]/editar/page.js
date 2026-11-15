import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { editarFamilia } from "../../actions";
import FormularioFamilia from "../../FormularioFamilia";

export const dynamic = "force-dynamic";

export default async function EditarFamiliaPage({ params }) {
  const { id } = await params;
  const idNumero = Number(id);
  if (Number.isNaN(idNumero)) notFound();

  const familia = await prisma.familia.findUnique({ where: { id: idNumero } });
  if (!familia) notFound();

  return (
    <main className="mx-auto max-w-xl px-8 py-10">
      <h1 className="mb-6 font-display text-4xl font-semibold text-bosque">
        Editar familia
      </h1>
      <FormularioFamilia
        action={editarFamilia.bind(null, familia.id)}
        familia={familia}
      />
    </main>
  );
}