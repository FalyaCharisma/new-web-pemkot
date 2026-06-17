import { Link } from "@inertiajs/react";

interface SidebarItem {
    nama: string;
    slug: string;
}

interface Props {
    title: string;
    items: SidebarItem[];
    activeSlug: string;
    baseUrl: string;
}

export default function SidebarItem({
    title,
    items,
    activeSlug,
    baseUrl,
}: Props) {
    return (
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">
                {title}
            </h3>

            <div className="mb-4 h-1 w-12 rounded-full bg-[#D8A21D]" />

            <div className="space-y-1">
                {items.map((item) => (
                    <Link
                        key={item.slug}
                        href={`${baseUrl}/${item.slug}`}
                        className={`block rounded-xl px-4 py-3 transition ${
                            item.slug === activeSlug
                                ? "bg-primary text-white"
                                : "hover:bg-slate-100"
                        }`}
                    >
                        {item.nama}
                    </Link>
                ))}
            </div>
        </div>
    );
}