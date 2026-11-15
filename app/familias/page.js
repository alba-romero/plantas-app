import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { borrarFamilia } from "./actions";
import BotonBorrar from "../plantas/BotonBorrar";

export const dynamic = "force-dynamic";

export default async function FamiliasPage() {
  const familias = await prisma.familia.findMany({
    include: { _count: { select: { plantas: true } } },
    orderBy: { nombre: "asc" },
  });

  return (
    <main className="mx-auto max-w-3xl px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-bosque">
          Familias botánicas
        </h1>
        <p className="mt-2 font-display text-xl italic text-bosque/70">
          Clasificación de los ejemplares
        </p>
        <p className="my-4 text-laton">✦ ✦ ✦</p>
        <Link href="/familias/nueva" className="btn-primario">
          + Nueva familia
        </Link>
      </div>

      {familias.length === 0 ? (
        <p className="text-center font-display text-xl italic text-bosque/60">
          Aún no hay familias registradas.
        </p>
      ) : (
        <ul className="space-y-4">
          {familias.map((familia) => (
            <li
              key={familia.id}
              className="flex flex-wrap items-center justify-between gap-4 border border-laton/60 bg-lamina p-5 shadow-sm"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold text-bosque">
                  {familia.nombre}
                </h2>
                {familia.descripcion && (
                  <p className="mt-1 text-sm text-tinta/70">
                    {familia.descripcion}
                  </p>
                )}
                <p className="mt-2 text-xs uppercase tracking-widest text-bosque/60">
                  {familia._count.plantas}{" "}
                  {familia._count.plantas === 1 ? "planta" : "plantas"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/familias/${familia.id}/editar`}
                  className="btn-secundario !px-3 !py-1 text-sm"
                >
                  Editar
                </Link>
                <BotonBorrar
                  accion={borrarFamilia.bind(null, familia.id)}
                  mensaje="¿Seguro que quieres borrar esta familia? Sus plantas se quedarán sin familia."
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}