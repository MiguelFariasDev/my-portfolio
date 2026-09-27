import { cn } from "@/lib/utils";

/**
 * Aviso de conteúdo que ainda vai chegar (prints dos sistemas, por exemplo).
 * Some do site assim que o material entrar.
 */
export function PendingNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-muted-foreground rounded-lg border border-dashed px-4 py-3 text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <header className="mb-12 space-y-3">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="text-muted-foreground max-w-2xl text-base text-pretty">
            {subtitle}
          </p>
        ) : null}
      </header>
      {children}
    </div>
  );
}
