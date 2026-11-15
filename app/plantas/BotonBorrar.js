"use client";

export default function BotonBorrar({
  accion,
  mensaje = "¿Seguro que quieres borrar esta planta?",
}) {
  return (
    <form action={accion}>
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm(mensaje)) {
            e.preventDefault();
          }
        }}
        className="btn-peligro"
      >
        Borrar
      </button>
    </form>
  );
}