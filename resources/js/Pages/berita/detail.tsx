import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { Home, ChevronRight } from "lucide-react";
import { ContentCTA } from "@/Components/ContentCTA";

import {
    FaInstagram,
    FaFacebookF,
    FaXTwitter,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa6";

import {
    CalendarDays,
    Building2,
    Eye,
    Link2,
    Grid2x2,
    Calendar,
    FileText,
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
    Sparkles,
    ArrowLeft,
} from "lucide-react";

const categories = [
    { name: "Semua", icon: Grid2x2 },
    { name: "Agenda", icon: Calendar },
    { name: "Artikel", icon: FileText },
    { name: "Berita SKPD", icon: Building2 },
    { name: "Ekonomi", icon: ChartColumn },
    { name: "Informasi", icon: Info },
    { name: "Kesehatan", icon: HeartPulse },
    { name: "Lelang", icon: Gavel },
    { name: "Pemerintah", icon: Landmark },
    { name: "Pemuda & Olahraga", icon: Trophy },
    { name: "Pendidikan", icon: GraduationCap },
    { name: "Pengumuman", icon: Megaphone },
    { name: "Potensi", icon: MapPinned },
    { name: "Prestasi", icon: Award },
    { name: "Produk Unggulan", icon: ShoppingBag },
    { name: "Tenaga Kerja", icon: Briefcase },
];
import type { Berita } from "@/types/berita";
import { formatDate } from "@/Components/ui/date";

interface Props {
    berita: Berita;
    beritaTerbaru: Berita[];
}
export default function DetailBerita({ berita, beritaTerbaru }: Props) {
    return (
        <>
            <Head title="Detail Berita" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <div className="container relative z-10 mx-auto px-4 py-3">
                        <div className="mt-13 flex items-center gap-2 text-sm text-slate-500">
                            <Home size={14} />
                            <span>Beranda</span>

                            <ChevronRight size={14} />
                            <span>Berita</span>

                            <ChevronRight size={14} />

                            <span className="font-medium text-slate-700">
                                Detail Berita
                            </span>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                            <article className="rounded-3xl border bg-white p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                        {berita.kategori?.nama_kategori}
                                    </span>

                                    <Link
                                        href={route("berita")}
                                        className="
                                    inline-flex items-center gap-2
                                    rounded-lg border
                                    px-3 py-1.5
                                    text-xs font-medium text-slate-600
                                    transition-all
                                    hover:border-primary
                                    hover:text-primary
                                "
                                    >
                                        <ArrowLeft size={14} />
                                        Kembali
                                    </Link>
                                </div>

                                {/* Title */}
                                <h1 className="mt-4 text-4xl font-bold text-slate-900">
                                    {berita.judul}
                                </h1>

                                {/* Meta */}
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={14} />
                                            <span>
                                                {formatDate(berita.tanggal)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Building2 size={14} />
                                            <span>Pemerintah Kota Kediri</span>
                                        </div>
                                        {/* 
                                <div className="flex items-center gap-2">
                                <Eye size={14} />
                                <span>1.234 kali dibaca</span>
                                </div> */}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="mr-1 text-sm text-slate-500">
                                            Bagikan:
                                        </span>

                                        {[
                                            FaFacebookF,
                                            FaXTwitter,
                                            FaWhatsapp,
                                        ].map((Icon, index) => (
                                            <button
                                                key={index}
                                                className="
                                            flex h-8 w-8 items-center justify-center
                                            rounded-lg border
                                            text-slate-500
                                            transition-all
                                            hover:border-primary
                                            hover:bg-primary
                                            hover:text-white
                                        "
                                            >
                                                <Icon size={14} />
                                            </button>
                                        ))}

                                        <button
                                            className="
                                        flex h-8 w-8 items-center justify-center
                                        rounded-lg border
                                        text-slate-500
                                        transition-all
                                        hover:border-primary
                                        hover:bg-primary
                                        hover:text-white
                                    "
                                        >
                                            <Link2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Cover */}
                                <img
                                    src={
                                        berita.images?.startsWith("http")
                                            ? berita.images
                                            : `/storage/berita/${berita.images}`
                                    }
                                    alt={berita.judul}
                                    className="mt-6 h-[420px] w-full rounded-2xl object-cover"
                                />

                                {/* Article */}
                                <div className="prose prose-slate mt-8 max-w-none">
                                    <p>
                                        {berita.deskripsi.replace(
                                            /<[^>]*>/g,
                                            "",
                                        )}
                                    </p>
                                </div>
                            </article>
                            {/* SIDEBAR */}
                            <aside className="space-y-6">
                                {/* Related News */}
                                <div className="rounded-3xl border bg-white p-5">
                                    <h3 className="font-bold">
                                        Berita Terbaru
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        {beritaTerbaru.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={route(
                                                    "berita.show",
                                                    item.slug,
                                                )}
                                                className="flex gap-3 group"
                                            >
                                                <img
                                                    src={item.images}
                                                    alt={item.judul}
                                                    className="h-20 w-24 rounded-lg object-cover"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-xs text-slate-500">
                                                            {formatDate(item.tanggal)}
                                                        </span>

                                                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                                            {
                                                                item.kategori
                                                                    ?.nama_kategori
                                                            }
                                                        </span>
                                                    </div>

                                                    <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug transition group-hover:text-primary">
                                                        {item.judul}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="rounded-3xl border bg-white p-5">
                                    <h3 className="font-bold">
                                        Kategori Berita
                                    </h3>
                                    <div className="space-y-1">
                                        {categories.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <button
                                                    key={item.name}
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
                                                    <span>{item.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </aside>
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
