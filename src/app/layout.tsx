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
    default: "Gromo, automatización e IA para pymes",
    template: "%s · Gromo",
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
    title: "Gromo, automatización e IA para pymes",
    description:
      "Te quito de encima el trabajo manual que no deja margen. Precio cerrado, resultado medible y el papeleo de la ayuda incluido.",
    images: [
      {
        url: "/brand/gromo-og.png",
        width: 1200,
        height: 630,
        alt: "Gromo — automatización e IA para pymes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gromo, automatización e IA para pymes",
    description:
      "Te quito de encima el trabajo manual que no deja margen. Precio cerrado, resultado medible y el papeleo de la ayuda incluido.",
    images: ["/brand/gromo-og.png"],
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
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-gromo-tinta focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-gromo-hueso"
        >
          Saltar al contenido
        </a>
        <GromoGradients />
        {children}
      </body>
    </html>
  );
}
