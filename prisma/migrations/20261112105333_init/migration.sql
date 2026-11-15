-- CreateTable
CREATE TABLE "Familia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Familia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planta" (
    "id" SERIAL NOT NULL,
    "nombreComun" TEXT NOT NULL,
    "nombreCientifico" TEXT,
    "descripcion" TEXT,
    "riego" TEXT,
    "luz" TEXT,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "familiaId" INTEGER,

    CONSTRAINT "Planta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etiqueta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Etiqueta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EtiquetaToPlanta" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EtiquetaToPlanta_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EtiquetaToPlanta_B_index" ON "_EtiquetaToPlanta"("B");

-- AddForeignKey
ALTER TABLE "Planta" ADD CONSTRAINT "Planta_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtiquetaToPlanta" ADD CONSTRAINT "_EtiquetaToPlanta_A_fkey" FOREIGN KEY ("A") REFERENCES "Etiqueta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtiquetaToPlanta" ADD CONSTRAINT "_EtiquetaToPlanta_B_fkey" FOREIGN KEY ("B") REFERENCES "Planta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
