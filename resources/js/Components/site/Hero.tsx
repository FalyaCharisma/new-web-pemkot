import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Search,
    ArrowRight,
    LayoutGrid,
    Hotel,
    Bus,
    HeartPulse,
    UtensilsCrossed,
    ShoppingBag,
    Trees,
} from "lucide-react";

import hero from "@/assets/hero4.png";
import QuickMenu from "../QuickMenu";
import MobileMenu from "../MobileMenu";

export function Hero() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (!query.trim()) return;

        router.get(route("search"), {
            search: query,
        });
    };

    return (
        <header className="relative h-screen overflow-visible">
            {/* Background */}
            <div className="absolute inset-x-0 top-0 h-[85vh]">
                <img
                    src={hero}
                    alt="Kota Kediri"
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex h-[85vh] items-center">
                <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
                    <div className="max-w-4xl">
                        {/* Badge */}
                        <div className="inline-flex items-center rounded-full bg-white/20 px-5 py-2 text-xs font-medium text-white backdrop-blur-md">
                            <span>MAJU</span>
                            <span className="mx-2 text-yellow-400">•</span>

                            <span>AGAMIS</span>
                            <span className="mx-2 text-yellow-400">•</span>

                            <span>PRODUKTIF</span>
                            <span className="mx-2 text-yellow-400">•</span>

                            <span>AMAN</span>
                            <span className="mx-2 text-yellow-400">•</span>

                            <span>NGANGENI</span>
                        </div>

                        {/* Title */}
                        <h1 className="mt-3 text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl ">
                            Kota Kediri{" "}
                            <span className="text-gold italic font-serif">
                                Mapan
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <h5 className="mt-6 text-lg font-medium uppercase tracking-[0.18em] text-white/80">
                            Ngangeni dalam Kenangan, Maju dalam Perubahan
                        </h5>

                        {/* Search */}
                        <div className="mt-10 flex w-full max-w-4xl overflow-hidden rounded-full bg-white shadow-2xl">
                            <input
                                type="text"
                                placeholder="Cari Fasilitas, berita, wisata atau informasi lainnya..."
                                className="flex-1 px-8 py-5 text-gray-700 outline-none"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSearch();
                                    }
                                }}
                            />

                            <button
                                onClick={handleSearch}
                                className="m-2 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-white"
                            >
                                <Search size={22} />
                            </button>
                        </div>

                        {/* CTA */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="https://pecut.kedirikota.go.id/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white transition hover:opacity-90"
                            >
                                Akses Layanan Publik
                                <ArrowRight size={18} />
                            </a>
                            <button className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                                Jelajahi Kota Kediri
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Akses Cepat */}
            <div className="absolute bottom-10 left-1/2 z-30 hidden w-full max-w-7xl -translate-x-1/2 -translate-y-8 px-6 lg:block">
                <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9">
                        {/* Judul */}
                        <div className="flex flex-col justify-center border-r border-slate-200 p-6 lg:col-span-2 lg:p-8">
                            <h3 className="font-bold text-slate-900">
                                Kediri Hub
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Temukan berbagai fasilitas untuk aktivitas Anda.
                            </p>
                        </div>

                        <QuickMenu
                            icon={<Hotel size={28} />}
                            title="Akomodasi"
                            href={route("fasilitas-kota.index", {
                                kategori: 1,
                            })}
                        />

                        <QuickMenu
                            icon={<Bus size={28} />}
                            title="Transportasi"
                            href={route("fasilitas-kota.index", {
                                kategori: 2,
                            })}
                        />

                        <QuickMenu
                            icon={<HeartPulse size={28} />}
                            title="Kesehatan"
                            href={route("fasilitas-kota.index", {
                                kategori: 3,
                            })}
                        />

                        <QuickMenu
                            icon={<UtensilsCrossed size={28} />}
                            title="Kuliner"
                            href={route("fasilitas-kota.index", {
                                kategori: 4,
                            })}
                        />

                        <QuickMenu
                            icon={<ShoppingBag size={28} />}
                            title="Perbelanjaan"
                            href={route("fasilitas-kota.index", {
                                kategori: 5,
                            })}
                        />

                        <QuickMenu
                            icon={<Trees size={28} />}
                            title="Ruang Publik"
                            href={route("fasilitas-kota.index", {
                                kategori: 6,
                            })}
                        />

                        <Link
                            href={route("fasilitas-kota.index")}
                            className="flex flex-col items-center justify-center gap-2 bg-primary p-6 text-white transition hover:opacity-90"
                        >
                            <LayoutGrid size={28} />

                            <span className="text-sm font-medium text-center">
                                Semua Fasilitas
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Quick Access */}
            <div className="absolute bottom-6 left-0 right-0 z-30 lg:hidden">
                <div className="flex gap-3 overflow-x-auto px-4 pb-2">
                    <MobileMenu
                        icon={<Hotel size={22} />}
                        title="Akomodasi"
                        href={route("fasilitas-kota.index", {
                            kategori: 1,
                        })}
                    />

                    <MobileMenu
                        icon={<Bus size={22} />}
                        title="Transportasi"
                        href={route("fasilitas-kota.index", {
                            kategori: 2,
                        })}
                    />

                    <MobileMenu
                        icon={<HeartPulse size={22} />}
                        title="Kesehatan"
                        href={route("fasilitas-kota.index", {
                            kategori: 3,
                        })}
                    />

                    <MobileMenu
                        icon={<UtensilsCrossed size={22} />}
                        title="Kuliner"
                        href={route("fasilitas-kota.index", {
                            kategori: 4,
                        })}
                    />

                    <MobileMenu
                        icon={<ShoppingBag size={22} />}
                        title="Perbelanjaan"
                        href={route("fasilitas-kota.index", {
                            kategori: 5,
                        })}
                    />

                    <MobileMenu
                        icon={<Trees size={22} />}
                        title="Ruang Publik"
                        href={route("fasilitas-kota.index", {
                            kategori: 6,
                        })}
                    />

                    <MobileMenu
                        icon={<LayoutGrid size={22} />}
                        title="Semua"
                        href={route("fasilitas-kota.index")}
                    />
                </div>
            </div>
        </header>
    );
}
