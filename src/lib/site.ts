/**
 * Dados que NÃO dependem de idioma: links, caminhos de arquivo, stack, status.
 * Todo texto traduzível vive em src/content/{pt,en}/.
 *
 * Só entram aqui informações confirmadas por Miguel — nada inventado.
 */

import type { Locale } from "@/lib/routes";

export const site = {
  name: "Miguel Farias",
  /**
   * Base de todo canonical, og:url e do sitemap. Defina NEXT_PUBLIC_SITE_URL
   * no painel da Vercel quando o domínio final existir — sem isso, tudo é
   * anunciado ao Google sob o fallback abaixo.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://miguelfarias.vercel.app",
  email: "miguelfariasb8@outlook.com",
  photo: "/images/miguel.webp",
  location: "Fortaleza, CE, Brasil",
} as const;

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/MiguelFariasDev",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/miguel-farias-6628b01bb/",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/miguelfariasdev",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/itsmiguelfariasdev",
  },
];

/** Currículo em PDF — um arquivo por idioma. */
export const resumeFiles: Record<Locale, string> = {
  pt: "/cv/curriculo-pt.pdf",
  en: "/cv/resume-en.pdf",
};

export type ProjectStatus = "shipped" | "in-progress" | "hackathon";

export type Project = {
  id: string;
  status: ProjectStatus;
  featured: boolean;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  /** Prints do sistema. Miguel vai enviar depois — por isso está vazio. */
  images: string[];
};

export const projects: Project[] = [
  {
    id: "iustitia",
    status: "in-progress",
    featured: true,
    stack: [
      ".NET 10",
      "C#",
      "ASP.NET Core",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Swift",
      "Anthropic Claude",
      "Azure",
    ],
    repoUrl: "https://github.com/MiguelFariasDev/Iustitia",
    images: [],
  },
  {
    id: "sigis",
    status: "hackathon",
    featured: true,
    stack: ["ASP.NET Core", ".NET", "React", "Flutter", "Dart", "PostgreSQL"],
    repoUrl: "https://github.com/MiguelFariasDev/SIGIS",
    images: [],
  },
  {
    id: "filesharing",
    status: "in-progress",
    featured: true,
    stack: [
      ".NET 10",
      "C#",
      "ASP.NET Core",
      "Blazor",
      "SignalR",
      "AWS S3",
      "JWT",
      "Clean Architecture",
    ],
    repoUrl: "https://github.com/MiguelFariasDev/FileSharing",
    images: [],
  },
];


export type ExperienceEntry = {
  id: string;
  kind: "work" | "teaching";
  stack: string[];
};

/** Trajetória. Os textos por idioma vivem em content/{pt,en}/sections.json. */
export const experience: ExperienceEntry[] = [
  {
    id: "akiyama",
    kind: "work",
    stack: ["Python", "Deep Learning", "Computer Vision", "Liveness Detection"],
  },
  {
    id: "fitbank",
    kind: "work",
    stack: [
      "C#",
      ".NET",
      "Angular",
      "SQL Server",
      "MongoDB",
      "Azure",
      "REST",
      "CI/CD",
    ],
  },
  { id: "ufc", kind: "teaching", stack: ["Algoritmos", "Estruturas de Dados"] },
  { id: "obi", kind: "teaching", stack: ["Java", "Algoritmos"] },
];
