import { Head } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { Home, ChevronRight } from "lucide-react";
import { ContentCTA } from "@/Components/ContentCTA";

import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaWhatsapp
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
  Sparkles 
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

export default function DetailBerita() {
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
                    <span>
                        Berita
                    </span>

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
                        {/* Category */}
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            Kesenian
                        </span>

                        {/* Title */}
                        <h1 className="mt-4 text-4xl font-bold text-slate-900">
                            Jaranan Kediri
                        </h1>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                <CalendarDays size={14} />
                                <span>28 Mei 2026</span>
                                </div>

                                <div className="flex items-center gap-2">
                                <Building2 size={14} />
                                <span>Pemerintah Kota Kediri</span>
                                </div>

                                <div className="flex items-center gap-2">
                                <Eye size={14} />
                                <span>1.234 kali dibaca</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
    <span className="mr-1 text-sm text-slate-500">
        Bagikan:
    </span>

    {[FaFacebookF, FaXTwitter, FaWhatsapp].map((Icon, index) => (
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
                            src="https://placehold.co/1200x700"
                            alt="Jaranan Kediri"
                            className="mt-6 h-[420px] w-full rounded-2xl object-cover"
                        />

                        {/* Article */}
                        <div className="prose prose-slate mt-8 max-w-none">
                            <p>
                                Jaranan merupakan salah satu kesenian tradisional khas
                                Kediri yang telah turun-temurun dilestarikan oleh
                                masyarakat. Kesenian ini menampilkan perpaduan antara
                                tari, musik gamelan, nyanyian, serta atraksi menggunakan
                                properti kuda tiruan yang terbuat dari anyaman bambu.
                            </p>

                            <p>
                                Jaranan bukan hanya sekadar hiburan, tetapi juga sarat
                                makna budaya dan nilai-nilai luhur. Setiap gerakan dan
                                iringan musik menggambarkan semangat, keberanian, serta
                                kebersamaan masyarakat Kediri.
                            </p>

                            <p>
                                Di Kota Kediri, jaranan menjadi bagian penting dalam
                                berbagai acara adat, perayaan budaya, hingga penyambutan
                                tamu penting.
                            </p>
                        </div>

                        {/* Highlight */}
                        <div className="mt-8 rounded-2xl bg-cyan-50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm text-primary">
                                    <Sparkles size={18} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-primary">
                                        Tahukah Anda?
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        Beberapa gerakan dalam jaranan memiliki filosofi mendalam yang
                                        melambangkan perjalanan hidup manusia, mulai dari lahir,
                                        berjuang, hingga mencapai tujuan.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Video */}
                        <div className="mt-8 rounded-2xl border bg-slate-50 p-4">
                            <div className="grid gap-4 md:grid-cols-[250px_1fr]">

                                <img
                                    src="https://placehold.co/500x300"
                                    alt=""
                                    className="rounded-xl object-cover"
                                />

                                <div>
                                    <span className="text-xs font-semibold uppercase text-primary">
                                        Tonton Video
                                    </span>

                                    <h3 className="mt-2 text-xl font-bold">
                                        Jaranan Kediri: Warisan Budaya yang Terus Lestari
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-600">
                                        Saksikan keindahan, makna, dan semangat
                                        kesenian jaranan khas Kediri dalam video
                                        berikut.
                                    </p>

                                    <a
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            mt-4 inline-flex items-center gap-2
                                            rounded-lg bg-primary
                                            px-3 py-2
                                            text-sm font-medium text-white
                                            shadow-sm transition
                                            hover:bg-primary/90
                                        "
                                    >
                                        <FaYoutube size={16} />
                                        Tonton di YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                    {/* SIDEBAR */}
                    <aside className="space-y-6">

                        {/* Related News */}
                        <div className="rounded-3xl border bg-white p-5">
                            <h3 className="font-bold">
                                Berita Terkait
                            </h3>

                            <div className="mt-5 space-y-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-3"
                                    >
                                        <img
                                            src="https://placehold.co/120x90"
                                            alt=""
                                            className="h-20 w-24 rounded-lg object-cover"
                                        />

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">
                                                27 Mei 2026
                                            </span>

                                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                                KESENIAN
                                            </span>
                                            </div>

                                            <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">
                                            Pentas Seni Tradisional Meriahkan Hari Jadi Kota Kediri
                                            </h4>
                                        </div>
                                    </div>
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
  )
}