import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GromoGradients } from "@/components/brand/GromoLogo";
import { IntroGromo } from "@/components/brand/IntroGromo";
import { PanelIntro } from "@/components/brand/PanelIntro";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gromo.es"),
  title: {
    default: "Gromo · Automatización a medida para pymes",
    template: "%s · Gromo",
  },
  description:
    "Automatizo el trabajo que te come las horas: presupuestos, pedidos, documentación y reporting. A medida, con precio cerrado y una métrica antes y después. Las ayudas públicas a la digitalización cubren entre el 50 % y el 80 %.",
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
    title: "Gromo · Automatización a medida para pymes",
    description:
      "No voy a volumen: cojo un proyecto cada vez y lo llevo yo de principio a fin. Precio cerrado, resultado medible y el papeleo de la ayuda incluido.",
    images: [
      {
        url: "/brand/gromo-og.png",
        width: 1200,
        height: 630,
        alt: "Gromo — automatización a medida para pymes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gromo · Automatización a medida para pymes",
    description:
      "No voy a volumen: cojo un proyecto cada vez y lo llevo yo de principio a fin. Precio cerrado, resultado medible y el papeleo de la ayuda incluido.",
    images: ["/brand/gromo-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: el script en línea de abajo añade la clase
    // "gromo-intro-vista" al <html> antes de que React hidrate. Es un
    // desajuste deliberado (evita el parpadeo de la intro ya vista) y React
    // no debe avisar por él; solo afecta a este elemento.
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {/* Intro: se enseña una vez por pestaña y se puede saltar con un
            clic o un toque. Va en línea y al principio del cuerpo para que
            la decisión se tome antes de que el telón llegue a pintarse: con
            JavaScript desactivado la intro simplemente se ve entera, como
            antes. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){function saltar(e){var i=document.getElementById("gromo-intro");if(i&&i.contains(e.target))i.classList.add("gromo-intro--saltada");document.removeEventListener("pointerdown",saltar)}try{if(sessionStorage.getItem("gromo-intro")){document.documentElement.classList.add("gromo-intro-vista");return}sessionStorage.setItem("gromo-intro","1")}catch(e){}document.addEventListener("pointerdown",saltar)})()',
          }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-gromo-tinta focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-gromo-hueso"
        >
          Saltar al contenido
        </a>
        <GromoGradients />
        <IntroGromo />
        {/* Mesa de revisión de la intro: solo existe con `npm run dev`. */}
        {process.env.NODE_ENV === "development" && <PanelIntro />}
        {children}
      </body>
    </html>
  );
}
