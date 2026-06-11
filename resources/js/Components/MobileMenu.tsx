import { Link } from "@inertiajs/react";

type MobileMenuProps = {
  icon: React.ReactNode;
  title: string;
  href: string;
};

export default function MobileMenu({
  icon,
  title,
  href,
}: MobileMenuProps) {
  return (
    <Link
      href={href}
      className="flex min-w-[100px] flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-lg"
    >
      <div className="text-amber-500">
        {icon}
      </div>

      <span className="text-center text-xs font-medium text-slate-700">
        {title}
      </span>
    </Link>
  );
}