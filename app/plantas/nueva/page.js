import { prisma } from "../../../lib/prisma";
import { crearPlanta } from "../actions";
import FormularioPlanta from "../FormularioPlanta";

export const dynamic = "force-dynamic";

export default async function NuevaPlantaPage() {
  const familias = await prisma.familia.findMany({ orderBy: { nombre: "asc" } });
  const etiquetas = await prisma.etiqueta.findMany({ orderBy: { nombre: "asc" } });

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Nueva planta</h1>
      <FormularioPlanta
        action={crearPlanta}
        familias={familias}
        etiquetas={etiquetas}
      />
    </main>
  );
}