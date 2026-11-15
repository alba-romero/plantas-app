import { crearFamilia } from "../actions";
import FormularioFamilia from "../FormularioFamilia";

export default function NuevaFamiliaPage() {
  return (
    <main className="mx-auto max-w-xl px-8 py-10">
      <h1 className="mb-6 font-display text-4xl font-semibold text-bosque">
        Nueva familia
      </h1>
      <FormularioFamilia action={crearFamilia} />
    </main>
  );
}