import { Link } from "@inertiajs/react";

export default function SidebarMenu({
    menuList,
    activeSlug,
}: any) {
    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="space-y-2">
                {menuList.map((item: any) => (
                    <Link
                        key={item.slug}
                        href={route(
                            "tentang-kediri",
                            item.slug
                        )}
                        className={`
                            block rounded-xl px-4 py-3 transition
                            ${
                                activeSlug === item.slug
                                    ? "bg-primary text-white"
                                    : "hover:bg-slate-100"
                            }
                        `}
                    >
                        {item.nama}
                    </Link>
                ))}
            </div>
        </div>
    );
}