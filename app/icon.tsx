import { ImageResponse } from "next/og";

/**
 * Favicon generado (fase QA — SEO) — complementa el `favicon.ico` heredado
 * con una versión nítida para pestañas y resultados de búsqueda. Marca
 * naranja sobre navy, coherente con el logo del sitio. Placeholder hasta un
 * ícono de marca definitivo (CONTENT_CHECKLIST.md).
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101B45",
          borderRadius: 14,
        }}
      >
        <div style={{ width: 30, height: 30, borderRadius: 7, background: "#F9750D" }} />
      </div>
    ),
    size,
  );
}
