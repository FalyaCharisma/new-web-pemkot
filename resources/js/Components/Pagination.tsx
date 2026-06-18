import { Link } from "@inertiajs/react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    links: PaginationLink[];
}

export default function Pagination({ links }: Props) {
    if (links.length <= 3) return null;

    return (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? "#"}
                    preserveScroll
                    preserveState
                    className={`
                        min-w-10 rounded-xl border px-4 py-2 text-sm transition
                        ${
                            link.active
                                ? "border-primary bg-primary text-white"
                                : "bg-white hover:bg-slate-50"
                        }
                        ${!link.url && "pointer-events-none opacity-50"}
                    `}
                    dangerouslySetInnerHTML={{
                        __html: link.label,
                    }}
                />
            ))}
        </div>
    );
}