"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
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

async function subirFoto(archivo) {
  if (!archivo || typeof archivo === "string" || archivo.size === 0) {
    return null;
  }
  if (!archivo.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen");
  }
  if (archivo.size > 4 * 1024 * 1024) {
    throw new Error("La imagen no puede superar los 4 MB");
  }

  const blob = await put(`plantas/${archivo.name}`, archivo, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

async function borrarFoto(url) {
  if (url && url.includes("blob.vercel-storage.com")) {
    await del(url);
  }
}

export async function crearPlanta(formData) {
  const { etiquetaIds, ...datos } = leerDatos(formData);
  if (!datos.nombreComun) return;

  const foto = await subirFoto(formData.get("foto"));

  await prisma.planta.create({
    data: {
      ...datos,
      foto,
      etiquetas: { connect: etiquetaIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/plantas");
  redirect("/plantas");
}

export async function editarPlanta(id, formData) {
  const { etiquetaIds, ...datos } = leerDatos(formData);
  if (!datos.nombreComun) return;

  const actual = await prisma.planta.findUnique({
    where: { id },
    select: { foto: true },
  });

  const nuevaFoto = await subirFoto(formData.get("foto"));
  const quitarFoto = formData.get("quitarFoto") === "on";

  let foto = actual?.foto ?? null;
  if (nuevaFoto) foto = nuevaFoto;
  else if (quitarFoto) foto = null;

  await prisma.planta.update({
    where: { id },
    data: {
      ...datos,
      foto,
      etiquetas: { set: etiquetaIds.map((id) => ({ id })) },
    },
  });

  if (actual?.foto && actual.foto !== foto) {
    await borrarFoto(actual.foto);
  }

  revalidatePath("/plantas");
  redirect("/plantas");
}

export async function borrarPlanta(id) {
  const planta = await prisma.planta.findUnique({
    where: { id },
    select: { foto: true },
  });

  await prisma.planta.delete({ where: { id } });
  await borrarFoto(planta?.foto);

  revalidatePath("/plantas");
}