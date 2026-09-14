import Link from "next/link";
import { cn } from "@/lib/utils";

type Variante = "primario" | "secundario" | "lima";

const ESTILOS: Record<Variante, string> = {
  primario:
    "bg-gromo-verde-oscuro text-white hover:bg-gromo-verde focus-visible:outline-gromo-verde",
  secundario:
    "border border-current/25 bg-transparent hover:border-current/50 focus-visible:outline-current",
  lima: "bg-gromo-lima text-gromo-tinta hover:brightness-95 focus-visible:outline-gromo-lima",
};

export function Boton({
  href,
  variante = "primario",
  className,
  children,
}: {
  href: string;
  variante?: Variante;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2",
        ESTILOS[variante],
        className,
      )}
    >
      {children}
    </Link>
  );
}
