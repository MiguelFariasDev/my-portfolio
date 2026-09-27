import { socials } from "@/lib/site";

export function SiteFooter({
  name,
  builtWith,
  rights,
}: {
  name: string;
  builtWith: string;
  rights: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>
            © {year} {name}. {rights}
          </p>
          <p className="text-xs">{builtWith}</p>
        </div>

        <ul className="flex flex-wrap gap-4">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-brand inline-block transition-[color,transform] duration-150 ease-out active:scale-[0.96]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
