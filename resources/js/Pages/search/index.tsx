import { Head } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import type { SearchGroupedResult } from "@/types/searchresult";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

import {
    Search,
    FileText,
    Newspaper,
    Trophy,
    Calendar,
    MapPin,
    ChevronDown,
    ArrowRight,
    RotateCcw,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import { HeroPage } from "@/Components/HeroPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/**
 * TYPES
 */
interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string | number;
}

interface Props {
    keyword: string;
    results: SearchGroupedResult;
    selectedTypes: string[];
}

/**
 * PAGE
 */
export default function SearchIndex({
    keyword,
    results,
    selectedTypes: initialTypes,
}: Props) {
    const [search, setSearch] = useState(keyword);
    const sections = [
        {
            key: "berita",
            title: "Berita",
            data: results.berita.items,
            total: results.berita.total,
            href: route("berita", {
                search: keyword,
            }),
        },
        {
            key: "agenda",
            title: "Agenda",
            data: results.agenda.items,
            total: results.agenda.total,
            href: route("agenda.index", {
                search: keyword,
            }),
        },
        {
            key: "fasilitas",
            title: "Fasilitas Kota",
            data: results.fasilitas.items,
            total: results.fasilitas.total,
            href: route("fasilitas-kota.index", {
                search: keyword,
            }),
        },
        {
            key: "penghargaan",
            title: "Penghargaan",
            data: results.penghargaan.items,
            total: results.penghargaan.total,
            href: route("penghargaan", {
                search: keyword,
            }),
        },
        {
            key: "dokumen",
            title: "Dokumen",
            data: results.dokumen.items,
            total: results.dokumen.total,
            href: route("dokumen.index", {
                search: keyword,
            }),
        },

        {
            key: "galeri",
            title: "Galeri",
            data: results.galeri.items,
            total: results.galeri.total,
            href: route("galeri.index", {
                search: keyword,
            }),
        },
    ];

    const filters = [
        {
            label: "Berita",
            value: "berita",
        },
        {
            label: "Agenda",
            value: "agenda",
        },
        {
            label: "Penghargaan",
            value: "penghargaan",
        },
        {
            label: "Fasilitas Kota",
            value: "fasilitas",
        },
        {
            label: "Dokumen",
            value: "dokumen",
        },

        {
            label: "Galeri",
            value: "galeri",
        },
    ];

    const [selectedTypes, setSelectedTypes] = useState<string[]>(
        initialTypes ?? [],
    );
    const handleReset = () => {
        setSelectedTypes([]);

        router.get(route("search"), {
            search: keyword,
        });
    };

    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    useEffect(() => {
        if (selectedAlbum) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedAlbum]);

    return (
        <>
            <Head title="Hasil Pencarian" />

            <div className="min-h-screen bg-slate-100">
                <HeaderSolid />

                <main className="pt-16 mb-20">
                    {/* HERO */}
                    <HeroPage
                        title="Hasil Pencarian"
                        description="Temukan berita, agenda, fasilitas kota dan penghargaan Kota Kediri."
                        breadcrumb="Pencarian"
                        placeholder="Cari informasi..."
                        searchValue={search}
                        onSearchChange={setSearch}
                        onSearch={(keyword) => {
                            router.get(route("search"), {
                                search: keyword,
                                type: selectedTypes,
                            });
                        }}
                    />

                    {/* CONTENT */}
                    <section className="-mt-10 relative z-10">
                        <div className="container mx-auto px-6">
                            <div className="bg-white rounded-[40px] p-8 shadow-sm">
                                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                                    {/* SIDEBAR */}
                                    <aside className="border rounded-3xl p-6 h-fit">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-lg">
                                                Filter Pencarian
                                            </h3>
                                        </div>

                                        <div className="border-t my-6" />

                                        <h4 className="font-semibold mb-4">
                                            Kategori
                                        </h4>

                                        <div className="space-y-4">
                                            {filters.map((item) => (
                                                <label
                                                    key={item.value}
                                                    className="flex items-center gap-3"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTypes.includes(
                                                            item.value,
                                                        )}
                                                        onChange={() => {
                                                            if (
                                                                selectedTypes.includes(
                                                                    item.value,
                                                                )
                                                            ) {
                                                                setSelectedTypes(
                                                                    selectedTypes.filter(
                                                                        (i) =>
                                                                            i !==
                                                                            item.value,
                                                                    ),
                                                                );
                                                            } else {
                                                                setSelectedTypes(
                                                                    [
                                                                        ...selectedTypes,

                                                                        item.value,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                    />

                                                    {item.label}
                                                </label>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => {
                                                router.get(
                                                    route("search"),

                                                    {
                                                        search: keyword,

                                                        type: selectedTypes,
                                                    },
                                                );
                                            }}
                                            className="w-full rounded-xl bg-primary py-3 font-semibold text-white mt-4"
                                        >
                                            Terapkan Filter
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 mt-2"
                                        >
                                            <RotateCcw size={16} />
                                            Reset Filter
                                        </button>
                                    </aside>

                                    {/* MAIN */}
                                    <div>
                                        {/* HEADER */}
                                        <div className="flex justify-between">
                                            <div>
                                                <h1 className="text-4xl font-bold">
                                                    Hasil pencarian untuk{" "}
                                                    <span className="text-teal-800">
                                                        {keyword}
                                                    </span>
                                                </h1>

                                                <p className="text-slate-500 mt-2">
                                                    Ditemukan{" "}
                                                    {results.berita.total +
                                                        results.agenda.total +
                                                        results.fasilitas
                                                            .total +
                                                        results.penghargaan
                                                            .total}{" "}
                                                    hasil
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 space-y-12">
                                            {sections.map((section) => {
                                                if (section.data.length === 0)
                                                    return null;

                                                return (
                                                    <div key={section.key}>
                                                        <div className="mb-5 flex items-center gap-3">
                                                            <div className="h-2.5 w-2.5 rounded-full bg-primary" />

                                                            <h2 className="text-2xl font-bold">
                                                                {section.title}
                                                            </h2>

                                                            <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                                                                {section.total}{" "}
                                                                hasil
                                                            </span>
                                                        </div>

                                                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                                            {section.data.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() => {
                                                                            if (
                                                                                item.type ===
                                                                                "galeri"
                                                                            ) {
                                                                                setSelectedAlbum(
                                                                                    item,
                                                                                );

                                                                                return;
                                                                            }

                                                                            window.location.href =
                                                                                item.url;
                                                                        }}
                                                                        className="overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg cursor-pointer"
                                                                    >
                                                                        <img
                                                                            src={
                                                                                item.image ||
                                                                                "https://placehold.co/600x400?text=No+Image"
                                                                            }
                                                                            alt={
                                                                                item.title
                                                                            }
                                                                            className="h-48 w-full object-cover"
                                                                        />

                                                                        <div className="p-5">
                                                                            <p className="text-xs text-slate-500">
                                                                                {
                                                                                    item.date
                                                                                }
                                                                            </p>

                                                                            <h3 className="mt-2 line-clamp-2 text-lg font-semibold">
                                                                                {
                                                                                    item.title
                                                                                }
                                                                            </h3>

                                                                            <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                                                                                {
                                                                                    item.description
                                                                                }
                                                                            </p>

                                                                            {item.location && (
                                                                                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                                                                                    <MapPin
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                    />
                                                                                    {
                                                                                        item.location
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                        {section.total > 3 && (
                                                            <div className="mt-6 flex justify-end">
                                                                <a
                                                                    href={
                                                                        section.href
                                                                    }
                                                                    className="inline-flex items-center gap-2  font-semibold text-primary hover:underline"
                                                                >
                                                                    Lihat{" "}
                                                                    {section.total -
                                                                        3}{" "}
                                                                    lainnya
                                                                    <ArrowRight
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
                {selectedAlbum && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                        <div className="relative w-full max-w-5xl rounded-2xl bg-white p-4">
                            <button
                                onClick={() => setSelectedAlbum(null)}
                                className="absolute right-4 top-4 z-10 rounded-full bg-black/70 px-3 py-1 text-white"
                            >
                                ✕
                            </button>

                            <Swiper
                                modules={[Navigation]}
                                navigation
                                loop={selectedAlbum.images.length > 1}
                            >
                                {selectedAlbum.images.map(
                                    (img: string, i: number) => (
                                        <SwiperSlide key={i}>
                                            <img
                                                src={img}
                                                className="h-[70vh] w-full object-contain"
                                            />
                                        </SwiperSlide>
                                    ),
                                )}
                            </Swiper>

                            <div className="mt-4">
                                <h2 className="text-xl font-bold">
                                    {selectedAlbum.title}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Album • {selectedAlbum.date}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
