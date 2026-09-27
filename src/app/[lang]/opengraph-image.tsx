import { ImageResponse } from "next/og";

import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/routes";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const alt = site.name;

/**
 * Card de preview para LinkedIn, WhatsApp e X. Gerado no build a partir do
 * mesmo conteúdo das páginas, então nunca fica dessincronizado da cópia.
 *
 * Usa a paleta do tema escuro e o accent do sistema. Sem fonte customizada de
 * propósito: buscar Geist no build adicionaria uma dependência de rede.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "pt";
  const { pages } = getDictionary(locale);

  const background = "#0a0a0a";
  const foreground = "#fafafa";
  const muted = "#a1a1a1";
  const brand = "#59aaf8";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background,
        color: foreground,
        padding: "80px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "4px",
              background: brand,
              borderRadius: "2px",
            }}
          />
          <div style={{ fontSize: 26, color: brand, letterSpacing: "0.04em" }}>
            {pages.home.role}
          </div>
        </div>

        <div
          style={{
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: muted,
            lineHeight: 1.4,
            maxWidth: "900px",
          }}
        >
          {pages.home.eyebrow}
        </div>
        <div style={{ fontSize: 24, color: muted }}>{site.location}</div>
      </div>
    </div>,
    size,
  );
}
