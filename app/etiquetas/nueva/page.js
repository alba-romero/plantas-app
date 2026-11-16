import { crearEtiqueta } from "../actions";
import FormularioEtiqueta from "../FormularioEtiqueta";

export default function NuevaEtiquetaPage() {
  return (
    <main className="mx-auto max-w-xl px-8 py-10">
      <h1 className="mb-6 font-display text-4xl font-semibold text-bosque">
        Nueva etiqueta
      </h1>
      <FormularioEtiqueta action={crearEtiqueta} />
    </main>
  );
}