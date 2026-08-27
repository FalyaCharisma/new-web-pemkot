import { Head, Link, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { useState, useRef } from "react";
import { ContentCTA } from "@/Components/ContentCTA";
import type { PesonaCard } from "@/types/unggulan";
import type { HighlightPesona } from "@/types/highlight-pesona";
import { Peta } from "@/types/peta";
import FloatingReport from "@/Components/site/Floating";
import * as LucideIcons from "lucide-react";

interface Props {
    pesona: PesonaCard[];
    kategori?: number;
    peta: Peta[];
    highlight: HighlightPesona;
}

export default function PesonaKediriIndex({ pesona, kategori, peta, highlight }: Props) {

    const icons = LucideIcons as unknown as Record<string, React.ElementType>;

    const [activeItinerary, setActiveItinerary] = useState(0);

    const active = peta[activeItinerary];
    const mapUrl = active
        ? `https://maps.google.com/maps?q=${active.lat},${active.lng}&z=15&output=embed`
        : "";

    const images =
        highlight.images?.map(
            (img) => `/storage/pesona/${img}`
        ) ?? [];
    
    const [selectedImage, setSelectedImage] = useState(images[0] ?? "");

    const containerRef = useRef<HTMLDivElement>(null);

    const scrollNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    };

    const scrollPrev = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    };

    const highlightItems = [
        {
            icon: highlight.highlight1_icon,
            title: highlight.highlight1_judul,
            description: highlight.highlight1_deskripsi,
        },
        {
            icon: highlight.highlight2_icon,
            title: highlight.highlight2_judul,
            description: highlight.highlight2_deskripsi,
        },
        {
            icon: highlight.highlight3_icon,
            title: highlight.highlight3_judul,
            description: highlight.highlight3_deskripsi,
        },
    ];

    return (
        <>
            <Head title="Pesona Kediri Raya" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Pesona Kediri Raya"
                        breadcrumb="Pesona Kediri Raya"
                        enableSearch={false}
                        description="Jelajahi kekayaan budaya, kuliner khas, ekonomi kreatif, dan berbagai warisan yang menjadi kebanggaan Kediri Raya."
                    />

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">
                                    Unggulan Pesona Kediri Raya
                                </h2>
                                <p className="mt-2 text-slate-500">
                                    Kenali lebih dekat berbagai budaya, kuliner,
                                    dan karya yang menjadi identitas Kediri
                                    Raya.
                                </p>
                            </div>
                        </div>

                        {/* Top Cards */}
                        <div className="relative">
                            {/* tombol kiri */}
                            <button
                                onClick={scrollPrev}
                                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary p-3 text-white shadow-lg transition hover:scale-105"
                            >
                                <LucideIcons.ChevronLeft className="h-5 w-5" />
                            </button>

                            {/* container scroll */}
                            <div
                                ref={containerRef}
                                className="flex gap-4 overflow-x-auto scroll-smooth px-10 no-scrollbar"
                            >
                                {pesona.map((item) => {
                                    const isPesona = item.type === "pesona";
                                    const isBerita = item.type === "berita";
                                    const isAgenda = item.type === "agenda";
                                    const isFasilitas = item.type === "fasilitas";

                                    const imageUrl = item.cover
                                        ? isPesona
                                            ? `/storage/pesona/${item.cover}`
                                            : isBerita
                                            ? `/storage/berita/${item.cover}`
                                            : `/storage/agenda/${item.cover}`
                                        : null;

                                    return (
                                        <div
                                            key={`${item.type}-${item.id}`}
                                            className="flex min-w-[250px] max-w-[250px] flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
                                        >
                                            {/* IMAGE */}
                                            <div className="h-40 w-full overflow-hidden bg-slate-100">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.judul ?? ""}
                                                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        {isAgenda ? (
                                                            <LucideIcons.CalendarDays className="h-12 w-12 text-slate-300" />
                                                        ) : isBerita ? (
                                                            <LucideIcons.Newspaper className="h-12 w-12 text-slate-300" />
                                                        ) : (
                                                            <LucideIcons.Image className="h-12 w-12 text-slate-300" />
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* CONTENT */}
                                            <div className="flex flex-1 flex-col p-4">
                                                {/* TIPE + KATEGORI */}
                                                <div className="flex flex-wrap gap-1">
                                                    <span className="inline-block rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
                                                        {isPesona
                                                            ? "Pesona"
                                                            : isBerita
                                                            ? "Berita"
                                                            : isAgenda
                                                                ? "Agenda"
                                                                : "Fasilitas"}
                                                    </span>

                                                    {item.kategori?.nama_kategori && (
                                                        <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                                                            {item.kategori.nama_kategori}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* JUDUL */}
                                                <h3 className="mt-3 line-clamp-2 font-bold text-slate-900">
                                                    {item.judul ||
                                                        (isAgenda
                                                            ? "Agenda Kediri"
                                                            : isBerita
                                                            ? "Berita Kediri"
                                                            : "Pesona Kediri")}
                                                </h3>

                                                {/* DESKRIPSI */}
                                                <p
                                                    className="mt-2 line-clamp-3 text-sm text-slate-500"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            item.deskripsi ||
                                                            "Informasi belum tersedia.",
                                                    }}
                                                />

                                                {/* LINK */}
                                                <div className="mt-auto pt-3">
                                                    <Link
                                                        href={
                                                            isPesona && item.id_kategori === 19
                                                                ? route("fasilitas-kota.show", item.slug)
                                                                : isPesona
                                                                ? route("pesona-unggulan.show", item.slug)
                                                                : isBerita
                                                                    ? route("berita.show", item.slug)
                                                                    : isAgenda
                                                                    ? route("agenda.show", item.id)
                                                                    : route("fasilitas-kota.show", item.slug)
                                                        }
                                                        className="inline-flex text-sm font-semibold text-primary"
                                                    >
                                                        {isAgenda
                                                            ? "Lihat Agenda →"
                                                            : isFasilitas
                                                            ? "Lihat Fasilitas →"
                                                            : "Baca Selengkapnya →"}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* tombol kanan */}
                            <button
                                onClick={scrollNext}
                                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary p-3 text-white shadow-lg transition hover:scale-105"
                            >
                                <LucideIcons.ChevronRight className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Featured Detail */}
                        {!kategori && (
                            <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm">
                                <div className="grid lg:grid-cols-2">
                                    {/* Left */}
                                    <div className="p-6">
                                        {/* Main Image */}
                                        <img
                                            src={selectedImage}
                                            className="h-[350px] w-full rounded-2xl object-cover"
                                            alt=""
                                        />

                                        {/* Thumbnail */}
                                        <div className="mt-4 flex gap-2">
                                            {images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        setSelectedImage(image)
                                                    }
                                                    className={`
                                    overflow-hidden rounded-lg border-2 transition-all duration-300
                                    ${
                                        selectedImage === image
                                            ? "border-primary scale-105"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                    }
                                    `}
                                                >
                                                    <img
                                                        src={image}
                                                        alt=""
                                                        className="h-16 w-20 object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right */}
                                    <div className="p-8">
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                            {highlight.kategori?.nama_kategori}
                                        </span>

                                        <h3 className="mt-4 text-4xl font-bold">
                                            {highlight.judul}
                                        </h3>

                                        <p className="mt-4 leading-relaxed text-slate-600">
                                            {highlight.deskripsi}
                                        </p>

                                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                                            {highlightItems.map((item, index) => {
                                                const Icon =
                                                    icons[item.icon as keyof typeof icons] ?? LucideIcons.Barrel;

                                                return (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl bg-slate-50 p-4"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-10 w-15 items-center justify-center rounded-lg bg-primary/10 p-2">
                                                                <Icon className="h-5 w-5 text-primary" />
                                                            </div>

                                                            <div>
                                                                <h4 className="font-semibold">
                                                                    {item.title}
                                                                </h4>

                                                                <p className="mt-1 text-sm text-slate-500">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="mt-8 rounded-2xl bg-primary p-6 text-white">
                                            <h4 className="text-xl font-bold">
                                                {highlight.cta_judul}
                                            </h4>

                                            <p className="mt-2 text-sm text-white/80">
                                                {highlight.cta_deskripsi}
                                            </p>

                                            <Link
                                                href={route("fasilitas-kota.index", {
                                                    kategori: highlight.cta_kategori,
                                                    search: highlight.cta_keyword,
                                                })}
                                                className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 font-medium text-primary"
                                            >
                                                {highlight.cta_button} →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* CTA Bottom */}
                        <ContentCTA
                            icon={<LucideIcons.MapPinned size={24} />}
                            title="Temukan lebih banyak pengalaman di Kota Kediri!"
                            description="Jelajahi destinasi, kuliner, budaya, dan berbagai fasilitas terbaik di Kediri Raya."
                            buttonText="Jelajahi Fasilitas Kota"
                            href={route("fasilitas-kota.index")}
                        />
                    </section>
                </main>
                <FloatingReport />
                <Footer />
            </div>
        </>
    );
}
