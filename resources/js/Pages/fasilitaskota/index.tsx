import { Head, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { useRef, useState, useEffect } from "react";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KategoriFasilitas } from "@/types/kategori-fasilitas";
import type { SubKategoriFasilitas } from "@/types/subkategori-fasilitas";
import type { FasilitasKota } from "@/types/fasilitas";
import type { PaginationLink } from "@/types/paginationlink";
import Pagination from "@/Components/Pagination";
import FloatingReport from "@/Components/site/Floating";

interface Props {
    kategori: KategoriFasilitas[];
    subKategori: SubKategoriFasilitas[];

    fasilitas: {
        data: FasilitasKota[];
        links: PaginationLink[];
    };

    filters: {
        kategori: number | null;
        sub_kategori: number | null;
    };
}

export default function AkomodasiIndex({
    kategori,
    subKategori,
    fasilitas,
    filters,
}: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };

    const [selectedKategori, setSelectedKategori] = useState<number | null>(
        filters.kategori ?? kategori[0]?.id ?? null,
    );

    useEffect(() => {
        setSelectedKategori(filters.kategori ?? kategori[0]?.id ?? null);
    }, [filters.kategori, kategori]);

    const [selectedSubKategori, setSelectedSubKategori] = useState<number[]>(
        [],
    );

    const filteredSubKategori = subKategori.filter(
        (item) => item.kategori_id === selectedKategori,
    );

    const handleKategoriClick = (id: number) => {
        setSelectedKategori(id);
        setSelectedSubKategori([]);

        router.get(
            route("fasilitas-kota.index"),
            {
                kategori: id,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleSubKategoriChange = (id: number) => {
        let updated: number[];

        if (selectedSubKategori.includes(id)) {
            updated = selectedSubKategori.filter((i) => i !== id);
        } else {
            updated = [...selectedSubKategori, id];
        }

        setSelectedSubKategori(updated);

        router.get(
            route("fasilitas-kota.index"),
            {
                kategori: selectedKategori,
                sub_kategori: updated,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const [search, setSearch] = useState("");

    return (
        <>
            <Head title="Fasilitas Kota" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Fasilitas Kota"
                        breadcrumb="Fasilitas Kota"
                        placeholder="Cari fasilitas kota..."
                        description="Cari dan temukan berbagai fasilitas terbaik di Kota Kediri untuk kebutuhan perjalanan, aktivitas sehari-hari, maupun rekreasi Anda."
                        searchValue={search}
                        onSearchChange={(value) => setSearch(value)}
                        onSearch={(keyword) => {
                            router.get(
                                route("fasilitas-kota.index"),
                                {
                                    search: keyword,
                                    kategori: selectedKategori,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                },
                            );
                        }}
                    />

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        <div className="mb-8 rounded-3xl border bg-white p-6 shadow-sm">
                            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                                <div className="flex items-center justify-center">
                                    <h2 className="text-2xl font-bold text-primary">
                                        Kediri Hub
                                    </h2>
                                </div>
                                <div className="relative min-w-0">
                                    {/* Tombol kiri */}
                                    <button
                                        type="button"
                                        onClick={scrollLeft}
                                        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md transition hover:bg-slate-50"
                                    >
                                        <LucideIcons.ChevronLeft size={18} />
                                    </button>

                                    {/* Tombol kanan */}
                                    <button
                                        type="button"
                                        onClick={scrollRight}
                                        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md transition hover:bg-slate-50"
                                    >
                                        <LucideIcons.ChevronRight size={18} />
                                    </button>

                                    {/* Scroll Area */}
                                    <div
                                        ref={scrollRef}
                                        className="
                                  flex gap-4 overflow-x-auto scroll-smooth
                                  px-14 pb-2
                                  [-ms-overflow-style:none]
                                  [scrollbar-width:none]
                                  [&::-webkit-scrollbar]:hidden
                              "
                                    >
                                        {kategori.map((item, index) => {
                                            const Icon = LucideIcons[
                                                item.icon as keyof typeof LucideIcons
                                            ] as LucideIcon;

                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() =>
                                                        handleKategoriClick(
                                                            item.id,
                                                        )
                                                    }
                                                    className={`flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl transition cursor-pointer ${
                                                        selectedKategori ===
                                                        item.id
                                                            ? "bg-primary text-white shadow-lg"
                                                            : "border bg-white text-slate-700 hover:border-primary hover:text-primary"
                                                    }`}
                                                >
                                                    {Icon && <Icon size={28} />}

                                                    <span className="mt-2 font-medium">
                                                        {item.nama_kategori}
                                                    </span>

                                                    <span
                                                        className={`text-xs ${
                                                            index === 0
                                                                ? "text-white/80"
                                                                : "text-slate-500"
                                                        }`}
                                                    >
                                                        {item.fasilitas_count}{" "}
                                                        fasilitas
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                            {/* FILTER */}
                            <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-32">
                                <h2 className="mb-6 text-lg font-semibold">
                                    Filter Pencarian
                                </h2>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="mb-3 text-sm font-semibold text-slate-700">
                                            Kategori
                                        </h3>
                                        <div className="space-y-2">
                                            {filteredSubKategori.map((item) => (
                                                <label
                                                    key={item.id}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSubKategori.includes(
                                                            item.id,
                                                        )}
                                                        onChange={() =>
                                                            handleSubKategoriChange(
                                                                item.id,
                                                            )
                                                        }
                                                    />

                                                    {item.nama_sub}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button className="w-full rounded-xl bg-primary py-3 font-medium text-white">
                                        Terapkan Filter
                                    </button>
                                </div>
                            </aside>

                            {/* LIST */}
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                                {fasilitas.data.length > 0 ? (
                                    fasilitas.data.map((item) => (
                                        <article
                                            key={item.id}
                                            className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={
                                                        item.foto
                                                            ? `/storage/fasilitas/${item.foto}`
                                                            : "https://placehold.co/800x500"
                                                    }
                                                    alt={item.nama}
                                                    className="h-40 w-full object-cover"
                                                />

                                                <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-xs font-medium text-white">
                                                    {
                                                        item.sub_kategori
                                                            ?.nama_sub
                                                    }
                                                </span>
                                            </div>

                                            <div className="p-4">
                                                {/* Nama */}
                                                <h3 className="line-clamp-1 font-semibold text-slate-900">
                                                    {item.nama}
                                                </h3>

                                                {/* Rating */}
                                                <div className="mt-2 flex items-center gap-1 text-sm">
                                                    <LucideIcons.Star
                                                        size={15}
                                                        className="fill-yellow-400 text-yellow-400"
                                                    />

                                                    <span className="font-medium">
                                                        {item.rating}
                                                    </span>

                                                    <span className="text-slate-500">
                                                        ({item.rating} ulasan)
                                                    </span>
                                                </div>

                                                {/* Alamat */}
                                                <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                                                    <LucideIcons.MapPin
                                                        size={15}
                                                        className="mt-0.5 shrink-0"
                                                    />

                                                    <span className="line-clamp-2">
                                                        {item.alamat}
                                                    </span>
                                                </div>

                                                {/* Telepon */}
                                                <div className="mt-2 flex items-center gap-2 text-sm">
                                                    <LucideIcons.Phone
                                                        size={15}
                                                        className="text-primary"
                                                    />

                                                    <span className="font-medium text-slate-700">
                                                        {item.telp}
                                                    </span>
                                                </div>

                                                {/* Tombol Maps */}
                                                <a
                                                    href={item.map}
                                                    target="_blank"
                                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                                                >
                                                    <LucideIcons.MapPin
                                                        size={16}
                                                    />
                                                    Lihat Lokasi
                                                </a>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-slate-500">
                                        Data belum tersedia
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Pagination links={fasilitas.links} />
                        </div>
                        {/* CTA */}
                        <ContentCTA
                            icon={<LucideIcons.PlayCircle size={24} />}
                            title="Butuh inspirasi untuk menjelajahi Kediri Raya?"
                            description="Saksikan video destinasi wisata, kuliner khas, budaya lokal,
                          dan berbagai pengalaman menarik dari Kediri Raya."
                            buttonText="Tonton Inspirasi Kediri"
                            href="https://www.youtube.com/results?search_query=wisata+kediri"
                            external
                        />
                    </section>
                </main>
<FloatingReport />
                <Footer />
            </div>
        </>
    );
}
