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
  verification: {
    other: {
      "facebook-domain-verification": "ow8p66ihu7kb76mr4qx2up4dhmil9z",
    },
  },
};

import { Providers } from "@/components/Providers";
import LiaAssistant from "@/components/LiaAssistant";
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PKTH2X2B";

  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <GoogleTagManager gtmId={gtmId} />
      <body className="antialiased font-body">
        <Providers>
          {children}
          <LiaAssistant />
        </Providers>
      </body>
    </html>
  );
}
