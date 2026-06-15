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
      relative overflow-hidden rounded-2xl
      bg-[linear-gradient(135deg,#154E5B_0%,#1D6573_50%,#2A7D8C_100%)]
      p-6 text-white mt-10
    "
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              {icon}
            </div>
          )}

          <div>
            <h3 className="text-lg font-bold">{title}</h3>

            <p className="mt-1 text-sm text-white/80">
              {description}
            </p>
          </div>
        </div>

        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-primary"
        >
          {buttonText}
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}