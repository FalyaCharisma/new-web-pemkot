import { Head, Link, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";
import { useEffect, useRef, useState } from "react";
import type { Berita, KategoriBerita } from "@/types/berita";

import { FaInstagram } from "react-icons/fa6";

import {
    Grid2x2,
    FileText,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { formatDate } from "@/Components/ui/date";
import Pagination from "@/Components/Pagination";

interface Props {
    berita: {
        data: Berita[];
        links: any[];
    };
    beritaEkslusif: Berita | null;
    kategoriBerita: KategoriBerita[];
    filters: any;
}

export default function Berita({
    berita,
    kategoriBerita,
    beritaEkslusif,
    filters,
}: Props) {
    const categories = [
        {
            id: "",
            nama: "Semua",
            icon: Grid2x2,
        },

        ...kategoriBerita.map((item) => ({
            id: item.id,
            nama: item.nama_kategori,
            icon: FileText,
        })),
    ];

    const scrollRef = useRef<HTMLDivElement>(null);

    const [selectedKategori, setSelectedKategori] = useState(
        filters.kategori ?? "",
    );

    const [search, setSearch] = useState(filters.search ?? "");

    useEffect(() => {
        setSearch(filters.search ?? "");

        setSelectedKategori(filters.kategori ?? "");
    }, [filters]);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -400,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 400,
            behavior: "smooth",
        });
    };

    const handleKategoriClick = (id: number | string) => {
        setSelectedKategori(id);

        router.get(
            route("berita"),

            {
                kategori: id,
                search: search,
                sort: filters.sort,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const [tanggalMulai, setTanggalMulai] = useState(
        filters.tanggal_mulai ?? "",
    );

    const [tanggalSelesai, setTanggalSelesai] = useState(
        filters.tanggal_selesai ?? "",
    );
    const handleFilterTanggal = () => {
        router.get(
            route("berita"),
            {
                search,
                kategori: selectedKategori,
                tanggal_mulai: tanggalMulai,
                tanggal_selesai: tanggalSelesai,
                sort: filters.sort,
            },
            {
                preserveScroll: true,
            },
        );
    };

    const handleReset = () => {
        setTanggalMulai("");
        setTanggalSelesai("");

        router.get(
            route("berita"),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <Head title="Berita" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Berita Kota Kediri"
                        breadcrumb="Berita & Pengumuman"
                        placeholder="Cari berita..."
                        description="Pusat informasi resmi Kota Kediri yang menyajikan berita terkini, agenda daerah, dan berbagai informasi publik untuk masyarakat."
                        searchValue={search}
                        onSearchChange={(value) => setSearch(value)}
                        onSearch={(keyword) => {
                            setSearch(keyword);
                            router.get(
                                route("berita"),
                                {
                                    search: keyword,
                                    kategori: selectedKategori,
                                    sort: filters.sort,
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
                        {/* BERITA */}
                        <div className="mb-8 rounded-3xl border bg-white p-6 shadow-sm">
                            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                                <div className="flex items-center justify-center">
                                    <h2 className="text-2xl font-bold text-primary">
                                        Kediri News
                                    </h2>
                                </div>

                                <div className="relative min-w-0">
                                    <button
                                        type="button"
                                        onClick={scrollLeft}
                                        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md transition hover:bg-slate-50"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={scrollRight}
                                        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md transition hover:bg-slate-50"
                                    >
                                        <ChevronRight size={18} />
                                    </button>

                                    <div
                                        ref={scrollRef}
                                        className="flex gap-4 overflow-x-auto scroll-smooth px-14 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                    >
                                        {categories.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() =>
                                                        handleKategoriClick(
                                                            item.id,
                                                        )
                                                    }
                                                    className={`flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl transition cursor-pointer ${
                                                        selectedKategori ==
                                                        item.id
                                                            ? "bg-primary text-white shadow-lg"
                                                            : "border bg-white text-slate-700 hover:border-primary hover:text-primary"
                                                    }`}
                                                >
                                                    <Icon size={28} />

                                                    <span className="mt-2 font-medium">
                                                        {item.nama}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                            {/* FILTER */}
                            <aside className="h-fit rounded-3xl border bg-white p-5">
                                <h3 className="font-bold">Filter Berita</h3>

                                <div className="mt-5 space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Dari Tanggal
                                        </label>

                                        <input
                                            type="date"
                                            value={tanggalMulai}
                                            onChange={(e) =>
                                                setTanggalMulai(e.target.value)
                                            }
                                            className="w-full rounded-xl border px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Sampai Tanggal
                                        </label>

                                        <input
                                            type="date"
                                            value={tanggalSelesai}
                                            onChange={(e) =>
                                                setTanggalSelesai(
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border px-3 py-2"
                                        />
                                    </div>

                                    <button
                                        onClick={handleFilterTanggal}
                                        className="w-full rounded-xl bg-primary py-3 font-semibold text-white"
                                    >
                                        Terapkan Filter
                                    </button>

                                    <button
                                        onClick={handleReset}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border py-3"
                                    >
                                        <RotateCcw size={16} />
                                        Reset Filter
                                    </button>
                                </div>
                            </aside>

                            {/* LIST BERITA */}
                            <div className="space-y-6">
                                {/* GRID BERITA */}
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                                    {berita.data.map((item: Berita) => (
                                        <article
                                            key={item.id}
                                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                                        >
                                            <img
                                                src={
                                                    item.images?.startsWith(
                                                        "http",
                                                    )
                                                        ? item.images
                                                        : `/storage/berita/${item.images}`
                                                }
                                                alt={item.judul}
                                                className="h-40 w-full object-cover"
                                            />

                                            <div className="p-4">
                                                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                                                    {item.kategori
                                                        ?.nama_kategori ||
                                                        "Berita"}
                                                </span>

                                                <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug">
                                                    {item.judul}
                                                </h3>

                                                <p className="mt-2 text-xs text-slate-500">
                                                    {formatDate(item.tanggal)}
                                                </p>

                                                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                                                    {item.deskripsi.replace(
                                                        /<[^>]*>/g,
                                                        "",
                                                    )}
                                                </p>

                                                <Link
                                                    href={route(
                                                        "berita.show",
                                                        item.slug,
                                                    )}
                                                    className="mt-3 inline-flex text-sm font-semibold text-primary"
                                                >
                                                    Baca Selengkapnya →
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Pagination links={berita.links} />
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <ContentCTA
                            icon={<FaInstagram size={24} />}
                            title="Ikuti Informasi Terkini Kota Kediri"
                            description="Dapatkan update kegiatan, program pemerintah, pengumuman, dan berbagai informasi terbaru melalui Instagram resmi Pemerintah Kota Kediri."
                            buttonText="Kunjungi Instagram"
                            href="https://instagram.com/pemkotkediri"
                            external
                        />
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
