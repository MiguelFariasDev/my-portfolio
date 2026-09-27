import type { NextConfig } from "next";

/**
 * As pastas de rota em src/app/[lang]/ usam sempre o slug em inglês.
 * Os slugs em português (definidos em src/lib/routes.ts) chegam até elas por rewrite,
 * de modo que a URL exibida continua sendo /pt/sobre, /pt/projetos, etc.
 * Ao adicionar uma rota nova, atualize routeSlugs, os redirects e os rewrites juntos.
 */
const nextConfig: NextConfig = {
  /**
   * O rewrite abaixo faz `/pt/about` responder 200 com o mesmo conteúdo de
   * `/pt/sobre` — duas URLs indexáveis para a mesma página. O redirect resolve
   * isso mandando o slug em inglês para o canônico em português.
   *
   * Ordem no Next: redirects rodam antes dos rewrites, e o destino de um
   * rewrite é interno (não volta pela lista de redirects), então não há loop.
   */
  async redirects() {
    return [
      { source: "/pt/about", destination: "/pt/sobre", permanent: true },
      { source: "/pt/projects", destination: "/pt/projetos", permanent: true },
      { source: "/pt/resume", destination: "/pt/curriculo", permanent: true },
      { source: "/pt/contact", destination: "/pt/contato", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/pt/sobre", destination: "/pt/about" },
      { source: "/pt/projetos", destination: "/pt/projects" },
      { source: "/pt/curriculo", destination: "/pt/resume" },
      { source: "/pt/contato", destination: "/pt/contact" },
    ];
  },
};

export default nextConfig;
