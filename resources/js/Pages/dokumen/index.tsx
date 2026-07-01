import { Head, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import Pagination from "@/Components/Pagination";

import { useState } from "react";

import {
    FileText,
    Calendar,
    Grid3X3,
    List,
    Info,
    Download,
    RefreshCcw,
    Search,
} from "lucide-react";
import FloatingReport from "@/Components/site/Floating";

interface Dokumen {
    id: number;
    judul: string;
    dokumen: string;
    tanggal: string;
}

interface Props {
    dokumen: any;

    totalDokumen: number;

    rentang: {
        awal: number;
        akhir: number;
    };

    tahunList: number[];

    filters: {
        search: string;
        tahun: string | null;
        sort: string;
    };
}

export default function DokumenIndex({
    dokumen,
    totalDokumen,
    rentang,
    tahunList,
    filters,
}: Props) {
    const [viewMode, setViewMode] = useState("grid");
    const [search, setSearch] = useState(filters.search ?? "");

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const handleSearch = (keyword: string) => {
        router.get(
            route("dokumen.index"),

            {
                search: keyword,
                tahun: filters.tahun,
                sort: filters.sort,
            },

            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const handleYear = (tahun: string) => {
        router.get(
            route("dokumen.index"),

            {
                search: filters.search,
                tahun,
                sort: filters.sort,
            },

            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const handleSort = (sort: string) => {
        router.get(
            route("dokumen.index"),

            {
                search: filters.search,
                tahun: filters.tahun,
                sort,
            },

            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const fileConfig = {
        PDF: "bg-red-50 text-red-600",
        DOCX: "bg-blue-50 text-blue-600",
        DOC: "bg-blue-50 text-blue-600",
        XLSX: "bg-green-50 text-green-600",
        XLS: "bg-green-50 text-green-600",
        PPTX: "bg-orange-50 text-orange-600",
        ZIP: "bg-amber-50 text-amber-600",
    };
    const ext =
        dokumen.data[0]?.dokumen.split(".").pop()?.toUpperCase() || "FILE";

    const badgeClass =
        fileConfig[ext as keyof typeof fileConfig] ??
        "bg-slate-100 text-slate-600";

    return (
        <>
            <Head title="Dokumen" />
            <div className="min-h-screen bg-slate-50">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Dokumen Publik"
                        breadcrumb="Dokumen"
                        description=""
                        placeholder="Cari dokumen..."
                        searchValue={search}
                        onSearchChange={(value) => setSearch(value)}
                        onSearch={handleSearch}
                    />

                    <section className="container mx-auto px-4 py-10">
                        {/* Filter */}

                        <div className="mb-6 grid gap-4 lg:grid-cols-12">
                            <div className="relative lg:col-span-7"></div>

                            <div className="lg:col-span-2">
                                <select
                                    value={filters.tahun ?? ""}
                                    onChange={(e) => handleYear(e.target.value)}
                                    className="w-full rounded-2xl border bg-white px-4 py-4"
                                >
                                    <option value="">Semua Tahun</option>

                                    {tahunList.map((tahun) => (
                                        <option key={tahun} value={tahun}>
                                            {tahun}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="lg:col-span-2">
                                <select
                                    value={filters.sort}
                                    onChange={(e) => handleSort(e.target.value)}
                                    className="w-full rounded-2xl border bg-white px-4 py-4"
                                >
                                    <option value="latest">Terbaru</option>

                                    <option value="oldest">Terlama</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 lg:col-span-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`rounded-xl border p-4 ${
                                        viewMode === "grid"
                                            ? "bg-primary text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    <Grid3X3 size={18} />
                                </button>

                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`rounded-xl border p-4 ${
                                        viewMode === "list"
                                            ? "bg-primary text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="grid gap-6 lg:grid-cols-12">
                            <div className="lg:col-span-9">
                                {viewMode === "grid" ? (
                                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                                        {dokumen.data.map((doc: Dokumen) => (
                                            <div
                                                key={doc.id}
                                                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                            >
                                                <div className="mb-2">
                                                    <span
                                                        className={`rounded-md px-2 py-1 text-xs font-semibold ${badgeClass}`}
                                                    >
                                                        {ext}
                                                    </span>
                                                </div>

                                                <h3 className="min-h-[60px] font-bold text-slate-800">
                                                    {doc.judul}
                                                </h3>

                                                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                                                    <Calendar size={14} />

                                                    {formatDate(doc.tanggal)}
                                                </div>

                                                <a
                                                    href={`/storage/${doc.dokumen}`}
                                                    target="_blank"
                                                    className="mt-6 block"
                                                >
                                                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white py-3 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md">
                                                        <Download size={16} />
                                                        Download
                                                    </button>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {dokumen.data.map((doc: Dokumen) => (
                                            <div
                                                key={doc.id}
                                                className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="flex-1">
                                                        <div className="mb-2">
                                                            <span
                                                                className={`rounded-md px-2 py-1 text-xs font-semibold ${badgeClass}`}
                                                            >
                                                                {ext}
                                                            </span>
                                                        </div>

                                                        <h3 className="font-semibold text-slate-800">
                                                            {doc.judul}
                                                        </h3>

                                                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                                            <Calendar
                                                                size={14}
                                                            />
                                                            {formatDate(
                                                                doc.tanggal,
                                                            )}
                                                        </div>
                                                    </div>

                                                    <a
                                                        href={`/storage/${doc.dokumen}`}
                                                        target="_blank"
                                                    >
                                                        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md">
                                                            <Download
                                                                size={16}
                                                            />
                                                            Download
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="lg:col-span-3">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h3 className="mb-6 text-lg font-bold text-slate-800">
                                        Ringkasan Dokumen
                                    </h3>

                                    {/* Total Dokumen */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <FileText
                                                size={20}
                                                className="text-green-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Total Dokumen
                                            </p>

                                            <h4 className="text-3xl font-bold text-primary">
                                                {totalDokumen}
                                            </h4>

                                            <p className="text-xs text-slate-400">
                                                Dokumen
                                            </p>
                                        </div>
                                    </div>

                                    <hr className="my-6" />

                                    {/* Rentang Tahun */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                            <Calendar
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Rentang Tahun
                                            </p>

                                            <h4 className="text-2xl font-semibold text-slate-800">
                                                {rentang.awal} - {rentang.akhir}
                                            </h4>
                                        </div>
                                    </div>

                                    <hr className="my-6" />

                                    {/* Status */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                            <Info
                                                size={20}
                                                className="text-purple-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Status Dokumen
                                            </p>

                                            <h4 className="text-xl font-semibold text-primary">
                                                Publik
                                            </h4>

                                            <p className="text-xs text-slate-400">
                                                Dapat diakses masyarakat
                                            </p>
                                        </div>
                                    </div>

                                    <hr className="my-6" />

                                    {/* Update */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                                            <RefreshCcw
                                                size={20}
                                                className="text-orange-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Update Terakhir
                                            </p>

                                            <h4 className="text-lg font-semibold text-slate-800">
                                                {dokumen.data.length > 0
                                                    ? formatDate(
                                                          dokumen.data[0]
                                                              .tanggal,
                                                      )
                                                    : "-"}
                                            </h4>
                                        </div>
                                    </div>

                                    <hr className="my-6" />

                                    {/* Tentang Dokumen */}
                                    <div>
                                        <h4 className="mb-4 font-semibold text-slate-800">
                                            Tentang Dokumen
                                        </h4>

                                        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-100">
                                                <Info
                                                    size={16}
                                                    className="text-cyan-600"
                                                />
                                            </div>

                                            <p className="text-sm leading-6 text-slate-600">
                                                Dokumen pada halaman ini
                                                merupakan arsip resmi Pemerintah
                                                Kota Kediri yang dipublikasikan
                                                untuk mendukung keterbukaan
                                                informasi kepada masyarakat.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Pagination links={dokumen.links} />
                        </div>
                    </section>
                </main>
<FloatingReport />
                <Footer />
            </div>
        </>
    );
}
