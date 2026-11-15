import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { editarPlanta } from "../../actions";
import FormularioPlanta from "../../FormularioPlanta";

export const dynamic = "force-dynamic";

export default async function EditarPlantaPage({ params }) {
  const { id } = await params;
  const idNumero = Number(id);
  if (Number.isNaN(idNumero)) notFound();

  const planta = await prisma.planta.findUnique({
    where: { id: idNumero },
    include: { etiquetas: true },
  });
  if (!planta) notFound();

  const familias = await prisma.familia.findMany({ orderBy: { nombre: "asc" } });
  const etiquetas = await prisma.etiqueta.findMany({ orderBy: { nombre: "asc" } });

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Editar planta</h1>
      <FormularioPlanta
        action={editarPlanta.bind(null, planta.id)}
        planta={planta}
        familias={familias}
        etiquetas={etiquetas}
      />
    </main>
  );
}