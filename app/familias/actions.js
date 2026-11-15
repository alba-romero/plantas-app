"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

const texto = (valor) => valor?.toString().trim() || null;

export async function crearFamilia(formData) {
  const nombre = texto(formData.get("nombre"));
  if (!nombre) return;

  await prisma.familia.create({
    data: { nombre, descripcion: texto(formData.get("descripcion")) },
  });

  revalidatePath("/familias");
  redirect("/familias");
}

export async function editarFamilia(id, formData) {
  const nombre = texto(formData.get("nombre"));
  if (!nombre) return;

  await prisma.familia.update({
    where: { id },
    data: { nombre, descripcion: texto(formData.get("descripcion")) },
  });

  revalidatePath("/familias");
  revalidatePath("/plantas");
  redirect("/familias");
}

export async function borrarFamilia(id) {
  await prisma.familia.delete({ where: { id } });
  revalidatePath("/familias");
  revalidatePath("/plantas");
}