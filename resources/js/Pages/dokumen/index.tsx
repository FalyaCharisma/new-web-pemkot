import { Head, Link  } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  FileText,
  Scale,
  Gavel,
  BarChart3,
  ClipboardList,
  PieChart,
  BookOpen,
  Eye,
  Flame,
  Filter,
} from "lucide-react";

export default function DokumenIndex() {
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

    const categories = [
        { name: "Semua", icon: LayoutGrid, active: true },
        { name: "Laporan", icon: FileText },
        { name: "Perda", icon: Scale },
        { name: "Perwali", icon: Gavel },
        { name: "RPJMD", icon: BarChart3 },
        { name: "Renstra", icon: ClipboardList },
        { name: "Statistik", icon: PieChart },
        { name: "Publikasi", icon: BookOpen },
    ];

    const documents = Array.from({ length: 8 }, (_, i) => ({
        title: `Dokumen Pemerintah Kota Kediri ${i + 1}`,
        year: 2024,
        views: 800 + i * 150,
    }));

    const popular = [
        "RPJMD Kota Kediri Tahun 2025-2030",
        "LPPD Kota Kediri Tahun 2024",
        "Statistik Kota Kediri Tahun 2024",
        "APBD Kota Kediri Tahun 2025",
        "Perda Kota Kediri Nomor 4 Tahun 2023",
    ];

    return (
        <>
            <Head title="Dokumen" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />
                <main className="pt-15">
                    <HeroPage
                        title="Dokumen"
                        breadcrumb="Dokumen"
                        placeholder="Cari dokumen, regulasi, atau publikasi..."
                        description="Kumpulan laporan, regulasi, dan publikasi resmi Pemerintah Kota Kediri"
                    />

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        <div className="mb-8 rounded-3xl border bg-white p-6 shadow-sm">
                            {/* KATEGORI */}
                            <div className="mb-10">
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 className="text-xl font-bold">
                                        Kategori Dokumen
                                    </h2>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={scrollLeft}
                                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white p-2 shadow"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    <button
                                        onClick={scrollRight}
                                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white p-2 shadow"
                                    >
                                        <ChevronRight size={18} />
                                    </button>

                                    <div
                                        ref={scrollRef}
                                        className="flex gap-4 overflow-x-auto px-10 pb-2 scrollbar-hide"
                                    >
                                        {categories.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <button
                                                    key={item.name}
                                                    className={`h-24 w-36 shrink-0 rounded-2xl border transition
                                                    ${
                                                        item.active
                                                            ? "bg-primary text-white"
                                                            : "bg-white hover:border-primary"
                                                    }`}
                                                >
                                                    <div className="flex h-full flex-col items-center justify-center">
                                                        <Icon size={24} />
                                                        <span className="mt-2 text-sm font-medium">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* KOLEKSI */}
                            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

                                {/* GRID DOKUMEN */}
                                <div>
                                    <div className="mb-5 flex items-center justify-between">
                                        <h2 className="text-xl font-bold">
                                            Koleksi Dokumen
                                        </h2>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                                        {documents.map((doc, index) => (
                                            <div
                                                key={index}
                                                className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                            >
                                                <div className="h-70 bg-gradient-to-br from-teal-600 to-teal-400" />

                                                <div className="p-4">
                                                    <h3 className="line-clamp-2 font-semibold">
                                                        {doc.title}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Tahun {doc.year}
                                                    </p>

                                                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <Eye size={14} />
                                                            {doc.views}
                                                        </span>

                                                        <span className="rounded-full border px-2 py-1 text-xs">
                                                            PDF
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex justify-center">
                                        <button className="rounded-xl border px-6 py-3 hover:bg-slate-100">
                                            Muat Lebih Banyak
                                        </button>
                                    </div>
                                </div>

                                {/* SIDEBAR */}
                                <div className="space-y-6 mt-11">

                                    {/* DOKUMEN POPULER */}
                                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                        <h3 className="mb-5 flex items-center gap-2 font-bold">
                                            <Flame className="text-red-500" size={18} />
                                            Dokumen Populer
                                        </h3>

                                        <div className="space-y-5">
                                            {popular.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex gap-4 border-b pb-4 last:border-0"
                                                >
                                                    <span className="text-xl font-bold text-primary">
                                                        {i + 1}
                                                    </span>

                                                    <div className="flex-1">
                                                        <p className="font-medium">
                                                            {item}
                                                        </p>

                                                        <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                                                            <span>2024</span>

                                                            <span className="flex items-center gap-1">
                                                                <Eye size={14} />
                                                                {900 + i * 100}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* FILTER */}
                                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                        <h3 className="mb-5 flex items-center gap-2 font-bold">
                                            <Filter size={18} />
                                            Filter Dokumen
                                        </h3>

                                        <div className="space-y-4">
                                            <select className="w-full rounded-xl border p-3">
                                                <option>Semua Kategori</option>
                                            </select>

                                            <select className="w-full rounded-xl border p-3">
                                                <option>Semua Tahun</option>
                                            </select>

                                            <select className="w-full rounded-xl border p-3">
                                                <option>Semua Jenis</option>
                                            </select>

                                            <button className="w-full rounded-xl bg-primary py-3 font-medium text-white">
                                                Terapkan Filter
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}