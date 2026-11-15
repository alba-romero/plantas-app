"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

const texto = (valor) => valor?.toString().trim() || null;

function leerDatos(formData) {
  const familiaId = formData.get("familiaId");
  return {
    nombreComun: texto(formData.get("nombreComun")),
    nombreCientifico: texto(formData.get("nombreCientifico")),
    descripcion: texto(formData.get("descripcion")),
    riego: texto(formData.get("riego")),
    luz: texto(formData.get("luz")),
    familiaId: familiaId ? Number(familiaId) : null,
    etiquetaIds: formData.getAll("etiquetas").map(Number),
  };
}

export async function crearPlanta(formData) {
  const { etiquetaIds, ...datos } = leerDatos(formData);
  if (!datos.nombreComun) return;

  await prisma.planta.create({
    data: {
      ...datos,
      etiquetas: { connect: etiquetaIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/plantas");
  redirect("/plantas");
}

export async function editarPlanta(id, formData) {
  const { etiquetaIds, ...datos } = leerDatos(formData);
  if (!datos.nombreComun) return;

  await prisma.planta.update({
    where: { id },
    data: {
      ...datos,
      etiquetas: { set: etiquetaIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/plantas");
  redirect("/plantas");
}

export async function borrarPlanta(id) {
  await prisma.planta.delete({ where: { id } });
  revalidatePath("/plantas");
}