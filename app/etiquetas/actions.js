"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

const texto = (valor) => valor?.toString().trim() || null;

export async function crearEtiqueta(formData) {
  const nombre = texto(formData.get("nombre"));
  if (!nombre) return;

  await prisma.etiqueta.create({ data: { nombre } });

  revalidatePath("/etiquetas");
  redirect("/etiquetas");
}

export async function editarEtiqueta(id, formData) {
  const nombre = texto(formData.get("nombre"));
  if (!nombre) return;

  await prisma.etiqueta.update({ where: { id }, data: { nombre } });

  revalidatePath("/etiquetas");
  revalidatePath("/plantas");
  redirect("/etiquetas");
}

export async function borrarEtiqueta(id) {
  await prisma.etiqueta.delete({ where: { id } });
  revalidatePath("/etiquetas");
  revalidatePath("/plantas");
}