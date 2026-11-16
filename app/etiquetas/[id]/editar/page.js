import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { editarEtiqueta } from "../../actions";
import FormularioEtiqueta from "../../FormularioEtiqueta";

export const dynamic = "force-dynamic";

export default async function EditarEtiquetaPage({ params }) {
  const { id } = await params;
  const idNumero = Number(id);
  if (Number.isNaN(idNumero)) notFound();

  const etiqueta = await prisma.etiqueta.findUnique({
    where: { id: idNumero },
  });
  if (!etiqueta) notFound();

  return (
    <main className="mx-auto max-w-xl px-8 py-10">
      <h1 className="mb-6 font-display text-4xl font-semibold text-bosque">
        Editar etiqueta
      </h1>
      <FormularioEtiqueta
        action={editarEtiqueta.bind(null, etiqueta.id)}
        etiqueta={etiqueta}
      />
    </main>
  );
}