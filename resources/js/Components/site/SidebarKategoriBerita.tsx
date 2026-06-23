import { Link } from "@inertiajs/react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Kategori } from "@/types/kategori";

interface Props {
    kategoriBerita: Kategori[];
    title?: string;
}

function getKategoriIcon(icon?: string | null): LucideIcon {
    if (!icon) {
        return LucideIcons.Tag;
    }

    return (
        LucideIcons[icon as keyof typeof LucideIcons] ?? LucideIcons.Tag
    ) as LucideIcon;
}

export default function SidebarKategoriBerita({
    kategoriBerita,
    title = "Kategori Berita",
}: Props) {
    return (
        <div className="rounded-3xl border bg-white p-5">
            <h3 className="font-bold">
                {title}
            </h3>

            <div className="space-y-1">
                {kategoriBerita.map((item) => {
                    const Icon = getKategoriIcon(item.icon);

                    return (
                        <Link
                            key={item.id}
                            href={route("berita", { kategori: item.id })}
                            className="
                                flex w-full items-center gap-3
                                rounded-xl px-3 py-2
                                text-sm
                                cursor-pointer
                                transition-all duration-200
                                hover:bg-primary
                                hover:text-white
                                hover:shadow-sm
                            "
                        >
                            <Icon size={16} />
                            <span>{item.nama_kategori}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
