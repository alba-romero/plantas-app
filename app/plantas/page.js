import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { borrarPlanta } from "./actions";
import BotonBorrar from "./BotonBorrar";

export const dynamic = "force-dynamic";

export default async function PlantasPage() {
  const plantas = await prisma.planta.findMany({
    include: { familia: true, etiquetas: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-5xl px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-bosque">
          Colección de plantas
        </h1>
        <p className="mt-2 font-display text-xl italic text-bosque/70">
          Ejemplares del invernadero
        </p>
        <p className="my-4 text-laton">✦ ✦ ✦</p>
        <Link href="/plantas/nueva" className="btn-primario">
          + Nueva planta
        </Link>
      </div>

      {plantas.length === 0 ? (
        <p className="text-center font-display text-xl italic text-bosque/60">
          El invernadero está vacío: añade tu primera planta.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plantas.map((planta) => (
            <li
              key={planta.id}
              className="border border-laton/60 bg-lamina p-3 shadow-md"
            >
              <div className="border border-bosque/15 p-3">
                <div className="mb-3 flex aspect-[4/3] items-center justify-center overflow-hidden bg-salvia-claro">
                  {planta.foto ? (
                    <img
                      src={planta.foto}
                      alt={planta.nombreComun}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl opacity-60">🪴</span>
                  )}
                </div>

                <h2 className="font-display text-2xl font-semibold text-bosque">
                  {planta.nombreComun}
                </h2>
                {planta.nombreCientifico && (
                  <p className="font-display text-lg italic text-bosque/70">
                    {planta.nombreCientifico}
                  </p>
                )}

                <hr className="my-3 border-laton/40" />

                {planta.familia && (
                  <p className="text-sm">
                    <span className="uppercase tracking-widest text-bosque/60">
                      Familia
                    </span>{" "}
                    <span className="font-medium">{planta.familia.nombre}</span>
                  </p>
                )}
                <p className="mt-1 text-sm text-tinta/70">
                  Riego: {planta.riego ?? "—"} · Luz: {planta.luz ?? "—"}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {planta.etiquetas.map((etiqueta) => (
                    <span key={etiqueta.id} className="etiqueta">
                      {etiqueta.nombre}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href={`/plantas/${planta.id}/editar`}
                    className="btn-secundario !px-3 !py-1 text-sm"
                  >
                    Editar
                  </Link>
                  <BotonBorrar accion={borrarPlanta.bind(null, planta.id)} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
