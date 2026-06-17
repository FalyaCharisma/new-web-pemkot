import { Head, Link, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";
import { useEffect, useState } from "react";
import type { Penghargaan } from "@/types/penghargaan";
import Pagination from "@/Components/Pagination";

import { FaInstagram } from "react-icons/fa6";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    penghargaan: {
        data: Penghargaan[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };
    years: number[];
    filters: {
        year?: string;
    };
}

export default function PenghargaanPage({
    penghargaan,
    years,
    filters,
}: Props) {
    const featured = penghargaan.data[0];
    const others = penghargaan.data.slice(1);

    const [selectedYear, setSelectedYear] = useState(filters.year ?? "");
    return (
        <>
            <Head title="Penghargaan" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Kediri Berprestasi"
                        breadcrumb="Penghargaan & Prestasi"
                        placeholder="Cari penghargaan..."
                        description="Informasi resmi mengenai penghargaan, prestasi, dan pencapaian Pemerintah Kota Kediri sebagai wujud komitmen dalam memberikan pelayanan dan pembangunan terbaik bagi masyarakat."
                    />

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                            {/* FILTER */}
                            <aside className="rounded-3xl border bg-white p-5 h-fit">
                                <h3 className="mb-4 text-lg font-bold">
                                    {" "}
                                    Filter Penghargaan{" "}
                                </h3>

                                <div className="mb-4 h-1 w-12 rounded-full bg-[#D8A21D]" />

                                <div className="mt-5 space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Tahun
                                        </label>

                                        <select
                                            value={selectedYear}
                                            onChange={(e) =>
                                                setSelectedYear(e.target.value)
                                            }
                                            className="w-full rounded-xl border px-3 py-2"
                                        >
                                            <option value="">
                                                Semua Tahun
                                            </option>

                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => {
                                            router.get(
                                                route("penghargaan"),
                                                {
                                                    year: selectedYear,
                                                },
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            );
                                        }}
                                        className="w-full rounded-xl bg-primary py-3 font-semibold text-white"
                                    >
                                        Terapkan Filter
                                    </button>
                                </div>
                            </aside>

                            {/* LIST BERITA */}
                            <div className="space-y-6">
                                {featured && (
                                    <article className="overflow-hidden rounded-2xl border bg-white">
                                        <div className="grid lg:grid-cols-[320px_1fr]">
                                            <img
                                                src={
                                                    featured.foto
                                                        ? `/storage/penghargaan/${featured.foto}`
                                                        : "https://placehold.co/600x400"
                                                }
                                                alt={featured.judul}
                                                className="h-full w-full object-cover"
                                            />

                                            <div className="p-5">
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {new Date(
                                                        featured.tanggal,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </p>

                                                <h2 className="mt-2 text-2xl font-bold leading-tight">
                                                    {featured.judul}
                                                </h2>

                                                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                                                    {featured.deskripsi?.replace(
                                                        /<[^>]*>/g,
                                                        "",
                                                    )}
                                                </p>

                                                <Link // href={route( // 'penghargaan.show' , // featured.slug // )}
                                                    className="mt-3 inline-flex text-sm font-semibold text-primary"
                                                >
                                                    Baca Selengkapnya →
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* GRID BERITA */}
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                                    {others.map((item) => (
                                        <article
                                            key={item.id}
                                            className="overflow-hidden rounded-2xl border bg-white hover:shadow-md transition"
                                        >
                                            <img
                                                src={
                                                    item.foto
                                                        ? item.foto.startsWith(
                                                              "http",
                                                          )
                                                            ? item.foto
                                                            : `/storage/penghargaan/${item.foto}`
                                                        : "https://placehold.co/600x400"
                                                }
                                                alt={item.judul}
                                                className="h-40 w-full object-cover"
                                            />

                                            <div className="p-4">
                                                <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug">
                                                    {item.judul}
                                                </h3>

                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    {new Date(
                                                        item.tanggal,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </p>

                                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                                    {item.deskripsi?.replace(
                                                        /<[^>]*>/g,
                                                        "",
                                                    )}
                                                </p>

                                                <Link // href={route( // 'penghargaan.show' , // item.slug // )}
                                                    className="mt-3 inline-flex text-sm font-semibold text-primary"
                                                >
                                                    Baca Selengkapnya →
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                                <Pagination links={penghargaan.links} />
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
