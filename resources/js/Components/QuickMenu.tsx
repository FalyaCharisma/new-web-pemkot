import { Link } from "@inertiajs/react";

type QuickMenuProps = {
  icon: React.ReactNode;
  title: string;
  href: string;
};

export default function QuickMenu({
  icon,
  title,
  href,
}: QuickMenuProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-3 border-r border-slate-200 p-6 transition hover:bg-slate-50"
    >
      <div className="text-amber-500 transition group-hover:scale-110">
        {icon}
      </div>

      <span className="text-center text-sm font-medium text-slate-700">
        {title}
      </span>
    </Link>
  );
}