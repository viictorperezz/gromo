import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GromoGradients } from "@/components/brand/GromoLogo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gromo.es"),
  title: {
    default: "Gromo — Automatización e IA para pymes",
    template: "%s — Gromo",
  },
  description:
    "Automatizo el proceso manual que más horas te come: presupuestos, pedidos, documentación, reporting. Precio cerrado, 60 horas tope y resultado medible. Las ayudas públicas a la digitalización cubren entre el 50 % y el 80 %.",
  keywords: [
    "automatización de procesos",
    "inteligencia artificial para pymes",
    "ayudas digitalización pymes",
    "automatizar presupuestos",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Gromo",
    title: "Gromo — Automatización e IA para pymes",
    description:
      "Te quito de encima el trabajo manual que no deja margen. Precio cerrado, resultado medible y el papeleo de la ayuda incluido.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <GromoGradients />
        {children}
      </body>
    </html>
  );
}
