import { Link } from "@inertiajs/react";

interface Props {
    kategoriList: any[];
    activeSlug: string;
}

export default function SidebarKategori({
    kategoriList,
    activeSlug,
}: Props) {
    return (
        <div className="bg-white p-6 shadow-sm border rounded-lg p-6 bg-white shadow">
            <h3 className="font-bold text-lg mb-4">
                Struktur Organisasi
            </h3>
            <div className="w-12 h-1 bg-[#D8A21D] mt-4 mb-6 rounded-full" />

            <div className="">
                {kategoriList.map((item) => (
                    <Link
                        key={item.id}
                        href={`/perangkat-daerah/${item.slug}`}
                        className={`
                            block rounded-xl px-4 py-3
                            transition
                            ${
                                item.slug === activeSlug
                                    ? "bg-emerald-900 text-white"
                                    : "hover:bg-gray-100"
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