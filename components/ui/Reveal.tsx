"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
}

/**
 * Animación de entrada al hacer scroll (fase 07, integrada a partir de la
 * Dirección A del comparador de "ritmo visual" — /design) — fade + slide-up
 * corto, disparado una sola vez cuando el bloque entra en viewport.
 *
 * Se usa para envolver el heading y el contenido principal de cada sección
 * de Home (grid de cards, timeline, mosaico de Agenda, etc.), con un
 * `delay` leve entre ambos para que el heading aparezca primero y el
 * contenido lo siga — mismo timing (0.7s, curva suave) que se mostró en el
 * comparador. No se aplica a `Hero.tsx` (que ya tiene su propia animación
 * de entrada por slide) ni a `PhotoAnchorBand.tsx` (que usa parallax en vez
 * de reveal).
 */
export function Reveal({ children, delay = 0, y = 18 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
