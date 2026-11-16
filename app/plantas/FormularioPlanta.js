import Link from "next/link";

const campo =
  "w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2";

export default function FormularioPlanta({ action, planta, familias, etiquetas }) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="mb-1 block font-medium">Nombre común *</label>
        <input
          name="nombreComun"
          required
          defaultValue={planta?.nombreComun ?? ""}
          className={campo}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Nombre científico</label>
        <input
          name="nombreCientifico"
          defaultValue={planta?.nombreCientifico ?? ""}
          className={campo}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Descripción</label>
        <textarea
          name="descripcion"
          rows={3}
          defaultValue={planta?.descripcion ?? ""}
          className={campo}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block font-medium">Riego</label>
          <select name="riego" defaultValue={planta?.riego ?? ""} className={campo}>
            <option value="">—</option>
            <option>Poco</option>
            <option>Moderado</option>
            <option>Abundante</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block font-medium">Luz</label>
          <select name="luz" defaultValue={planta?.luz ?? ""} className={campo}>
            <option value="">—</option>
            <option>Sombra</option>
            <option>Semisombra</option>
            <option>Luz indirecta</option>
            <option>Sol directo</option>
          </select>
        </div>
      </div>
      <div>
  <label className="mb-1 block font-medium">Foto</label>
  {planta?.foto && (
    <div className="mb-2 flex items-center gap-4">
      <img
        src={planta.foto}
        alt={planta.nombreComun}
        className="h-24 w-24 border border-laton/60 object-cover"
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="quitarFoto" className="accent-bosque" />
        Quitar foto actual
      </label>
    </div>
  )}
  <input
    type="file"
    name="foto"
    accept="image/*"
    className="campo file:mr-3 file:border-0 file:bg-salvia-claro file:px-3 file:py-1 file:text-bosque"
  />
</div>

      <div>
        <label className="mb-1 block font-medium">Familia</label>
        <select
          name="familiaId"
          defaultValue={planta?.familiaId ?? ""}
          className={campo}
        >
          <option value="">Sin familia</option>
          {familias.map((familia) => (
            <option key={familia.id} value={familia.id}>
              {familia.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-1 font-medium">Etiquetas</p>
        <div className="flex flex-wrap gap-4">
          {etiquetas.map((etiqueta) => (
            <label key={etiqueta.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="etiquetas"
                value={etiqueta.id}
                defaultChecked={planta?.etiquetas?.some((e) => e.id === etiqueta.id)}
              />
              {etiqueta.nombre}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
        >
          Guardar
        </button>
        <Link href="/plantas" className="rounded-lg border border-gray-300 px-4 py-2">
          Cancelar
        </Link>
      </div>
    </form>
  );
}