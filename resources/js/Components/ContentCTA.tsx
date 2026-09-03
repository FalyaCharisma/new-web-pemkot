import { ArrowRight } from "lucide-react";

interface ContentCTAProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export function ContentCTA({
  title,
  description,
  buttonText,
  href,
  icon,
  external = false,
}: ContentCTAProps) {
  return (
    <section
      className="
        relative overflow-hidden rounded-xl
        bg-[linear-gradient(135deg,#154E5B_0%,#1D6573_50%,#2A7D8C_100%)]
        p-4 sm:p-5 text-white mt-8
      "
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
              {icon}
            </div>
          )}

          <div>
            <h3 className="text-base font-bold sm:text-lg">
              {title}
            </h3>

            <p className="mt-0.5 text-xs sm:text-sm text-white/80">
              {description}
            </p>
          </div>
        </div>

        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-white/90"
        >
          {buttonText}
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
