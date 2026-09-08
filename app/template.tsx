import { PageTransition } from "@/components/layout/PageTransition";

/**
 * `template.tsx` (a diferencia de `layout.tsx`) se vuelve a montar en cada
 * navegación — es justo lo que necesita `PageTransition` para animar la
 * entrada de cada página sin `AnimatePresence` ni coordinar una salida. Ver
 * `PageTransition.tsx` para el porqué de este enfoque (D055/D056).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
