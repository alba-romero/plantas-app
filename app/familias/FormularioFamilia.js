import Link from "next/link";

export default function FormularioFamilia({ action, familia }) {
  return (
    <form
      action={action}
      className="space-y-4 border border-laton/60 bg-lamina p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block font-medium">Nombre *</label>
        <input
          name="nombre"
          required
          defaultValue={familia?.nombre ?? ""}
          className="campo"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Descripción</label>
        <textarea
          name="descripcion"
          rows={4}
          defaultValue={familia?.descripcion ?? ""}
          className="campo"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primario">
          Guardar
        </button>
        <Link href="/familias" className="btn-secundario">
          Cancelar
        </Link>
      </div>
    </form>
  );
}