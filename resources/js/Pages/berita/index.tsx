import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";
import { useEffect } from "react";

import {
  FaInstagram,
} from "react-icons/fa6";

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

export default function Berita() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://widget.komdigi.go.id/gpr-widget-kominfo.min.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
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
                <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-8 lg:overflow-visible">
                    {categories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <button
                                key={category.name}
                                className={`
                                    shrink-0 lg:w-auto
                                    min-w-[110px]
                                    flex flex-col items-center justify-center gap-2
                                    rounded-2xl border p-4 transition
                                    hover:border-primary hover:bg-primary/5
                                    ${
                                        index === 0
                                            ? "border-primary bg-primary text-white"
                                            : "bg-white"
                                    }
                                `}
                            >
                                <Icon size={20} />

                                <span className="text-xs font-medium text-center">
                                    {category.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    {/* FILTER */}
                    <aside className="rounded-3xl border bg-white p-5 h-fit">
                        <h3 className="font-bold">
                            Filter Berita
                        </h3>

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
                        </div>
                    </aside>

                    {/* LIST BERITA */}
                    <div className="space-y-6">
                        <article className="overflow-hidden rounded-2xl border bg-white">
                            <div className="grid lg:grid-cols-[320px_1fr]">
                                <img
                                    src="https://placehold.co/800x500"
                                    alt=""
                                    className="h-full w-full object-cover"
                                />

                                <div className="p-5">
                                    <p className="text-xs text-muted-foreground">
                                        28 Mei 2026
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold leading-tight">
                                        Wali Kota Kediri Tinjau Langsung Pembangunan Infrastruktur
                                    </h2>

                                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                                        Wali Kota Kediri melakukan peninjauan pembangunan
                                        infrastruktur di beberapa titik strategis untuk memastikan
                                        kualitas pembangunan berjalan optimal.
                                    </p>

                                    <Link
                                        href={route("berita.show", 1)}
                                        className="mt-3 inline-flex text-sm font-semibold text-primary"
                                    >
                                        Baca Selengkapnya →
                                    </Link>
                                </div>
                            </div>
                        </article>

                        {/* GRID BERITA */}
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <article
                                    key={i}
                                    className="overflow-hidden rounded-2xl border bg-white hover:shadow-md transition"
                                >
                                    <img
                                        src="https://placehold.co/600x400"
                                        alt=""
                                        className="h-40 w-full object-cover"
                                    />

                                    <div className="p-4">
                                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                                            Pendidikan
                                        </span>

                                        <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug">
                                            Pelajar Kediri Raih Juara di Kompetisi Nasional
                                        </h3>

                                        <p className="mt-2 text-xs text-muted-foreground">
                                            25 Mei 2026
                                        </p>

                                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                            Siswa Kota Kediri berhasil meraih prestasi membanggakan
                                            dalam ajang kompetisi tingkat nasional.
                                        </p>
                                        <Link
                                            href={route("berita.show", 1)}
                                            className="mt-3 inline-flex text-sm font-semibold text-primary"
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
  )
}