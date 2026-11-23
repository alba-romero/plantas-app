export default function manifest() {
  return {
    name: "Salón Botánico",
    short_name: "Botánico",
    description: "Catálogo de plantas de interior y exterior",
    start_url: "/plantas",
    scope: "/",
    display: "standalone",
    background_color: "#f5f0e1",
    theme_color: "#1f3d2e",
    lang: "es",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}