import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { borrarEtiqueta } from "./actions";
import BotonBorrar from "../plantas/BotonBorrar";

export const dynamic = "force-dynamic";

export default async function EtiquetasPage() {
  const etiquetas = await prisma.etiqueta.findMany({
    include: { _count: { select: { plantas: true } } },
    orderBy: { nombre: "asc" },
  });

  return (
    <main className="mx-auto max-w-3xl px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-bosque">
          Etiquetas
        </h1>
        <p className="mt-2 font-display text-xl italic text-bosque/70">
          Características de los ejemplares
        </p>
        <p className="my-4 text-laton">✦ ✦ ✦</p>
        <Link href="/etiquetas/nueva" className="btn-primario">
          + Nueva etiqueta
        </Link>
      </div>

      {etiquetas.length === 0 ? (
        <p className="text-center font-display text-xl italic text-bosque/60">
          Aún no hay etiquetas registradas.
        </p>
      ) : (
        <ul className="space-y-4">
          {etiquetas.map((etiqueta) => (
            <li
              key={etiqueta.id}
              className="flex flex-wrap items-center justify-between gap-4 border border-laton/60 bg-lamina p-5 shadow-sm"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold text-bosque">
                  {etiqueta.nombre}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-widest text-bosque/60">
                  {etiqueta._count.plantas}{" "}
                  {etiqueta._count.plantas === 1 ? "planta" : "plantas"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/etiquetas/${etiqueta.id}/editar`}
                  className="btn-secundario !px-3 !py-1 text-sm"
                >
                  Editar
                </Link>
                <BotonBorrar
                  accion={borrarEtiqueta.bind(null, etiqueta.id)}
                  mensaje="¿Seguro que quieres borrar esta etiqueta? Se quitará de todas las plantas que la tengan."
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}