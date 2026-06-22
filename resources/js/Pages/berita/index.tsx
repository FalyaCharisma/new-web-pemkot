import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";
import { useEffect, useRef } from "react";
import type { Berita, KategoriBerita } from "@/types/berita";

import { FaInstagram } from "react-icons/fa6";

import {
    Grid2x2,
    Calendar,
    FileText,
    Building2,
    ChartColumn,
    Info,
    HeartPulse,
    Gavel,
    Landmark,
    Trophy,
    GraduationCap,
    Megaphone,
    MapPinned,
    Award,
    ShoppingBag,
    Briefcase,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { formatDate } from "@/Components/ui/date";

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
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://widget.komdigi.go.id/gpr-widget-kominfo.min.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

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

    return (
        <>
            <Head title="Berita" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Berita Kota Kediri"
                        breadcrumb="Berita & Pengumuman"
                        placeholder="Cari informasi..."
                        description="Pusat informasi resmi Kota Kediri yang menyajikan berita terkini, agenda daerah, dan berbagai informasi publik untuk masyarakat."
                    />

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        {/* BERITA */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">
                                    Kategori Berita
                                </h2>
                            </div>
                        </div>
                        <div className="relative mb-7">
                            {/* Tombol kiri */}
                            <button
                                type="button"
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md hover:bg-slate-50"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {/* Tombol kanan */}
                            <button
                                type="button"
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md hover:bg-slate-50"
                            >
                                <ChevronRight size={18} />
                            </button>

                            {/* Scroll */}
                            <div
                                ref={scrollRef}
                                className="
                            flex gap-4
                            overflow-x-auto
                            scroll-smooth
                            px-14 pb-2
                            [-ms-overflow-style:none]
                            [scrollbar-width:none]
                            [&::-webkit-scrollbar]:hidden
                        "
                            >
                                {categories.map((category) => {
                                    const Icon = category.icon;

                                    return (
                                        <button
                                            key={category.id}
                                            className={`
                                        flex-shrink-0
                                        w-32
                                        h-24
                                        rounded-2xl
                                        border
                                        flex flex-col
                                        items-center
                                        justify-center
                                        gap-2
                                        transition
                                        hover:border-primary
                                        hover:bg-primary/5
                                        ${
                                            category.id === 0
                                                ? "bg-primary text-white border-primary"
                                                : "bg-white"
                                        }
                                    `}
                                        >
                                            <Icon size={22} />

                                            <span className="text-xs font-medium text-center">
                                                {category.nama}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                            {/* FILTER */}
                            <aside className="rounded-3xl border bg-white p-5 h-fit">
                                <h3 className="font-bold">Filter Berita</h3>

                                <div className="mt-5 space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Kategori
                                        </label>

                                        <select className="w-full rounded-xl border px-3 py-2">
                                            <option>Semua Kategori</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Tanggal
                                        </label>

                                        <input
                                            type="date"
                                            className="w-full rounded-xl border px-3 py-2"
                                        />
                                    </div>

                                    <button className="w-full rounded-xl bg-primary py-3 font-semibold text-white">
                                        Terapkan Filter
                                    </button>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border py-3">
                                        <RotateCcw size={16} />
                                        Reset Filter
                                    </button>
                                </div>
                            </aside>

                            {/* LIST BERITA */}
                            <div className="space-y-6">
                                <article className="overflow-hidden rounded-2xl border bg-white">
                                    <div className="grid lg:grid-cols-[320px_1fr]">
                                        <img
                                            src={
                                                beritaEkslusif?.images?.startsWith(
                                                    "http",
                                                )
                                                    ? beritaEkslusif.images
                                                    : `/storage/${beritaEkslusif?.images}`
                                            }
                                            alt={beritaEkslusif?.judul}
                                            className="h-full w-full object-cover"
                                        />

                                        <div className="p-5">
                                            <p className="text-xs text-muted-foreground">
                                                <p>
                                                    {formatDate(
                                                        beritaEkslusif?.tanggal ||
                                                            "",
                                                    )}
                                                </p>
                                            </p>

                                            <h2 className="mt-2 text-2xl font-bold leading-tight">
                                                {beritaEkslusif?.judul}
                                            </h2>

                                            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                                                {beritaEkslusif?.deskripsi.replace(
                                                    /<[^>]*>/g,
                                                    "",
                                                )}
                                            </p>

                                            <Link
                                                href="#"
                                                className="mt-3 inline-flex text-sm font-semibold text-primary"
                                            >
                                                Baca Selengkapnya →
                                            </Link>
                                        </div>
                                    </div>
                                </article>

                                {/* GRID BERITA */}
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    {berita.data.map((item: Berita) => (

        <article
            key={item.id}
            className="
                overflow-hidden
                rounded-2xl
                border
                bg-white
                transition
                hover:shadow-md
            "
        >

            <img
                src={item.images?.startsWith("http") ? item.images : `/storage/berita/${item.images}`}
                alt={item.judul}
                className="h-40 w-full object-cover"
            />



            <div className="p-4">


                <span
                    className="
                        rounded-full
                        bg-primary/10
                        px-2.5 py-1
                        text-[11px]
                        font-medium
                        text-primary
                    "
                >
                    {item.kategori?.nama_kategori}
                </span>



                <h3
                    className="
                        mt-3
                        line-clamp-2
                        text-base
                        font-semibold
                        leading-snug
                    "
                >
                    {item.judul}
                </h3>



                <p className="mt-2 text-xs text-slate-500">
                    {formatDate(item.tanggal)}
                </p>



                <p
                    className="
                        mt-2
                        line-clamp-2
                        text-sm
                        text-slate-600
                    "
                >
                    {item.deskripsi.replace(/<[^>]*>/g, "")}
                </p>



                <Link
                    href={route(
                        'berita.show',
                        item.slug
                    )}
                    className="
                        mt-3
                        inline-flex
                        text-sm
                        font-semibold
                        text-primary
                    "
                >
                    Baca Selengkapnya →
                </Link>


            </div>

        </article>

    ))}

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
