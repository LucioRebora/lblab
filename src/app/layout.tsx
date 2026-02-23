import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "LB Lab – Laboratorio de Bioanálisis",
  description: "Resultados confiables, tecnología y compromiso con tu salud. Análisis clínicos en Gualeguaychú.",
  keywords: ["laboratorio de bioanálisis", "análisis clínicos", "salud", "Gualeguaychú", "LB Lab"],
  icons: {
    icon: "/img/favicon.ico",
  },
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
