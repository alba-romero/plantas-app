import { Cormorant_Garamond, Karla } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import RegistrarSW from "./RegistrarSW";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

export const metadata = {
  title: "Salón Botánico",
  description: "Catálogo de plantas de interior y exterior",
};

export const viewport = {
  themeColor: "#1f3d2e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${karla.variable}`}>
      <body className="min-h-screen antialiased">
        <RegistrarSW />
        <header className="border-b-4 border-double border-laton bg-bosque text-papel">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-5">
            <Link
              href="/plantas"
              className="font-display text-3xl font-semibold tracking-wide"
            >
              🌿 Salón Botánico
            </Link>
            <nav className="flex gap-6 text-sm uppercase tracking-widest">
              <Link href="/plantas" className="hover:text-laton">
                Plantas
              </Link>
              <Link href="/familias" className="hover:text-laton">
  Familias
</Link>
<Link href="/etiquetas" className="hover:text-laton">
  Etiquetas
</Link>
            </nav>
            
          </div>
        </header>

        {children}

        <footer className="mt-16 border-t border-laton/50 py-8 text-center font-display text-lg italic text-bosque/70">
          ✦ Salón Botánico · Catálogo del invernadero ✦
        </footer>
      </body>
    </html>
  );
}