import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")
    ? process.env.NEXTAUTH_URL
    : "https://lblab.com.ar";

  const routes = [
    "",
    "/quienes-somos",
    "/servicios",
    "/indicaciones",
    "/resultados",
    "/prp",
    "/veterinaria",
    "/derivaciones",
    "/contacto",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
